// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER?.trim(),
//     pass: process.env.EMAIL_PASS?.trim(), // 16-char app password
//   },
// });

// // Verify connection on startup
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("SMTP Verification FAILED:", error);
//   } else {
//     console.log("SMTP Ready - Ready to send emails via App Password");
//   }
// });

// export default transporter; // Export the transporter object directly