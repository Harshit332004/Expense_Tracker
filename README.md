# 💸 ExpenseTracker – Flutter App for Personal Finance Management

## 📱 App Overview

**ExpenseTracker** is a mobile-first Flutter app that enables users to:
- Track their income and expenses
- Visualize spending patterns using charts
- Upload and manage digital receipts
- Secure their data using **Firebase Authentication**
- Sync data via a **Node.js + MongoDB backend**
- Use the app offline with local persistence
- Export expense reports as **PDF**
- Made for web and App both Using Flutter

It’s a modern budgeting companion built using best practices in mobile development and backend integration.

---

## 🚀 Key Features

### 🏠 Home Dashboard  
- Displays **Net Balance**, **Total Income**, and **Total Expenses**  
- Filters to view data by **Today**, **Weekly**, and **Monthly**

### ➕ Add Income / Add Expense  
- Record transactions with categories, notes, and amounts  
- Attach a **receipt image** during expense entry

### 📊 Analytics  
- **Bar Chart**: Expense distribution by category  
- **Pie Chart**: Expense percentages for visual insight  
- Filter by **time range**

### 🧾 Expense Report  
- Tabular listing of transactions with Date, Description, Category, and Amount  
- Filterable and easy to review

### 🖼️ Receipts Manager  
- Displays uploaded receipts with metadata  
- Filter by **All, Today, Weekly, Monthly**  
- View receipt images with transaction info

### 🔐 Authentication  
- Secure **login/signup** using **Firebase Auth**

### 🌐 Backend Integration  
- **Node.js + Express** backend  
- **MongoDB** for storing user data and transactions  
- APIs for adding, fetching, filtering, and syncing financial data

### 📝 PDF Export  
- Option to export full reports (income, expenses, balance) as PDF for download or sharing

---

## 🧱 Tech Stack

| Layer          | Technology                |
|----------------|---------------------------|
| Frontend       | Flutter, Dart             |
| Backend        | Node.js, Express.js       |
| Database       | MongoDB                   |
| Authentication | Firebase Authentication   |
| Storage        | Firebase Storage (Receipts) |
| Charts         | fl_chart / charts_flutter |
| File Handling  | file_picker / pdf         |

---

## ▶️ How to Run the App

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/expense-tracker-flutter.git
   ```

2. **Navigate to the project**
   ```bash
   cd expense-tracker-flutter
   ```

3. **Install dependencies**
   ```bash
   flutter pub get
   ```

4. **Run the app**
   ```bash
   flutter run
   ```

> 🔐 Make sure Firebase is properly configured in `android/app/google-services.json`  
> 🌐 Ensure your Node.js + MongoDB backend server is up and running

---

## 📸 Screenshots 

- Home Dashboard  
<img width="448" height="994" alt="1753433021" src="https://github.com/user-attachments/assets/fb02880d-6d7d-486a-a702-d431780a4d06" />

- Add Income / Expense  
<img width="1434" height="650" alt="1753433065" src="https://github.com/user-attachments/assets/c1f7e68d-d191-4546-817f-bed29d321c2e" />
<img width="1431" height="641" alt="1753433057" src="https://github.com/user-attachments/assets/face4889-9d6e-4618-a53b-ebd75440c425" />


- Analytics Page  
<img width="494" height="1099" alt="1753433042" src="https://github.com/user-attachments/assets/1bbd7663-3ae3-4479-8459-8da6f392f8a3" />

- Expense Report
- 
- Receipt Viewer(with pdf extraction feature)
<img width="271" height="603" alt="1753433035" src="https://github.com/user-attachments/assets/6327adea-ab11-4df1-8691-23bdbd60608c" />
