import 'package:mongo_dart/mongo_dart.dart';
import 'package:flutter/foundation.dart' show kIsWeb;

class MongoDatabase {
  static Db? db;
  static DbCollection? userCollection;
  
  static bool isInitialized = false;

  static Future<bool> connect() async {
    if (kIsWeb) {
      // For web platform, we need to use REST API or a backend service
      // Direct MongoDB connection is not supported in web browsers
      print("MongoDB direct connection is not supported in web. Please use a backend service.");
      return false;
    }

    try {
      db = await Db.create(
          "mongodb+srv://root:root@exptracker.grxm0ve.mongodb.net/exp-collection?retryWrites=true&w=majority&appName=ExpTracker");
      await db!.open();
      userCollection = db!.collection('expenses');
      isInitialized = true;
      return true;
    } catch (e) {
      print("MongoDB connection error: $e");
      return false;
    }
  }

  static Future<String> insert(Map<String, dynamic> data) async {
    if (kIsWeb) {
      // For web platform, implement REST API call here
      return "Web platform requires a backend service for database operations";
    }

    try {
      if (!isInitialized) {
        await connect();
      }
      if (userCollection == null) {
        return "Database not initialized";
      }
      var result = await userCollection!.insertOne(data);
      if (result.isSuccess) {
        return "Data Inserted Successfully";
      } else {
        return "Something Wrong while inserting data.";
      }
    } catch (e) {
      print(e.toString());
      return e.toString();
    }
  }
}