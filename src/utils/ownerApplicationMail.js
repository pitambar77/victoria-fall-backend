import transporter from "../config/mailConfig.js";
import { generateApplicationPDF } from "../utils/generateApplicationPDF.js";
import { generateImagesZip } from "../utils/generateImagesZip.js";

export const sendOwnerApplicationMail = async (application) => {
  try {
    /* =========================================
       USER EMAIL (THANK YOU MESSAGE)
    ========================================= */

    const userMail = {
      from: `"Where To Africa" <${process.env.MAIL_USER}>`,
      to: application.email,
      subject: `"Thank You – Your ${application.roleType} Application Has Been Received"`,

      html: `
<div style="font-family:Arial;background:#f3f3f3;padding:30px 0;">

  <div style="max-width:650px;margin:auto;background:white;border:1px solid #ddd">

    <div style="background:#ab8c51;padding:20px;text-align:center">
      <img src="https://whereto.africa/wp-content/uploads/2020/06/whereto-logo-wh.png"
           style="height:60px"/>
    </div>

    <div style="padding:30px;color:#333">

      <h2>Hello ${application.fullName},</h2>

      <p>
        Thank you for submitting your property application to 
        <b>Where To Africa</b>.
      </p>

      <p>
        We have successfully received your details and our team will review
        your submission shortly.
      </p>

      <h3>Your Submitted Details</h3>

      <table style="width:100%;margin-top:10px">

        <tr>
          <td style="padding:6px 0;width:150px"><b>Property Name:</b></td>
          <td>${application.propertyName || "N/A"}</td>
        </tr>

        <tr>
          <td style="padding:6px 0"><b>Property Type:</b></td>
          <td>${application.propertyType || "N/A"}</td>
        </tr>

        <tr>
          <td style="padding:6px 0"><b>Rooms:</b></td>
          <td>${application.rooms}</td>
        </tr>

        <tr>
          <td style="padding:6px 0"><b>Capacity:</b></td>
          <td>${application.capacity} Guests</td>
        </tr>

      </table>

      <p style="margin-top:20px">
        Our team will contact you if additional information is required.
      </p>

      <p>
        Best regards,<br>
        <b>Where To Africa Team</b>
      </p>

    </div>

    <div style="background:#ab8c51;color:white;text-align:center;padding:15px;font-size:14px">
      © ${new Date().getFullYear()} Where To Africa Travel (Pty) Ltd
    </div>

  </div>

</div>
`,
    };

    await transporter.sendMail(userMail);

    /* =========================================
       GENERATE FILES
    ========================================= */

    const pdfPath = await generateApplicationPDF(application);
    const zipPath = await generateImagesZip(application);

    const mailOptions = {
      from: `"Victoria Falls" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_RECEIVER,
      replyTo: application.email,
      subject: `New Owner Application - ${application.propertyName}`,

      html: `
<div style="font-family:Arial, Helvetica, sans-serif;background:#f3f3f3;padding:30px 0;">
  
  <div style="max-width:700px;margin:auto;background:#ffffff;border:1px solid #ddd;">

    <!-- HEADER -->
    <div style="background:#ab8c51;padding:20px;display:flex;align-items:center;justify-content:space-between;">
      
      <div>
        <img src="https://whereto.africa/wp-content/uploads/2020/06/whereto-logo-wh.png" 
             style="height:60px"/>
      </div>

     

    </div>


    <!-- CONTENT -->
    <div style="padding:30px;color:#333;line-height:1.6;">

      <p>Dear Admin,</p>

      <p>
        A new property owner application has been submitted through the website.
      </p>

      <!-- PROPERTY TITLE -->
      <h2 style="margin-top:10px;color:#ff5a00;">
        ${application.propertyName || "Property Listing"}
      </h2>


      <!-- HERO IMAGE -->
      ${
        application.heroImage
          ? `
      <img src="${application.heroImage}" 
           style="width:100%; height:50%;border-radius:6px;margin:15px 0"/>
      `
          : ""
      }


      <!-- OWNER DETAILS -->
      <h3 style="border-bottom:1px solid #ddd;padding-bottom:6px;">Owner Details</h3>

      <table style="width:100%;margin-top:10px;font-size:14px;">
        <tr>
          <td style="padding:6px 0;width:160px;"><b>Name:</b></td>
          <td>${application.fullName}</td>
        </tr>

        <tr>
          <td style="padding:6px 0;"><b>Email:</b></td>
          <td>${application.email}</td>
        </tr>

        <tr>
          <td style="padding:6px 0;"><b>Phone:</b></td>
          <td>${application.phone}</td>
        </tr>

        <tr>
          <td style="padding:6px 0;"><b>Business Name:</b></td>
          <td>${application.businessName || "N/A"}</td>
        </tr>
      </table>


      <!-- PROPERTY DETAILS -->
      <h3 style="margin-top:25px;border-bottom:1px solid #ddd;padding-bottom:6px;">Property Details</h3>

      <table style="width:100%;margin-top:10px;font-size:14px;">
        <tr>
          <td style="padding:6px 0;width:160px;"><b>Property Type:</b></td>
          <td>${application.propertyType || "N/A"}</td>
        </tr>

        <tr>
          <td style="padding:6px 0;"><b>Rooms:</b></td>
          <td>${application.rooms || 0}</td>
        </tr>

        <tr>
          <td style="padding:6px 0;"><b>Bathrooms:</b></td>
          <td>${application.bathrooms || 0}</td>
        </tr>

        <tr>
          <td style="padding:6px 0;"><b>Capacity:</b></td>
          <td>${application.capacity || 0} Guests</td>
        </tr>

        <tr>
          <td style="padding:6px 0;"><b>Address:</b></td>
          <td>${application.address || "N/A"}</td>
        </tr>
      </table>


      <!-- DESCRIPTION -->
      <h3 style="margin-top:25px;border-bottom:1px solid #ddd;padding-bottom:6px;">Description</h3>

      <p style="margin-top:10px;">
        ${application.description || "No description provided."}
      </p>


      <!-- DOWNLOAD NOTE -->
      <div style="margin-top:25px;padding:15px;background:#f6f6f6;border-left:4px solid #ff5a00;">
        <b>Attachments Included:</b><br/>
        ✔ Full Application Report (PDF)<br/>
        ✔ Property Images (ZIP)
      </div>

    </div>


    <!-- FOOTER -->
    <div style="background:#ab8c51;color:#ffffff;text-align:center;padding:20px;font-size:14px;">
      © ${new Date().getFullYear()} Where To Africa Travel (Pty) Ltd
     
    </div>

  </div>

</div>
`,
      attachments: [
        {
          filename: "application-report.pdf",
          path: pdfPath,
        },
        {
          filename: "property-images.zip",
          path: zipPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Mail sending failed:", error);
  }
};
