# Courses Path Generator

A full-stack web application for generating personalized course paths to help users learn and advance in their chosen fields.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, OTP verification
- **Email Service**: Nodemailer for OTP emails

## Features

- User registration and login with email OTP verification
- Forgot password functionality with OTP reset
- Personalized dashboard
- Course path generation
- Chatbot for assistance
- Responsive design with dark/light theme toggle

## Setup

### Prerequisites

- Node.js
- MongoDB
- Email service credentials (for OTP)

### Installation

1. Clone the repository
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`
4. Set up environment variables in `backend/.env`
5. Start backend: `cd backend && npm start`
6. Start frontend: `cd frontend && npm run dev`

## Usage

- Register a new account with email verification
- Log in to access the dashboard
- Use the chatbot for course recommendations
- Generate personalized learning paths

## License

MIT
