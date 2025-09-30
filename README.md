# Stellatus Website

Enterprise-grade TSF monitoring platform website and collateral system.

## 🚀 Recent Updates (2025-09-30)

### Critical Copy & Positioning Updates
- **Harmonized Metrics**: Standardized to "8–20 days → ≤48h" and "40–70% reduction"
- **SaaS-First Architecture**: Default deployment is now Stellatus-managed private SaaS
- **48h Clock Clarification**: Always specified as "from final survey drop"
- **Professional Tone**: Removed disaster references, softened incident framing
- **Banned Phrases Removed**: No SOC2 claims, absolutes, or unverifiable commitments

### New Features
- **TSF Pitch Deck**: Hidden pitch page at `/tsf/` with AI-generated images
- **Collateral System**: Automated PDF generation for NGM and website collateral
- **Source Markdown**: New `/collateral/src/` directory for maintainable content

## 📁 Project Structure

```
stellatus/
├── index.html              # Main homepage
├── contact.html            # Contact form with Resend integration
├── evidence.html           # Evidence and case studies
├── about.html              # About page
├── labs.html               # Labs experiments
├── tsf/                    # TSF pitch deck (hidden)
│   ├── index.html
│   └── assets/
│       ├── css/
│       ├── js/
│       └── images/        # AI-generated with Replicate MCP
├── collateral/             # Marketing materials
│   ├── src/               # Source markdown files
│   │   ├── ngm-one-pager.md
│   │   └── website-two-pager.md
│   ├── ngm/               # NGM-specific collateral
│   ├── 2pg/               # Website two-pager
│   └── assets/            # Icons and styles
├── api/                    # Serverless functions
│   ├── submit-contact.js
│   └── submit-download.js
├── scripts/
│   └── generate-pdfs.mjs  # PDF generation script
└── images/                 # Website images
```

## 🛠 Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Vercel CLI (`npm i -g vercel`)

### Installation
```bash
npm install
```

### Environment Variables
Create `.env` file (see `.env.example`):
```
RESEND_API_KEY=your_resend_api_key_here
```

In Vercel, add the same environment variable in project settings.

## 📄 PDF Generation

Generate all collateral PDFs:
```bash
npm run pdfs
```

This will:
- Generate NGM one-pager (Letter & A4) - must be 1 page
- Generate website two-pager (Letter & A4) - must be 2 pages
- Validate page counts
- Copy public download to `/collateral/`

### Collateral Source Files
Edit markdown files in `/collateral/src/` then regenerate:
1. `ngm-one-pager.md` - NGM-specific content
2. `website-two-pager.md` - Generic website collateral

## 🚀 Deployment

### Development
```bash
# Run local development server
vercel dev
```

### Production
```bash
# Commit changes
git add .
git commit -m "Your message"
git push origin master

# Deploy to production
vercel --prod
```

Live at: https://stellat.us

## 🎨 Brand Guidelines

- **Primary**: `#0F1115` (near-black)
- **Accent**: `#E5B202` (gold)
- **Neutral**: `#F5F7FA` (light gray)
- **Success**: `#1FAD66`
- **Font**: Inter, Segoe UI, Helvetica, Arial

## � Email Integration

Using [Resend](https://resend.com) for:
- Contact form submissions
- Download tracking
- Lead capture

See [RESEND-SETUP-GUIDE.md](./RESEND-SETUP-GUIDE.md) for configuration.

## 🔧 JavaScript Tools

### PDF Generation (`scripts/generate-pdfs.mjs`)
- Uses Puppeteer for HTML to PDF conversion
- Validates page counts
- Generates Letter and A4 formats

### Download Modal (`download-modal.js`)
- Email capture before PDF download
- Integrates with Resend API

### TSF Animations (`tsf/assets/js/tsf.js`)
- Scroll reveal animations
- Progress bar
- Intersection Observer effects

## � Important Copy Guidelines

### ✅ Always Use
- "8–20 days → ≤48h" for cycle time
- "40–70% internal hours reduction"
- "from final survey drop" for 48h timing
- "Stellatus-managed private SaaS" as default

### ❌ Never Use
- SOC2/SOC 2 claims (we don't have it)
- "Zero backlog" (use "removes from critical path")
- "24/7 coverage" (use "continuous evaluation")
- "95% reduction" (use "40–70% reduction")
- Disaster references (Brumadinho, Cadia)

## 🖼 Image Generation

Using Replicate MCP with Bytedance's seedream-4 model:
- Photorealistic enterprise aesthetics
- No text overlays
- Professional mining/industrial themes

## 📚 Documentation

- `.cline_rules` - Project rules and AI assistant guidelines
- `README.md` - This file
- `RESEND-SETUP-GUIDE.md` - Email setup instructions
- `collateral/README.md` - Collateral generation guide

## 🤝 Contact

- **Email**: mike.ochs@stellat.us
- **Website**: https://stellat.us
- **Company**: Stellatus LLC

## 📄 License

© 2025 Stellatus LLC. All Rights Reserved.

---

*Last updated: 2025-09-30*
