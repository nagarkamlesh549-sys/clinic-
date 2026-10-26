import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\b4a03efc-6868-49df-af81-9ff46df1e25a';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testScrollAnimation() {
  console.log('Testing scroll-based animation...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // 1. Initial State: scrollY = 0 (Eyes Closed)
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'scroll_frame_01_closed.png'),
    captureBeyondViewport: false
  });

  // 2. Mid Scroll: scrollY = 450 (Eyes Opening)
  await page.evaluate(() => window.scrollTo({ top: 450, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'scroll_frame_02_opening.png'),
    captureBeyondViewport: false
  });

  // 3. Deeper Scroll: scrollY = 850 (Eyes Wide Open)
  await page.evaluate(() => window.scrollTo({ top: 850, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'scroll_frame_03_opened.png'),
    captureBeyondViewport: false
  });

  // 4. Mobile 360px Test at scrollY = 0 and scrollY = 450
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'mobile_scroll_01_closed.png'),
    captureBeyondViewport: false
  });

  await page.evaluate(() => window.scrollTo({ top: 450, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'mobile_scroll_02_opened.png'),
    captureBeyondViewport: false
  });

  console.log('Scroll animation captures complete!');
  await browser.close();
}

testScrollAnimation().catch(console.error);
