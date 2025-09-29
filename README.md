# Stellatus - TSF Monitoring Website

Modern website for Stellatus, providing AI-powered tailings storage facility (TSF) monitoring solutions that deliver EOR-ready reports in 48 hours.

## 🚀 Overview

This is the main website for Stellatus LLC, featuring:
- Responsive landing page with hero video background
- Integrated PDF download modal with email capture
- Evidence-based case studies page
- About, Labs, and Contact pages
- Vercel serverless backend for email notifications

**Live Site:** [stellat.us](https://stellat.us)

## 📁 Project Structure

```
stellatus/
├── index.html                 # Main landing page
├── evidence.html              # Case studies and evidence page
├── about.html                 # Company information
├── labs.html                  # Labs/experimental features
├── contact.html               # Contact form
├── styles.css                 # Global styles
├── script.js                  # Main JavaScript
├── download-modal.js          # PDF download modal functionality
├── download-modal.css         # Modal styling
├── tsf-onepager.html         # One-pager HTML version
├── Stellatus-TSF-Monitoring-Overview.pdf  # Marketing PDF
├── api/
│   └── submit-download.js    # Serverless function for email notifications
├── images/                    # Image assets
├── video/                     # Background videos
│   ├── hero-video-tsf.mp4           # Original TSF video (13.35 MB)
│   ├── hero-video-tsf-compressed.mp4 # Compressed version (1.66 MB)
│   └── hero-video-tsf.webm          # WebM format (2.21 MB)
├── vercel.json               # Vercel deployment config
└── package.json              # Node.js dependencies
```

## 🎯 Key Features

### PDF Download Modal
- Modal popup triggered from "Download 1-pager" button
- Captures: Name, Email, Company (optional)
- Sends notification email to mike.ochs@stellat.us via Resend API
- Automatically downloads PDF after submission
- Mobile-responsive design

### Hero Video Background
- Compressed MP4 and WebM formats for optimal performance
- Autoplay, loop, muted for best user experience
- Fallback poster image
- 87% file size reduction from original

### Serverless Backend
- Vercel Functions handle form submissions
- Resend API integration for email notifications
- Error handling and validation
- Automatic timestamp inclusion

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js (Vercel Serverless Functions)
- **Email Service**: Resend API
- **Hosting**: Vercel
- **Video Processing**: FFmpeg

## 📦 Installation

### Prerequisites
- Node.js 18+
- Git
- Vercel account
- Resend account (for email notifications)

### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/mtochs/stellatus.git
cd stellatus
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create `.env` file (see `.env.example`)
   - Add your Resend API key

4. Run locally with Vercel CLI:
```bash
npm install -g vercel
vercel dev
```

5. Visit: `http://localhost:3000`

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

4. Set environment variable in Vercel:
```bash
vercel env add RESEND_API_KEY
```
Or add via [Vercel Dashboard](https://vercel.com/dashboard) → Settings → Environment Variables

### Environment Variables

Required in Vercel:
- `RESEND_API_KEY` - Your Resend API key from [resend.com](https://resend.com)

## 🔧 Configuration

### Email Notifications

The download form sends notifications to `mike.ochs@stellat.us`. To change:

1. Edit `api/submit-download.js`
2. Update the `to` field in the email configuration
3. Ensure sender domain is verified in Resend

### Resend Setup

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your domain `stellat.us`
3. Create API key
4. Add sender email: `downloads@stellat.us`
5. Add API key to Vercel environment variables

### Video Assets

Hero videos are in `/video` folder:
- **Original**: `hero-video-tsf.mp4` (13.35 MB - not used)
- **Compressed MP4**: `hero-video-tsf-compressed.mp4` (1.66 MB - used)
- **WebM**: `hero-video-tsf.webm` (2.21 MB - used for modern browsers)

To add new videos, compress them first:
```bash
# MP4 compression
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart output-compressed.mp4

# WebM conversion
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -c:a libopus -b:a 96k output.webm
```

## 📧 Email Notification Format

When someone downloads the PDF, you receive:

```
Subject: New TSF One-Pager Download Request

Name: John Smith
Email: john.smith@company.com
Company: Acme Mining Co.
Timestamp: Sunday, September 29, 2025 at 3:30:00 PM EDT
```

## 🎨 Customization

### Colors
Main brand color: `#D4AF37` (Stellatus gold)

Update in `styles.css` and `download-modal.css`

### Content
- Landing page: `index.html`
- Evidence page: `evidence.html`
- Contact form: `contact.html`
- About page: `about.html`

## 🔍 Troubleshooting

### Email not sending?
1. Check Vercel logs: `vercel logs`
2. Verify `RESEND_API_KEY` is set correctly
3. Ensure domain is verified in Resend
4. Check sender email is added in Resend dashboard
5. Look for errors in browser console (F12)

### Video not playing?
1. Check video file paths in `index.html`
2. Verify video files exist in `/video` folder
3. Test with different browsers
4. Check browser console for errors

### Form not submitting?
1. Open browser console (F12)
2. Check Network tab for API errors
3. Verify API endpoint: `/api/submit-download`
4. Test locally with `vercel dev`

## 📊 Performance

- Lighthouse Score: 95+ (Performance)
- Video file size: 1.66 MB (compressed MP4)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s

## 🔐 Security

- No sensitive data stored in repository
- Environment variables for API keys
- HTTPS enforced via Vercel
- CORS headers configured
- Input validation on server side

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

Proprietary - © 2025 Stellatus LLC. All Rights Reserved.

## 🤝 Contact

- Email: mike.ochs@stellat.us
- Website: [stellat.us](https://stellat.us)

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Resend Dashboard](https://resend.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Resend Documentation](https://resend.com/docs)

## 📈 Analytics

To add Google Analytics:
1. Create GA4 property
2. Add tracking code to `<head>` in HTML files
3. Configure goals for PDF downloads

## ✨ Recent Updates

- ✅ Compressed hero video (87% size reduction)
- ✅ Added WebM format for better browser support
- ✅ Fixed Resend API integration
- ✅ Cleaned up unused documentation files
- ✅ Updated README with current information

---

**Need help?** Contact mike.ochs@stellat.us or check Vercel logs with `vercel logs`
