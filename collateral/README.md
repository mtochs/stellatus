# Stellatus Collateral — EOR Draft‑in‑48

This folder contains all marketing collateral for the "EOR Draft‑in‑48" offering, including PDFs, source files (Markdown/HTML), and supporting assets.

## 📁 Folder Structure

```
collateral/
├── README.md                          # This file
├── generate-pdfs.js                   # Script to regenerate all PDFs
├── Stellatus-EOR-Draft-in-48-Overview.pdf  # Public website download (2-pager Letter)
├── ngm/                               # NGM-specific one-pager
│   ├── ngm-one-pager.md              # Markdown source
│   ├── ngm-one-pager.html            # HTML with styling
│   ├── ngm-one-pager_letter.pdf      # Letter size PDF (8.5" × 11")
│   └── ngm-one-pager_a4.pdf          # A4 size PDF (210mm × 297mm)
├── 2pg/                               # Generic website two-pager
│   ├── website-two-pager.md          # Markdown source
│   ├── website-two-pager.html        # HTML with styling
│   ├── website-two-pager_letter.pdf  # Letter size PDF
│   └── website-two-pager_a4.pdf      # A4 size PDF
└── assets/                            # Shared assets
    ├── icons/                         # SVG icons
    │   ├── clock.svg                  # ≤48h icon
    │   ├── shield.svg                 # Provenance icon
    │   ├── lock.svg                   # Security icon
    │   ├── chain.svg                  # Provenance chain icon
    │   ├── check.svg                  # Checkmark icon
    │   └── arrow.svg                  # Arrow icon
    └── styles/
        ├── onepager.css               # NGM one-pager styles
        └── twopager.css               # Website two-pager styles
```

## 🎨 Brand Guidelines

### Colors
- **Primary (Near-Black)**: `#0F1115`
- **Accent (Gold)**: `#E5B202`
- **Neutral (Light Gray)**: `#F5F7FA`
- **Success (Green)**: `#1FAD66`

### Typography
- **Font Family**: Inter, Segoe UI, Helvetica, Arial, sans-serif
- **Font Weights**: 600 (headings), 500 (medium), 400 (body)

### Page Specifications
- **Sizes**: Letter (8.5" × 11") and A4 (210mm × 297mm)
- **Margins**: 0.6 inches (15mm) on all sides
- **Print**: 300 DPI assets, selectable text, embedded fonts

## 🔄 Regenerating PDFs

### Quick Start
```bash
npm run pdfs
```

This will automatically:
- Generate all 4 PDFs (Letter & A4 for both one-pager and two-pager)
- Verify page counts (1 page for NGM, 2 pages for website)
- Copy the public version to `Stellatus-EOR-Draft-in-48-Overview.pdf`
- Exit with error if page counts don't match (so you can adjust CSS)

### Requirements
- **Node.js** (v14 or higher)
- **Puppeteer** (auto-installed via `npm install`)
- **pdf-lib** (auto-installed via `npm install`)

### What Gets Generated
- `ngm/ngm-one-pager_letter.pdf` (1 page)
- `ngm/ngm-one-pager_a4.pdf` (1 page)
- `2pg/website-two-pager_letter.pdf` (2 pages)
- `2pg/website-two-pager_a4.pdf` (2 pages)
- `Stellatus-EOR-Draft-in-48-Overview.pdf` (copy of 2-pager Letter for public download)

### No Metadata Headers/Footers
The automated script uses Puppeteer with `displayHeaderFooter: false`, ensuring clean, professional PDFs without any Chrome print metadata.

## ✏️ Editing Content

### 1. Update Markdown Files
Edit the `.md` files in `ngm/` or `2pg/` directories for content changes.

### 2. Update HTML Files
Make changes to `.html` files if you need to:
- Adjust layout
- Modify structure
- Add/remove sections

### 3. Customize Styling
Edit CSS files in `assets/styles/`:
- `onepager.css` — NGM one-pager styles
- `twopager.css` — Website two-pager styles

### 4. Update Brand Colors
To change brand colors, update the CSS variables in the respective CSS files:

```css
:root {
  --brand-primary: #0F1115;
  --brand-accent: #E5B202;
  --brand-neutral: #F5F7FA;
  --brand-success: #1FAD66;
}
```

### 5. Regenerate PDFs
After making changes, regenerate the PDFs:
```bash
node generate-pdfs.js
```

### 6. Regenerate PDFs
After making changes, regenerate all PDFs:
```bash
npm run pdfs
```

The script automatically copies the website two-pager to the public download location, so no manual copy step is needed.

## 📋 Content Guidelines

### Claims Harmonization
All collateral follows these harmonized metrics:
- **Cycle time**: 8–20 days → ≤48h
- **Internal labor**: 40–70% reduction
- **Contractor reliance**: "Removes backlog from critical path" (not "zero backlog")

### Tone & Voice
- **Executive, concise, value-centric**
- **No fear-mongering or disaster imagery**
- **Procurement-safe language**
- **Evidence-based claims with ranges**

### Security Claims
- Use "your tenant or ring-fenced enclave"
- State "read-only collectors"
- Only mention SOC 2 if in progress (with caveat)
- Never claim certifications you don't have

## 📄 Document Purposes

### NGM One-Pager (`ngm/`)
- **Purpose**: Discovery support for Nevada Gold Mines email attachment
- **Audience**: NGM leadership and EOR
- **Primary CTA**: "Share sample under MNDA → Shadow Draft in 7 days"
- **Key Focus**: Single wedge (EOR Draft-in-48), specific to NGM workflow

### Website Two-Pager (`2pg/`)
- **Purpose**: Public downloadable for cold-to-warm prospects
- **Audience**: Mining companies, EORs, operations teams
- **Primary CTA**: "Request Shadow Draft (MNDA required)"
- **Secondary CTA**: "Book 30-min Discovery"
- **Key Focus**: General value proposition with ROI comparison table

## 🔍 Quality Checklist

Before finalizing any collateral:
- [ ] Text fits on page without overflow
- [ ] CTAs visible above the fold (or on first page)
- [ ] Colors have sufficient contrast (WCAG AA)
- [ ] All metrics match harmonized ranges
- [ ] No unverified claims or over-promises
- [ ] Provenance chain visual present and legible
- [ ] PDFs have selectable text and embedded fonts
- [ ] File sizes reasonable (<2MB per PDF)

## 🚀 Deployment

### Website Integration
The public two-pager is referenced in:
- `index.html` — "Download 1-pager" button
- `download-modal.js` — PDF download link
- Path: `collateral/Stellatus-EOR-Draft-in-48-Overview.pdf`

### Distribution
- **NGM Package**: Send `ngm-one-pager_letter.pdf` via email
- **Website Download**: Users get `Stellatus-EOR-Draft-in-48-Overview.pdf`
- **Print Materials**: Use Letter or A4 versions as needed

## 🛠️ Troubleshooting

### PDFs not generating?
1. Ensure Chrome is installed at the default location
2. Check file paths are correct (absolute paths required)
3. Verify HTML files load properly in browser first

### Layout issues?
1. Check CSS print media queries
2. Verify page-break settings
3. Test in Chrome's print preview (Ctrl+P)

### Colors not printing?
Add this to CSS:
```css
@media print {
  body {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}
```

## 📞 Support

For questions or issues:
- **Email**: mike.ochs@stellat.us
- **Repo**: [GitHub](https://github.com/mtochs/stellatus)

---

**Last Updated**: September 30, 2025  
**Version**: 1.0
