import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const FRAMES_DIR = 'public/Eyes_opening_frames_24fps';
const TOTAL_FRAMES = 240;

// Watermark bounding box in 1280x720 video frames
const x1 = 1132;
const y1 = 572;
const x2 = 1188;
const y2 = 628;
const w = x2 - x1;
const h = y2 - y1;

async function processAllFrames() {
  console.log(`Starting watermark removal on ${TOTAL_FRAMES} frames...`);
  const startTime = Date.now();
  let completed = 0;

  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const padded = String(i).padStart(4, '0');
    const filename = `frame_${padded}.jpg`;
    const filePath = path.join(FRAMES_DIR, filename);

    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    const { data, info } = await sharp(filePath)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const width = info.width;
    const height = info.height;
    const channels = info.channels;
    const out = Buffer.from(data);

    // Bilinear harmonic boundary interpolation to smoothly reconstruct skin & bokeh
    for (let y = y1; y <= y2; y++) {
      const v = (y - y1) / h;
      for (let x = x1; x <= x2; x++) {
        const u = (x - x1) / w;

        const topIdx = (Math.max(0, y1 - 2) * width + x) * channels;
        const botIdx = (Math.min(height - 1, y2 + 2) * width + x) * channels;
        const leftIdx = (y * width + Math.max(0, x1 - 2)) * channels;
        const rightIdx = (y * width + Math.min(width - 1, x2 + 2)) * channels;

        const idx = (y * width + x) * channels;

        for (let c = 0; c < channels; c++) {
          const horiz = (1 - u) * data[leftIdx + c] + u * data[rightIdx + c];
          const vert = (1 - v) * data[topIdx + c] + v * data[botIdx + c];
          const blend = (horiz + vert) * 0.5;
          const noise = (Math.random() - 0.5) * 3;
          out[idx + c] = Math.max(0, Math.min(255, Math.round(blend + noise)));
        }
      }
    }

    // Save with high JPEG quality (92)
    const tempPath = filePath + '.tmp';
    await sharp(out, { raw: { width, height, channels } })
      .jpeg({ quality: 92 })
      .toFile(tempPath);

    fs.renameSync(tempPath, filePath);
    completed++;

    if (completed % 40 === 0 || completed === TOTAL_FRAMES) {
      console.log(`Processed ${completed}/${TOTAL_FRAMES} frames...`);
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`SUCCESS: All ${completed} frames cleaned in ${duration}s! Watermark removed from entire website.`);
}

processAllFrames().catch(console.error);
