import 'package:flutter/material.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:path_provider/path_provider.dart';
import 'dart:io';
import 'package:share_plus/share_plus.dart';
import 'package:intl/intl.dart';
import 'services/expense_service.dart';

class ReceiptScreen extends StatefulWidget {
  const ReceiptScreen({super.key});

  @override
  State<ReceiptScreen> createState() => _ReceiptScreenState();
}

class _ReceiptScreenState extends State<ReceiptScreen> {
  bool isLoading = false;
  List<Map<String, dynamic>> expenses = [];
  final currencyFormat = NumberFormat.currency(locale: 'en_IN', symbol: '₹');
  String selectedPeriod = 'All Time';
  final List<String> periods = ['All Time', 'This Month', 'Last Month', 'This Year'];

  // Base URL for your backend where the images are hosted
  final String baseUrl = 'http://localhost:3000/uploads/'; // Update this if your backend is hosted elsewhere

  @override
  void initState() {
    super.initState();
    _loadExpenses();
  }

  Future<void> _loadExpenses() async {
    setState(() {
      isLoading = true;
    });

    try {
      final data = await ExpenseService.getExpenses();
      setState(() {
        expenses = data.where((expense) {
          if (selectedPeriod == 'All Time') return true;

          final expenseDate = DateTime.parse(expense['date'].toString());
          final now = DateTime.now();

          switch (selectedPeriod) {
            case 'This Month':
              return expenseDate.year == now.year &&
                  expenseDate.month == now.month;
            case 'Last Month':
              final lastMonth = DateTime(now.year, now.month - 1);
              return expenseDate.year == lastMonth.year &&
                  expenseDate.month == lastMonth.month;
            case 'This Year':
              return expenseDate.year == now.year;
            default:
              return true;
          }
        }).toList();
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load expenses: $e')),
        );
      }
    }
  }

  Future<void> _generateAndSharePDF() async {
    setState(() {
      isLoading = true;
    });

    try {
      final pdf = pw.Document();

      // Calculate totals
      double totalIncome = 0;
      double totalExpenses = 0;
      for (var expense in expenses) {
        if (expense['category'].toString().toLowerCase() == 'income') {
          totalIncome += double.parse(expense['amount'].toString());
        } else {
          totalExpenses += double.parse(expense['amount'].toString());
        }
      }

      // Add content to PDF
      pdf.addPage(
        pw.MultiPage(
          pageFormat: PdfPageFormat.a4,
          build: (context) => [
            pw.Header(
              level: 0,
              child: pw.Text(
                'Expense Report',
                style: pw.TextStyle(fontSize: 24, fontWeight: pw.FontWeight.bold),
              ),
            ),
            pw.SizedBox(height: 20),
            pw.Row(
              mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
              children: [
                pw.Text('Period: $selectedPeriod'),
                pw.Text('Date: ${DateFormat('yyyy-MM-dd').format(DateTime.now())}'),
              ],
            ),
            pw.SizedBox(height: 20),
            pw.Container(
              padding: pw.EdgeInsets.all(10),
              decoration: pw.BoxDecoration(
                border: pw.Border.all(),
              ),
              child: pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                children: [
                  pw.Text('Total Income: ${currencyFormat.format(totalIncome)}'),
                  pw.Text('Total Expenses: ${currencyFormat.format(totalExpenses)}'),
                  pw.Text('Balance: ${currencyFormat.format(totalIncome - totalExpenses)}'),
                ],
              ),
            ),
            pw.SizedBox(height: 20),
            pw.Table.fromTextArray(
              headers: ['Date', 'Category', 'Description', 'Amount'],
              data: expenses.map((expense) {
                final amount = double.parse(expense['amount'].toString());
                final isIncome = expense['category'].toString().toLowerCase() == 'income';
                return [
                  DateFormat('yyyy-MM-dd').format(DateTime.parse(expense['date'].toString())),
                  expense['category'],
                  expense['description'],
                  '${isIncome ? "+" : "-"}${currencyFormat.format(amount.abs())}',
                ];
              }).toList(),
              headerStyle: pw.TextStyle(fontWeight: pw.FontWeight.bold),
              headerDecoration: pw.BoxDecoration(color: PdfColors.grey300),
              cellAlignments: {
                0: pw.Alignment.centerLeft,
                1: pw.Alignment.centerLeft,
                2: pw.Alignment.centerLeft,
                3: pw.Alignment.centerRight,
              },
            ),
          ],
        ),
      );

      // Save PDF
      final output = await getTemporaryDirectory();
      final file = File('${output.path}/expense_report.pdf');
      await file.writeAsBytes(await pdf.save());

      // Share PDF
      await Share.shareXFiles(
        [XFile(file.path)],
        subject: 'Expense Report - $selectedPeriod',
      );

    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to generate PDF: $e')),
        );
      }
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    // Calculate totals
    double totalIncome = 0;
    double totalExpenses = 0;
    for (var expense in expenses) {
      if (expense['category'].toString().toLowerCase() == 'income') {
        totalIncome += double.parse(expense['amount'].toString());
      } else {
        totalExpenses += double.parse(expense['amount'].toString());
      }
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('Expense Report'),
        actions: [
          if (!isLoading)
            IconButton(
              icon: Icon(Icons.share),
              onPressed: () async {
                await _generateAndSharePDF(); // Call the async function correctly
              },
              tooltip: 'Share PDF Report',
            ),
        ],
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : Column(
              children: [
                // Period Selection
                Padding(
                  padding: EdgeInsets.all(16),
                  child: DropdownButtonFormField<String>(
                    value: selectedPeriod,
                    decoration: InputDecoration(
                      labelText: 'Select Period',
                      border: OutlineInputBorder(),
                    ),
                    items: periods.map((String period) {
                      return DropdownMenuItem(
                        value: period,
                        child: Text(period),
                      );
                    }).toList(),
                    onChanged: (String? newValue) {
                      if (newValue != null) {
                        setState(() {
                          selectedPeriod = newValue;
                        });
                        _loadExpenses();
                      }
                    },
                  ),
                ),

                // Summary Card
                Card(
                  margin: EdgeInsets.all(16),
                  child: Padding(
                    padding: EdgeInsets.all(16),
                    child: Column(
                      children: [
                        Text(
                          'Summary',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 16),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            _buildSummaryItem(
                              'Income',
                              totalIncome,
                              Icons.arrow_upward,
                              Colors.green,
                            ),
                            _buildSummaryItem(
                              'Expenses',
                              totalExpenses,
                              Icons.arrow_downward,
                              Colors.red,
                            ),
                            _buildSummaryItem(
                              'Balance',
                              totalIncome - totalExpenses,
                              Icons.account_balance,
                              Colors.blue,
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),

                // Expenses List
                Expanded(
                  child: expenses.isEmpty
                      ? Center(
                          child: Text('No expenses found for this period'),
                        )
                      : ListView.builder(
                          itemCount: expenses.length,
                          itemBuilder: (context, index) {
                            final expense = expenses[index];
                            final amount = double.parse(expense['amount'].toString());
                            final isIncome = expense['category'].toString().toLowerCase() == 'income';

                            return ListTile(
                              leading: CircleAvatar(
                                backgroundColor: isIncome ? Colors.green.shade100 : Colors.red.shade100,
                                child: Icon(
                                  isIncome ? Icons.arrow_upward : Icons.arrow_downward,
                                  color: isIncome ? Colors.green : Colors.red,
                                ),
                              ),
                              title: Text(expense['category'] ?? 'Unknown'),
                              subtitle: Text(
                                '${DateFormat('yyyy-MM-dd').format(DateTime.parse(expense['date'].toString()))}\n${expense['description']}'
                              ),
                              trailing: Text(
                                '${isIncome ? "+" : "-"}${currencyFormat.format(amount.abs())}',
                                style: TextStyle(
                                  color: isIncome ? Colors.green : Colors.red,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              isThreeLine: true,
                              onTap: () {
                                // Show image if it's available in the expense
                                final receiptImage = expense['receiptImage']; // Assuming image URL is stored in 'receiptImage'
                                if (receiptImage != null && receiptImage.isNotEmpty) {
                                  _showReceiptImage(receiptImage); // Show the image on tap
                                }
                              },
                            );
                          },
                        ),
                ),
              ],
            ),
    );
  }

  Widget _buildSummaryItem(String title, double amount, IconData icon, Color color) {
    return Column(
      children: [
        Icon(icon, color: color),
        SizedBox(height: 8),
        Text(
          title,
          style: TextStyle(
            color: Colors.grey[600],
            fontSize: 12,
          ),
        ),
        Text(
          currencyFormat.format(amount),
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
      ],
    );
  }

  // Show Image in full screen when tapped on it
  void _showReceiptImage(String imagePath) {
    if (imagePath != null && imagePath.isNotEmpty) {
      final fullImageUrl = baseUrl + imagePath.replaceAll('\\', '/'); // Replace '\\' with '/'
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return Dialog(
            child: Center(
              child: Image.network(
                fullImageUrl,
                loadingBuilder: (context, child, loadingProgress) {
                  if (loadingProgress == null) {
                    return child;
                  } else {
                    return Center(child: CircularProgressIndicator());
                  }
                },
                errorBuilder: (context, error, stackTrace) {
                  return Center(child: Text('Failed to load image'));
                },
              ),
            ),
          );
        },
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('No image available for this expense')),
      );
    }
  }
}
