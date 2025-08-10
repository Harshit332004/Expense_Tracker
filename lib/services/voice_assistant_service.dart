import 'dart:convert';
import 'package:speech_to_text/speech_to_text.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'expense_service.dart';

class VoiceAssistantService {
  static final VoiceAssistantService _instance = VoiceAssistantService._internal();
  factory VoiceAssistantService() => _instance;
  VoiceAssistantService._internal();

  final SpeechToText _speechToText = SpeechToText();
  final FlutterTts _flutterTts = FlutterTts();
  bool _isListening = false;
  bool _isInitialized = false;
  String _currentTranscript = '';
  
  // Callback functions for different voice commands
  Function()? onNavigateToDashboard;
  Function()? onNavigateToAddExpense;
  Function()? onNavigateToIncome;
  Function()? onNavigateToAnalytics;
  Function()? onNavigateToSettings;
  Function(String)? onAddExpense;
  Function(String)? onAddIncome;
  Function()? onReadBalance;
  Function()? onReadMonthlyStats;

  Future<void> initialize() async {
    if (_isInitialized) return;
    
    try {
      // Initialize speech recognition
      bool available = await _speechToText.initialize(
        onError: (error) => print('Speech recognition error: $error'),
        onStatus: (status) => print('Speech recognition status: $status'),
      );
      
      if (available) {
        // Initialize text-to-speech
        await _flutterTts.setLanguage("en-US");
        await _flutterTts.setSpeechRate(0.5);
        await _flutterTts.setVolume(1.0);
        await _flutterTts.setPitch(1.0);
        
        _isInitialized = true;
        print('Voice assistant initialized successfully');
      } else {
        print('Speech recognition not available');
      }
    } catch (e) {
      print('Error initializing voice assistant: $e');
    }
  }

  Future<void> startListening() async {
    if (!_isInitialized) {
      await initialize();
    }
    
    if (_isListening) return;
    
    try {
      _isListening = true;
      _currentTranscript = '';
      
      await _speechToText.listen(
        onResult: (result) {
          if (result.finalResult) {
            _currentTranscript = result.recognizedWords;
            _processVoiceCommand(_currentTranscript);
          }
        },
        listenFor: Duration(seconds: 10),
        pauseFor: Duration(seconds: 3),
        partialResults: true,
        localeId: 'en_US',
      );
    } catch (e) {
      print('Error starting speech recognition: $e');
      _isListening = false;
    }
  }

  Future<void> stopListening() async {
    if (!_isListening) return;
    
    try {
      await _speechToText.stop();
      _isListening = false;
    } catch (e) {
      print('Error stopping speech recognition: $e');
    }
  }

  void _processVoiceCommand(String command) {
    final lowerCommand = command.toLowerCase().trim();
    print('Processing voice command: $lowerCommand');
    
    // Navigation commands
    if (lowerCommand.contains('dashboard') || lowerCommand.contains('home')) {
      _speakResponse('Navigating to dashboard');
      onNavigateToDashboard?.call();
    } else if (lowerCommand.contains('add expense') || lowerCommand.contains('expense')) {
      _speakResponse('Opening add expense page');
      onNavigateToAddExpense?.call();
    } else if (lowerCommand.contains('income') || lowerCommand.contains('add income')) {
      _speakResponse('Opening income page');
      onNavigateToIncome?.call();
    } else if (lowerCommand.contains('analytics') || lowerCommand.contains('charts')) {
      _speakResponse('Opening analytics page');
      onNavigateToAnalytics?.call();
    } else if (lowerCommand.contains('settings')) {
      _speakResponse('Opening settings page');
      onNavigateToSettings?.call();
    }
    // Action commands
    else if (lowerCommand.contains('read balance') || lowerCommand.contains('balance')) {
      onReadBalance?.call();
    } else if (lowerCommand.contains('monthly stats') || lowerCommand.contains('stats')) {
      onReadMonthlyStats?.call();
    } else if (lowerCommand.contains('add expense')) {
      // Extract amount and description from command
      _extractExpenseFromCommand(command);
    } else if (lowerCommand.contains('add income')) {
      // Extract amount and description from command
      _extractIncomeFromCommand(command);
    } else {
      // Send to AI for processing
      _processWithAI(command);
    }
  }

  void _extractExpenseFromCommand(String command) {
    // Simple regex to extract amount and description
    final amountRegex = RegExp(r'(\d+(?:\.\d{2})?)');
    final amountMatch = amountRegex.firstMatch(command);
    
    if (amountMatch != null) {
      final amount = double.tryParse(amountMatch.group(1) ?? '0');
      final description = command.replaceAll(RegExp(r'\d+(?:\.\d{2})?'), '').trim();
      
      if (amount != null && description.isNotEmpty) {
        _speakResponse('Adding expense: $description for \$${amount.toStringAsFixed(2)}');
        onAddExpense?.call('$description|$amount');
      }
    }
  }

  void _extractIncomeFromCommand(String command) {
    // Simple regex to extract amount and description
    final amountRegex = RegExp(r'(\d+(?:\.\d{2})?)');
    final amountMatch = amountRegex.firstMatch(command);
    
    if (amountMatch != null) {
      final amount = double.tryParse(amountMatch.group(1) ?? '0');
      final description = command.replaceAll(RegExp(r'\d+(?:\.\d{2})?'), '').trim();
      
      if (amount != null && description.isNotEmpty) {
        _speakResponse('Adding income: $description for \$${amount.toStringAsFixed(2)}');
        onAddIncome?.call('$description|$amount');
      }
    }
  }

  Future<void> _processWithAI(String command) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final baseUrl = prefs.getString(ExpenseService.IP_KEY) ?? 'http://localhost:3000';
      
      final response = await http.post(
        Uri.parse('$baseUrl/api/ai/process-command'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({'command': command}),
      );
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final aiResponse = data['response'] ?? 'I understood your command but need more information';
        _speakResponse(aiResponse);
      } else {
        _speakResponse('Sorry, I had trouble processing that command');
      }
    } catch (e) {
      print('Error processing with AI: $e');
      _speakResponse('Sorry, I encountered an error processing your command');
    }
  }

  Future<void> _speakResponse(String text) async {
    try {
      await _flutterTts.speak(text);
    } catch (e) {
      print('Error speaking response: $e');
    }
  }

  Future<void> speakBalance(double balance) async {
    await _speakResponse('Your current balance is \$${balance.toStringAsFixed(2)}');
  }

  Future<void> speakMonthlyStats(Map<String, dynamic> stats) async {
    final expenses = stats['expenses'] ?? 0.0;
    final income = stats['income'] ?? 0.0;
    final balance = stats['balance'] ?? 0.0;
    
    await _speakResponse(
      'This month you have expenses of \$${expenses.toStringAsFixed(2)}, '
      'income of \$${income.toStringAsFixed(2)}, '
      'and a balance of \$${balance.toStringAsFixed(2)}'
    );
  }

  bool get isListening => _isListening;
  bool get isInitialized => _isInitialized;
}
