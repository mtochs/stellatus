# Stellatus TSF Monitoring - Download Form

This repository contains the Stellatus TSF Monitoring one-pager and an interactive download form that captures lead information.

## 📁 Files

### Main Files
- **`download-page.html`** - Interactive download form with email capture
- **`tsf-onepager.html`** - Original HTML version for PDF generation
- **`Stellatus-TSF-Monitoring-Overview.pdf`** - The 2-page PDF overview

### Backend (Vercel Serverless)
- **`api/submit-download.js`** - Serverless function that sends email notifications
- **`vercel.json`** - Vercel deployment configuration
- **`package.json`** - Node.js dependencies

### Documentation
- **`QUICK-START.md`** - 15-minute setup guide (START HERE!)
- **`VERCEL-SETUP.md`** - Detailed Vercel deployment instructions
- **`VERCEL-MCP-SETUP.md`** - How to add Vercel MCP to Claude Code
- **`DOWNLOAD-SETUP-INSTRUCTIONS.md`** - Alternative setup methods (Web3Forms, Formspree, PHP)

### Configuration
- **`.env.example`** - Template for environment variables
- **`.gitignore`** - Prevents committing sensitive files

## 🚀 Quick Start

**Want to get this live in 15 minutes?** Follow [`QUICK-START.md`](QUICK-START.md)

### TL;DR

1. Sign up at [resend.com](https://resend.com) and get an API key
2. Install Vercel CLI: `npm install -g vercel`
3. Deploy: `vercel`
4. Add API key: `vercel env add RESEND_API_KEY`
5. Redeploy: `vercel --prod`
6. Test your form!

## 🎯 What It Does

When someone visits your download page and submits the form:

1. ✅ They enter their name, email, and company
2. ✅ Form submits to your Vercel serverless function
3. ✅ You receive an email at **mike.ochs@stellat.us** with their info and timestamp
4. ✅ The PDF automatically downloads for them
5. ✅ They see a success message

## 📧 Email You'll Receive

```
Subject: New TSF One-Pager Download Request

Name: John Smith
Email: john.smith@acme-mining.com
Company: Acme Mining Co.
Timestamp: Sunday, September 29, 2025 at 1:30:00 PM EDT
```

## 🛠️ Technology Stack

- **Frontend**: Plain HTML/CSS/JavaScript (no framework needed)
- **Backend**: Vercel Serverless Functions (Node.js)
- **Email**: Resend, SendGrid, or any SMTP service
- **Hosting**: Vercel (free tier is plenty)
- **Domain**: Your stellat.us domain (optional)

## 📊 Cost

**$0/month** with free tiers:
- Vercel: 100GB bandwidth, unlimited serverless function executions
- Resend: 100 emails/day, 3,000 emails/month

Perfect for lead generation!

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run locally
vercel dev

# Visit
http://localhost:3000/download-page.html
```

## 🌐 Deployment

### First Time
```bash
vercel login
vercel
vercel env add RESEND_API_KEY
vercel --prod
```

### Updates
```bash
git add .
git commit -m "Update download form"
vercel --prod
```

### With Vercel MCP in Claude Code
Just ask Claude: "Deploy my changes to Vercel"

## 🔐 Environment Variables

Set these in Vercel Dashboard or via CLI:

### For Resend (Recommended)
```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
```

### For SendGrid
```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxx
```

### For SMTP
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 📝 Customization

### Change Form Fields
Edit `download-page.html` lines 203-218 to add/remove fields:
```html
<div class="form-group">
    <label for="phone">Phone Number</label>
    <input type="tel" id="phone" name="phone" placeholder="+1 (555) 123-4567">
</div>
```

### Customize Email Template
Edit `api/submit-download.js` starting at line 33 (the `emailContent` object).

### Change Colors/Branding
All styles are in `download-page.html` in the `<style>` section. Change `#D4AF37` to your brand color.

## 🔍 Troubleshooting

### Form not submitting?
1. Check browser console (F12)
2. Verify API endpoint: `https://your-site.vercel.app/api/submit-download`
3. Check Vercel logs: `vercel logs`

### Email not arriving?
1. Verify env variables: `vercel env ls`
2. Check Resend dashboard for errors
3. Make sure sender email is verified
4. Check spam folder

### PDF not downloading?
1. Verify PDF filename: `Stellatus-TSF-Monitoring-Overview.pdf`
2. Check PDF is in root directory
3. Test direct access: `https://your-site.vercel.app/Stellatus-TSF-Monitoring-Overview.pdf`

## 📈 Next Steps

After deployment:
1. ✅ Test the form thoroughly
2. ✅ Add Google Analytics tracking
3. ✅ Connect your custom domain
4. ✅ Link from your main website
5. ✅ Set up CRM integration
6. ✅ Create email auto-responder
7. ✅ Monitor conversion rates

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Resend Dashboard](https://resend.com/dashboard)
- [Vercel Docs](https://vercel.com/docs)
- [Resend Docs](https://resend.com/docs)

## 🆘 Support

Need help?
1. Check the documentation files in this repo
2. View Vercel logs: `vercel logs`
3. Ask Claude Code for help (if you set up MCP)
4. Contact: mike.ochs@stellat.us

## 📄 License

Proprietary - © 2025 Stellatus LLC

## ✨ Features

- ✅ Mobile responsive design
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling
- ✅ Success feedback
- ✅ Automatic PDF download
- ✅ Email notifications with timestamp
- ✅ Professional styling
- ✅ Zero infrastructure maintenance
- ✅ Scales automatically

## 🎨 Design

The download page matches your brand:
- Stellatus gold accent color (#D4AF37)
- Professional, clean layout
- Mobile-friendly
- Fast loading
- Accessible

---

**Ready to deploy?** Start with [`QUICK-START.md`](QUICK-START.md)!