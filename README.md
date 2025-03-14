# Modernizing Laboratory Assessment

![GitHub stars](https://img.shields.io/github/stars/MINI-PROJECT-SIT/Modernizing-Laboratory-Assessment?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/MINI-PROJECT-SIT/Modernizing-Laboratory-Assessment?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/MINI-PROJECT-SIT/Modernizing-Laboratory-Assessment?style=flat-square)

A comprehensive online platform designed to transform traditional lab test systems. Integrating modern web technologies and APIs, this platform provides a streamlined solution for managing tests, courses, and evaluations for both students and teachers.

🔗 **Live Site**: [https://labtests.vercel.app/](https://labtests.vercel.app/)

## 🚀 Features

- **Role-based Access**: Separate functionalities for students and teachers
- **Course & Test Management**: Create courses, add coding questions with test cases, and schedule tests
- **Randomized Questions**: Coding questions randomly selected from the teacher's pool
- **Live Code Execution**: Integrated code editor with real-time execution
- **Immediate Results**: Instant feedback on coding tests
- **Advanced Scoring System**: Full/partial marks based on test case completion
- **Question Change Option**: Students can request a new question (if enabled)
- **Interactive Viva Component**: Multiple-choice questions for comprehensive assessment
- **CSV Report Generation**: Export test results in CSV format
- **Keystroke Monitoring**: Tracks typing to detect copied code and automatically assigns zero marks for plagiarism

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: React.js, Tailwind CSS
- **Code Execution**: PISTON API
- **Code Editor**: react-monaco-editor

## 📋 User Roles

### Teachers/Professors

- Create and manage courses
- Add coding questions with test cases
- Schedule tests with specific criteria
- Configure test settings
- Generate performance reports
- Review flagged submissions from plagiarism detection

### Students

- View and participate in scheduled tests
- Code in a real-time editor environment
- Receive immediate feedback
- Track historical performance

## ⚙️ Setup and Installation

### Clone the Repository

```bash
git clone https://github.com/MINI-PROJECT-SIT/Modernizing-Laboratory-Assessment.git
```

### Backend Setup

```bash
cd backend
npm install
node index.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 📊 Scoring System

| Scenario                                   | Marks        |
| ------------------------------------------ | ------------ |
| All test cases passed                      | 10 marks     |
| ≥50% test cases passed                     | 5 marks      |
| <50% test cases passed                     | 0 marks      |
| Detected plagiarism via keystroke analysis | 0 marks      |
| Viva (5 questions)                         | 5 marks      |
| **Total**                                  | **15 marks** |

> **Note:** If "change of question" option is used, maximum coding marks are reduced to 7.

## 🔒 Anti-Plagiarism Measures

The system employs sophisticated keystroke analysis that is Student should type 60% of code (This is done by counting the keystrokes)
When plagiarism is detected:

- The submission is automatically flagged
- Coding score is set to zero
- Student can still complete the viva portion

## 🔌 External Integrations

- **PISTON API**: Safe code execution environment
- **react-monaco-editor**: Dynamic code editing interface

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
