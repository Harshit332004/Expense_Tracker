import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/expense_service.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({Key? key}) : super(key: key);

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
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
      setState(() {
        _ipController.text = savedIP;
      });
    }
  }

  Future<void> _saveIP() async {
    if (_formKey.currentState!.validate()) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(ExpenseService.IP_KEY, _ipController.text);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('IP address saved successfully')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: _ipController,
                decoration: const InputDecoration(
                  labelText: 'Server IP Address',
                  hintText: 'Enter server IP address',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter an IP address';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: _saveIP,
                child: const Text('Save'),
              ),
            ],
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