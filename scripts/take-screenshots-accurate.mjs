import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\b4a03efc-6868-49df-af81-9ff46df1e25a';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function captureAccurate() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Desktop individual section screenshots
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));

  // Desktop Hero
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'desktop-hero-1440.png')
  });

  // Desktop Doctor Section
  const doctorEl = await page.$('#about');
  if (doctorEl) {
    await doctorEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'desktop-doctor-section.png')
    });
  }

  // Desktop Services Section
  const servicesEl = await page.$('#services');
  if (servicesEl) {
    await servicesEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'desktop-services-section.png')
    });
  }

  // Desktop WhyUs Section
  const whyUsEl = await page.$('#why-us');
  if (whyUsEl) {
    await whyUsEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'desktop-whyus-section.png')
    });
  }

  // Desktop Visit Section
  const visitEl = await page.$('#visit-us');
  if (visitEl) {
    await visitEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'desktop-visit-section.png')
    });
  }

  // Full page via body height resizing (no Chromium tile looping bug)
  const bodyHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('Total document height:', bodyHeight);

  // Set header to absolute so it stays at the top
  await page.evaluate(() => {
    const h = document.querySelector('header');
    if (h) h.style.position = 'absolute';
    const mb = document.querySelector('nav[aria-label="Mobile quick actions"]');
    if (mb) mb.style.display = 'none';
  });

  await page.setViewport({ width: 1440, height: bodyHeight, deviceScaleFactor: 1 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'desktop-full-1440.png')
  });

  // Mobile 360px
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'mobile-hero-360.png')
  });

  const mobileDoctorEl = await page.$('#about');
  if (mobileDoctorEl) {
    await mobileDoctorEl.screenshot({
      path: path.join(ARTIFACT_DIR, 'mobile-doctor-section.png')
    });
  }

  const mobileHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.evaluate(() => {
    const h = document.querySelector('header');
    if (h) h.style.position = 'absolute';
    const mb = document.querySelector('nav[aria-label="Mobile quick actions"]');
    if (mb) mb.style.display = 'none';
  });
  await page.setViewport({ width: 360, height: mobileHeight, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'mobile-full-360.png')
  });

  // Tablet 768px
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'tablet-hero-768.png')
  });

  const tabletHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.evaluate(() => {
    const h = document.querySelector('header');
    if (h) h.style.position = 'absolute';
  });
  await page.setViewport({ width: 768, height: tabletHeight, deviceScaleFactor: 1 });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'tablet-full-768.png')
  });

  console.log('Done!');
  await browser.close();
}

captureAccurate().catch(console.error);
