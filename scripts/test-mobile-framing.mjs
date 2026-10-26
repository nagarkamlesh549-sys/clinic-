import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/User/.gemini/antigravity/brain/b4a03efc-6868-49df-af81-9ff46df1e25a';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function testMobileFraming() {
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
      .label { position: fixed; top: 16px; left: 16px; background: rgba(11,37,69,0.9); border: 1px solid rgba(19,163,168,0.5); padding: 6px 14px; border-radius: 20px; z-index: 100; font-size: 13px; color: #7EE7E9; font-weight: bold; }
      
      /* Real mobile hero mock matching the user's screenshot */
      .hero-mock { position: fixed; top: 75px; left: 16px; right: 16px; z-index: 50; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; }
      .badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 9999px; background: rgba(11,37,69,0.85); border: 1px solid rgba(255,255,255,0.2); font-size: 11px; }
      .h1 { font-size: 28px; font-weight: bold; margin: 4px 0; line-height: 1.15; }
      .subtext { font-size: 13px; color: #e2e8f0; margin: 0; max-width: 300px; }
      .doc-badge { font-size: 11px; padding: 4px 10px; background: rgba(11,37,69,0.85); border: 1px solid rgba(255,255,255,0.2); border-radius: 9999px; }
      .btn-wa { width: 100%; max-width: 320px; padding: 12px; background: #13A3A8; border-radius: 9999px; font-size: 13px; font-weight: 600; text-align: center; box-shadow: 0 10px 20px rgba(19,163,168,0.3); }
      .btn-call { width: 100%; max-width: 320px; padding: 10px; background: rgba(11,37,69,0.8); border: 1px solid rgba(255,255,255,0.25); border-radius: 9999px; font-size: 13px; font-weight: 600; text-align: center; }
      .anchors { width: 100%; max-width: 320px; display: grid; grid-template-columns: 1fr 1fr 1fr; background: rgba(11,37,69,0.7); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 8px; font-size: 10px; }
      .nav-mock { position: fixed; top: 0; left: 0; right: 0; height: 56px; background: rgba(11,37,69,0.95); border-bottom: 1px solid rgba(19,163,168,0.2); z-index: 90; display: flex; align-items: center; justify-content: space-between; padding: 0 16px; font-weight: bold; }
      .bottom-mock { position: fixed; bottom: 0; left: 0; right: 0; height: 60px; background: rgba(6,21,39,0.95); border-top: 1px solid rgba(255,255,255,0.1); z-index: 90; display: flex; align-items: center; justify-content: space-around; padding: 0 16px; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="nav-mock">
      <span>Netram Eye Care</span>
      <span style="font-size: 12px; background: #13A3A8; padding: 4px 10px; border-radius: 12px;">Call</span>
    </div>

    <div class="label" id="mode-label">Mode</div>

    <div class="hero-mock">
      <div class="badge">Open today 10 AM - 9 PM</div>
      <div class="h1">Clear Vision.<br><span style="color:#7EE7E9;">Trusted Care.</span></div>
      <p class="subtext">Advanced laser, cataract and cornea care in Bhopal.</p>
      <div class="doc-badge">Led by Dr. Siddharth Malaiya</div>
      <div class="btn-wa">Book Appointment on WhatsApp</div>
      <div class="btn-call">Call Now: 79771 92955</div>
      <div class="anchors">
        <div>Laser</div>
        <div>Cataract</div>
        <div>Cornea</div>
      </div>
    </div>

    <div class="bottom-mock">
      <span>Call Clinic</span>
      <span style="background: #13A3A8; padding: 8px 16px; border-radius: 20px;">WhatsApp</span>
    </div>

    <canvas id="cvs" width="780" height="1688"></canvas>

    <script>
      const img = new Image();
      img.src = 'http://localhost:3000/Eyes_opening_frames_24fps/frame_0120.jpg';
      img.onload = () => {
        window.drawMode = (mode) => {
          const cvs = document.getElementById('cvs');
          const ctx = cvs.getContext('2d');
          const W = cvs.width; // 780
          const H = cvs.height; // 1688
          ctx.clearRect(0, 0, W, H);

          if (mode === '1_full_bleed_centered_eye') {
            document.getElementById('mode-label').innerText = '1: Full-Bleed Centered Eye';
            // Scale by height to cover, but shift X to center on the right eye (x = 940 in 1280px source)
            const sH = 720;
            const sW = sH * (W / H); // 720 * (780 / 1688) = 332px
            const sX = 940 - (sW / 2); // centered at right eye
            ctx.drawImage(img, sX, 0, sW, sH, 0, 0, W, H);
          } else if (mode === '2_eye_with_balanced_zoom') {
            document.getElementById('mode-label').innerText = '2: Balanced Eye (Slightly Zoomed Out)';
            // Capture a wider region (440px wide in source), scaled to fit
            const scale = W / 460; // 780 / 460 = 1.695
            const drawW = 1280 * scale;
            const drawH = 720 * scale;
            // Center the eye (940, 360) at (W/2, H*0.48)
            const drawX = (W / 2) - (940 * scale);
            const drawY = (H * 0.48) - (360 * scale);
            
            // Background fill
            ctx.fillStyle = '#040D18';
            ctx.fillRect(0, 0, W, H);

            // Ambient background blur to cover edges
            ctx.save();
            ctx.filter = 'blur(40px)';
            ctx.drawImage(img, drawX - 50, drawY - 50, drawW + 100, drawH + 100);
            ctx.restore();

            // Dark veil
            ctx.fillStyle = 'rgba(4, 13, 24, 0.45)';
            ctx.fillRect(0, 0, W, H);

            // Crisp eye
            ctx.drawImage(img, drawX, drawY, drawW, drawH);
          } else if (mode === '3_both_eyes_cinematic_fade') {
            document.getElementById('mode-label').innerText = '3: Both Eyes with Cinematic Fade';
            // Background fill
            ctx.fillStyle = '#040D18';
            ctx.fillRect(0, 0, W, H);

            // Ambient blurred background filling entire phone
            ctx.save();
            ctx.filter = 'blur(35px)';
            ctx.drawImage(img, -200, 0, W + 400, H);
            ctx.restore();

            ctx.fillStyle = 'rgba(4, 13, 24, 0.5)';
            ctx.fillRect(0, 0, W, H);

            // Crisp both eyes centered vertically around H * 0.46
            const drawW = W;
            const drawH = W / (1280 / 720); // 780 / 1.777 = 438px
            const drawY = (H * 0.46) - (drawH / 2);
            ctx.drawImage(img, 0, 0, 1280, 720, 0, drawY, drawW, drawH);

            // Top and bottom feathering gradients so there are NO harsh edges
            const gradTop = ctx.createLinearGradient(0, drawY, 0, drawY + 80);
            gradTop.addColorStop(0, 'rgba(4,13,24,0.9)');
            gradTop.addColorStop(1, 'rgba(4,13,24,0)');
            ctx.fillStyle = gradTop;
            ctx.fillRect(0, drawY, drawW, 80);

            const gradBottom = ctx.createLinearGradient(0, drawY + drawH - 80, 0, drawY + drawH);
            gradBottom.addColorStop(0, 'rgba(4,13,24,0)');
            gradBottom.addColorStop(1, 'rgba(4,13,24,0.9)');
            ctx.fillStyle = gradBottom;
            ctx.fillRect(0, drawY + drawH - 80, drawW, 80);
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

  const testModes = ['1_full_bleed_centered_eye', '2_eye_with_balanced_zoom', '3_both_eyes_cinematic_fade'];
  for (const m of testModes) {
    await page.evaluate((mode) => window.drawMode(mode), m);
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, `mobile_test_${m}.png`) });
    console.log(`Captured ${m}`);
  }

  await browser.close();
  console.log('Mobile tests completed successfully!');
}

testMobileFraming().catch(console.error);
