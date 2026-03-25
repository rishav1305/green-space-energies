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

    // Send WhatsApp notification via Business Cloud API
    if (process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
      try {
        const whatsappBody = `📩 New Inquiry!\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email || 'N/A'}\n📋 Subject: ${subject || 'N/A'}\n💬 Message: ${message || 'N/A'}`;

        await fetch(
          `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              to: '919870572461',
              type: 'text',
              text: { body: whatsappBody },
            }),
          }
        );
      } catch (whatsappError) {
        console.error('WhatsApp send error:', whatsappError);
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
