# Voice Assistant for Expense Tracker

This feature adds voice control capabilities to your Flutter expense tracker app, similar to the voice-controlled app in the KJ hackathon project.

## Features

### 🎤 Voice Recognition
- **Speech-to-Text**: Uses Flutter's speech recognition to convert voice commands to text
- **Continuous Listening**: Tap the microphone button to start/stop voice recognition
- **Real-time Processing**: Commands are processed immediately as you speak

### 🤖 AI-Powered Responses
- **Gemini AI Integration**: Uses Google's Gemini 1.5 Flash model for intelligent responses
- **Context Awareness**: Maintains conversation history for better understanding
- **Natural Language**: Understands natural language commands and questions

### 🧭 Voice Navigation
- **App Navigation**: "Navigate to dashboard", "Open settings", "Go to analytics"
- **Quick Actions**: "Add expense $50 groceries", "Read balance", "Show monthly stats"
- **Financial Queries**: "How much did I spend this month?", "What's my current balance?"

## Setup Instructions

### 1. Install Dependencies
Run these commands in your Flutter project root:
```bash
flutter pub get
```

### 2. Backend Setup
The AI backend is already configured in your project. Make sure you have:
- Node.js installed
- The backend running on your configured IP address
- A valid Gemini API key in your `.env` file

### 3. Permissions
Add these permissions to your Android manifest (`android/app/src/main/AndroidManifest.xml`):
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
```

## How to Use

### Basic Voice Commands

#### Navigation
- **"Navigate to dashboard"** - Go to home screen
- **"Open add expense"** - Go to expense entry page
- **"Show analytics"** - Open analytics page
- **"Go to settings"** - Open settings page

#### Financial Actions
- **"Read balance"** - Hear your current balance
- **"Read monthly stats"** - Hear monthly summary
- **"Add expense $25 lunch"** - Add expense with amount and description
- **"Add income $1000 salary"** - Add income with amount and description

#### Natural Queries
- **"How much did I spend this month?"**
- **"What's my current balance?"**
- **"Give me financial advice"**
- **"Show me my spending patterns"**

### Using the Voice Assistant

1. **Start Listening**: Tap the floating microphone button (bottom-right corner)
2. **Speak Command**: Say your command clearly
3. **Wait for Response**: The AI will respond with voice and text
4. **Stop Listening**: Tap the button again to stop

### Visual Indicators

- **Blue Button**: Ready to listen
- **Red Pulsing Button**: Currently listening
- **Transcript Display**: Shows what you said and AI response
- **Help Button**: Tap the help icon in the app bar for command reference

## Technical Implementation

### Frontend (Flutter)
- `VoiceAssistantService`: Core voice processing logic
- `VoiceAssistantWidget`: Floating UI component
- `VoiceCommandsHelp`: Help page with all commands

### Backend (Node.js)
- `/api/ai/process-command`: Processes voice commands with Gemini AI
- `/api/ai/voice-commands`: Lists available commands
- `/api/ai/reset-context`: Resets AI conversation history

### Dependencies
- `speech_to_text`: Voice recognition
- `flutter_tts`: Text-to-speech output
- `@google/generative-ai`: AI processing

## Troubleshooting

### Common Issues

1. **"Speech recognition not available"**
   - Check microphone permissions
   - Ensure device supports speech recognition

2. **"AI not responding"**
   - Check backend is running
   - Verify Gemini API key is valid
   - Check internet connection

3. **Voice not clear**
   - Speak in a quiet environment
   - Speak clearly and at normal pace
   - Wait for confirmation before speaking again

### Performance Tips

- Use clear, simple commands
- Wait for the AI to finish speaking before giving new commands
- Keep the app in the foreground for best voice recognition
- Use the help page to learn all available commands

## Customization

### Adding New Commands
1. Update `VoiceAssistantService._processVoiceCommand()`
2. Add new callback functions
3. Update the help page with new commands

### Changing AI Behavior
1. Modify the system prompt in `backend/routes/ai.js`
2. Adjust response length and temperature
3. Add new AI capabilities as needed

## Security Notes

- Voice commands are processed locally on your device
- AI responses are generated securely through Google's Gemini API
- No voice data is stored permanently
- API keys are stored securely in environment variables

## Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify all dependencies are installed
3. Ensure backend services are running
4. Check microphone permissions on your device

---

**Enjoy your voice-controlled expense tracker! 🎉**
