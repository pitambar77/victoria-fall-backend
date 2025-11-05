import Contactus from "../../models/ContactusModel/ContactUs.js";
import transporter from "../../config/mailConfig.js";

// ---------------- CREATE BOOKING ----------------
export const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    const newBooking = new Contactus(bookingData);
    await newBooking.save();

    // Admin Notification Email
    const adminMailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_RECEIVER,
      subject: `New Booking Request - ${bookingData.subject}`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Full Name:</strong> ${bookingData.firstName} ${bookingData.lastName}</p>
        
        <p><strong>Email:</strong> ${bookingData.email}</p>
        <p><strong>Mobile:</strong> ${bookingData.mobile}</p>
        <p><strong>Subject:</strong> ${bookingData.subject}</p>
        <p><strong>Message:</strong> ${bookingData.message}</p>
       
        <hr/>
        <p>Submitted on: ${new Date().toLocaleString()}</p>
      `,
    };

    // User Confirmation Email
    const userMailOptions = {
      from: process.env.MAIL_USER,
      to: bookingData.email,
      subject: `Booking Confirmation - Thank You ${bookingData.firstName}`,
      html: `
        <h2>Booking Confirmation</h2>
        <p>Dear ${bookingData.firstName},</p>
        <p>Thank you for your booking! Here are your details:</p>
        <ul>
          <li><strong>Subject:</strong> ${bookingData.subject}</li>
          <li><strong>Message:</strong> ${bookingData.message}</li>
          <li><strong>Email:</strong> ${bookingData.email}</li>
          <li><strong>Mobile:</strong> ${bookingData.mobile}</li>
            
        </ul>
        <p>We’ll contact you soon to confirm your reservation.</p>
        <p>Best regards,<br/>The Booking Team</p>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({
      message: "Booking saved successfully and emails sent!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error submitting booking", error: error.message });
  }
};

// ---------------- GET ALL BOOKINGS ----------------
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Contactus.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};