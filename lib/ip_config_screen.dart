import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'services/expense_service.dart';
import 'main.dart';

class IPConfigScreen extends StatefulWidget {
  const IPConfigScreen({Key? key}) : super(key: key);

  @override
  _IPConfigScreenState createState() => _IPConfigScreenState();
}

class _IPConfigScreenState extends State<IPConfigScreen> {
  final _ipController = TextEditingController();
  final _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    _loadSavedIP();
  }

  Future<void> _loadSavedIP() async {
    final prefs = await SharedPreferences.getInstance();
    final savedIP = prefs.getString(ExpenseService.IP_KEY);
    if (savedIP != null) {
      _ipController.text = savedIP;
    }
  }

  Future<void> _saveIP(String ip) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(ExpenseService.IP_KEY, ip);
  }

  String? _validateIP(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter an IP address';
    }
    final ipRegex = RegExp(
      r'^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
    );
    if (!ipRegex.hasMatch(value)) {
      return 'Please enter a valid IP address';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Welcome to Expense Tracker',
                  style: Theme.of(context).textTheme.headlineMedium,
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: 20),
                Text(
                  'Please enter your server IP address',
                  style: Theme.of(context).textTheme.bodyLarge,
                  textAlign: TextAlign.center,
                ),
                SizedBox(height: 40),
                TextFormField(
                  controller: _ipController,
                  decoration: InputDecoration(
                    labelText: 'Server IP Address',
                    hintText: 'e.g., 192.168.1.100',
                    border: OutlineInputBorder(),
                  ),
                  validator: _validateIP,
                  keyboardType: TextInputType.number,
                ),
                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () async {
                    if (_formKey.currentState!.validate()) {
                      await _saveIP(_ipController.text);
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ExpenseTrackerHome(),
                        ),
                      );
                    }
                  },
                  child: Padding(
                    padding: const EdgeInsets.all(12.0),
                    child: Text('Continue'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _ipController.dispose();
    super.dispose();
  }
} 