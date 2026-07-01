# 📈 InvestEdge

A full-stack MERN stock trading platform inspired by modern brokerage applications. InvestEdge enables users to securely create an account, log in, and interact with a feature-rich trading dashboard to view holdings, positions, orders, and portfolio insights.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- Password Hashing using bcrypt
- JWT-based Authentication
- Protected Dashboard Access

### 📊 Dashboard
- Portfolio Summary
- Holdings
- Positions
- Orders
- Funds
- Watchlist
- Stock Performance Charts

### 💻 User Interface
- Responsive Landing Page
- Modern Dashboard
- Clean Navigation
- Toast Notifications
- React Router Navigation

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Bootstrap
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- Joi Validation
- CORS

### Dashboard
- React.js
- Chart.js
- Context API

---

# 📁 Project Structure

```
InvestEdge
│
├── backend
│   ├── controllers
│   ├── MiddleWares
│   ├── model
│   ├── Routes
│   ├── schemas
│   ├── index.js
│   └── package.json
│
├── dashboard
│   ├── public
│   ├── src
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/0308vivek/InvestEdge.git
cd InvestEdge
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=3002

MONGO_URL=Your MongoDB Atlas URL

JWT_SECRET=Your Secret Key
```

Start Backend

```bash
npm start
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs on

```
http://localhost:3001
```

---

# Dashboard Setup

```bash
cd dashboard
npm install
npm start
```

Runs on

```
http://localhost:3000
```

---

# 🔑 Authentication Flow

1. User creates an account.
2. Credentials are stored securely in MongoDB.
3. Password is hashed using bcrypt.
4. User logs in.
5. Backend verifies credentials.
6. JWT Token is generated.
7. Token is stored in Local Storage.
8. User is redirected to the Dashboard.
9. Protected routes verify token before rendering.

---

# 🌐 API Endpoints

## Authentication

### Register

```
POST /auth/signup
```

### Login

```
POST /auth/login
```

---

## Dashboard

### Get Holdings

```
GET /allHoldings
```

### Get Positions

```
GET /allPositions
```

### Get Orders

```
GET /allOrders
```

---

# 🔒 Environment Variables

Never commit your `.env` file.

Required variables:

```env
PORT=

MONGO_URL=

JWT_SECRET=
```

---


# 🚀 Deployment

### Backend
Deploy on **Render**

### Frontend
Deploy on **Vercel**

### Dashboard
Deploy on **Vercel**

Remember to configure the backend URL in the frontend and dashboard after deployment.

---

# 🧪 Future Improvements

- Live Stock Prices
- Buy & Sell Orders
- Portfolio Analytics
- User Profile
- Email Verification
- Forgot Password
- Refresh Token Authentication
- Dark Mode
- Mobile Responsive Dashboard
- Real-time Notifications

