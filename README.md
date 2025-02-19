# Library Application

## Overview
This is a full-stack library application built with Node.js, Express, and MongoDB. The app allows users to browse, read, and manage books seamlessly.

## Features
- User authentication (Sign up, Login, Logout)
- Book creation and management
- Admin dashboard for authors

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Sendgrid and nodemailer
- **Deployment:** Render

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)

### Steps to Run Locally
1. **Clone the repository:**
   ```sh
   git clone https://github.com/kobby18-50/node_express_library3.0.git
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory
   - Add the required variables:
     ```ini
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     JWT_SECRET=your_jwt_secret
     ```
4. **Start the server:**
   ```sh
   npm start
   ```
5. **The server will run on:** `http://localhost:5000`

## API Endpoints
End points are available on https://node-library-spg2.onrender.com

## Contact
For inquiries, reach out to **edwardkobby18@gmail.com**.

