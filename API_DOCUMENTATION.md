# PingMe Backend API Documentation

## Overview

This is the production-ready backend for PingMe, a real-time communication platform built with Node.js, Express, and MongoDB.

## Features

- ✅ Complete user authentication system with JWT
- ✅ Dynamic landing page with database-driven cards
- ✅ Card action tracking and analytics
- ✅ Comprehensive error handling
- ✅ Production-ready middleware
- ✅ Scalable modular architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the root directory:
```env
# Database
MONGO_URI=mongodb://localhost:27017/pingme

# JWT Secret (use a strong secret in production)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Configuration
NODE_ENV=development
PORT=5000
SKIP_DB=false
```

3. Seed the database with default cards:
```bash
npm run seed
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "_id": "user-id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2026-02-16T..."
    }
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer <jwt-token>
```

#### Update Profile (Protected)
```http
PUT /api/auth/profile
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "name": "John Smith",
  "about": "Software Developer"
}
```

#### Change Password (Protected)
```http
PUT /api/auth/change-password
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

### Landing Page Routes (`/api/landing`)

#### Get All Landing Cards
```http
GET /api/landing/cards
```

**Response:**
```json
{
  "success": true,
  "message": "Landing cards retrieved successfully",
  "data": {
    "cards": [
      {
        "_id": "card-id",
        "title": "Start Chatting",
        "description": "Begin conversations...",
        "icon": "💬",
        "actionType": "navigate_chat",
        "requiresAuth": true,
        "buttonText": "Open Chat",
        "backgroundColor": "#4F46E5",
        "textColor": "#FFFFFF",
        "order": 1
      }
    ]
  }
}
```

#### Create New Card (Protected)
```http
POST /api/landing/cards
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Custom Action",
  "description": "Custom card description",
  "icon": "🎯",
  "actionType": "custom",
  "requiresAuth": false,
  "buttonText": "Click Me",
  "order": 10
}
```

#### Update Card (Protected)
```http
PUT /api/landing/cards/:id
Authorization: Bearer <jwt-token>
```

#### Delete Card (Protected)
```http
DELETE /api/landing/cards/:id
Authorization: Bearer <jwt-token>
```

### Action Routes (`/api/actions`)

#### Handle Card Action
```http
POST /api/actions/:actionType
Content-Type: application/json

{
  "cardId": "card-id-here",
  "metadata": {
    "source": "landing_page"
  }
}
```

**Available Action Types:**
- `navigate_chat` - Navigate to chat interface
- `open_vscode` - Open VS Code integration
- `start_conversation` - Start new conversation
- `view_profile` - View user profile
- `settings` - Open settings
- `custom` - Custom action with metadata

**Response:**
```json
{
  "success": true,
  "message": "Navigate to chat action logged",
  "data": {
    "actionType": "navigate_chat",
    "userId": "user-id",
    "cardId": "card-id",
    "actionId": "action-log-id",
    "redirect": "/chat",
    "requiresAuth": false
  }
}
```

#### Get User Action History (Protected)
```http
GET /api/actions/history?page=1&limit=20&actionType=navigate_chat
Authorization: Bearer <jwt-token>
```

#### Get Action Analytics (Protected)
```http
GET /api/actions/analytics?startDate=2026-01-01&endDate=2026-02-16
Authorization: Bearer <jwt-token>
```

### Health Check
```http
GET /api/health
```

## Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: "user"),
  avatar: String,
  about: String,
  isEmailVerified: Boolean,
  isOnline: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Card Model
```javascript
{
  title: String (required),
  description: String (required),
  icon: String (required),
  actionType: String (required),
  requiresAuth: Boolean,
  metadata: Object,
  isActive: Boolean,
  order: Number,
  buttonText: String,
  backgroundColor: String,
  textColor: String,
  createdAt: Date,
  updatedAt: Date
}
```

### UserAction Model
```javascript
{
  user: ObjectId (ref: User),
  actionType: String (required),
  metadata: Object,
  ipAddress: String,
  userAgent: String,
  success: Boolean,
  duration: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error description",
  "stack": "Error stack trace (development only)"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <jwt-token>
```

Tokens expire in 7 days by default.

## Security Features

- ✅ Password hashing with bcryptjs (salt rounds: 12)
- ✅ JWT token validation
- ✅ Input validation and sanitization
- ✅ MongoDB injection protection
- ✅ CORS enabled for cross-origin requests
- ✅ Error message sanitization

## Development

### Running the Server
```bash
# Development with auto-restart
npm run dev

# Production
npm start
```

### Database Seeding
```bash
# Seed the database with default cards
npm run seed
```

### Testing Endpoints

You can test the API using tools like Postman, curl, or the built-in REST client in VS Code.

Example curl commands:

```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Get landing cards
curl http://localhost:5000/api/landing/cards

# Health check
curl http://localhost:5000/api/health
```

## Production Deployment

1. Set production environment variables
2. Use a production MongoDB instance
3. Set `NODE_ENV=production`
4. Use PM2 or similar process manager
5. Set up proper logging and monitoring
6. Configure reverse proxy (nginx)
7. Enable SSL/HTTPS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.