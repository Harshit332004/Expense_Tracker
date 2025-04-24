import 'package:flutter/material.dart';
import 'addexpense.dart';
import 'income.dart';
import 'receipt.dart';
import 'services/expense_service.dart';
import 'package:intl/intl.dart';
import 'analytics.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'ip_config_screen.dart';
import 'screens/settings_screen.dart';
import 'package:animated_flip_counter/animated_flip_counter.dart';

void main() {
  runApp(const ExpenseTrackerApp());
}

class ExpenseTrackerApp extends StatelessWidget {
  const ExpenseTrackerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
        scaffoldBackgroundColor: Colors.grey[100],
        appBarTheme: AppBarTheme(
          backgroundColor: Colors.white,
          elevation: 0,
          iconTheme: IconThemeData(color: Colors.black),
          titleTextStyle: TextStyle(
            color: Colors.black,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      home: const InitialScreen(),
    );
  }
}

class InitialScreen extends StatefulWidget {
  const InitialScreen({Key? key}) : super(key: key);

  @override
  _InitialScreenState createState() => _InitialScreenState();
}

class _InitialScreenState extends State<InitialScreen> {
  @override
  void initState() {
    super.initState();
    _checkIP();
  }

  Future<void> _checkIP() async {
    final prefs = await SharedPreferences.getInstance();
    final savedIP = prefs.getString(ExpenseService.IP_KEY);
    
    if (mounted) {
      if (savedIP == null) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => IPConfigScreen()),
        );
      } else {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => ExpenseTrackerHome()),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}

class ExpenseTrackerHome extends StatefulWidget {
  const ExpenseTrackerHome({super.key});

  @override
  _ExpenseTrackerHomeState createState() => _ExpenseTrackerHomeState();
}

class _ExpenseTrackerHomeState extends State<ExpenseTrackerHome> {
  int balance = 0;
  Map<String, dynamic> monthlyStats = {
    'expenses': 0.0,
    'income': 0.0,
    'balance': 0.0,
    'month': DateTime.now().month,
  };
  List<Map<String, dynamic>> expenses = [];
  bool isLoading = true;
  String selectedPeriod = 'Monthly';
  String errorMessage = '';
  final currencyFormat = NumberFormat.currency(locale: 'en_IN', symbol: '₹');
  int _selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    _loadDashboardData();
  }

  Future<void> _loadDashboardData() async {
    setState(() {
      isLoading = true;
      errorMessage = '';
    });

    try {
      final dashboardData = await ExpenseService.getDashboardData();
      final periodExpenses = await ExpenseService.getExpensesByPeriod(selectedPeriod.toLowerCase());

      if (mounted) {
        setState(() {
          balance = (dashboardData['balance'] ?? 0).toInt();
          monthlyStats = dashboardData['monthlyStats'];
          expenses = periodExpenses;
          isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          errorMessage = e.toString().replaceAll('Exception: ', '');
          isLoading = false;
        });
      }
    }
  }

  String _getMonthName(int month) {
    return DateFormat('MMMM').format(DateTime(2024, month));
  }

  Color _getAmountColor(double amount) {
    if (amount > 0) return Colors.green;
    if (amount < 0) return Colors.red;
    return Colors.grey;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: Text("Expense Tracker"),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: _loadDashboardData,
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
          if (index == 1) {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => ReceiptScreen()),
            );
          } else if (index == 2) {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => IncomeScreen()),
            );
          } else if (index == 3) {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => AnalyticsScreen()),
            );
          } else if (index == 4) {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => SettingsScreen()),
            );
          }
        },
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.receipt),
            label: 'Receipts',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.attach_money),
            label: 'Income',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.analytics),
            label: 'Analytics',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showModalBottomSheet(
            context: context,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
            ),
            builder: (context) => Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                ListTile(
                  leading: Icon(Icons.attach_money, color: Colors.green),
                  title: Text('Add Income'),
                  onTap: () async {
                    Navigator.pop(context);
                    await Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => IncomeScreen()),
                    );
                    _loadDashboardData();
                  },
                ),
                ListTile(
                  leading: Icon(Icons.shopping_cart, color: Colors.red),
                  title: Text('Add Expense'),
                  onTap: () async {
                    Navigator.pop(context);
                    await Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => AddExpenseScreen()),
                    );
                    _loadDashboardData();
                  },
                ),
              ],
            ),
          );
        },
        backgroundColor: Colors.deepPurple,
        child: const Icon(Icons.add, color: Colors.white),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      body: RefreshIndicator(
        onRefresh: _loadDashboardData,
        child: isLoading
            ? Center(child: CircularProgressIndicator())
            : SingleChildScrollView(
                physics: AlwaysScrollableScrollPhysics(),
                child: Column(
                  children: [
                    // Balance Card
                    Container(
                      width: double.infinity,
                      margin: EdgeInsets.all(16),
                      padding: EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [Colors.deepPurple, Colors.deepPurple.shade700],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.deepPurple.withOpacity(0.3),
                            blurRadius: 10,
                            offset: Offset(0, 5),
                          ),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Current Balance",
                            style: TextStyle(
                              color: Colors.white70,
                              fontSize: 16,
                            ),
                          ),
                          SizedBox(height: 8),
AnimatedSwitcher(
  duration: Duration(milliseconds: 300),
  child: AnimatedFlipCounter(
    key: ValueKey(balance), // force refresh
    value: balance.toDouble(),
    fractionDigits: 0,
    duration: Duration(milliseconds: 800),
    prefix: '₹',
    textStyle: TextStyle(
      color: Colors.white,
      fontSize: 32,
      fontWeight: FontWeight.bold,
    ),
  ),
),


                          SizedBox(height: 20),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              _buildBalanceItem(
                                "Income",
                                monthlyStats['income']?.toDouble() ?? 0,
                                Icons.arrow_upward,
                                Colors.green,
                              ),
                              _buildBalanceItem(
                                "Expenses",
                                monthlyStats['expenses']?.toDouble() ?? 0,
                                Icons.arrow_downward,
                                Colors.red,
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),

                    // Period Selection
                    Container(
                      margin: EdgeInsets.symmetric(horizontal: 16),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          for (var period in ['Today', 'Weekly', 'Monthly'])
                            FilterChip(
                              label: Text(period),
                              selected: selectedPeriod == period,
                              onSelected: (selected) {
                                if (selected) {
                                  setState(() {
                                    selectedPeriod = period;
                                  });
                                  _loadDashboardData();
                                }
                              },
                              selectedColor: Colors.deepPurple.withOpacity(0.2),
                              checkmarkColor: Colors.deepPurple,
                            ),
                        ],
                      ),
                    ),

                    // Expenses List
                    Container(
                      margin: EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 10,
                            offset: Offset(0, 5),
                          ),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Padding(
                            padding: EdgeInsets.all(16),
                            child: Text(
                              "$selectedPeriod Expenses",
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          if (errorMessage.isNotEmpty)
                            Center(
                              child: Padding(
                                padding: EdgeInsets.all(16),
                                child: Column(
                                  children: [
                                    Icon(
                                      Icons.error_outline,
                                      size: 48,
                                      color: Colors.red,
                                    ),
                                    SizedBox(height: 16),
                                    Text(
                                      errorMessage,
                                      style: TextStyle(
                                        color: Colors.red,
                                        fontSize: 16,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                    SizedBox(height: 16),
                                    ElevatedButton(
                                      onPressed: _loadDashboardData,
                                      child: Text('Retry'),
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors.deepPurple,
                                        foregroundColor: Colors.white,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            )
                          else if (expenses.isEmpty)
                            Center(
                              child: Padding(
                                padding: EdgeInsets.all(32),
                                child: Column(
                                  children: [
                                    Icon(
                                      Icons.receipt_long_outlined,
                                      size: 48,
                                      color: Colors.grey,
                                    ),
                                    SizedBox(height: 16),
                                    Text(
                                      'No expenses found for this period',
                                      style: TextStyle(
                                        color: Colors.grey,
                                        fontSize: 16,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            )
                          else
                            ListView.separated(
  shrinkWrap: true,
  physics: NeverScrollableScrollPhysics(),
  itemCount: expenses.length,
  separatorBuilder: (context, index) => Divider(height: 1),
  itemBuilder: (context, index) {
    final expense = expenses[index];
    final amount = double.parse(expense['amount'].toString());
    final isIncome = expense['category'].toString().toLowerCase() == 'income';
    final expenseId = expense['_id'] ?? ''; // assumes MongoDB _id is returned

    return Dismissible(
      key: Key(expenseId),
      direction: DismissDirection.endToStart,
      background: Container(
        color: Colors.red,
        alignment: Alignment.centerRight,
        padding: EdgeInsets.symmetric(horizontal: 20),
        child: Icon(Icons.delete, color: Colors.white),
      ),
      confirmDismiss: (direction) async {
        return await showDialog(
          context: context,
          builder: (ctx) => AlertDialog(
            title: Text('Delete Entry'),
            content: Text('Are you sure you want to delete this entry?'),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(ctx).pop(false),
                child: Text('Cancel'),
              ),
              TextButton(
                onPressed: () => Navigator.of(ctx).pop(true),
                child: Text('Delete'),
              ),
            ],
          ),
        );
      },
      onDismissed: (direction) async {
        final success = await ExpenseService.deleteExpense(expenseId);
        if (success) {
          setState(() {
            expenses.removeAt(index);
          });
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Entry deleted'), backgroundColor: Colors.red),
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Failed to delete'), backgroundColor: Colors.grey),
          );
        }
      },
      child: ExpenseItem(
        title: expense['category'] ?? 'Unknown',
        subtitle: expense['description'] ?? 'No description',
        amount: currencyFormat.format(amount),
        date: DateTime.parse(expense['date']),
        isExpense: !isIncome,
      ),
    );
  },
),

                        ],
                      ),
                    ),
                  ],
                ),
              ),
      ),
    );
  }

  Widget _buildBalanceItem(String title, double amount, IconData icon, Color color) {
    return Row(
      children: [
        Container(
          padding: EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: Colors.white24,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Icon(icon, color: color, size: 20),
        ),
        SizedBox(width: 8),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: TextStyle(
                color: Colors.white70,
                fontSize: 14,
              ),
            ),
            Text(
              currencyFormat.format(amount),
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class ExpenseItem extends StatelessWidget {
  final String title;
  final String subtitle;
  final String amount;
  final DateTime date;
  final bool isExpense;

  const ExpenseItem({
    super.key,
    required this.title,
    required this.subtitle,
    required this.amount,
    required this.date,
    required this.isExpense,
  });

  IconData _getCategoryIcon(String category) {
    switch (category.toLowerCase()) {
      case 'shopping':
        return Icons.shopping_bag;
      case 'food':
        return Icons.restaurant;
      case 'bill & utility':
        return Icons.receipt;
      case 'entertainment':
        return Icons.movie;
      case 'travel':
        return Icons.directions_car;
      case 'health':
        return Icons.medical_services;
      case 'income':
        return Icons.account_balance_wallet;
      default:
        return Icons.attach_money;
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      leading: Container(
        padding: EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: (isExpense ? Colors.red : Colors.green).withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(
          _getCategoryIcon(title),
          color: isExpense ? Colors.red : Colors.green,
        ),
      ),
      title: Text(
        title,
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 16,
        ),
      ),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(subtitle),
          Text(
            DateFormat('MMM d, y').format(date),
            style: TextStyle(
              color: Colors.grey,
              fontSize: 12,
            ),
          ),
        ],
      ),
      trailing: Text(
        isExpense ? "- $amount" : "+ $amount",
        style: TextStyle(
          fontWeight: FontWeight.bold,
          color: isExpense ? Colors.red : Colors.green,
          fontSize: 16,
        ),
      ),
    );
    
  }
}
