const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send OTP email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Verification Code',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Verification Code</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #0a0f23;
            min-height: 100vh;
            position: relative;
            overflow: hidden;
          }



          .email-container {
            position: relative;
            z-index: 2;
            max-width: 600px;
            margin: 40px auto;
            padding: 0 20px;
          }

          .email-card {
            background: rgba(31, 41, 55, 0.5);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(6, 182, 212, 0.5);
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
                        0 0 20px rgba(6, 182, 212, 0.1);
          }

          .logo {
            text-align: center;
            margin-bottom: 30px;
          }

          .logo-text {
            background: linear-gradient(135deg, #ec4899, #f97316, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -0.5px;
            margin: 0;
            text-transform: uppercase;
          }

          .headline {
            text-align: center;
            color: #ffffff;
            font-size: 24px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 30px;
            font-family: sans-serif;
          }

          .otp-container {
            background: #f4f4f4;
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            margin: 30px 0;
            border: 2px solid rgba(6, 182, 212, 0.2);
          }

          .otp-code {
            font-size: 42px;
            font-weight: 900;
            color: #000000;
            letter-spacing: 12px;
            font-family: 'Courier New', monospace;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .body-text {
            color: #9ca3af;
            font-size: 14px;
            line-height: 1.6;
            text-align: center;
            margin: 20px 0;
          }

          .footer {
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(6, 182, 212, 0.2);
          }

          .footer-text {
            margin: 5px 0;
          }

          @media (max-width: 640px) {
            .email-card {
              padding: 30px 20px;
              border-radius: 16px;
            }

            .logo-text {
              font-size: 24px;
            }

            .headline {
              font-size: 20px;
            }

            .otp-code {
              font-size: 36px;
              letter-spacing: 8px;
            }
          }
        </style>
      </head>
      <body>

        <div class="email-container">
          <div class="email-card">
            <div class="logo">
              <h1 class="logo-text">GYAN VISTARA</h1>
            </div>

            <h2 class="headline">Your Verification Code</h2>

            <div class="otp-container">
              <p class="otp-code">${otp.slice(0, 3)} ${otp.slice(3)}</p>
            </div>

            <div class="body-text">
              <p>This code will expire in 10 minutes.</p>
              <p>If you did not request this code, please ignore this email.</p>
            </div>

            <div class="footer">
              <p class="footer-text">Best regards,</p>
              <p class="footer-text">GyanVistara Team</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

module.exports = { sendOtpEmail };
