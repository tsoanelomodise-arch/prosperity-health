import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import https from "https";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to send email using direct SMTP (if configured) or falling back to FormSubmit
  app.post("/api/send-email", async (req, res) => {
    try {
      const emailData = req.body;

      // Check if SMTP is configured in env variables
      const hasSmtpConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

      if (hasSmtpConfig) {
        console.log("SMTP configured! Sending email directly via custom SMTP server...");
        
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        // Construct clean HTML details
        const emailRows = Object.entries(emailData)
          .filter(([key]) => !key.startsWith("_") && key !== "name")
          .map(([key, value]) => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #333333; width: 160px; font-family: sans-serif; font-size: 14px;">${key}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eeeeee; color: #555555; font-family: sans-serif; font-size: 14px;">${value}</td>
            </tr>
          `).join("");

        const htmlBody = `
          <div style="font-family: sans-serif; background-color: #f6f9fc; padding: 40px 10px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e1e8ed;">
              <div style="background-color: #0d9488; padding: 25px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.5px;">Prosperity Health</h1>
                <p style="color: #ccfbf1; margin: 5px 0 0 0; font-size: 14px;">New Form Submission Received</p>
              </div>
              <div style="padding: 30px 20px;">
                <h3 style="color: #111827; margin-top: 0; margin-bottom: 15px; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; font-size: 16px;">Submission Details</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                  <tbody>
                    ${emailRows}
                  </tbody>
                </table>
                <div style="background-color: #f9fafb; border-left: 4px solid #0d9488; padding: 15px; border-radius: 4px; margin-top: 20px;">
                  <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5;">
                    This email is automatically routed and sent directly from the Prosperity Health application server.
                  </p>
                </div>
              </div>
              <div style="background-color: #f3f4f6; padding: 15px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 12px; color: #9ca3af;">&copy; 2026 Prosperity Health. All rights reserved.</p>
              </div>
            </div>
          </div>
        `;

        const fromName = "Prosperity Health";
        const fromEmail = process.env.SMTP_FROM || "info@prosperityhealth.co.za";

        const mailOptions = {
          from: `"${fromName}" <${fromEmail}>`,
          to: "tsoanelomodise@gmail.com",
          cc: emailData._cc || "info@prosperityhealth.co.za",
          replyTo: emailData.Email || undefined,
          subject: emailData._subject || "New Form Submission",
          html: htmlBody,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully via custom SMTP:", info.messageId);
        return res.status(200).json({ success: "true", message: "Email sent successfully!" });
      }

      // Fallback: If SMTP variables are not set, proxy directly to FormSubmit
      console.log("SMTP not fully configured in environment. Using FormSubmit.co proxy fallback with native https to bypass header restrictions.");
      
      const payload = JSON.stringify(emailData);
      
      const postOptions = {
        hostname: "formsubmit.co",
        port: 443,
        path: "/ajax/tsoanelomodise@gmail.com",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Referer": "https://prosperityhealth.co.za/",
          "Origin": "https://prosperityhealth.co.za",
          "Content-Length": Buffer.byteLength(payload)
        }
      };

      const result = await new Promise<{ status: number, body: string }>((resolve, reject) => {
        const reqPost = https.request(postOptions, (resPost) => {
          let data = "";
          resPost.on("data", (chunk) => {
            data += chunk;
          });
          resPost.on("end", () => {
            resolve({
              status: resPost.statusCode || 200,
              body: data
            });
          });
        });

        reqPost.on("error", (err) => {
          reject(err);
        });

        reqPost.write(payload);
        reqPost.end();
      });

      console.log(`FormSubmit response status: ${result.status}`);
      let parsedData;
      try {
        parsedData = JSON.parse(result.body);
      } catch (e) {
        parsedData = { success: "true", message: "Form submitted successfully" };
      }

      return res.status(result.status).json(parsedData);
    } catch (error: any) {
      console.error("Server-side email send failed:", error);
      return res.status(500).json({ success: "false", message: error?.message || "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
