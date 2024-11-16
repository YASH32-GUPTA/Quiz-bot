# Telegram Quiz Bot

A **Telegram Quiz Bot** designed to test your knowledge through fun and interactive quizzes. Easily configurable with a robust backend and seamless Telegram integration.

---
### 5. **Quiz Bot Output Video **  
Interact with the bot on Telegram through this link:  
[**Make a Quiz Bot**](https://drive.google.com/file/d/1n0WvzsHshLjgkx6zD52iRsOin-We-dCk/view?usp=drive_link)

## **Steps to Access the Code**

### 1. **Clone the Repository**  
Use the following command to clone the repository:  
```bash
git clone <repository_url>
```

### 2. **Install Dependencies**  
Navigate to the project directory and run the following command to install all required modules:  
```bash
npm install
```

### 3. **Set Up the Database**  
- Open the `Model` folder.  
- Execute the queries in your **MySQL terminal** or **MySQL Workbench**.  
- Follow the sequence below to create and populate the tables:  
  - **Users** → **Points** → **Quiz** (*first paragraphs, then mcq*) → **Logs**

### 4. **Run the Server**  
Start the server with the following command:  
```bash
nodemon .\server.js
```

### 5. **Access the Bot**  
Interact with the bot on Telegram through this link:  
[**Make a Quiz Bot**](https://t.me/make_a_quiz_bot)

---

## **Technical Stack**

- **Node.js**: Handles server-side logic and processes Telegram API requests.  
- **JavaScript**: The primary language used for writing bot functionality and logic.  
- **Telegraf**: A Telegram Bot library to simplify bot integration and interaction.  
- **MySQL**: Manages user data, quiz database, logs, and scoring efficiently.

---

## **Database Schema Overview**

### **1. Users Database**  
- **Table**: `user`  
  - **Columns**:  
    1. `userId` *(Primary Key)*  
    2. `name`  
    3. `topicSelected`  
    4. `topicScore`  
- **Relationships**:  
  - **One-to-One** with `points` table (each user has one points table record).  
  - **One-to-Many** with `user_logs` table (each user can have multiple logs).  

### **2. Points Database**  
- **Table**: `points`  
  - **Columns**:  
    1. `id`  
    2. `status` *(1 - correct, 0 - incorrect)*  

### **3. Logs Database**  
- **Table**: `user_logs`  
  - **Columns**:  
    1. `userId`  
    2. `message`  
  - **Primary Key**: (`userId`, `message`)  
  - **Foreign Key**: `userId`  

### **4. Quiz Database**  
- **Tables**:  
  1. **paragraphs**  
     - **Columns**:  
       1. `id` *(Primary Key)*  
       2. `topic`  
       3. `topicID`  
       4. `paragraph`  
     - **Relationships**:  
       - **One-to-Many** with `mcq` table (a paragraph can have multiple MCQs).  

  2. **mcq**  
     - **Columns**:  
       1. `topicID` *(Foreign Key)*  
       2. `quesIdx`  
       3. `question`  
       4. `option1`  
       5. `option2`  
       6. `option3`  
       7. `option4`  
       8. `correctAnswer`  
     - **Primary Key**: (`topicID`, `quesIdx`)

---

### Enjoy testing your knowledge with the **Telegram Quiz Bot**! 🚀
```
