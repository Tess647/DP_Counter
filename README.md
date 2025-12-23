# Profile Picture Campaign Backend

This project powers the backend for the Profile Picture Campaign, allowing users to store their information after customizing their profile pictures using the frontend. It handles user data securely and provides RESTful APIs for user management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Project Structure](#project-structure)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Registration**: Save user information, including name and profile picture URL
- **Fetch Users**: Retrieve a list of all registered users
- **Secure Data Storage**: Stores user data in MongoDB with schema validation
- **CORS Enabled**: Supports cross-origin requests from frontend applications
- **RESTful API**: Clean and intuitive API design
- **Error Handling**: Comprehensive error handling with meaningful messages

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Environment Management**: dotenv
- **CORS**: cors middleware

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB Atlas Account** or **Local MongoDB** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Postman** (for API testing) - [Download](https://www.postman.com/downloads/)

---

## Installation

1. **Clone the repository:**
```bash
   git clone https://github.com/your-username/profile-picture-campaign-backend.git
   cd profile-picture-campaign-backend
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Install additional packages (if not already in package.json):**
```bash
   npm install express mongoose dotenv cors validator
```

---

## Configuration

1. **Create a `config.env` file** in the root directory:
```env
   DATABASE=mongodb+srv://username:<PASSWORD>@cluster.mongodb.net/profile-campaign?retryWrites=true&w=majority
   DATABASE_PASSWORD=your_mongodb_password
   PORT=5000
   NODE_ENV=development
```

2. **Replace the placeholder values:**
   - `username`: Your MongoDB username
   - `<PASSWORD>`: Will be replaced automatically by the app
   - `your_mongodb_password`: Your actual MongoDB password
   - `profile-campaign`: Your database name

3. **MongoDB Setup:**
   - Create a MongoDB Atlas account at [mongodb.com](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string from the "Connect" button
   - Whitelist your IP address or use `0.0.0.0/0` for development

---

## Usage

### Development Mode

Start the server with automatic restart on file changes:
```bash
npm run dev
```

### Production Mode

Start the server normally:
```bash
npm start
```

The server will run on `http://localhost:5001` (or your configured PORT).

You should see:
```
MongoDB Connected...
App running on port 5001...
```

---

## API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/users/test` | Test backend connection | None |
| GET | `/users` | Get all users | None |
| POST | `/users` | Create a new user | `{ "name": "string" }` |

### Detailed Endpoint Documentation

#### 1. Test Connection
```http
GET /api/v1/users/test
```

**Response:**
```json
{
  "message": "Backend is working!"
}
```

#### 2. Get All Users
```http
GET /api/v1/users
```

**Success Response (200):**
```json
{
  "status": "success",
  "results": 2,
  "data": {
    "users": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "profilePictureURL": "https://example.com/profile1.jpg",
        "createdAt": "2024-12-15T10:30:00.000Z"
      },
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Jane Smith",
        "profilePictureURL": "https://example.com/profile2.jpg",
        "createdAt": "2024-12-15T11:45:00.000Z"
      }
    ]
  }
}
```

#### 3. Create User
```http
POST /api/v1/users
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "profilePictureURL": "https://example.com/profile.jpg"
}
```

**Success Response (201):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "profilePictureURL": "https://example.com/profile.jpg",
      "createdAt": "2024-12-15T10:30:00.000Z"
    }
  }
}
```

**Error Response (400):**
```json
{
  "status": "fail",
  "message": "Name and profile picture URL are required"
}
```

---

## Testing with Postman

### Quick Start

1. **Import Collection:**
   - Download the Postman collection from the repository
   - In Postman, click "Import" and select the collection file

2. **Set Environment Variable:**
   - Create a new environment in Postman
   - Add variable: `base_url` = `http://localhost:5001/api/v1`

3. **Test Sequence:**
   - First, run "Test Connection" to verify the server is running
   - Then, run "Create User" to add a test user
   - Finally, run "Get All Users" to see your created user

### Manual Testing Steps

1. **Test Connection:**
   - Method: GET
   - URL: `http://localhost:5001/api/v1/users/test`
   - Click "Send"

2. **Create a User:**
   - Method: POST
   - URL: `http://localhost:5001/api/v1/users`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
```json
   {
     "name": "Test User",
     "profilePictureURL": "https://example.com/test.jpg"
   }
```
   - Click "Send"

3. **Get All Users:**
   - Method: GET
   - URL: `http://localhost:5001/api/v1/users`
   - Click "Send"

---

## Project Structure
```
profile-picture-campaign-backend/
├── controllers/
│   └── userController.js      # Request handlers
├── models/
│   └── user.js                # User schema definition
├── routes/
│   └── userRoutes.js          # API routes
├── config.env                 # Environment variables (not committed)
├── config.env.example         # Example environment variables
├── app.js                     # Express app configuration
├── server.js                  # Server entry point
├── package.json               # Dependencies
└── README.md                  # Documentation
```

---

## Error Handling

The API returns standardized error responses:

### 400 Bad Request
```json
{
  "status": "fail",
  "message": "Validation error message"
}
```

### 500 Internal Server Error
```json
{
  "status": "fail",
  "message": "Error description"
}
```

---

## Common Issues & Troubleshooting

### MongoDB Connection Error
- **Issue**: `Error connecting to MongoDB`
- **Solution**: 
  - Check your `config.env` file credentials
  - Ensure your IP is whitelisted in MongoDB Atlas
  - Verify your internet connection

### CORS Error
- **Issue**: Frontend can't connect to backend
- **Solution**: 
  - Verify CORS origins in `app.js` match your frontend URL
  - Check that the backend server is running

### Port Already in Use
- **Issue**: `EADDRINUSE: address already in use`
- **Solution**: 
  - Change PORT in `config.env`
  - Or kill the process using port 5001: `lsof -ti:5001 | xargs kill -9` (Mac/Linux)

---

## Scripts

Add these to your `package.json`:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Install nodemon for development:
```bash
npm install --save-dev nodemon
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact

Your Name - [https://www.linkedin.com/in/taslihah-thanni-339b7b171/](https://www.linkedin.com/in/taslihah-thanni-339b7b171/)

Project Link: [https://github.com/Tess647/DP_PROJECT.git](https://github.com/Tess647/DP_PROJECT.git)

---

## Acknowledgments

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)