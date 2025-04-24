import 'expense.dart';

class DashboardData {
  final double totalExpenses;
  final double monthlyExpenses;
  final double weeklyExpenses;
  final List<Expense> recentExpenses;
  final Map<String, double> categoryExpenses;

  DashboardData({
    required this.totalExpenses,
    required this.monthlyExpenses,
    required this.weeklyExpenses,
    required this.recentExpenses,
    required this.categoryExpenses,
  });
} 