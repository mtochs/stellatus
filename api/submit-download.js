// Vercel Serverless Function to handle download form submissions
// This sends an email notification when someone downloads the PDF

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, timestamp } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Prepare email content
    const emailContent = {
      to: 'mike.ochs@stellat.us',
      from: 'downloads@stellat.us', // Change this to your verified sender
      subject: 'New TSF One-Pager Download Request',
      text: `New download request:

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Timestamp: ${timestamp || new Date().toISOString()}

---
This notification was sent automatically when someone downloaded the TSF Monitoring Overview PDF.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            New TSF One-Pager Download
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p style="margin: 10px 0;"><strong>Timestamp:</strong> ${new Date(timestamp || Date.now()).toLocaleString('en-US', {
              dateStyle: 'full',
              timeStyle: 'long',
              timeZone: 'America/New_York'
            })}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 15px;">
            This notification was sent automatically when someone downloaded the TSF Monitoring Overview PDF from your website.
          </p>
        </div>
      `
    };

    // Send email using Vercel's built-in email or your preferred service
    // Option 1: Use SendGrid
    if (process.env.SENDGRID_API_KEY) {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      await sgMail.send(emailContent);
    }
    // Option 2: Use Resend (recommended for Vercel)
    else if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: ['mike.ochs@stellat.us'],
          subject: emailContent.subject,
          html: emailContent.html
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Resend error:', errorData);
        throw new Error('Failed to send email via Resend');
      }
    }
    // Option 3: Use nodemailer with SMTP
    else if (process.env.SMTP_HOST) {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: emailContent.from,
        to: emailContent.to,
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html
      });
    }
    else {
      console.error('No email service configured');
      // Still return success to avoid exposing configuration issues
      // but log the data for manual follow-up
      console.log('Download request (email not sent):', { name, email, company, timestamp });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Thank you! Your download will begin shortly.'
    });

  } catch (error) {
    console.error('Error processing download request:', error);

    // Don't expose internal errors to client
    return res.status(500).json({
      success: false,
      error: 'An error occurred. Please try again or contact us at mike.ochs@stellat.us'
    });
  }
}