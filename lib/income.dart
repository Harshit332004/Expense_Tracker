import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:intl/intl.dart';
import 'services/expense_service.dart'; // <-- Added this import

class IncomeScreen extends StatefulWidget {
  @override
  _IncomeScreenState createState() => _IncomeScreenState();
}

class _IncomeScreenState extends State<IncomeScreen> {
  final TextEditingController incomeController = TextEditingController();
  final TextEditingController emiController = TextEditingController();
  final TextEditingController rentController = TextEditingController();
  final TextEditingController investmentController = TextEditingController();
  final TextEditingController othersController = TextEditingController();

  int balance = 0;
  String errorMessage = "";
  bool isLoading = false;

  void calculateBalance() {
    setState(() {
      int income = int.tryParse(incomeController.text) ?? 0;
      int emi = int.tryParse(emiController.text) ?? 0;
      int rent = int.tryParse(rentController.text) ?? 0;
      int investment = int.tryParse(investmentController.text) ?? 0;
      int others = int.tryParse(othersController.text) ?? 0;

      balance = income - (emi + rent + investment + others);

      if (balance < 0) {
        errorMessage = "IMAGINE BEING THIS BROKE";
      } else {
        errorMessage = "";
      }
    });
  }

Future<void> saveIncome() async {
  if (incomeController.text.isEmpty) {
    setState(() {
      errorMessage = "Income cannot be empty";
    });
    return;
  }

  setState(() {
    isLoading = true;
  });

  final requestBody = {
    'income': incomeController.text,
    'emi': emiController.text.isEmpty ? '0' : emiController.text,
    'rent': rentController.text.isEmpty ? '0' : rentController.text,
    'investment': investmentController.text.isEmpty ? '0' : investmentController.text,
    'others': othersController.text.isEmpty ? '0' : othersController.text,
    'date': DateTime.now().toIso8601String(),
  };

  final result = await ExpenseService.addIncome(requestBody);

  setState(() {
    isLoading = false;
  });

  if (result == "success") {
    Navigator.pop(context, balance);
  } else {
    setState(() {
      errorMessage = result;
    });
  }
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      appBar: AppBar(
        title: Text("Income"),
        actions: [
          IconButton(
            icon: Icon(Icons.save),
            onPressed: saveIncome,
          ),
        ],
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextField(
                  controller: incomeController,
                  decoration: InputDecoration(labelText: "Income Amount"),
                  keyboardType: TextInputType.number,
                  onChanged: (value) => calculateBalance(),
                ),
                Text("Enter your fixed Reductions", style: TextStyle(color: Colors.black54)),
                SizedBox(height: 10),
                TextField(
                  controller: emiController,
                  decoration: InputDecoration(labelText: "EMI (0 if none)"),
                  keyboardType: TextInputType.number,
                  onChanged: (value) => calculateBalance(),
                ),
                TextField(
                  controller: rentController,
                  decoration: InputDecoration(labelText: "Rent (0 if none)"),
                  keyboardType: TextInputType.number,
                  onChanged: (value) => calculateBalance(),
                ),
                TextField(
                  controller: investmentController,
                  decoration: InputDecoration(labelText: "Investment (0 if none)"),
                  keyboardType: TextInputType.number,
                  onChanged: (value) => calculateBalance(),
                ),
                Text("SUM of Any unmentioned Reductions", style: TextStyle(color: Colors.black54)),
                TextField(
                  controller: othersController,
                  decoration: InputDecoration(labelText: "Others (0 if none)"),
                  keyboardType: TextInputType.number,
                  onChanged: (value) => calculateBalance(),
                ),
                SizedBox(height: 20),
                Text("BALANCE:", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                Text(balance.toString(), style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),

                if (errorMessage.isNotEmpty)
                  Text(errorMessage, style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          if (isLoading)
            Center(
              child: CircularProgressIndicator(),
            ),
        ],
      ),
    );
  }
}
