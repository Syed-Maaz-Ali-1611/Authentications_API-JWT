# Authentication API Backend

A **Node.js / Express.js backend API** for user authentication using **MongoDB**, **JWT**, and complete **CRUD operations**.

---

## 🚀 Features

* ✅ User Registration & Login
* ✅ JWT Token Authentication
* ✅ Password Hashing with bcrypt
* ✅ Profile Management
* ✅ Password Change Functionality
* ✅ Protected Routes with Middleware
* ✅ MongoDB Integration with Mongoose
* ✅ Centralized Error Handling
* ✅ CORS Support

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM)
* **Authentication:** JWT (JSON Web Tokens)
* **Password Hashing:** bcryptjs
* **Environment Variables:** dotenv
* **CORS Handling:** cors

---

## 📁 Project Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── auth.controller.js    # Authentication logic
│   ├── middleware/
│   │   └── auth.middleware.js    # JWT verification middleware
│   ├── models/
│   │   └── user.model.js         # User schema
│   ├── routes/
│   │   └── auth.routes.js        # API routes
│   ├── utils/
│   │   └── token.js              # JWT token generation
│   └── app.js                    # Express app setup
├── server.js                     # Server entry point
├── .env                          # Environment variables
├── package.json
└── README.md
```

---

## 📌 API Documentation

### Base URL

```
http://localhost:4000/api/auth
```

---

## 🔐 Authentication Endpoints

### 1️⃣ Register User

**URL:** `POST /`

**Description:** Create a new user account

**Headers:**

```
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "694b0fab0447b43dced95157",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**

* `400` – Validation errors (missing fields, password mismatch, user already exists)
* `500` – Server error

---

### 2️⃣ Login User

**URL:** `POST /login`

**Description:** Authenticate user and return JWT token

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "694b0fab0447b43dced95157",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**

* `400` – Invalid credentials or missing fields
* `500` – Server error

---

### 3️⃣ Update Profile (Protected)

**URL:** `PUT /profile`

**Headers:**

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "694b0fab0447b43dced95157",
    "name": "Updated Name",
    "email": "updated@example.com",
    "role": "user"
  }
}
```

---

### 4️⃣ Change Password (Protected)

**URL:** `PUT /change-password`

**Request Body:**

```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456",
  "confirmPassword": "newpassword456"
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Password changed successfully",
  "token": "new-jwt-token"
}
```

---

### 5️⃣ Get User by ID (Protected)

**URL:** `GET /:id`

**Success Response:**

```json
{
  "id": "694b0fab0447b43dced95157",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

### 6️⃣ Delete User (Protected)

**URL:** `DELETE /:id`

**Success Response:**

```json
{
  "message": "User deleted successfully"
}
```

---

## 🔒 Security Implementation

### User Model (`user.model.js`)

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });
```

### Token Generation (`token.js`)

* JWT includes user ID & role
* Securely signed with `JWT_SECRET`
* Token expiration enabled

### Auth Middleware (`auth.middleware.js`)

* Validates JWT from Authorization header
* Extracts user details
* Returns `401` for invalid/expired tokens

---

## ⚙️ Setup Instructions

### Prerequisites

* Node.js (v14+)
* MongoDB (Local or Atlas)
* npm or yarn

### Installation

```bash
git clone <repository-url>
cd backend
npm install
```

### Environment Configuration

```bash
cp .env.example .env
```

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/auth_db
JWT_SECRET=your-super-secret-jwt-key
```

### Run Server

```bash
npm run dev   # Development
npm start     # Production
```

---

## 🧪 Testing with Postman

1. Register → Get token
2. Login → Save token
3. Use `Authorization: Bearer {{bearer_token}}`
4. Test protected routes

**Postman Script:**

```js
const response = pm.response.json();
if (response.token) {
  pm.environment.set("bearer_token", response.token);
}
```

---

## 🔑 Environment Variables

| Variable   | Description     | Default  |
| ---------- | --------------- | -------- |
| PORT       | Server Port     | 4000     |
| MONGO_URI  | MongoDB URI     | auth_db  |
| JWT_SECRET | JWT Signing Key | Required |

---

## ❌ Error Codes

| Code | Meaning      | Reason                |
| ---- | ------------ | --------------------- |
| 400  | Bad Request  | Validation issues     |
| 401  | Unauthorized | Invalid/Missing Token |
| 404  | Not Found    | User not found        |
| 500  | Server Error | DB / Server issue     |

---

## 📦 Dependencies

### Production

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5"
}
```

### Development

```json
{
  "nodemon": "^3.0.1"
}
```

---

## 🔮 Future Enhancements

* Refresh Tokens
* Email Verification
* Password Reset Flow
* Rate Limiting
* Input Sanitization
* Swagger API Docs
* Unit & Integration Tests
* Docker Support

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to branch
5. Open a Pull Request

---
