# Resend Email Setup Guide

## Issue Summary

The PDF download form wasn't sending email notifications because the Resend API integration needed fixes.

## What Was Fixed

1. **Simplified API Integration**: Removed unused email service options (SendGrid, SMTP) and focused on Resend
2. **Corrected Sender Format**: Changed from address to proper format: `Stellatus Website <downloads@stellat.us>`
3. **Improved Error Handling**: Added better error logging and response handling
4. **Updated Documentation**: Created comprehensive README and .env.example

## Required Setup Steps

### 1. Verify Your Domain in Resend

**Critical**: You MUST verify your domain before emails will send.

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click "Add Domain"
3. Enter: `stellat.us`
4. Follow instructions to add DNS records:
   - Add the TXT record for domain verification
   - Add the MX records (if you want to receive emails)
   - DNS changes can take 24-48 hours to propagate

### 2. Add API Key to Vercel

```bash
# Method 1: Via CLI
vercel env add RESEND_API_KEY

# When prompted, paste your API key from:
# https://resend.com/api-keys

# Method 2: Via Dashboard
# 1. Go to https://vercel.com/dashboard
# 2. Select your project
# 3. Go to Settings > Environment Variables
# 4. Add new variable:
#    Name: RESEND_API_KEY
#    Value: re_xxxxxxxxxxxx (your actual key)
#    Apply to: Production, Preview, Development
```

### 3. Redeploy to Vercel

```bash
vercel --prod
```

## Testing the Setup

### 1. Test Locally

```bash
# Set environment variable
export RESEND_API_KEY=re_xxxxxxxxxxxx

# Or on Windows:
set RESEND_API_KEY=re_xxxxxxxxxxxx

# Run local development server
vercel dev

# Visit: http://localhost:3000
# Click "Download 1-pager" and submit the form
```

### 2. Test on Production

1. Visit your live site
2. Click "Download 1-pager" button
3. Fill in the form with your details
4. Submit
5. Check mike.ochs@stellat.us for the notification email

### 3. Check Logs

```bash
# View Vercel logs
vercel logs

# Or in Vercel Dashboard:
# https://vercel.com/dashboard > Your Project > Functions > Logs
```

## Common Issues & Solutions

### Issue: "Email service not configured"

**Cause**: `RESEND_API_KEY` environment variable not set

**Solution**:
1. Verify the env var is set in Vercel: `vercel env ls`
2. If not present, add it: `vercel env add RESEND_API_KEY`
3. Redeploy: `vercel --prod`

### Issue: "Domain not verified"

**Cause**: Domain verification not complete in Resend

**Solution**:
1. Check [Resend Domains](https://resend.com/domains)
2. Verify DNS records are added correctly
3. Wait for DNS propagation (up to 48 hours)
4. Use `nslookup` or `dig` to verify DNS records are live

### Issue: "Failed to send email via Resend"

**Cause**: Invalid sender address or API key issues

**Solution**:
1. Check API key has "Send emails" permission
2. Verify sender email format: `Name <email@domain.com>`
3. Ensure sender domain matches verified domain
4. Check Resend dashboard for error details

### Issue: Email goes to spam

**Solution**:
1. Set up SPF, DKIM, and DMARC records (Resend provides these)
2. Use a custom sending domain
3. Warm up your domain by sending gradually increasing volumes

## Verification Checklist

- [ ] Domain `stellat.us` verified in Resend
- [ ] DNS records added (TXT, MX if applicable)
- [ ] API key created in Resend
- [ ] API key has "Send emails" permission
- [ ] `RESEND_API_KEY` added to Vercel environment variables
- [ ] Deployed to production with `vercel --prod`
- [ ] Test form submission works
- [ ] Email received at mike.ochs@stellat.us
- [ ] PDF downloads automatically

## Resend Dashboard URLs

- **Domains**: https://resend.com/domains
- **API Keys**: https://resend.com/api-keys
- **Logs**: https://resend.com/logs
- **Settings**: https://resend.com/settings

## Email Format You'll Receive

```
From: Stellatus Website <downloads@stellat.us>
To: mike.ochs@stellat.us
Subject: New TSF One-Pager Download Request

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
New TSF One-Pager Download

Name: John Smith
Email: john.smith@company.com
Company: Acme Mining Co.
Timestamp: Sunday, September 29, 2025 at 3:30:00 PM EDT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This notification was sent automatically when someone 
downloaded the TSF Monitoring Overview PDF from your website.
```

## Alternative: Testing with Resend's Test Email

If domain verification takes too long, you can temporarily use Resend's test email:

1. In `api/submit-download.js`, change:
```javascript
from: 'Stellatus Website <downloads@stellat.us>',
```
to:
```javascript
from: 'Stellatus Website <onboarding@resend.dev>',
```

2. This will send from Resend's verified domain
3. Change back once your domain is verified

## Support

If issues persist:

1. Check Vercel logs: `vercel logs`
2. Check Resend logs: https://resend.com/logs
3. Verify environment variables: `vercel env ls`
4. Test API key with curl:

```bash
curl -X POST 'https://api.resend.com/emails' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "from": "onboarding@resend.dev",
    "to": ["mike.ochs@stellat.us"],
    "subject": "Test Email",
    "html": "<p>This is a test</p>"
  }'
```

## Next Steps After Setup

1. Monitor email deliverability in Resend dashboard
2. Set up email auto-responder to thank downloaders
3. Consider adding CRM integration
4. Track conversion rates via Google Analytics

---

**Questions?** Contact mike.ochs@stellat.us or check [Resend Documentation](https://resend.com/docs)
