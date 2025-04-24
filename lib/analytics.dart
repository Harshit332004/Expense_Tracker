import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:intl/intl.dart';
import 'services/expense_service.dart';

class AnalyticsScreen extends StatefulWidget {
  @override
  _AnalyticsScreenState createState() => _AnalyticsScreenState();
}

class _AnalyticsScreenState extends State<AnalyticsScreen> {
  bool isLoading = true;
  String errorMessage = '';
  List<Map<String, dynamic>> expenses = [];
  List<Map<String, dynamic>> incomes = [];
  final currencyFormat = NumberFormat.currency(locale: 'en_IN', symbol: '₹');
  String selectedPeriod = 'Monthly';

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    setState(() {
      isLoading = true;
      errorMessage = '';
    });

    try {
      final dashboardData = await ExpenseService.getDashboardData();
      final periodExpenses = await ExpenseService.getExpensesByPeriod(selectedPeriod.toLowerCase());

      setState(() {
        expenses = periodExpenses;
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        errorMessage = 'Failed to load data: $e';
        isLoading = false;
      });
    }
  }

  Widget _buildBarChart() {
    // Group expenses by category
    Map<String, double> categoryTotals = {};
    for (var expense in expenses) {
      final category = expense['category'] as String;
      final amount = double.parse(expense['amount'].toString());
      categoryTotals[category] = (categoryTotals[category] ?? 0) + amount;
    }

    final List<BarChartGroupData> barGroups = [];
    int index = 0;
    categoryTotals.forEach((category, total) {
      barGroups.add(
        BarChartGroupData(
          x: index++,
          barRods: [
            BarChartRodData(
              toY: total,
              color: category.toLowerCase() == 'income' ? Colors.green : Colors.red,
              width: 20,
              borderRadius: BorderRadius.circular(4),
            ),
          ],
        ),
      );
    });

    return AspectRatio(
      aspectRatio: 1.5,
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'Expense by Category',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 20),
              Expanded(
                child: BarChart(
                  BarChartData(
                    alignment: BarChartAlignment.spaceAround,
                    maxY: categoryTotals.values.fold<double>(0, (max, value) => value > max ? value : max) * 1.2,
                    titlesData: FlTitlesData(
                      show: true,
                      bottomTitles: AxisTitles(
                        sideTitles: SideTitles(
                          showTitles: true,
                          getTitlesWidget: (value, meta) {
                            if (value >= 0 && value < categoryTotals.keys.length) {
                              return RotatedBox(
                                quarterTurns: 1,
                                child: Padding(
                                  padding: const EdgeInsets.all(12.0),
                                  child: Text(
                                    categoryTotals.keys.elementAt(value.toInt()),
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              );
                            }
                            return Text('');
                          },
                          reservedSize: 80,
                        ),
                      ),
                      leftTitles: AxisTitles(
                        sideTitles: SideTitles(
                          showTitles: true,
                          getTitlesWidget: (value, meta) {
                            return Text(
                              currencyFormat.format(value).replaceAll('.00', ''),
                              style: TextStyle(fontSize: 10),
                            );
                          },
                          reservedSize: 60,
                        ),
                      ),
                      topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                      rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                    ),
                    borderData: FlBorderData(show: false),
                    gridData: FlGridData(show: false),
                    barGroups: barGroups,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPieChart() {
    // Group expenses by category
    Map<String, double> categoryTotals = {};
    double total = 0;
    for (var expense in expenses) {
      if (expense['category'].toString().toLowerCase() != 'income') {
        final category = expense['category'] as String;
        final amount = double.parse(expense['amount'].toString());
        categoryTotals[category] = (categoryTotals[category] ?? 0) + amount;
        total += amount;
      }
    }

    final List<PieChartSectionData> sections = [];
    final colors = [
      Colors.red,
      Colors.blue,
      Colors.green,
      Colors.yellow,
      Colors.purple,
      Colors.orange,
      Colors.teal,
    ];

    int colorIndex = 0;
    categoryTotals.forEach((category, amount) {
      sections.add(
        PieChartSectionData(
          color: colors[colorIndex % colors.length],
          value: amount,
          title: '${(amount / total * 100).toStringAsFixed(1)}%\n$category',
          radius: 100,
          titleStyle: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
      );
      colorIndex++;
    });

    return AspectRatio(
      aspectRatio: 1.5,
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                'Expense Distribution',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 20),
              Expanded(
                child: PieChart(
                  PieChartData(
                    sections: sections,
                    centerSpaceRadius: 0,
                    sectionsSpace: 2,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Analytics'),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: _loadData,
          ),
        ],
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : errorMessage.isNotEmpty
              ? Center(child: Text(errorMessage))
              : RefreshIndicator(
                  onRefresh: _loadData,
                  child: SingleChildScrollView(
                    physics: AlwaysScrollableScrollPhysics(),
                    padding: EdgeInsets.all(16),
                    child: Column(
                      children: [
                        // Period selector
                        DropdownButton<String>(
                          value: selectedPeriod,
                          isExpanded: true,
                          items: ['Daily', 'Weekly', 'Monthly', 'Yearly']
                              .map((String value) {
                            return DropdownMenuItem<String>(
                              value: value,
                              child: Text(value),
                            );
                          }).toList(),
                          onChanged: (String? newValue) {
                            if (newValue != null) {
                              setState(() {
                                selectedPeriod = newValue;
                              });
                              _loadData();
                            }
                          },
                        ),
                        SizedBox(height: 20),
                        _buildBarChart(),
                        SizedBox(height: 20),
                        _buildPieChart(),
                      ],
                    ),
                  ),
                ),
    );
  }
} 