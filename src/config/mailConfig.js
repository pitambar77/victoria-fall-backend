// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail", // or your SMTP provider
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// });

// export default transporter;

// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: Number(process.env.MAIL_PORT),
//   secure: true, // true ONLY for port 465
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },

//   // ⬇️ IMPORTANT: prevents hanging connections
//   connectionTimeout: 10000,
//   greetingTimeout: 10000,
//   socketTimeout: 10000,
// });

// export default transporter;

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: Number(process.env.MAIL_PORT) === 465,

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// Verify SMTP connection when the server starts
transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Server Connected");
  }
});

export default transporter;
