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

### **Core Counter Functionality**
- **Real-Time Download Tracking**: Accurately count DP (Download Points) downloads in real-time
- **Singleton Counter Management**: Maintains a single, consistent counter document
- **Automatic Counter Creation**: Creates counter document automatically on first use

### **Data Integrity & Security**
- **Idempotent Operations**: Prevents double-counting using unique download IDs
- **Duplicate Download Prevention**: Tracks processed IDs to ensure each download is counted once
- **Memory-Efficient Storage**: Limits stored download IDs to last 10,000 entries
- **Data Validation**: Validates all incoming requests with proper error handling

### **API Design**
- **RESTful API**: Clean, intuitive REST endpoints following best practices
- **CORS Enabled**: Configured to accept requests from authorized frontend origins
- **Consistent Response Format**: Standardized JSON responses across all endpoints

### **Database Features**
- **MongoDB Integration**: Leverages MongoDB's flexibility and performance
- **Schema Validation**: Enforces data structure using Mongoose schemas
- **Automatic Timestamps**: Tracks when data was created and updated

### **Developer Experience**
- **Self-Healing System**: Automatically recovers from missing data
- **Comprehensive Error Handling**: Detailed error messages with logging
- **Admin Controls**: Reset functionality for testing and maintenance
- **Easy Integration**: Simple API that works with any frontend framework

### **Performance & Scalability**
- **Efficient Database Queries**: Optimized MongoDB queries with singleton pattern
- **Scalable Architecture**: Designed to handle increasing download volumes
- **Low Latency**: Quick response times for read and write operations

### **Operational Features**
- **Zero Configuration Startup**: No initial database setup required
- **Production-Ready**: Includes proper error handling and security considerations
- **Testing-Friendly**: Clear separation of concerns for easy unit testing

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

## Download Counter API

### Get Download Count
```http
GET /api/dp/count
```

**Response:**
```json
{
  "status": "success",
  "count": 42,
  "lastUpdated": "2024-12-23T10:30:00.000Z"
}
```

### Increment Download Count
```http
POST /api/dp/increment
Content-Type: application/json

{
  "downloadId": "unique-download-id"
}
```

**Success Response:**
```json
{
  "status": "success",
  "count": 43,
  "message": "Count incremented successfully",
  "alreadyCounted": false
}
```

**Already Counted Response:**
```json
{
  "status": "success",
  "message": "Download already counted",
  "count": 42,
  "alreadyCounted": true
}
```

## Project Structure
```
profile-picture-campaign-backend/
├── controllers/
│   └── dpController.js      # Request handlers
├── models/
│   └── dpCounter.js                # User schema definition
├── routes/
│   └── dpRoutes.js          # API routes
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

Project Link: [https://github.com/Tess647/DP_Counter](https://github.com/Tess647/DP_Counter)

---

## Acknowledgments

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)