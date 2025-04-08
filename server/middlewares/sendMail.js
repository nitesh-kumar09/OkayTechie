import { createTransport } from "nodemailer";

const sendMail = async (email, subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password,
    },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OTP Verification</title>
<style>
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
  h1 { color: red; }
  .otp {
    font-size: 36px;
    color: #7b68ee;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>OTP Verification</h1>
    <p>Hello ${data.name}, your One-Time Password is:</p>
    <p class="otp">${data.otp}</p>
  </div>
</body>
</html>`;

  await transport.sendMail({
    from: process.env.Gmail,
    to: email,
    subject,
    html,
  });
};

export default sendMail;

export const sendForgotMail = async (subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password,
    },
  });

  const resetUrl = `${
    process.env.frontendurl
  }/reset-password/${data.token}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reset Password</title>
<style>
  .container {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  h1 { color: #5a2d82; }
  .button {
    background-color: #5a2d82;
    color: white;
    padding: 15px 25px;
    border-radius: 4px;
    text-decoration: none;
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Reset Your Password</h1>
    <p>Hello, click the button below to reset your password:</p>
    <a href="${resetUrl}" class="button">Reset Password</a>
    <p>If you didn’t request this, you can ignore it.</p>
  </div>
</body>
</html>`;

  await transport.sendMail({
    from: process.env.Gmail,
    to: data.email,
    subject,
    html,
  });
};
