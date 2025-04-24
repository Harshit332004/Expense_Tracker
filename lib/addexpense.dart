import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'dart:typed_data';
import 'services/expense_service.dart';

void main() {
  runApp(ExpenseTrackerApp());
}

class ExpenseTrackerApp extends StatelessWidget {
  const ExpenseTrackerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: AddExpenseScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class AddExpenseScreen extends StatefulWidget {
  const AddExpenseScreen({super.key});

  @override
  AddExpenseScreenState createState() => AddExpenseScreenState();
}

class AddExpenseScreenState extends State<AddExpenseScreen> {
  final TextEditingController optionalController = TextEditingController();
  final TextEditingController priceController = TextEditingController();

  DateTime selectedDate = DateTime.now();
  String selectedCategory = "Bill & Utility";
  File? receiptImage;
  Uint8List? webImage;

  List<String> categories = [
    "Shopping",
    "Food",
    "Entertainment",
    "Travel",
    "Health",
    "Bill & Utility",
    "Others"
  ];

  bool isLoading = false;

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime(2000),
      lastDate: DateTime(2101),
    );
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
      });
    }
  }

  Future<void> _pickImage() async {
    final pickedFile = await ImagePicker().pickImage(
      source: ImageSource.gallery,
      imageQuality: 70,
      maxWidth: 1024,
      maxHeight: 1024,
    );

    if (pickedFile != null) {
      String ext = pickedFile.path.split('.').last.toLowerCase();
      if (!['jpg', 'jpeg', 'png', 'gif'].contains(ext)) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Please select a JPG, PNG, or GIF image')),
          );
        }
        return;
      }

      if (kIsWeb) {
        var bytes = await pickedFile.readAsBytes();
        setState(() {
          webImage = bytes;
        });
      } else {
        setState(() {
          receiptImage = File(pickedFile.path);
        });
      }
    }
  }

  Future<void> _saveExpense() async {
    if (priceController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Please enter the price')),
      );
      return;
    }

    setState(() {
      isLoading = true;
    });

    try {
      final data = {
        "date": selectedDate.toIso8601String(),
        "category": selectedCategory,
        "description": optionalController.text.isNotEmpty
            ? optionalController.text
            : "No description",
        "amount": double.tryParse(priceController.text) ?? 0.0,
      };

      String result = await ExpenseService.addExpense(
        data,
        receiptImage: receiptImage,
        webImage: webImage,
      );

      if (mounted) {
        setState(() {
          isLoading = false;
        });

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(result)),
        );

        if (result == "Data Inserted Successfully") {
          optionalController.clear();
          priceController.clear();
          setState(() {
            selectedDate = DateTime.now();
            selectedCategory = "Bill & Utility";
            receiptImage = null;
            webImage = null;
          });
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          isLoading = false;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${e.toString()}')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Add New Expense")),
      body: Stack(
        children: [
          Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () => _selectDate(context),
                        child: Text("${selectedDate.toLocal()}".split(' ')[0]),
                      ),
                    ),
                    SizedBox(width: 10),
                    Icon(Icons.calendar_today),
                  ],
                ),
                SizedBox(height: 10),
                DropdownButtonFormField(
                  value: selectedCategory,
                  items: categories.map((category) {
                    return DropdownMenuItem(
                      value: category,
                      child: Text(category),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      selectedCategory = value.toString();
                    });
                  },
                  decoration: InputDecoration(border: OutlineInputBorder()),
                ),
                SizedBox(height: 10),
                TextField(
                  controller: optionalController,
                  decoration: InputDecoration(labelText: "Description"),
                  keyboardType: TextInputType.name,
                ),
                SizedBox(height: 5),
                TextField(
                  controller: priceController,
                  decoration:
                      InputDecoration(labelText: "Price/cost of spending"),
                  keyboardType: TextInputType.number,
                ),
                SizedBox(height: 10),
                Text("Expense receipt image"),
                SizedBox(height: 10),
                GestureDetector(
                  onTap: _pickImage,
                  child: Container(
                    height: 100,
                    width: 100,
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.grey),
                    ),
                    child: receiptImage == null && webImage == null
                        ? Icon(Icons.add, size: 40)
                        : kIsWeb
                            ? webImage != null
                                ? Image.memory(webImage!, fit: BoxFit.cover)
                                : Icon(Icons.add, size: 40)
                            : Image.file(receiptImage!, fit: BoxFit.cover),
                  ),
                ),
                Spacer(),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.red),
                        child: Text("Cancel"),
                      ),
                    ),
                    SizedBox(width: 10),
                    Expanded(
                      child: ElevatedButton(
                        onPressed: _saveExpense,
                        child: Text("Save"),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          if (isLoading)
            Container(
              color: Colors.black.withOpacity(0.3),
              child: Center(
                child: CircularProgressIndicator(),
              ),
            ),
        ],
      ),
    );
  }
}
