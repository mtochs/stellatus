# Download Page Setup Instructions

This guide explains how to set up the download form that captures user information before allowing PDF downloads.

## Files Created

1. **download-page.html** - Standalone download page with form
2. **tsf-onepager.html** - Original PDF-printable version (unchanged)
3. **Stellatus-TSF-Monitoring-Overview.pdf** - The PDF file to be downloaded

## Setup Steps

### Option 1: Using Web3Forms (Recommended - Free & Simple)

1. **Sign up for Web3Forms** (Free)
   - Go to: https://web3forms.com/
   - Sign up with your email (mike.ochs@stellat.us)
   - Create a new form
   - Copy your Access Key

2. **Update download-page.html**
   - Open `download-page.html`
   - Find line 115: `<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY_HERE">`
   - Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your actual access key

3. **Configure Email Settings in Web3Forms Dashboard**
   - Set recipient email to: mike.ochs@stellat.us
   - Customize email template to include:
     - Name
     - Email
     - Company
     - Timestamp
   - Save settings

4. **Deploy the files**
   - Upload `download-page.html` to your web server
   - Upload `Stellatus-TSF-Monitoring-Overview.pdf` to the same directory
   - Upload `images/stellatus-logo-star-circuit.png` (if you have it)

5. **Test**
   - Visit your download page
   - Fill out the form
   - Submit and verify:
     - Email arrives at mike.ochs@stellat.us
     - PDF downloads automatically
     - Success message displays

### Option 2: Using Formspree (Alternative Free Service)

1. **Sign up for Formspree**
   - Go to: https://formspree.io/
   - Create an account with mike.ochs@stellat.us
   - Create a new form

2. **Update download-page.html**
   - Replace the Web3Forms API endpoint with Formspree
   - Change line 171 from:
     ```javascript
     const response = await fetch('https://api.web3forms.com/submit', {
     ```
   - To:
     ```javascript
     const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
     ```

3. **Remove the access_key hidden field** (line 115)

4. **Deploy and test** as above

### Option 3: Custom Backend (PHP Example)

If you want to handle this on your own server with PHP:

1. Create `send-email.php`:

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $company = htmlspecialchars($_POST['company']);
    $timestamp = htmlspecialchars($_POST['timestamp']);

    $to = "mike.ochs@stellat.us";
    $subject = "New TSF One-Pager Download Request";
    $message = "New download request:\n\n";
    $message .= "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Company: $company\n";
    $message .= "Timestamp: $timestamp\n";

    $headers = "From: noreply@stellat.us\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Email failed']);
    }
}
?>
```

2. Update `download-page.html` line 171 to point to your PHP file:
   ```javascript
   const response = await fetch('send-email.php', {
   ```

## Email Format You'll Receive

When someone downloads the PDF, you'll receive an email like:

```
Subject: New TSF One-Pager Download Request

New download request:

Name: John Smith
Email: john.smith@acme-mining.com
Company: Acme Mining Co.
Timestamp: 2025-09-29T13:45:22.123Z
```

## Customization Options

### Change Form Fields
Edit the HTML form in `download-page.html` (lines 110-135) to add/remove fields like:
- Phone number
- Job title
- Country
- How they heard about you

### Customize Email Template
In Web3Forms dashboard, you can customize:
- Email subject line
- Email body format
- Auto-responder to the person who submitted
- CC/BCC additional recipients

### Style Adjustments
All styles are in the `<style>` section (lines 7-174). You can customize:
- Colors (change #D4AF37 to match your brand)
- Fonts
- Layout
- Button styles

## Security Notes

- Never commit your Web3Forms access key to public repositories
- Consider adding a privacy policy link
- Add reCAPTCHA if you get spam submissions
- Use HTTPS when deploying

## Tracking & Analytics

To track downloads, you can:
1. Add Google Analytics tracking code
2. Use Web3Forms built-in analytics
3. Set up conversion tracking in Google Ads/LinkedIn

## Need Help?

- Web3Forms docs: https://docs.web3forms.com/
- Formspree docs: https://help.formspree.io/
- For custom solutions, consult with your web developer

## Going Live

1. Replace the logo path if needed (line 97)
2. Test the form thoroughly
3. Update your website to link to `download-page.html` instead of direct PDF link
4. Monitor the email inbox for submissions
5. Consider setting up an auto-responder thanking users for downloading