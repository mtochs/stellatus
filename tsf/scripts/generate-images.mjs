import fs from "node:fs/promises";
import Replicate from "replicate";

// This script is a fallback for generating images if MCP Replicate is not available
// Usage: export REPLICATE_API_TOKEN=... && node ./tsf/scripts/generate-images.mjs

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

const jobs = [
  {
    file: "hero.jpg", 
    prompt: "Photorealistic aerial of a modern tailings storage facility at golden hour, Nevada desert setting, reflective pond, engineered embankments, light dust haze, cinematic lighting, enterprise aesthetic. No overlaid text."
  },
  {
    file: "ingestion.jpg", 
    prompt: "Photorealistic site office interior with a rugged laptop showing green-check dashboard for data ingestion & QC. Subtle DOF, neutral light, enterprise look."
  },
  {
    file: "change-cards.jpg", 
    prompt: "Photorealistic workstation monitor with analytics cards (movement, pore-pressure, pond volume). No on-screen readable text; UI impression only."
  },
  {
    file: "draft.jpg", 
    prompt: "Photorealistic monitor with a Word-like report preview and charts; provenance side panel. Clean office, shallow DOF."
  },
  {
    file: "security.jpg", 
    prompt: "Photorealistic secure data room with translucent lock motif and gold accent reflections; calm lighting."
  }
];

console.log("Starting image generation with bytedance/seedream-4...");

for (const j of jobs) {
  try {
    console.log(`Generating ${j.file}...`);
    const output = await replicate.run("bytedance/seedream-4", { 
      input: { prompt: j.prompt }
    });
    
    const imageUrl = output?.[0] || output?.image_base64 || output;
    
    if (!imageUrl) {
      console.warn(`No image output for ${j.file}`);
      continue;
    }
    
    // Handle URL or base64
    if (imageUrl.startsWith('http')) {
      // Fetch from URL
      const response = await fetch(imageUrl);
      const buffer = await response.arrayBuffer();
      await fs.writeFile(
        new URL(`../assets/images/${j.file}`, import.meta.url),
        Buffer.from(buffer)
      );
    } else {
      // Handle base64
      const buf = Buffer.from(
        imageUrl.replace(/^data:image\/\w+;base64,/, ""), 
        "base64"
      );
      await fs.writeFile(
        new URL(`../assets/images/${j.file}`, import.meta.url),
        buf
      );
    }
    
    console.log(`✓ Generated ${j.file}`);
  } catch (error) {
    console.error(`Error generating ${j.file}:`, error.message);
  }
}

console.log("\nImage generation complete!");
