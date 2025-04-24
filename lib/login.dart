// import 'package:flutter/material.dart';
// import 'package:firebase_auth/firebase_auth.dart';
// import 'package:google_sign_in/google_sign_in.dart';

// class LoginScreen extends StatefulWidget {
//   @override
//   _LoginScreenState createState() => _LoginScreenState();
// }

// class _LoginScreenState extends State<LoginScreen> {
//   final FirebaseAuth _auth = FirebaseAuth.instance;
//   final TextEditingController emailController = TextEditingController();
//   final TextEditingController passwordController = TextEditingController();
//   String errorMessage = "";

//   Future<void> loginWithEmail() async {
//     try {
//       await _auth.signInWithEmailAndPassword(
//         email: emailController.text.trim(),
//         password: passwordController.text.trim(),
//       );
//       Navigator.pushReplacementNamed(context, "/home");
//     } catch (e) {
//       setState(() {
//         errorMessage = "Login Failed. Check credentials.";
//       });
//     }
//   }

//   Future<void> signInWithGoogle() async {
//     try {
//       final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
//       if (googleUser == null) return; 

//       final GoogleSignInAuthentication googleAuth = await googleUser.authentication;
//       final AuthCredential credential = GoogleAuthProvider.credential(
//         accessToken: googleAuth.accessToken,
//         idToken: googleAuth.idToken,
//       );

//       await _auth.signInWithCredential(credential);
//       Navigator.pushReplacementNamed(context, "/home");
//     } catch (e) {
//       setState(() {
//         errorMessage = "Google Sign-In Failed.";
//       });
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       body: Stack(
//         children: [
//           // Background Image
//           Container(
//             decoration: BoxDecoration(
//               image: DecorationImage(
//                 image: NetworkImage("https://res.cloudinary.com/equities-com/image/upload/v1/u/daegjHVhcLqkY/lti2zbxqo2yl9xqq51o6"),
//                 fit: BoxFit.cover,
//                 colorFilter: ColorFilter.mode(Colors.black.withOpacity(0.6), BlendMode.darken),
//               ),
//             ),
//           ),

//           // Login Form
//           Center(
//             child: Container(
//               padding: EdgeInsets.all(24),
//               decoration: BoxDecoration(
//                 color: Colors.white.withOpacity(0.85),
//                 borderRadius: BorderRadius.circular(12),
//               ),
//               width: MediaQuery.of(context).size.width * 0.85,
//               child: Column(
//                 mainAxisSize: MainAxisSize.min,
//                 children: [
//                   Text("Welcome Back!", style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
//                   SizedBox(height: 20),
                  
//                   TextField(
//                     controller: emailController,
//                     decoration: InputDecoration(labelText: "Email", border: OutlineInputBorder()),
//                   ),
//                   SizedBox(height: 10),

//                   TextField(
//                     controller: passwordController,
//                     decoration: InputDecoration(labelText: "Password", border: OutlineInputBorder()),
//                     obscureText: true,
//                   ),
//                   SizedBox(height: 10),

//                   if (errorMessage.isNotEmpty)
//                     Text(errorMessage, style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold)),

//                   SizedBox(height: 15),

//                   ElevatedButton(
//                     onPressed: loginWithEmail,
//                     style: ElevatedButton.styleFrom(backgroundColor: Colors.deepPurple),
//                     child: Text("Login", style: TextStyle(color: Colors.white)),
//                   ),

//                   SizedBox(height: 10),
                  
//                   // Google Sign-In Button
//                   OutlinedButton.icon(
//                     onPressed: signInWithGoogle,
//                     icon: Image.asset("assets/google_logo.png", height: 24),
//                     label: Text("Sign in with Google"),
//                   ),

//                   SizedBox(height: 10),

//                   TextButton(
//                     onPressed: () {
//                       Navigator.pushNamed(context, "/signup");
//                     },
//                     child: Text("Don't have an account? Sign Up"),
//                   ),
//                 ],
//               ),
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }
