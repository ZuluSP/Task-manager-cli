# 📝 Task Manager CLI

Hi!
Welcome to **Task Manager CLI**, a simple command-line application to manage tasks efficiently. This project is built using **Node.js, TypeScript, and Commander.js** to provide a user-friendly way to add, list, update, and delete tasks from your terminal.

---

## 🚀 Getting Started

### **Prerequisites**
Ensure you have the following installed on your machine:
- **Node.js** (version 16 or later)
- **npm** (comes with Node.js)

### **Installation**
1. Clone this repository:
   ```sh
   git clone https://github.com/ZuluSP/taskManager.git
   cd taskManager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Build the project:
   ```sh
   npm run build
   ```

---

## 📌 Usage
You can use the CLI with `npm run` or directly with `node dist/cli.js`.

### **➕ Add a Task**
```sh
npm run add "Task Title" "Task Description" "2025-02-24"
```
Example:
```sh
npm run add "Fix Bug" "Resolve issue #123" "2025-02-24"
```

### **📋 List Tasks**
```sh
npm run list
```

### **✏ Update a Task**
```sh
npm run update <id> --title "New Title" --description "Updated description" --dueDate "2025-03-01" --status "completed"
```
Example:
```sh
npm run update 123456 --status "completed"
```

### **❌ Delete a Task**
```sh
npm run delete <id>
```
Example:
```sh
npm run delete 123456
```

---

## 🛠 Design Decisions

### **Why CLI-Based?**
The task manager is designed as a **command-line application** to keep it lightweight and efficient. It allows users to manage tasks quickly without the overhead of a GUI.

### **Technology Stack**
- **Node.js & TypeScript** → For type safety and maintainability.
- **Commander.js** → Simplifies a lot command-line argument handling.
- **Jest** → Used for unit testing to ensure reliability on the methods I developed.
- **dotenv** → Manages environment variables for flexibility.
- **File System (JSON storage)** → A simple, flat-file database for persistence without requiring a full-fledged database.

### **Project Structure**
```
taskManager/
│── data/                  # JSON storage for tasks
│── src/
│   ├── config/            # Project config
│   ├── models/            # Task model
│   ├── repository/        # Handles task storage
│   ├── services/          # Business logic
│   ├── cli.ts             # Command-line interface
│── tests/                 # Unit tests
│── package.json
│── README.md
│── tsconfig.json
│── .gitignore
```

### **Testing Approach**
I implemented **unit tests** using Jest to ensure that each component functions correctly. Key areas covered:
- Task model instantiation
- Repository CRUD operations
- Task service logic

To run tests:
```sh
npm test
```

---

## 🔧 Configuration
- **Environment variables** are stored in a `.env` file.
- Tasks are saved in `data/tasks.json`.
- **`.gitignore`** ensures `tasks.json` is not committed.

---

## 📜 Author
This project is created and developed by **Carlos Zulueta**.

