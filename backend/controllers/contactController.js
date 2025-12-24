import Contact from "../models/Contact.js";
// import transporter from "../config/mailer.js"; // Direct import (no await needed)

export const sendContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    await Contact.create({ name, email, subject, message });

    // await transporter.sendMail({
    //   from: `"LetNext Contact" <${process.env.EMAIL_USER}>`,
    //   to: process.env.EMAIL_USER,
    //   subject: `New Contact: ${subject}`,
    //   html: `
    //     <h3>New Contact Message</h3>
    //     <p><b>Name:</b> ${name}</p>
    //     <p><b>Email:</b> ${email}</p>
    //     <p><b>Message:</b><br/>${message.replace(/\n/g, "<br/>")}</p>
    //   `,
    // });

    return res.status(201).json({
      success: true,
      message: "Contact sent successfully",
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}; 