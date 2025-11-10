# Courses Path Generator

A full-stack web application for generating personalized course paths to help users learn and advance in their chosen fields.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, OTP verification
- **Email Service**: SendGrid for OTP emails and contact forms
- **AI Integration**: Google Generative AI for enhanced features

## Features

- User registration and login with email OTP verification
- Forgot password functionality with OTP reset
- Personalized dashboard
- Course path generation for various career fields (Architecture, Business, Design, Engineering, Law, Logistics, Medical, Pharmacy, Police, Doctor)
- Chatbot for assistance
- Responsive design with dark/light theme toggle

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- SendGrid API key for email services
- Google Generative AI API key (optional, for AI features)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd courses-path-generator
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   cd ..
   ```

4. Set up environment variables in `backend/.env`:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SENDGRID_API_KEY=your_sendgrid_api_key
   EMAIL_USER=your_email@example.com
   GOOGLE_GENAI_API_KEY=your_google_genai_api_key (optional)
   PORT=5000
   ```

5. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

6. In a new terminal, start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

## Usage

- Register a new account with email OTP verification
- Log in to access the personalized dashboard
- Browse and select from various career paths (Architecture, Business, Design, Engineering, Law, Logistics, Medical, Pharmacy, Police, Doctor)
- Explore detailed course paths for each career field
- Use the chatbot for personalized assistance and recommendations
- Contact support through the contact form for any queries

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/send-otp` - Send OTP for verification
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/forgot-password` - Send OTP for password reset
- `POST /api/auth/reset-password` - Reset password with OTP
- `GET /api/auth/user` - Get logged-in user details
- `POST /api/auth/contact` - Send contact message

## Deployment

The application is configured for deployment on Vercel with the following setup:

- Frontend deployed as a static build
- Backend API routes handled through serverless functions
- MongoDB connection optimized for serverless environments

## License

MIT
