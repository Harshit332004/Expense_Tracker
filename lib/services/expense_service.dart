
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'dart:io';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'dart:typed_data';
import 'dart:async';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mime/mime.dart'; // Add this import
import 'package:http_parser/http_parser.dart'; // Add this import

class ExpenseService {
  static const String IP_KEY = 'server_ip';
  static const int _port = 3000;
  static const Duration _timeout = Duration(seconds: 5);

  static Future<String> _getServerIP() async {
    final prefs = await SharedPreferences.getInstance();
    final ip = prefs.getString(IP_KEY);
    if (ip == null || ip.isEmpty) {
      throw Exception('Server IP not configured. Please set the IP address first.');
    }
    return ip;
  }

  static Future<Uri> _buildUri(String path) async {
    final host = await _getServerIP();
    final uri = Uri(
      scheme: 'http',
      host: host,
      port: _port,
      path: path,
    );
    print('Debug: Built URI: $uri');
    return uri;
  }

  static Future<bool> testConnection() async {
    try {
      final uri = await _buildUri('/');
      final response = await http.get(uri).timeout(_timeout);
      return response.statusCode == 200;
    } on TimeoutException {
      print('Debug: Connection test timed out after ${_timeout.inSeconds} seconds');
      return false;
    } on SocketException catch (e) {
      print('Debug: Connection test failed - SocketException: $e');
      return false;
    } catch (e) {
      print('Debug: Connection test failed: $e');
      return false;
    }
  }

 static Future<String> addExpense(Map<String, dynamic> expenseData, {File? receiptImage, Uint8List? webImage}) async {
  try {
    final uri = await _buildUri('/api/expenses/add');
    var request = http.MultipartRequest('POST', uri);
    request.headers.addAll({
      'Accept': 'application/json',
      'Connection': 'keep-alive',
    });

    // Set form fields for expense data
    request.fields['date'] = expenseData['date'];
    request.fields['category'] = expenseData['category'];
    request.fields['description'] = expenseData['description'];
    request.fields['amount'] = expenseData['amount'].toString();

    // Add image if available (handle web and mobile separately)
    if (kIsWeb && webImage != null) {
      request.files.add(
        http.MultipartFile.fromBytes(
          'receiptImage',
          webImage,
          filename: 'receipt-${DateTime.now().millisecondsSinceEpoch}.jpg',
        ),
      );
    } else if (!kIsWeb && receiptImage != null) {
      if (await receiptImage.exists()) {
        final mimeType = lookupMimeType(receiptImage.path) ?? 'image/jpeg';
        request.files.add(
          await http.MultipartFile.fromPath(
            'receiptImage',
            receiptImage.path,
            filename: 'receipt-${DateTime.now().millisecondsSinceEpoch}.jpg',
            contentType: MediaType.parse(mimeType),
          ),
        );
      } else {
        return "Error: Receipt image not found.";
      }
    }

    var streamedResponse = await request.send().timeout(_timeout);
    var response = await http.Response.fromStream(streamedResponse);

    if (response.statusCode == 201 || response.statusCode == 200) {
      return "Data Inserted Successfully";
    } else {
      return "Failed to add expense: ${response.body}";
    }

  } on TimeoutException catch (e) {
    return "Error: Connection timed out. Please check your internet connection and server status.";
  } on SocketException catch (e) {
    return "Error: Cannot connect to server. Please check your internet connection.";
  } on HttpException catch (e) {
    return "Error: HTTP error occurred. Please try again.";
  } on FormatException catch (e) {
    return "Error: Invalid response format from server.";
  } catch (e) {
    return "Error: ${e.toString()}";
  }
}


    static Future<bool> deleteExpense(String id) async {
    try {
      final uri = await _buildUri('/api/expenses/$id');
      final response = await http.delete(uri).timeout(_timeout);

      if (response.statusCode == 200) {
        print('Debug: Deleted expense $id successfully.');
        return true;
      } else {
        print('Debug: Failed to delete expense. Status: ${response.statusCode}');
        return false;
      }
    } catch (e) {
      print('Debug: Error deleting expense: $e');
      return false;
    }
  }

  static Future<String> addIncome(Map<String, dynamic> incomeData) async {
    try {
      final uri = await _buildUri('/api/income/add');
      print('Debug: Sending income data to $uri');
      print('Debug: Income data: $incomeData');

      final response = await http.post(
        uri,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(incomeData),
      ).timeout(_timeout);

      print('Debug: Response status: ${response.statusCode}');
      print('Debug: Response body: ${response.body}');

      if (response.statusCode == 201) {
        return "success";
      } else {
        return "Failed: ${response.body}";
      }
    } on TimeoutException catch (e) {
      return "Error: Request timed out.";
    } catch (e) {
      return "Error: $e";
    }
  }

  static Future<List<Map<String, dynamic>>> getExpenses() async {
    try {
      final uri = await _buildUri('/api/expenses');
      final response = await http.get(uri).timeout(_timeout);

      if (response.statusCode == 200) {
        try {
          List<dynamic> data = json.decode(response.body);
          return data.cast<Map<String, dynamic>>();
        } catch (e) {
          print('Debug: Error parsing expenses: $e');
          return [];
        }
      } else {
        print('Debug: Failed to load expenses. Status: ${response.statusCode}');
        return [];
      }
    } catch (e) {
      print("Debug: Error getting expenses: $e");
      return [];
    }
  }

  static Future<Map<String, dynamic>> getDashboardData() async {
    try {
      print('Debug: Fetching dashboard data...');
      
      // Test connection first with shorter timeout
      final isConnected = await testConnection();
      if (!isConnected) {
        throw Exception('Cannot connect to server. Please check:\n1. Server is running\n2. IP address is correct\n3. Both devices are on same network');
      }

      // If connected, proceed with API calls
      final expensesUri = await _buildUri('/api/expenses');
      print('Debug: Expenses URI: $expensesUri');
      
      final expensesResponse = await http.get(expensesUri).timeout(_timeout);
      print('Debug: Expenses response status: ${expensesResponse.statusCode}');
      print('Debug: Expenses response body: ${expensesResponse.body}');

      if (expensesResponse.statusCode != 200) {
        throw Exception('Server returned error: ${expensesResponse.statusCode}\nResponse: ${expensesResponse.body}');
      }

      final incomeUri = await _buildUri('/api/income/balance');
      print('Debug: Income URI: $incomeUri');
      
      final incomeResponse = await http.get(incomeUri).timeout(_timeout);
      print('Debug: Income response status: ${incomeResponse.statusCode}');
      print('Debug: Income response body: ${incomeResponse.body}');

      if (incomeResponse.statusCode != 200) {
        throw Exception('Server returned error: ${incomeResponse.statusCode}\nResponse: ${incomeResponse.body}');
      }

      if (expensesResponse.statusCode == 200 && incomeResponse.statusCode == 200) {
        try {
          final expenses = jsonDecode(expensesResponse.body);
          final incomeData = jsonDecode(incomeResponse.body);

          // Calculate totals from expenses
          double totalExpenses = 0;
          double totalIncome = 0;

          for (var expense in expenses) {
            if (expense['category']?.toString().toLowerCase() == 'income') {
              totalIncome += double.parse(expense['amount'].toString());
            } else {
              totalExpenses += double.parse(expense['amount'].toString());
            }
          }

          // Add income from income records
          totalIncome += (incomeData['totalIncome'] ?? 0).toDouble();
          totalExpenses += (incomeData['totalDeductions'] ?? 0).toDouble();

          final balance = totalIncome - totalExpenses;

          // Calculate monthly stats
          final now = DateTime.now();
          final thisMonthExpenses = expenses.where((expense) {
            final expenseDate = DateTime.parse(expense['date'].toString());
            return expenseDate.year == now.year && expenseDate.month == now.month;
          }).toList();

          double monthlyExpenses = 0;
          double monthlyIncome = 0;

          for (var expense in thisMonthExpenses) {
            if (expense['category']?.toString().toLowerCase() == 'income') {
              monthlyIncome += double.parse(expense['amount'].toString());
            } else {
              monthlyExpenses += double.parse(expense['amount'].toString());
            }
          }

          // Add monthly income from income records
          monthlyIncome += (incomeData['totalIncome'] ?? 0).toDouble();
          monthlyExpenses += (incomeData['totalDeductions'] ?? 0).toDouble();

          return {
            'balance': balance,
            'monthlyStats': {
              'expenses': monthlyExpenses,
              'income': monthlyIncome,
              'balance': monthlyIncome - monthlyExpenses,
              'month': now.month,
            },
          };
        } catch (e) {
          print('Debug: Error parsing dashboard data: $e');
          throw Exception('Error parsing server response. Please try again.');
        }
      } else {
        print('Debug: Error - Expenses status: ${expensesResponse.statusCode}, Income status: ${incomeResponse.statusCode}');
        throw Exception('Server returned error. Please try again.');
      }
    } catch (e) {
      print('Debug: Error in getDashboardData: $e');
      rethrow;
    }
  }

  static Future<List<Map<String, dynamic>>> getExpensesByPeriod(String period) async {
    try {
      final uri = await _buildUri('/api/expenses');
      print('Debug: Fetching expenses for period: $period');
      
      final response = await http.get(uri).timeout(_timeout);
      
      if (response.statusCode == 200) {
        List<dynamic> allExpenses = json.decode(response.body);
        
        // Filter expenses based on period
        DateTime now = DateTime.now();
        DateTime startDate;
        
        switch (period.toLowerCase()) {
          case 'today':
            startDate = DateTime(now.year, now.month, now.day);
            break;
          case 'weekly':
            startDate = now.subtract(Duration(days: 7));
            break;
          case 'monthly':
          default:
            startDate = DateTime(now.year, now.month, 1);
            break;
        }
        
        return allExpenses.where((expense) {
          DateTime expenseDate = DateTime.parse(expense['date']);
          return expenseDate.isAfter(startDate) || expenseDate.isAtSameMomentAs(startDate);
        }).cast<Map<String, dynamic>>().toList();
      } else {
        throw HttpException('Failed to load expenses');
      }
    } catch (e) {
      print('Debug: Error fetching expenses by period: $e');
      return [];
    }
  }
}



/*

import 'dart:convert';
import 'package:http/http.dart' as http;
import 'dart:io';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'dart:typed_data';
import 'dart:async';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mime/mime.dart';
import 'package:http_parser/http_parser.dart';

class ExpenseService {
  static const String IP_KEY = 'server_ip';
  static const int _port = 3000;
  static const Duration _timeout = Duration(seconds: 5);

  // Fetch server IP from SharedPreferences
  static Future<String> _getServerIP() async {
    final prefs = await SharedPreferences.getInstance();
    final ip = prefs.getString(IP_KEY);
    if (ip == null || ip.isEmpty) {
      throw Exception('Server IP not configured. Please set the IP address first.');
    }
    return ip;
  }

  // Build the complete URI dynamically using server IP
  static Future<Uri> _buildUri(String path) async {
    final host = await _getServerIP();  // Use the _getServerIP method to get the IP dynamically
    final uri = Uri(
      scheme: 'http',
      host: host,
      port: _port,
      path: path,
    );
    print('Debug: Built URI: $uri');
    return uri;
  }

  // Test the connection to the server
  static Future<bool> testConnection() async {
    try {
      final uri = await _buildUri('/');
      final response = await http.get(uri).timeout(_timeout);
      return response.statusCode == 200;
    } on TimeoutException {
      print('Debug: Connection test timed out after ${_timeout.inSeconds} seconds');
      return false;
    } on SocketException catch (e) {
      print('Debug: Connection test failed - SocketException: $e');
      return false;
    } catch (e) {
      print('Debug: Connection test failed: $e');
      return false;
    }
  }

  // Add expense to the server
  static Future<String> addExpense(Map<String, dynamic> expenseData, {File? receiptImage, Uint8List? webImage}) async {
    try {
      final uri = await _buildUri('/api/expenses/add');
      print('Debug: Starting expense addition process');
      print('Debug: Connecting to: $uri');
      print('Debug: Platform: ${kIsWeb ? 'Web' : 'Mobile'}');
      print('Debug: Expense data: $expenseData');

      var request = http.MultipartRequest('POST', uri);
      request.headers.addAll({
        'Accept': 'application/json',
        'Connection': 'keep-alive',
      });

      // Set form fields for expense data
      request.fields['date'] = expenseData['date'];
      request.fields['category'] = expenseData['category'];
      request.fields['description'] = expenseData['description'];
      request.fields['amount'] = expenseData['amount'].toString();

      print('Debug: Fields added: ${request.fields}');

      // Add image if available (handle web and mobile separately)
      if (kIsWeb && webImage != null) {
        print('Debug: Adding web image');
        request.files.add(
          http.MultipartFile.fromBytes(
            'receiptImage',
            webImage,
            filename: 'receipt-${DateTime.now().millisecondsSinceEpoch}.jpg',
          ),
        );
      } else if (!kIsWeb && receiptImage != null) {
        if (await receiptImage.exists()) {
          // Set the MIME type correctly for mobile images
          final mimeType = lookupMimeType(receiptImage.path) ?? 'image/jpeg';
          print('Debug: Adding mobile image from path: ${receiptImage.path}, MIME: $mimeType');
          request.files.add(
            await http.MultipartFile.fromPath(
              'receiptImage',
              receiptImage.path,
              filename: 'receipt-${DateTime.now().millisecondsSinceEpoch}.jpg',
              contentType: MediaType.parse(mimeType),
            ),
          );
        } else {
          print('Debug: Image file not found at path: ${receiptImage.path}');
          return "Error: Receipt image not found.";
        }
      }

      print('Debug: Sending request...');
      var streamedResponse = await request.send().timeout(
        _timeout,
        onTimeout: () {
          print('Debug: Request timed out after ${_timeout.inSeconds} seconds');
          throw TimeoutException('Connection timed out');
        },
      );

      print('Debug: Response received. Status: ${streamedResponse.statusCode}');
      var response = await http.Response.fromStream(streamedResponse);
      print('Debug: Response body: ${response.body}');

      if (response.statusCode == 201 || response.statusCode == 200) {
        return "Data Inserted Successfully";
      } else {
        return "Failed to add expense: ${response.body}";
      }

    } on TimeoutException catch (e) {
      print('Debug: TimeoutException: $e');
      return "Error: Connection timed out. Please check your internet connection and server status.";
    } on SocketException catch (e) {
      print('Debug: SocketException: $e');
      return "Error: Cannot connect to server. Please check your internet connection.";
    } on HttpException catch (e) {
      print('Debug: HttpException: $e');
      return "Error: HTTP error occurred. Please try again.";
    } on FormatException catch (e) {
      print('Debug: FormatException: $e');
      return "Error: Invalid response format from server.";
    } catch (e) {
      print('Debug: Unexpected error: $e');
      return "Error: ${e.toString()}";
    }
  }

  // Fetch expenses from the server
  static Future<List<Map<String, dynamic>>> getExpenses() async {
    try {
      final uri = await _buildUri('/api/expenses');
      final response = await http.get(uri).timeout(_timeout);

      if (response.statusCode == 200) {
        try {
          List<dynamic> data = json.decode(response.body);
          return data.cast<Map<String, dynamic>>();
        } catch (e) {
          print('Debug: Error parsing expenses: $e');
          return [];
        }
      } else {
        print('Debug: Failed to load expenses. Status: ${response.statusCode}');
        return [];
      }
    } catch (e) {
      print("Debug: Error getting expenses: $e");
      return [];
    }
  }

  // Other methods (like getDashboardData, deleteExpense, etc.) will follow the same pattern.

  
}

*/