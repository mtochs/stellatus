// Vercel Serverless Function to handle contact form submissions
// Sends email notification when someone submits the contact form

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, role, 'tsf-count': tsfCount, message, send_mnda } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required'
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
      subject: 'New TSF Monitoring Pilot Inquiry - Stellatus',
      text: `New contact form submission:

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Role: ${role || 'Not provided'}
Number of TSFs: ${tsfCount || 'Not provided'}
Send MNDA: ${send_mnda === 'yes' ? 'Yes' : 'No'}

Message:
${message}

---
This notification was sent automatically from the contact form on stellat.us`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            New TSF Monitoring Pilot Inquiry
          </h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p style="margin: 10px 0;"><strong>Role:</strong> ${role || 'Not provided'}</p>
            <p style="margin: 10px 0;"><strong>Number of TSFs:</strong> ${tsfCount || 'Not provided'}</p>
            <p style="margin: 10px 0;"><strong>Send MNDA:</strong> ${send_mnda === 'yes' ? 'Yes' : 'No'}</p>
          </div>
          <div style="background: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 15px;">
            This notification was sent automatically from the contact form on <a href="https://stellat.us">stellat.us</a>
          </p>
        </div>
      `
    };

    // Send email using Resend API
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Stellatus Website <contact@stellat.us>',
          to: ['mike.ochs@stellat.us'],
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Resend API error:', responseData);
        throw new Error(responseData.message || 'Failed to send email via Resend');
      }

      console.log('Contact email sent successfully via Resend:', responseData.id);
    } else {
      console.error('RESEND_API_KEY not configured');
      throw new Error('Email service not configured');
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your inquiry! We will be in touch soon.'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);

    // Don't expose internal errors to client
    return res.status(500).json({
      success: false,
      error: 'An error occurred. Please try again or email us directly at mike.ochs@stellat.us'
    });
  }
}
