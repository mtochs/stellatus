import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { PDFDocument } from "pdf-lib";
import puppeteer from "puppeteer";

const root = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(root, "..");

// ---- Configure your jobs here ----
const jobs = [
  {
    html: "collateral/ngm/ngm-one-pager.html",
    outputs: [
      { size: "Letter", out: "collateral/ngm/ngm-one-pager_letter.pdf" },
      { size: "A4",     out: "collateral/ngm/ngm-one-pager_a4.pdf" }
    ],
    expectedPages: 1
  },
  {
    html: "collateral/2pg/website-two-pager.html",
    outputs: [
      { size: "Letter", out: "collateral/2pg/website-two-pager_letter.pdf" },
      { size: "A4",     out: "collateral/2pg/website-two-pager_a4.pdf" }
    ],
    expectedPages: 2,
    // extra copy/rename after Letter is produced:
    copyFrom: "collateral/2pg/website-two-pager_letter.pdf",
    copyTo:   "collateral/Stellatus-EOR-Draft-in-48-Overview.pdf"
  }
];
// -----------------------------------

const SIZE_MAP = {
  Letter: { width: "8.5in", height: "11in" },
  A4:     { width: "210mm", height: "297mm" }
};

function ensureDirSyncLike(filepath) {
  return fs.mkdir(path.dirname(filepath), { recursive: true });
}

async function pdfPageCount(buffer) {
  const pdf = await PDFDocument.load(buffer);
  return pdf.getPageCount();
}

// Inject a tiny print stylesheet helper to avoid accidental margins
const PRINT_TWEAKS = `
  <style id="__print_tweaks__">
    @media print {
      html, body { margin: 0 !important; padding: 0 !important; }
      /* Ensure backgrounds render consistently */
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
`;

async function renderPdf(browser, htmlPathAbs, pageSize, outPathAbs) {
  const page = await browser.newPage();
  const fileUrl = pathToFileURL(htmlPathAbs).href;
  await page.goto(fileUrl, { waitUntil: "networkidle0" });

  // Emulate print media & inject tweaks
  await page.emulateMediaType("print");
  await page.addScriptTag({ content: `document.head.insertAdjacentHTML('beforeend', \`${PRINT_TWEAKS}\`);` });

  // Prefer CSS @page size if present; otherwise use our width/height.
  const size = SIZE_MAP[pageSize];
  const pdfBuffer = await page.pdf({
    printBackground: true,
    displayHeaderFooter: false,
    preferCSSPageSize: true,
    width: size.width,
    height: size.height,
    margin: { top: "0.5in", right: "0.5in", bottom: "0.5in", left: "0.5in" }
  });

  await ensureDirSyncLike(outPathAbs);
  await fs.writeFile(outPathAbs, pdfBuffer);
  await page.close();
  return pdfBuffer;
}

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  let hadErrors = false;

  for (const job of jobs) {
    const htmlAbs = path.resolve(projectRoot, job.html);
    const rendered = [];

    for (const out of job.outputs) {
      const outAbs = path.resolve(projectRoot, out.out);
      const buffer = await renderPdf(browser, htmlAbs, out.size, outAbs);
      const pages = await pdfPageCount(buffer);
      rendered.push({ out: out.out, size: out.size, pages });
      console.log(`✓ Rendered ${out.out} [${out.size}] — ${pages} page(s)`);
    }

    // page count validation (Letter file decides pass/fail expectation)
    const primary = rendered.find(r => r.size === "Letter") ?? rendered[0];
    if (primary && typeof job.expectedPages === "number") {
      if (primary.pages !== job.expectedPages) {
        hadErrors = true;
        console.error(
          `✗ Page count check failed for ${job.html}. Expected ${job.expectedPages}, got ${primary.pages}.`
        );
      } else {
        console.log(`✓ Page count OK for ${job.html} (${primary.pages} page[s])`);
      }
    }

    // Optional copy step
    if (job.copyFrom && job.copyTo) {
      const srcAbs = path.resolve(projectRoot, job.copyFrom);
      const destAbs = path.resolve(projectRoot, job.copyTo);
      await ensureDirSyncLike(destAbs);
      await fs.copyFile(srcAbs, destAbs);
      console.log(`✓ Copied ${job.copyFrom} -> ${job.copyTo}`);
    }
  }

  await browser.close();
  if (hadErrors) {
    console.error("\n❌ Some PDFs have incorrect page counts. Please adjust CSS and try again.");
    process.exit(2);
  } else {
    console.log("\n✅ All PDFs generated successfully with correct page counts!");
  }
})().catch(err => {
  console.error("PDF generation failed:", err);
  process.exit(1);
});
