# Quick Start: Deploy Your Download Form in 15 Minutes

Get your download form live with email notifications in just 15 minutes!

## ✅ What You'll Have

- Download page at `https://your-site.vercel.app/download-page.html`
- Email notification to mike.ochs@stellat.us for every download
- Automatic PDF download for users
- Professional, branded experience

## 🚀 Quick Start (15 minutes)

### 1️⃣ Set Up Resend (5 min)

1. Go to [resend.com](https://resend.com) → Sign up (free)
2. Click "Domains" → Add `stellat.us`
3. Add the DNS records to your domain registrar
4. Go to "API Keys" → Create API Key
5. **Copy the key** (starts with `re_`)

### 2️⃣ Deploy to Vercel (5 min)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Go to your project
cd c:\Github_Repos\stellatus

# Deploy
vercel

# Add your Resend API key
vercel env add RESEND_API_KEY
# Paste your key, select all environments

# Redeploy with env var
vercel --prod
```

### 3️⃣ Update Email Settings (2 min)

1. Open `api/submit-download.js`
2. Find line 52: `from: 'Stellatus Downloads <downloads@stellat.us>'`
3. Make sure this email is verified in Resend

### 4️⃣ Test It (3 min)

1. Visit your Vercel URL: `https://your-project.vercel.app/download-page.html`
2. Fill out the form
3. Check:
   - ✓ Success message appears
   - ✓ PDF downloads
   - ✓ Email arrives at mike.ochs@stellat.us

## 🎯 Files You Need

- ✅ `download-page.html` - Your download form (already created)
- ✅ `api/submit-download.js` - Email notification function (already created)
- ✅ `Stellatus-TSF-Monitoring-Overview.pdf` - The PDF to download
- ✅ `package.json` - Dependencies (already created)
- ✅ `vercel.json` - Config (already created)

## 📧 Email You'll Receive

```
Subject: New TSF One-Pager Download Request

Name: John Smith
Email: john.smith@acme-mining.com
Company: Acme Mining Co.
Timestamp: Sunday, September 29, 2025 at 1:30:00 PM EDT
```

## 🔧 Optional: Set Up Vercel MCP in Claude Code

Want Claude to help you deploy directly from VS Code?

1. Get Vercel token: [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Add to VS Code settings (Ctrl+,) → Search "claude code mcp"
3. Add this config:

```json
{
  "claude-code.mcpServers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "@vercel/mcp"],
      "env": {
        "VERCEL_TOKEN": "your-token-here"
      }
    }
  }
}
```

4. Reload VS Code
5. Ask Claude: "Deploy my Stellatus project to Vercel"

## 🌐 Connect Your Domain

After deployment works:

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add: `downloads.stellat.us` (or any subdomain)
3. Update DNS as instructed
4. Wait ~1 hour for DNS propagation

## 📊 Track Your Leads

Every download sends an email to you automatically. To integrate with your CRM:

1. **Google Sheets**: Use Zapier to log each email
2. **HubSpot**: Forward emails to your HubSpot inbox
3. **Salesforce**: Use Email-to-Lead feature
4. **Custom**: Modify `api/submit-download.js` to hit your API

## 🛟 Need Help?

### Common Issues

**"Email not sending"**
- Check Vercel logs: `vercel logs`
- Verify RESEND_API_KEY is set: Vercel Dashboard → Settings → Environment Variables
- Make sure sender email is verified in Resend

**"Form not submitting"**
- Open browser console (F12) for errors
- Check API endpoint: `https://your-site.vercel.app/api/submit-download`
- Test API directly with curl

**"PDF not downloading"**
- Verify PDF file is in root directory
- Check filename matches: `Stellatus-TSF-Monitoring-Overview.pdf`

### Getting Logs

```bash
# View all logs
vercel logs

# View function logs only
vercel logs --output=json | grep submit-download

# Follow logs in real-time
vercel logs --follow
```

## 📚 Full Documentation

- **Vercel Setup**: See `VERCEL-SETUP.md`
- **MCP Configuration**: See `VERCEL-MCP-SETUP.md`
- **General Download Setup**: See `DOWNLOAD-SETUP-INSTRUCTIONS.md`

## ✨ Pro Tips

1. **Test locally first:**
   ```bash
   vercel dev
   ```
   Visit: `http://localhost:3000/download-page.html`

2. **Add Google Analytics:**
   Add tracking code to `download-page.html` to measure conversions

3. **A/B Testing:**
   Create multiple versions and test which performs better

4. **Auto-responder:**
   Add user's email to the recipient list in `submit-download.js` to send them a thank you

5. **CRM Integration:**
   Add webhook calls in `submit-download.js` to auto-add leads to your CRM

## 🎉 You're Done!

Your download form is live! Every time someone downloads your PDF, you'll get an email with their details.

## Next Steps

1. ✅ Deploy to Vercel (15 min)
2. 📧 Verify emails are arriving
3. 🌐 Add custom domain (optional)
4. 📊 Set up analytics tracking
5. 🚀 Link from your main website

Questions? Ask Claude: "Help me troubleshoot my Vercel deployment"