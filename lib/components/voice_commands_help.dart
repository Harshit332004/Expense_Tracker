import 'package:flutter/material.dart';

class VoiceCommandsHelp extends StatelessWidget {
  const VoiceCommandsHelp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Voice Commands Help'),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSection(
              'Navigation Commands',
              [
                'Navigate to dashboard',
                'Go to add expense',
                'Open income page',
                'Show analytics',
                'Open settings',
              ],
              Icons.navigation,
              Colors.blue,
            ),
            const SizedBox(height: 20),
            _buildSection(
              'Action Commands',
              [
                'Read balance',
                'Read monthly stats',
                'Add expense [amount] [description]',
                'Add income [amount] [description]',
              ],
              Icons.mic,
              Colors.green,
            ),
            const SizedBox(height: 20),
            _buildSection(
              'Query Commands',
              [
                'How much did I spend this month?',
                'What\'s my current balance?',
                'Show me my income',
                'Give me financial advice',
              ],
              Icons.help,
              Colors.orange,
            ),
            const SizedBox(height: 20),
            _buildSection(
              'Tips for Best Results',
              [
                'Speak clearly and at a normal pace',
                'Use natural language (e.g., "navigate to dashboard")',
                'For amounts, say the number clearly (e.g., "fifty dollars")',
                'Wait for the voice confirmation before speaking again',
                'Make sure you\'re in a quiet environment',
              ],
              Icons.lightbulb,
              Colors.purple,
            ),
            const SizedBox(height: 30),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.deepPurple.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.deepPurple.withOpacity(0.3)),
              ),
              child: Column(
                children: [
                  Icon(
                    Icons.info,
                    color: Colors.deepPurple,
                    size: 32,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Voice Assistant Ready!',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.deepPurple,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Tap the floating microphone button to start using voice commands. The button will pulse red when listening.',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.deepPurple.shade700,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSection(String title, List<String> commands, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            blurRadius: 5,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, color: color, size: 24),
              const SizedBox(width: 8),
              Text(
                title,
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: color,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          ...commands.map((command) => Padding(
            padding: const EdgeInsets.symmetric(vertical: 4),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 6,
                  height: 6,
                  margin: const EdgeInsets.only(top: 8, right: 12),
                  decoration: BoxDecoration(
                    color: color,
                    shape: BoxShape.circle,
                  ),
                ),
                Expanded(
                  child: Text(
                    command,
                    style: const TextStyle(fontSize: 16),
                  ),
                ),
              ],
            ),
          )),
        ],
      ),
    );
  }
}
