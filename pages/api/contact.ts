import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const emailBody = `
New Inquiry from Green Space Energies Website

Name: ${name}
Email: ${email || 'Not provided'}
Phone: ${phone}
Subject: ${subject || 'Not provided'}
Message: ${message || 'Not provided'}
  `.trim();

  const htmlBody = `
<h2>New Inquiry from Green Space Energies Website</h2>
<table style="border-collapse: collapse; width: 100%; max-width: 600px;">
  <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td></tr>
  <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${email || 'Not provided'}</td></tr>
  <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>
  <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Subject</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${subject || 'Not provided'}</td></tr>
  <tr><td style="padding: 8px; font-weight: bold;">Message</td><td style="padding: 8px;">${message || 'Not provided'}</td></tr>
</table>
  `.trim();

  try {
    await transporter.sendMail({
      from: `"Green Space Energies" <${process.env.GMAIL_USER}>`,
      to: 'gspaceenergies@gmail.com',
      subject: `New Inquiry: ${subject || 'Website Contact Form'} - from ${name}`,
      text: emailBody,
      html: htmlBody,
    });

    // Send WhatsApp notification via URL (logged for reference)
    const whatsappMessage = encodeURIComponent(
      `New Inquiry!\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nSubject: ${subject || 'N/A'}\nMessage: ${message || 'N/A'}`
    );
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919870572461&text=${whatsappMessage}`;

    return res.status(200).json({ success: true, whatsappUrl });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
