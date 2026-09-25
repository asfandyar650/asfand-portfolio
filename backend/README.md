# 🚀 Asfand Portfolio - Backend (Node.js + Express)

A lightweight, clean, and extensible Node.js & Express REST API for the Asfand Portfolio website.

---

## 📁 Folder Structure

```
backend/
├── data/
│   ├── messages.json    # JSON database storing received contact messages
│   └── projects.json    # Portfolio project items
├── routes/
│   ├── contact.js       # Handles POST and GET for contact messages
│   └── projects.js      # Handles GET for portfolio projects
├── .env                 # Environment variables (port, client URLs)
├── .env.example         # Example environment template
├── .gitignore           # Ignores node_modules and sensitive files
├── package.json         # Node.js dependencies and start scripts
├── README.md            # Backend documentation
└── server.js            # Main Express server entrypoint
```

---

## ⚡ How to Run

### 1. Install Dependencies
Make sure you are in the `backend` directory, then run:
```bash
cd backend
npm install
```

### 2. Start the Server
- **Production mode:**
  ```bash
  npm start
  ```
- **Development mode (Auto-reloads on file changes):**
  ```bash
  npm run dev
  ```

Your server will be running on:  
👉 **`http://localhost:5001`**

---

## 📡 API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/` | API status & endpoint directory | None |
| `GET` | `/api/health` | Server health & uptime | None |
| `POST` | `/api/contact` | Submit a new contact message | `{ "name": "...", "company": "...", "email": "...", "message": "..." }` |
| `GET` | `/api/contact` | View all submitted messages | None |
| `GET` | `/api/projects` | Get list of portfolio projects | None |

---

## 🧪 Testing the API

### Send a Contact Message:
```bash
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name": "Client", "company": "Tech Corp", "message": "Hi Asfand, love your portfolio!"}'
```

### Check Received Messages:
```bash
curl http://localhost:5001/api/contact
```
