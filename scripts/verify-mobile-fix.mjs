import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/User/.gemini/antigravity/brain/b4a03efc-6868-49df-af81-9ff46df1e25a';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function verifyMobileFix() {
  console.log('Launching Chrome for mobile eye verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  // Test iPhone 14/15 size: 390 x 844
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const mobileTargets = [
    { name: 'mobile_fixed_01_hero_top', y: 0, label: 'Hero Top (Closed Eye Centered)' },
    { name: 'mobile_fixed_02_hero_opening', y: 450, label: 'Hero Mid-Scroll (Eye Opening)' },
    { name: 'mobile_fixed_03_services', y: 1200, label: 'Services Cards (Eye Opening behind cards)' },
    { name: 'mobile_fixed_04_why_us_user_match', y: 2200, label: 'Why Patients Trust (Matching User Image 1)' },
    { name: 'mobile_fixed_05_doctor', y: 3400, label: 'Meet Doctor Profile' },
  ];

  for (const target of mobileTargets) {
    console.log(`Scrolling to y = ${target.y} (${target.label})...`);
    await page.evaluate((y) => {
      window.scrollTo(0, y);
    }, target.y);

    await new Promise(r => setTimeout(r, 1200));

    const actualY = await page.evaluate(() => window.scrollY);
    console.log(`Verified scrollY: ${actualY}`);

    const filePath = path.join(ARTIFACT_DIR, `${target.name}.png`);
    await page.screenshot({
      path: filePath,
      captureBeyondViewport: false
    });
    console.log(`Saved screenshot: ${filePath}`);
  }

  await browser.close();
  console.log('Mobile verification complete!');
}

verifyMobileFix().catch(console.error);
