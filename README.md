# 📲 WhatsApp Automation System

A Node.js-based WhatsApp automation system designed to handle customer interactions, lead capture, and structured conversational flows using WhatsApp Web integration.

This project enables automated message handling, state management, and admin notifications for business use cases such as lead generation, booking systems, and inquiry handling.

---

## 🚀 Features

- Automated WhatsApp message handling
- Structured conversational flow
- User state management
- Lead data collection and storage
- Admin notification system
- Modular and scalable architecture
- Clean service-layer separation
- Easily extendable for GPT integration

---

## 🏗️ Project Architecture

```
Whatsapp-automation/
│
├── src/
│   ├── services/
│   │   ├── whatsapp.service.js
│   │   ├── state.service.js
│   │   ├── lead.service.js
│   │   └── notify.service.js
│   │
│   ├── flows/
│   │   └── menu.flow.js
│   │
│   └── index.js
│
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

- Node.js
- JavaScript (ES6+)
- WhatsApp Web automation library
- Modular service-based architecture

---

## 📦 Installation

1. Clone the repository:

```
git clone https://github.com/Blue-pill-786/Whatsapp-automation.git
cd Whatsapp-automation
```

2. Install dependencies:

```
npm install
```

3. Start the application:

```
node src/index.js
```

---

## 🔄 How It Works

1. WhatsApp client initializes and connects.
2. Incoming messages are captured.
3. System checks user state.
4. Based on state, the appropriate conversation flow executes.
5. User responses are stored.
6. Leads are saved.
7. Admin receives notification if configured.

---

## 🧠 Conversation Flow Example

- User sends "Hi"
- Bot responds with menu options
- User selects option
- Bot collects details
- Data stored as lead
- Admin notified

---

## 🔐 Extending the Project

You can extend this system by:

- Integrating GPT for AI-based responses
- Adding database support (MongoDB / PostgreSQL)
- Adding JWT authentication
- Dockerizing the application
- Converting into microservices
- Deploying to cloud (AWS / Render / Railway)

---

## 🧪 Future Improvements

- Role-based admin dashboard
- Analytics tracking
- Message templates
- Scheduled broadcasts
- CRM integration

---

## ⚠️ Disclaimer

This project is for educational and development purposes. Ensure compliance with WhatsApp’s policies before deploying in production.

---

## 👨‍💻 Author

Developed by Blue-pill-786  
GitHub: https://github.com/Blue-pill-786
