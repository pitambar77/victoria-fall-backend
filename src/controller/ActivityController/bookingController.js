import ActBooking from "../../models/ActivityModel/ActivityBooking.js";
import transporter from "../../config/mailConfig.js";

// ---------------- CREATE BOOKING ----------------
export const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    // Basic validation
    if (
      !bookingData.fullName ||
      !bookingData.email ||
      !bookingData.activityDate
    ) {
      return res
        .status(400)
        .json({ message: "Missing required booking fields." });
    }

    // Save booking
    const newBooking = await ActBooking.create(bookingData);

    // await newBooking.save();

    // Admin Notification Email
    // const adminMailOptions = {
    //   from: `"Victoria Falls Booking" <${process.env.MAIL_USER}>`,
    //   to: process.env.ADMIN_EMAIL,
    //   subject: `New Booking Request - ${bookingData.fullName}`,
    //   html: `
    //     <h2>New Booking Received</h2>
    //     <p><strong>Full Name:</strong> ${bookingData.fullName}</p>
    //     <p><strong>Email:</strong> ${bookingData.email}</p>
    //     <p><strong>Mobile:</strong> ${bookingData.mobile}</p>
    //     <p><strong>Country:</strong> ${bookingData.country}</p>
    //     <p><strong>Activity Date:</strong> ${bookingData.activityDate}</p>

    //     <p><strong>Adult:</strong> ${bookingData.adult}</p>
    //     <p><strong>Child:</strong> ${bookingData.child}</p>

    //     <p><strong>Infant:</strong> ${bookingData.infant}</p>

    //     <p><strong>Pick up Location:</strong> ${bookingData.pickLocation}</p>
    //     <p><strong>Message:</strong> ${bookingData.message}</p>
    //     <p><strong>Activity:</strong> ${bookingData.activity}</p>

    //     <hr/>
    //     <p>Submitted on: ${new Date().toLocaleString()}</p>
    //   `,
    // };

    const adminMailOptions = {
      from: `"Victoria Falls Booking" <${process.env.MAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: bookingData.email,
      subject: `New Booking Request - ${bookingData.fullName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>

<body style="margin:0;padding:40px;background:#f4f4f4;font-family:Arial,sans-serif;">

<table width="700" align="center" cellpadding="0" cellspacing="0"
style="background:#fff;border:1px solid #e4e4e4;">

<tr>
<td style="padding:30px;border-bottom:3px solid #cda24c;">

<table width="100%">
<tr>

<td>
<img
src="https://victoriafallsbnb.com/bed-and-breakfast-logo.webp"
width="60"
/>
</td>

<td align="right">
<h2 style="margin:0;color:#cda24c;">
Victoria Falls B&B Booking
</h2>
</td>

</tr>
</table>

</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;">
New Activity Booking
</h2>

<p>
A new activity booking has been submitted through the website.
</p>

<h3>Booking Details</h3>

<table width="100%" cellpadding="8" cellspacing="0">

<tr>
<td width="180"><strong>Full Name</strong></td>
<td>${bookingData.fullName}</td>
</tr>

<tr>
<td><strong>Email</strong></td>
<td>${bookingData.email}</td>
</tr>

<tr>
<td><strong>Mobile</strong></td>
<td>${bookingData.mobile}</td>
</tr>

<tr>
<td><strong>Country</strong></td>
<td>${bookingData.country}</td>
</tr>

<tr>
<td><strong>Activity</strong></td>
<td>${bookingData.activity}</td>
</tr>

<tr>
<td><strong>Activity Date</strong></td>
<td>${bookingData.activityDate}</td>
</tr>

<tr>
<td><strong>Adults</strong></td>
<td>${bookingData.adult}</td>
</tr>

<tr>
<td><strong>Children</strong></td>
<td>${bookingData.child}</td>
</tr>

<tr>
<td><strong>Infants</strong></td>
<td>${bookingData.infant}</td>
</tr>

<tr>
<td><strong>Pickup Location</strong></td>
<td>${bookingData.pickLocation}</td>
</tr>

</table>

<h3 style="margin-top:35px;">
Customer Message
</h3>

<div style="
background:#fafafa;
border-left:5px solid #cda24c;
padding:20px;
line-height:24px;
">

${bookingData.message || "No message provided."}

</div>

<p style="margin-top:30px;">
Submitted On:
<strong>${new Date().toLocaleString()}</strong>
</p>

</td>
</tr>

<tr>
<td
style="
background:#cda24c;
padding:18px;
text-align:center;
color:#fff;
font-size:15px;
">

© ${new Date().getFullYear()} Victoria Falls B&B Booking

</td>
</tr>

</table>

</body>
</html>
`,
    };

    // User Confirmation Email
    // const userMailOptions = {
    //   from: `"Victoria Falls Booking" <${process.env.MAIL_USER}>`,
    //   to: bookingData.email,
    //   subject: `Booking Confirmation - Thank You ${bookingData.fullName}`,
    //   html: `
    //     <h2>Booking Confirmation</h2>
    //     <p>Dear ${bookingData.fullName},</p>
    //     <p>Thank you for your booking! Here are your details:</p>
    //     <ul>
    //       <li><strong>Activity date:</strong> ${bookingData.activityDate}</li>
    //       <li><strong>Adult:</strong> ${bookingData.adult}</li>
    //     <li><strong>Child:</strong> ${bookingData.child}</li>

    //     <li><strong>Infant:</strong> ${bookingData.infant}</li>

    //     <li><strong>Pick up Location:</strong> ${bookingData.pickLocation}</li>
    //     <li><strong>Messages:</strong> ${bookingData.message}</li>
    //     <li><strong>Activity:</strong> ${bookingData.activity}</li>
    //     </ul>
    //     <p>We’ll contact you soon to confirm your reservation.</p>
    //     <p>Best regards,<br/>Victoria Falls Team</p>
    //   `,
    // };

    const userMailOptions = {
      from: `"Victoria Falls Booking" <${process.env.MAIL_USER}>`,
      to: bookingData.email,
      subject: `Booking Confirmation - ${bookingData.fullName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>

<body style="margin:0;padding:40px;background:#f4f4f4;font-family:Arial,sans-serif;">

<table width="700" align="center" cellpadding="0" cellspacing="0"
style="background:#fff;border:1px solid #e4e4e4;">

<tr>
<td style="padding:30px;border-bottom:3px solid #cda24c;">

<table width="100%">
<tr>

<td>
<img
src="https://victoriafallsbnb.com/bed-and-breakfast-logo.webp"
width="60"
/>
</td>

<td align="right">
<h2 style="margin:0;color:#cda24c;">
Victoria Falls Booking
</h2>
</td>

</tr>
</table>

</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;">
Hello ${bookingData.fullName},
</h2>

<p>
Thank you for choosing
<strong>Victoria Falls B&B Booking.</strong>
</p>

<p>
We have successfully received your booking request. Our reservations team will review your booking and contact you shortly to confirm your reservation.
</p>

<h3>Your Booking Details</h3>

<table width="100%" cellpadding="8" cellspacing="0">

<tr>
<td width="180"><strong>Activity</strong></td>
<td>${bookingData.activity}</td>
</tr>

<tr>
<td><strong>Activity Date</strong></td>
<td>${bookingData.activityDate}</td>
</tr>

<tr>
<td><strong>Adults</strong></td>
<td>${bookingData.adult}</td>
</tr>

<tr>
<td><strong>Children</strong></td>
<td>${bookingData.child}</td>
</tr>

<tr>
<td><strong>Infants</strong></td>
<td>${bookingData.infant}</td>
</tr>

<tr>
<td><strong>Pickup Location</strong></td>
<td>${bookingData.pickLocation}</td>
</tr>

<tr>
<td><strong>Country</strong></td>
<td>${bookingData.country}</td>
</tr>

<tr>
<td><strong>Email</strong></td>
<td>${bookingData.email}</td>
</tr>

<tr>
<td><strong>Mobile</strong></td>
<td>${bookingData.mobile}</td>
</tr>

</table>

<h3 style="margin-top:35px;">
Your Message
</h3>

<div style="
background:#fafafa;
border-left:5px solid #cda24c;
padding:20px;
line-height:24px;
">

${bookingData.message || "No message provided."}

</div>

<p style="margin-top:35px;">
If you have any questions before your activity, simply reply to this email and one of our travel specialists will be happy to assist you.
</p>

<p style="margin-top:30px;">
Thank you once again for choosing
<strong>Victoria Falls Booking.</strong>
</p>

<p>

Kind Regards,

<br><br>

<strong>Victoria Falls B&B Team</strong>

</p>

</td>
</tr>

<tr>

<td
style="
background:#cda24c;
padding:18px;
text-align:center;
color:#fff;
font-size:15px;
">

© ${new Date().getFullYear()} Victoria Falls Booking

</td>

</tr>

</table>

</body>
</html>
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
    res
      .status(500)
      .json({ message: "Error submitting booking", error: error.message });
  }
};

// ---------------- GET ALL BOOKINGS ----------------
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await ActBooking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch bookings", error: error.message });
  }
};

// ---------------- GET SINGLE BOOKING BY ID ----------------
export const getBookingById = async (req, res) => {
  try {
    const booking = await ActBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("❌ Error fetching booking:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch booking", error: error.message });
  }
};

// ---------------- UPDATE BOOKING ----------------
export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await ActBooking.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "✅ Booking updated successfully!",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("❌ Error updating booking:", error);
    res
      .status(500)
      .json({ message: "Failed to update booking", error: error.message });
  }
};

// ---------------- DELETE BOOKING ----------------
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await ActBooking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "🗑️ Booking deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting booking:", error);
    res
      .status(500)
      .json({ message: "Failed to delete booking", error: error.message });
  }
};
