import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/User/.gemini/antigravity/brain/b4a03efc-6868-49df-af81-9ff46df1e25a';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function verifyWholeSite() {
  console.log('Launching Chrome for full-site scroll verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Initial wait for frame 1
  await new Promise(r => setTimeout(r, 2000));

  const scrollCheckpoints = [
    { name: 'fullsite_01_hero_closed', y: 0, label: 'Hero Section (Top - Eyes Closed)' },
    { name: 'fullsite_02_services_opening', y: 1000, label: 'Services Section (Eyes Opening)' },
    { name: 'fullsite_03_why_us_opened', y: 2000, label: 'Why Choose Us (Eyes Wide)' },
    { name: 'fullsite_04_doctor_focused', y: 3100, label: 'Doctor Profile (Eyes Focused)' },
    { name: 'fullsite_05_faq_visit', y: 5200, label: 'FAQ & Visit Us (Eyes Radiating Clarity)' },
  ];

  for (const checkpoint of scrollCheckpoints) {
    console.log(`Scrolling to y = ${checkpoint.y} (${checkpoint.label})...`);
    await page.evaluate((y) => {
      window.scrollTo(0, y);
    }, checkpoint.y);

    // Wait 1.2s for lerp smoothing and image render
    await new Promise(r => setTimeout(r, 1200));

    const actualY = await page.evaluate(() => window.scrollY);
    console.log(`Verified scrollY: ${actualY}`);

    const filePath = path.join(ARTIFACT_DIR, `${checkpoint.name}.png`);
    await page.screenshot({
      path: filePath,
      captureBeyondViewport: false
    });
    console.log(`Saved screenshot: ${filePath}`);
  }

  // Mobile test
  console.log('Testing Mobile Viewport (360x780)...');
  await page.setViewport({ width: 360, height: 780, isMobile: true, hasTouch: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'fullsite_mobile_01_hero.png'),
    captureBeyondViewport: false
  });

  await page.evaluate(() => window.scrollTo(0, 1400));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'fullsite_mobile_02_services.png'),
    captureBeyondViewport: false
  });

  await browser.close();
  console.log('Full-site verification complete!');
}

verifyWholeSite().catch(console.error);
