import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/User/.gemini/antigravity/brain/b4a03efc-6868-49df-af81-9ff46df1e25a';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function testFullSiteMobileBothOptions() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Let's inject a custom render function into the canvas to test Option A and Option B live on the site!
  // Option A: Single Full Eye Centered
  await page.evaluate(() => {
    window.__setMobileDrawMode = 'single_eye';
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const origDrawImage = ctx.drawImage.bind(ctx);

    window.__customDraw = (img) => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      if (window.__setMobileDrawMode === 'single_eye') {
        // Option A: Single full eye centered at x = 940
        const sH = 720;
        const sW = sH * (W / H);
        const sX = 940 - (sW / 2);
        origDrawImage(img, sX, 0, sW, sH, 0, 0, W, H);
      } else {
        // Option B: Both eyes fitted across width
        const drawW = W;
        const drawH = W / (1280 / 720);
        const drawY = (H * 0.45) - (drawH / 2);

        ctx.fillStyle = '#040D18';
        ctx.fillRect(0, 0, W, H);

        ctx.save();
        ctx.filter = 'blur(30px)';
        origDrawImage(img, 0, 0, 1280, 720, -100, 0, W + 200, H);
        ctx.restore();

        ctx.fillStyle = 'rgba(4, 13, 24, 0.45)';
        ctx.fillRect(0, 0, W, H);

        origDrawImage(img, 0, 0, 1280, 720, 0, drawY, drawW, drawH);

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
  });

  // Let's test on the actual page by loading frame 120 and drawing it
  await page.evaluate(async () => {
    const img = new Image();
    img.src = '/Eyes_opening_frames_24fps/frame_0120.jpg';
    await new Promise(r => img.onload = r);
    window.__testImg = img;
  });

  // 1. Single Eye: Hero & Services & Why Us (matching user's screenshot position)
  await page.evaluate(() => {
    window.__setMobileDrawMode = 'single_eye';
    window.__customDraw(window.__testImg);
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'compare_optA_hero.png') });

  // Scroll to y = 1450 (Why Patients Trust Netram Eye Care - user's image 1)
  await page.evaluate(() => {
    window.scrollTo(0, 1450);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    window.__customDraw(window.__testImg);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'compare_optA_why_us.png') });

  // 2. Both Eyes: Hero & Why Us
  await page.evaluate(() => {
    window.__setMobileDrawMode = 'both_eyes';
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    window.__customDraw(window.__testImg);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'compare_optB_hero.png') });

  await page.evaluate(() => {
    window.scrollTo(0, 1450);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    window.__customDraw(window.__testImg);
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'compare_optB_why_us.png') });

  await browser.close();
  console.log('Comparison complete!');
}

testFullSiteMobileBothOptions().catch(console.error);
