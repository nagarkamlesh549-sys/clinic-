import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/User/.gemini/antigravity/brain/b4a03efc-6868-49df-af81-9ff46df1e25a';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });

  const testHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { margin: 0; background: #040D18; color: white; font-family: sans-serif; overflow: hidden; }
      canvas { display: block; position: fixed; inset: 0; width: 390px; height: 844px; }
      .label { position: fixed; top: 16px; left: 16px; background: rgba(11,37,69,0.85); border: 1px solid rgba(19,163,168,0.4); padding: 6px 12px; border-radius: 20px; z-index: 100; font-size: 12px; color: #7EE7E9; }
      .hero-mock { position: fixed; top: 80px; left: 16px; right: 16px; z-index: 50; }
      .card-mock { background: rgba(11,37,69,0.7); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; padding: 14px; margin-top: 12px; }
    </style>
  </head>
  <body>
    <div class="label" id="mode-label">Option</div>
    <div class="hero-mock">
      <h2 style="margin:0; font-size: 26px; line-height: 1.2;">Clear Vision.<br><span style="color:#7EE7E9;">Trusted Care.</span></h2>
      <div class="card-mock">
        <p style="margin:0; font-size: 13px; color: #cbd5e1;">Advanced laser, cataract and cornea care in Bhopal.</p>
      </div>
    </div>
    <canvas id="cvs" width="780" height="1688"></canvas>
    <script>
      const img = new Image();
      img.src = 'http://localhost:3000/Eyes_opening_frames_24fps/frame_0120.jpg';
      img.onload = () => {
        window.drawMode = (mode) => {
          const cvs = document.getElementById('cvs');
          const ctx = cvs.getContext('2d');
          const W = cvs.width;
          const H = cvs.height;
          ctx.clearRect(0, 0, W, H);

          if (mode === 'A_right_eye_centered') {
            document.getElementById('mode-label').innerText = 'Option A: Single Full Eye (Right Eye Centered)';
            // In 1280x720, the right eye is at x=950, y=370.
            // Width of eye region is ~500px, height is ~500px.
            // On a 780x1688 canvas (aspect 0.462):
            const sH = 720;
            const sW = sH * (W / H); // ~332px
            const sX = 950 - (sW / 2);
            ctx.drawImage(img, sX, 0, sW, sH, 0, 0, W, H);
          } else if (mode === 'B_both_eyes_top_center') {
            document.getElementById('mode-label').innerText = 'Option B: Both Eyes Fitted Across Screen Width';
            // Scale so 1280px width fits 780px width:
            const drawW = W;
            const drawH = W / (1280 / 720); // 780 / 1.777 = 438px
            // Place it vertically centered or slightly upper (y = 400px)
            const drawY = (H - drawH) / 2;
            
            // Draw blurred background
            ctx.save();
            ctx.filter = 'blur(20px)';
            ctx.drawImage(img, 0, 0, 1280, 720, -100, 0, W + 200, H);
            ctx.restore();

            // Dark translucent veil
            ctx.fillStyle = 'rgba(4, 13, 24, 0.55)';
            ctx.fillRect(0, 0, W, H);

            // Draw crisp eyes
            ctx.drawImage(img, 0, 0, 1280, 720, 0, drawY, drawW, drawH);
          } else if (mode === 'C_cinematic_eye_macro') {
            document.getElementById('mode-label').innerText = 'Option C: Cinematic Eye Macro (Full Iris & Lashes)';
            // Crop a nice 480x720 region around x=920
            const sX = 700;
            const sW = 480;
            const sY = 80;
            const sH = 600;
            ctx.drawImage(img, sX, sY, sW, sH, 0, 0, W, H);
          }
        };
        window.imgLoaded = true;
      };
    </script>
  </body>
  </html>
  `;

  await page.setContent(testHtml);
  await page.waitForFunction(() => window.imgLoaded);

  const modes = ['A_right_eye_centered', 'B_both_eyes_top_center', 'C_cinematic_eye_macro'];
  for (const m of modes) {
    await page.evaluate((mode) => window.drawMode(mode), m);
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, `mobile_opt_${m}.png`) });
    console.log(`Captured ${m}`);
  }

  await browser.close();
  console.log('Done testing mobile options!');
}

run().catch(console.error);
