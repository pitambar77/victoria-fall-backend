// import Contactus from "../../models/ContactusModel/ContactUs.js";
// import transporter from "../../config/mailConfig.js";

// // ---------------- CREATE BOOKING ----------------
// export const createBooking = async (req, res) => {
//   try {
//     const bookingData = req.body;

//     const newBooking = new Contactus(bookingData);
//     await newBooking.save();

//     // Admin Notification Email
//     const adminMailOptions = {
//       from: `"Where To Africa" <${process.env.MAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL,
//       subject: `New Booking Request - ${bookingData.subject}`,
//       html: `
//         <h2>New Booking Received</h2>
//         <p><strong>Full Name:</strong> ${bookingData.firstName} ${bookingData.lastName}</p>

//         <p><strong>Email:</strong> ${bookingData.email}</p>
//         <p><strong>Mobile:</strong> ${bookingData.mobile}</p>
//         <p><strong>Subject:</strong> ${bookingData.subject}</p>
//         <p><strong>Message:</strong> ${bookingData.message}</p>

//         <hr/>
//         <p>Submitted on: ${new Date().toLocaleString()}</p>
//       `,
//     };

//     // User Confirmation Email
//     const userMailOptions = {
//       from: `"Where To Africa" <${process.env.MAIL_USER}>`,
//       to: bookingData.email,
//       subject: `Booking Confirmation - Thank You ${bookingData.firstName}`,
//       html: `
//         <h2>Booking Confirmation</h2>
//         <p>Dear ${bookingData.firstName},</p>
//         <p>Thank you for your booking! Here are your details:</p>
//         <ul>
//           <li><strong>Subject:</strong> ${bookingData.subject}</li>
//           <li><strong>Message:</strong> ${bookingData.message}</li>
//           <li><strong>Email:</strong> ${bookingData.email}</li>
//           <li><strong>Mobile:</strong> ${bookingData.mobile}</li>

//         </ul>
//         <p>We’ll contact you soon to confirm your reservation.</p>
//         <p>Best regards,<br/>The Booking Team</p>
//       `,
//     };

//     await Promise.all([
//       transporter.sendMail(adminMailOptions),
//       transporter.sendMail(userMailOptions),
//     ]);

//     res.status(200).json({
//       message: "Booking saved successfully and emails sent!",
//       booking: newBooking,
//     });
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     res
//       .status(500)
//       .json({ message: "Error submitting booking", error: error.message });
//   }
// };

// // ---------------- GET ALL BOOKINGS ----------------
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Contactus.find().sort({ createdAt: -1 }); // latest first
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to fetch bookings", error: error.message });
//   }
// };

import Contactus from "../../models/ContactusModel/ContactUs.js";
import transporter from "../../config/mailConfig.js";

// ---------------- CREATE BOOKING ----------------
export const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    // Validate required fields
    if (
      !bookingData.firstName ||
      !bookingData.lastName ||
      !bookingData.email ||
      !bookingData.mobile ||
      !bookingData.subject
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // Save booking to MongoDB
    const newBooking = await Contactus.create(bookingData);

    // ===========================
    // Admin Email
    // ===========================
    // const adminMailOptions = {
    //   from: `"Where To Africa" <${process.env.MAIL_USER}>`,
    //   to: process.env.ADMIN_EMAIL,
    //   replyTo: bookingData.email,
    //   subject: `New Booking Request - ${bookingData.subject}`,
    //   html: `
    //     <h2>New Booking Received</h2>

    //     <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
    //       <tr>
    //         <td><strong>Full Name</strong></td>
    //         <td>${bookingData.firstName} ${bookingData.lastName}</td>
    //       </tr>

    //       <tr>
    //         <td><strong>Email</strong></td>
    //         <td>${bookingData.email}</td>
    //       </tr>

    //       <tr>
    //         <td><strong>Mobile</strong></td>
    //         <td>${bookingData.mobile}</td>
    //       </tr>

    //       <tr>
    //         <td><strong>Subject</strong></td>
    //         <td>${bookingData.subject}</td>
    //       </tr>

    //       <tr>
    //         <td><strong>Message</strong></td>
    //         <td>${bookingData.message || "N/A"}</td>
    //       </tr>
    //     </table>

    //     <br>

    //     <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    //   `,
    // };

    const adminMailOptions = {
      from: `"Where To Africa" <${process.env.MAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: bookingData.email,
      subject: `New Contact Enquiry - ${bookingData.subject}`,
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
<h2 style="color:#cda24c;margin:0;">
Where To Africa
</h2>
</td>

</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;">
New Contact Enquiry
</h2>

<p>
A new enquiry has been submitted from your website.
</p>

<h3>Contact Details</h3>

<table width="100%" cellpadding="8" cellspacing="0">

<tr>
<td width="180"><strong>First Name</strong></td>
<td>${bookingData.firstName}</td>
</tr>

<tr>
<td><strong>Last Name</strong></td>
<td>${bookingData.lastName}</td>
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
<td><strong>Subject</strong></td>
<td>${bookingData.subject}</td>
</tr>

</table>

<h3 style="margin-top:35px;">
Message
</h3>

<div style="
background:#fafafa;
border-left:5px solid #cda24c;
padding:20px;
font-size:15px;
line-height:24px;
">

${bookingData.message || "No message"}

</div>

<p style="margin-top:30px;">
Submitted:
<strong>
${new Date().toLocaleString()}
</strong>
</p>

</td>
</tr>

<tr>
<td
style="
background:#cda24c;
padding:18px;
color:#fff;
text-align:center;
font-size:15px;
">

© ${new Date().getFullYear()} Where To Africa

</td>
</tr>

</table>

</body>
</html>
`,
    };

    // ===========================
    // Customer Email
    // ===========================
    // const userMailOptions = {
    //   from: `"Where To Africa" <${process.env.MAIL_USER}>`,
    //   to: bookingData.email,
    //   subject: `Thank You for Contacting Where To Africa`,
    //   html: `
    //     <h2>Thank You, ${bookingData.firstName}!</h2>

    //     <p>
    //       We have successfully received your enquiry.
    //     </p>

    //     <p>Your submitted details are:</p>

    //     <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
    //       <tr>
    //         <td><strong>Name</strong></td>
    //         <td>${bookingData.firstName} ${bookingData.lastName}</td>
    //       </tr>

    //       <tr>
    //         <td><strong>Email</strong></td>
    //         <td>${bookingData.email}</td>
    //       </tr>

    //       <tr>
    //         <td><strong>Mobile</strong></td>
    //         <td>${bookingData.mobile}</td>
    //       </tr>

    //       <tr>
    //         <td><strong>Subject</strong></td>
    //         <td>${bookingData.subject}</td>
    //       </tr>

    //       <tr>
    //         <td><strong>Message</strong></td>
    //         <td>${bookingData.message || "N/A"}</td>
    //       </tr>
    //     </table>

    //     <br>

    //     <p>
    //       Our team will review your enquiry and get back to you as soon as possible.
    //     </p>

    //     <br>

    //     <p>
    //       Best Regards,<br>
    //       <strong>Where To Africa Team</strong>
    //     </p>
    //   `,
    // };

    const userMailOptions = {
      from: `"Where To Africa" <${process.env.MAIL_USER}>`,
      to: bookingData.email,
      subject: "Thank You for Contacting Where To Africa",
      html: `
<!DOCTYPE html>
<html>

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

<h2 style="color:#cda24c;margin:0;">
Where To Africa
</h2>

</td>

</tr>

</table>

</td>

</tr>

<tr>

<td style="padding:40px;">

<h2 style="margin-top:0;">
Hello ${bookingData.firstName},
</h2>

<p>

Thank you for contacting
<strong>Where To Africa.</strong>

</p>

<p>

We have successfully received your enquiry.

Our safari consultant will contact you shortly.

</p>

<h3>
Your Submitted Details
</h3>

<table width="100%" cellpadding="8">

<tr>

<td width="180">
<strong>Name</strong>
</td>

<td>
${bookingData.firstName} ${bookingData.lastName}
</td>

</tr>

<tr>

<td>
<strong>Email</strong>
</td>

<td>
${bookingData.email}
</td>

</tr>

<tr>

<td>
<strong>Mobile</strong>
</td>

<td>
${bookingData.mobile}
</td>

</tr>

<tr>

<td>
<strong>Subject</strong>
</td>

<td>
${bookingData.subject}
</td>

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

${bookingData.message || "No message"}

</div>

<p style="margin-top:35px;">

Thank you once again for choosing
<strong>Where To Africa.</strong>

</p>

<p>

Best Regards,

<br><br>

<strong>Where To Africa Team</strong>

</p>

</td>

</tr>

<tr>

<td
style="
background:#cda24c;
color:#fff;
padding:18px;
text-align:center;
">

© ${new Date().getFullYear()} Where To Africa

</td>

</tr>

</table>

</body>

</html>
`,
    };

    // Send emails (don't fail booking if email fails)
    try {
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions),
      ]);

      console.log("✅ Emails sent successfully");
    } catch (emailError) {
      console.error("❌ Email Error:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Booking submitted successfully.",
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Booking Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit booking.",
      error: error.message,
    });
  }
};

// ---------------- GET ALL BOOKINGS ----------------
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Contactus.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookings.",
      error: error.message,
    });
  }
};
