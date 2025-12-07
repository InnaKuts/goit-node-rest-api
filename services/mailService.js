import { createTransport } from "nodemailer";

const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.IMAP_USER,
    pass: process.env.IMAP_PASS,
  },
};

export async function sendEmail(to, subject, text) {
  const transporter = createTransport(config);
  const emailOptions = {
    from: process.env.IMAP_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(emailOptions);
}
