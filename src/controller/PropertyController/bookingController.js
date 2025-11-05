// import Booking from "../../models/PropertyModel/PropertyBooking.js";
// import transporter from "../../config/mailConfig.js";

// // ---------------- CREATE BOOKING ----------------
// export const createBooking = async (req, res) => {
//   try {
//     const bookingData = req.body;

//     const newBooking = new Booking(bookingData);
//     await newBooking.save();

//     // Admin Notification Email
//     const adminMailOptions = {
//       from: process.env.MAIL_USER,
//       to: process.env.MAIL_RECEIVER,
//       subject: `New Booking Request - ${bookingData.fullName}`,
//       html: `
//         <h2>New Booking Received</h2>
//        <p><strong>Property Name:</strong> ${bookingData.property}</p>
//         <p><strong>Full Name:</strong> ${bookingData.fullName}</p>
//         <p><strong>Email:</strong> ${bookingData.email}</p>
//         <p><strong>Mobile:</strong> ${bookingData.mobile}</p>
//         <p><strong>Country:</strong> ${bookingData.country}</p>
//         <p><strong>Check-In:</strong> ${bookingData.checkIn}</p>
//         <p><strong>Check-Out:</strong> ${bookingData.checkOut}</p>
//         <p><strong>Guests:</strong> ${bookingData.guests}</p>
//         <p><strong>Rooms:</strong> ${bookingData.rooms}</p>
//         <hr/>
//         <p>Submitted on: ${new Date().toLocaleString()}</p>
//       `,
//     };

//     // User Confirmation Email
//     const userMailOptions = {
//       from: process.env.MAIL_USER,
//       to: bookingData.email,
//       subject: `Booking Confirmation - Thank You ${bookingData.fullName}`,
//       html: `
//         <h2>Booking Confirmation</h2>
//         <p>Dear ${bookingData.fullName},</p>
//         <p>Thank you for your booking! Here are your details:</p>
//         <ul>
//           <li><strong>Check-In:</strong> ${bookingData.checkIn}</li>
//           <li><strong>Check-Out:</strong> ${bookingData.checkOut}</li>
//           <li><strong>Guests:</strong> ${bookingData.guests}</li>
//           <li><strong>Rooms:</strong> ${bookingData.rooms}</li>
//             <li><strong>Rooms:</strong> ${bookingData.property}</li>
//         </ul>
//         <p>We’ll contact you soon to confirm your reservation.</p>
//         <p>Best regards,<br/>The Booking Team</p>
//       `,
//     };

//     await transporter.sendMail(adminMailOptions);
//     await transporter.sendMail(userMailOptions);

//     res.status(200).json({
//       message: "Booking saved successfully and emails sent!",
//       booking: newBooking,
//     });
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     res.status(500).json({ message: "Error submitting booking", error: error.message });
//   }
// };

// // ---------------- GET ALL BOOKINGS ----------------
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find().sort({ createdAt: -1 }); // latest first
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
//   }
// };


import Booking from "../../models/PropertyModel/PropertyBooking.js";
import transporter from "../../config/mailConfig.js";

// ---------------- CREATE BOOKING ----------------
export const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    // Basic validation
    if (!bookingData.fullName || !bookingData.email || !bookingData.checkIn || !bookingData.checkOut) {
      return res.status(400).json({ message: "Missing required booking fields." });
    }

    // Save booking
    const newBooking = await Booking.create(bookingData);

    // Admin Notification Email
    const adminMailOptions = {
      from: `"Victoria Falls Booking" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_RECEIVER,
      subject: `New Booking Request - ${bookingData.fullName}`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Full Name:</strong> ${bookingData.fullName}</p>
        <p><strong>Email:</strong> ${bookingData.email}</p>
        <p><strong>Mobile:</strong> ${bookingData.mobile}</p>
        <p><strong>Country:</strong> ${bookingData.country}</p>
        <p><strong>Check-In:</strong> ${bookingData.checkIn}</p>
        <p><strong>Check-Out:</strong> ${bookingData.checkOut}</p>
        <p><strong>Guests:</strong> ${bookingData.guests}</p>
        <p><strong>Rooms:</strong> ${bookingData.rooms}</p>
        <hr/>
        <p>Submitted on: ${new Date().toLocaleString()}</p>
      `,
    };

    // User Confirmation Email
    const userMailOptions = {
      from: `"Victoria Falls Booking" <${process.env.MAIL_USER}>`,
      to: bookingData.email,
      subject: `Booking Confirmation - Thank You ${bookingData.fullName}`,
      html: `
        <h2>Booking Confirmation</h2>
        <p>Dear ${bookingData.fullName},</p>
        <p>Thank you for your booking! Here are your details:</p>
        <ul>
          <li><strong>Check-In:</strong> ${bookingData.checkIn}</li>
          <li><strong>Check-Out:</strong> ${bookingData.checkOut}</li>
          <li><strong>Guests:</strong> ${bookingData.guests}</li>
          <li><strong>Rooms:</strong> ${bookingData.rooms}</li>
        </ul>
        <p>We’ll contact you soon to confirm your reservation.</p>
        <p>Best regards,<br/>Victoria Falls Team</p>
      `,
    };

    // Send emails safely
    try {
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions),
      ]);
    } catch (emailError) {
      console.error("⚠️ Email sending failed:", emailError);
    }

    res.status(201).json({
      message: "✅ Booking saved successfully!",
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    res.status(500).json({ message: "Error submitting booking", error: error.message });
  }
};

// ---------------- GET ALL BOOKINGS ----------------
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// ---------------- GET SINGLE BOOKING BY ID ----------------
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("❌ Error fetching booking:", error);
    res.status(500).json({ message: "Failed to fetch booking", error: error.message });
  }
};

// ---------------- UPDATE BOOKING ----------------
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "✅ Booking updated successfully!",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("❌ Error updating booking:", error);
    res.status(500).json({ message: "Failed to update booking", error: error.message });
  }
};

// ---------------- DELETE BOOKING ----------------
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "🗑️ Booking deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting booking:", error);
    res.status(500).json({ message: "Failed to delete booking", error: error.message });
  }
};

