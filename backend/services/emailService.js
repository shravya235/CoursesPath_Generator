const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send OTP email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: `GyanVistara <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your GyanVistara Verification Code',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Verification Code</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', Arial, sans-serif; /* */
            background-color: #0a0f23; /* Dark background */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          .email-container {
            max-width: 600px;
            margin: 40px auto;
            padding: 0 20px;
          }
          .email-card {
            background-color: #111827; /* Solid dark card background */
            border: 1px solid #0e7490; /* Solid cyan border */
            border-radius: 16px;
            padding: 35px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          }
          .logo {
            text-align: center;
            margin-bottom: 25px;
          }
          .logo-text {
            /* Gradient text effect */
            background: linear-gradient(135deg, #8A2BE2, #EC4899, #00FFFF);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            /* Fallback color */
            color: #E5E7EB;
            font-size: 26px;
            font-weight: 900;
            letter-spacing: 1.5px;
            margin: 0;
            text-transform: uppercase;
          }
          .headline {
            text-align: center;
            color: #E5E7EB;
            font-size: 22px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
          }
          .body-text {
            color: #D1D5DB;
            font-size: 15px;
            line-height: 1.6;
            text-align: center;
            margin: 15px 0;
            font-weight: 400;
          }
          .otp-container {
            background-color: #1F2937;
            border-radius: 12px;
            padding: 20px;
            text-align: center; /* Ensure container aligns center */
            margin: 25px 0;
          }
          .otp-code {
            font-size: 38px;
            font-weight: 800;
            color: #FFFFFF;
            letter-spacing: 6px;
            font-family: 'Inter', Arial, sans-serif; /* Changed font */
            margin: 0;
            text-align: center; /* Ensure text itself is centered */
            user-select: all;
            -webkit-user-select: all;
            -moz-user-select: all;
          }
          /* Removed .hidden-otp class */
          .footer {
            text-align: center;
            color: #9CA3AF;
            font-size: 12px;
            margin-top: 25px;
            padding-top: 15px;
            border-top: 1px solid #0e7490;
          }
          .footer-text {
            margin: 4px 0;
            line-height: 1.5;
            color: #9CA3AF; /* Explicit color */
          }
          @media (max-width: 600px) {
            .email-card { padding: 25px; border-radius: 12px; }
            .logo-text { font-size: 22px; letter-spacing: 1px; }
            .headline { font-size: 20px; }
            .otp-code { font-size: 32px; letter-spacing: 4px; }
            .body-text, .footer, .footer-text { font-size: 14px; }
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
            <div class="body-text">
              <p>Hello,</p>
              <p>Your one-time password (OTP) for account verification is:</p>
            </div>
            <div class="otp-container">
              <p class="otp-code">
                ${otp}
              </p>
            </div>
            <div class="footer">
              <p class="footer-text">This code will expire in 10 minutes.</p>
              <p class="footer-text">If you did not request this code, please ignore this email or contact support.</p>
              <p class="footer-text" style="margin-top: 10px;">Best regards,</p>
              <p class="footer-text">GyanVistara Team</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await sgMail.send(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Failed to send OTP email');
  }
};

// Function to send contact email (No changes needed for OTP centering/span removal)
const sendContactEmail = async (name, email, message) => {
  const mailOptions = {
    from: `GyanVistara Contact Form <${process.env.EMAIL_USER}>`,
    to: 'gyanvistara.web@gmail.com',
    replyTo: email,
    subject: `New Contact Message from ${name} via GyanVistara`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800;900&display=swap" rel="stylesheet">
        <style>
          body {
            margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #0a0f23; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
          }
          .email-container { max-width: 600px; margin: 40px auto; padding: 0 20px; }
          .email-card { background-color: #111827; border: 1px solid #0e7490; border-radius: 16px; padding: 35px; box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); }
          .logo { text-align: center; margin-bottom: 25px; }
          .logo-text {
            background: linear-gradient(135deg, #8A2BE2, #EC4899, #00FFFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-fill-color: transparent;
            color: #E5E7EB; /* Fallback color */
            font-size: 26px; font-weight: 900; letter-spacing: 1.5px; margin: 0; text-transform: uppercase;
          }
          .headline { text-align: center; color: #E5E7EB; font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px; }
          .sender-info { color: #D1D5DB; font-size: 15px; text-align: center; margin: 15px 0; line-height: 1.6; font-weight: 400; }
          .sender-email-link { color: #22D3EE; text-decoration: none; font-weight: 500; }
          .sender-email-link:hover { text-decoration: underline; }
          .divider { height: 1px; background: #0e7490; margin: 25px 0; }
          .message-label { color: #9CA3AF; font-size: 14px; margin-bottom: 10px; display: block; font-weight: 500; }
          .message-container { background-color: #1F2937; border-radius: 12px; padding: 20px; margin-top: 10px; }
          .message-text { color: #E5E7EB; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap; word-wrap: break-word; font-weight: 400; }
          .footer { text-align: center; color: #9CA3AF; font-size: 12px; margin-top: 25px; padding-top: 15px; border-top: 1px solid #0e7490; }
           .footer-text { margin: 4px 0; line-height: 1.5; color: #9CA3AF; }
          @media (max-width: 600px) {
            .email-card { padding: 25px; border-radius: 12px; }
            .logo-text { font-size: 22px; letter-spacing: 1px;}
            .headline { font-size: 20px; }
            .sender-info, .message-text, .message-label { font-size: 14px; }
            .footer, .footer-text { font-size: 11px; }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-card">
            <div class="logo">
              <h1 class="logo-text">GYAN VISTARA</h1>
            </div>
            <h2 class="headline">New Contact Message</h2>
            <div class="sender-info">
              Received from: <strong>${name}</strong>
              <br>
              Email: <a href="mailto:${email}" class="sender-email-link">${email}</a>
            </div>
            <div class="divider"></div>
            <span class="message-label">Message:</span>
            <div class="message-container">
              <p class="message-text">${message}</p>
            </div>
            <div class="footer">
              <p class="footer-text">This message was sent from the GyanVistara contact form.</p>
              <p class="footer-text" style="margin-top: 10px;">Best regards,</p>
              <p class="footer-text">GyanVistara Team</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await sgMail.send(mailOptions);
    console.log('Contact email sent successfully');
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw new Error('Failed to send contact email');
  }
};

module.exports = { sendOtpEmail, sendContactEmail };