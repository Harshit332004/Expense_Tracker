import 'package:flutter/material.dart';
import '../services/voice_assistant_service.dart';

class VoiceAssistantWidget extends StatefulWidget {
  final Function()? onNavigateToDashboard;
  final Function()? onNavigateToAddExpense;
  final Function()? onNavigateToIncome;
  final Function()? onNavigateToAnalytics;
  final Function()? onNavigateToSettings;
  final Function(String)? onAddExpense;
  final Function(String)? onAddIncome;
  final Function()? onReadBalance;
  final Function()? onReadMonthlyStats;

  const VoiceAssistantWidget({
    Key? key,
    this.onNavigateToDashboard,
    this.onNavigateToAddExpense,
    this.onNavigateToIncome,
    this.onNavigateToAnalytics,
    this.onNavigateToSettings,
    this.onAddExpense,
    this.onAddIncome,
    this.onReadBalance,
    this.onReadMonthlyStats,
  }) : super(key: key);

  @override
  State<VoiceAssistantWidget> createState() => _VoiceAssistantWidgetState();
}

class _VoiceAssistantWidgetState extends State<VoiceAssistantWidget>
    with TickerProviderStateMixin {
  final VoiceAssistantService _voiceService = VoiceAssistantService();
  late AnimationController _pulseController;
  late Animation<double> _pulseAnimation;
  bool _isListening = false;
  bool _showTranscript = false;
  String _currentTranscript = '';

  @override
  void initState() {
    super.initState();
    _initializeVoiceService();
    _setupAnimations();
  }

  void _setupAnimations() {
    _pulseController = AnimationController(
      duration: const Duration(seconds: 2),
      vsync: this,
    );
    _pulseAnimation = Tween<double>(
      begin: 1.0,
      end: 1.2,
    ).animate(CurvedAnimation(
      parent: _pulseController,
      curve: Curves.easeInOut,
    ));
  }

  Future<void> _initializeVoiceService() async {
    await _voiceService.initialize();
    
    // Set up callbacks
    _voiceService.onNavigateToDashboard = widget.onNavigateToDashboard;
    _voiceService.onNavigateToAddExpense = widget.onNavigateToAddExpense;
    _voiceService.onNavigateToIncome = widget.onNavigateToIncome;
    _voiceService.onNavigateToAnalytics = widget.onNavigateToAnalytics;
    _voiceService.onNavigateToSettings = widget.onNavigateToSettings;
    _voiceService.onAddExpense = widget.onAddExpense;
    _voiceService.onAddIncome = widget.onAddIncome;
    _voiceService.onReadBalance = widget.onReadBalance;
    _voiceService.onReadMonthlyStats = widget.onReadMonthlyStats;
  }

  Future<void> _toggleVoiceAssistant() async {
    if (_isListening) {
      await _voiceService.stopListening();
      setState(() {
        _isListening = false;
        _showTranscript = false;
      });
      _pulseController.stop();
    } else {
      await _voiceService.startListening();
      setState(() {
        _isListening = true;
        _showTranscript = true;
      });
      _pulseController.repeat(reverse: true);
      
      // Auto-hide transcript after 5 seconds
      Future.delayed(const Duration(seconds: 5), () {
        if (mounted) {
          setState(() {
            _showTranscript = false;
          });
        }
      });
    }
  }

  @override
  void dispose() {
    _pulseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // Voice Assistant Button
        Positioned(
          bottom: 20,
          right: 20,
          child: Column(
            children: [
              // Transcript Display
              if (_showTranscript)
                Container(
                  margin: const EdgeInsets.only(bottom: 10),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 10,
                        offset: const Offset(0, 5),
                      ),
                    ],
                  ),
                  child: Column(
                    children: [
                      Text(
                        _isListening ? 'Listening...' : 'Voice Assistant',
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        _currentTranscript.isEmpty 
                            ? 'Say something like "navigate to dashboard" or "read balance"'
                            : _currentTranscript,
                        style: TextStyle(
                          fontSize: 12,
                          color: _currentTranscript.isEmpty 
                              ? Colors.grey[600] 
                              : Colors.black87,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ],
                  ),
                ),
              
              // Voice Button
              GestureDetector(
                onTap: _toggleVoiceAssistant,
                child: AnimatedBuilder(
                  animation: _pulseAnimation,
                  builder: (context, child) {
                    return Transform.scale(
                      scale: _isListening ? _pulseAnimation.value : 1.0,
                      child: Container(
                        width: 70,
                        height: 70,
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: _isListening
                                ? [Colors.red, Colors.orange]
                                : [Colors.blue, Colors.purple],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(35),
                          boxShadow: [
                            BoxShadow(
                              color: (_isListening ? Colors.red : Colors.blue)
                                  .withOpacity(0.3),
                              blurRadius: 15,
                              offset: const Offset(0, 8),
                            ),
                          ],
                        ),
                        child: Icon(
                          _isListening ? Icons.mic : Icons.mic_none,
                          color: Colors.white,
                          size: 30,
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
