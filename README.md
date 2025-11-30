# Courses Path Generator

A full-stack web application for generating personalized course paths to help users learn and advance in their chosen fields.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, React Router, Google OAuth
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Authentication**: JWT, OTP verification, Google OAuth 2.0
- **Email Service**: SendGrid (for OTPs and contact form)
- **AI Integration**: Google Generative AI (Gemini) for the educational chatbot

## Features

- **User Authentication**:
  - Secure Register/Login with email & password.
  - Email OTP Verification for account validation.
  - Google Login for one-click access.
  - Forgot Password flow with OTP reset.
- **Personalized Dashboard**: Track your profile and explore career options.
- **Career Roadmaps**: Comprehensive guides for various fields including:
  - Architecture, Business, Design, Engineering, Law, Logistics, Medical, Pharmacy, Police.
- **AI Chatbot**:
  - Personalized educational assistance powered by Google Gemini.
  - Guest access mode for quick queries.
- **Responsive Design**: Mobile-first UI with a seamless Dark/Light theme toggle.

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- SendGrid API Key (for email services)
- Google Generative AI API Key (for Chatbot)
- Google Cloud Console Project (for OAuth Client ID)

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

6. Set up environment variables in `frontend/.env`:

   ```
   VITE_API_BASE_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```

7. In a new terminal, start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

8. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal).

## Usage

 - **Sign Up/In**: Register via email (verify with OTP) or use Google Login.
 - **Dashboard**: Browse career cards to view detailed path information (eligibility, exams, colleges).
 - **Chatbot**: Ask educational questions to the AI assistant.
 - **Contact**: Use the contact form to send messages to the admin.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST api/auth/google` - Google OAuth authentication
- `POST /api/auth/send-otp` - Send OTP for verification
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/forgot-password` - Send OTP for password reset
- `POST /api/auth/reset-password` - Reset password with OTP
- `GET /api/auth/user` - Get logged-in user details
- `POST /api/auth/contact` - Send contact message

### Chatbot 

 - `POST /api/chatbot/chat` - Authenticated chat (usage tracked)
 - POST `/api/chatbot/chat/guest` - Guest chat endpoint

## Deployment

The application is configured for deployment on Vercel with the following setup:

- Frontend deployed as a static build
- Backend API routes handled through serverless functions
- MongoDB connection optimized for serverless environments
