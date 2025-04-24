// import 'package:flutter/material.dart';
// import 'package:fl_chart/fl_chart.dart';
// import '../services/expense_service.dart';
// import '../models/dashboard_data.dart';
// import 'settings_screen.dart';

// class DashboardScreen extends StatefulWidget {
//   const DashboardScreen({Key? key}) : super(key: key);

//   @override
//   State<DashboardScreen> createState() => _DashboardScreenState();
// }

// class _DashboardScreenState extends State<DashboardScreen> {
//   final ExpenseService _expenseService = ExpenseService();
//   bool _isLoading = true;
//   String _errorMessage = '';
//   DashboardData? _dashboardData;
//   final _refreshKey = GlobalKey<RefreshIndicatorState>();

//   @override
//   void initState() {
//     super.initState();
//     _loadDashboardData();
//   }

//   Future<void> _loadDashboardData() async {
//     if (!mounted) return;
//     setState(() {
//       _isLoading = true;
//       _errorMessage = '';
//     });

//     try {
//       final data = await ExpenseService.getDashboardData();
//       if (!mounted) return;
//       setState(() {
//         _dashboardData = data;
//         _isLoading = false;
//       });
//     } catch (e) {
//       if (!mounted) return;
//       setState(() {
//         _errorMessage = e.toString();
//         _isLoading = false;
//       });
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Dashboard'),
//         actions: [
//           IconButton(
//             icon: const Icon(Icons.settings),
//             onPressed: () {
//               Navigator.push(
//                 context,
//                 MaterialPageRoute(
//                   builder: (context) => const SettingsScreen(),
//                 ),
//               );
//             },
//           ),
//         ],
//       ),
//       body: _isLoading
//           ? const Center(child: CircularProgressIndicator())
//           : _errorMessage.isNotEmpty
//               ? Center(
//                   child: Column(
//                     mainAxisAlignment: MainAxisAlignment.center,
//                     children: [
//                       Text(_errorMessage),
//                       const SizedBox(height: 16),
//                       ElevatedButton(
//                         onPressed: _loadDashboardData,
//                         child: const Text('Retry'),
//                       ),
//                     ],
//                   ),
//                 )
//               : RefreshIndicator(
//                   key: _refreshKey,
//                   onRefresh: _loadDashboardData,
//                   child: SingleChildScrollView(
//                     physics: const AlwaysScrollableScrollPhysics(),
//                     child: Padding(
//                       padding: const EdgeInsets.all(16.0),
//                       child: Column(
//                         crossAxisAlignment: CrossAxisAlignment.start,
//                         children: [
//                           _buildSummaryCard(),
//                           const SizedBox(height: 16),
//                           _buildExpenseChart(),
//                           const SizedBox(height: 16),
//                           _buildRecentExpenses(),
//                         ],
//                       ),
//                     ),
//                   ),
//                 ),
//     );
//   }

//   Widget _buildSummaryCard() {
//     return Card(
//       child: Padding(
//         padding: const EdgeInsets.all(16.0),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             const Text(
//               'Monthly Summary',
//               style: TextStyle(
//                 fontSize: 18,
//                 fontWeight: FontWeight.bold,
//               ),
//             ),
//             const SizedBox(height: 16),
//             Row(
//               mainAxisAlignment: MainAxisAlignment.spaceBetween,
//               children: [
//                 _buildSummaryItem(
//                   'Total Expenses',
//                   '\$${_dashboardData?.totalExpenses.toStringAsFixed(2) ?? '0.00'}',
//                   Icons.money_off,
//                 ),
//                 _buildSummaryItem(
//                   'Average Daily',
//                   '\$${_dashboardData?.averageDailyExpense.toStringAsFixed(2) ?? '0.00'}',
//                   Icons.trending_up,
//                 ),
//               ],
//             ),
//           ],
//         ),
//       ),
//     );
//   }

//   Widget _buildSummaryItem(String label, String value, IconData icon) {
//     return Column(
//       children: [
//         Icon(icon, size: 32),
//         const SizedBox(height: 8),
//         Text(
//           label,
//           style: const TextStyle(fontSize: 12),
//         ),
//         Text(
//           value,
//           style: const TextStyle(
//             fontSize: 16,
//             fontWeight: FontWeight.bold,
//           ),
//         ),
//       ],
//     );
//   }

//   Widget _buildExpenseChart() {
//     return Card(
//       child: Padding(
//         padding: const EdgeInsets.all(16.0),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             const Text(
//               'Expense Trend',
//               style: TextStyle(
//                 fontSize: 18,
//                 fontWeight: FontWeight.bold,
//               ),
//             ),
//             const SizedBox(height: 16),
//             SizedBox(
//               height: 200,
//               child: _dashboardData?.expenseTrend != null
//                   ? LineChart(
//                       LineChartData(
//                         gridData: const FlGridData(show: false),
//                         titlesData: const FlTitlesData(show: false),
//                         borderData: FlBorderData(show: false),
//                         lineBarsData: [
//                           LineChartBarData(
//                             spots: _dashboardData!.expenseTrend!
//                                 .asMap()
//                                 .entries
//                                 .map((e) => FlSpot(e.key.toDouble(), e.value))
//                                 .toList(),
//                             isCurved: true,
//                             color: Theme.of(context).primaryColor,
//                             barWidth: 2,
//                             isStrokeCapRound: true,
//                             dotData: const FlDotData(show: false),
//                             belowBarData: BarAreaData(show: false),
//                           ),
//                         ],
//                       ),
//                     )
//                   : const Center(child: Text('No data available')),
//             ),
//           ],
//         ),
//       ),
//     );
//   }

//   Widget _buildRecentExpenses() {
//     return Card(
//       child: Padding(
//         padding: const EdgeInsets.all(16.0),
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             const Text(
//               'Recent Expenses',
//               style: TextStyle(
//                 fontSize: 18,
//                 fontWeight: FontWeight.bold,
//               ),
//             ),
//             const SizedBox(height: 16),
//             if (_dashboardData?.recentExpenses != null &&
//                 _dashboardData!.recentExpenses!.isNotEmpty)
//               ..._dashboardData!.recentExpenses!.map((expense) => ListTile(
//                     leading: const Icon(Icons.money_off),
//                     title: Text(expense.description),
//                     subtitle: Text(
//                       '${expense.amount.toStringAsFixed(2)} - ${expense.date}',
//                     ),
//                     trailing: Text(
//                       expense.category,
//                       style: TextStyle(
//                         color: Theme.of(context).primaryColor,
//                         fontWeight: FontWeight.bold,
//                       ),
//                     ),
//                   ))
//             else
//               const Center(child: Text('No recent expenses')),
//           ],
//         ),
//       ),
//     );
//   }
// } 