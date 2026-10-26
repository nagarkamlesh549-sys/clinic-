import puppeteer from 'puppeteer-core';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\b4a03efc-6868-49df-af81-9ff46df1e25a';
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 80);
    });
  });
  await new Promise(r => setTimeout(r, 600));
}

async function fixFixedForFullpage(page) {
  await page.evaluate(() => {
    const header = document.querySelector('header');
    if (header) header.style.position = 'absolute';
    const mobileBar = document.querySelector('nav[aria-label="Mobile quick actions"]');
    if (mobileBar) mobileBar.style.display = 'none';
    const floatingBtn = document.querySelector('aside[aria-label="Desktop WhatsApp Contact"]');
    if (floatingBtn) floatingBtn.style.display = 'none';
  });
}

async function restoreFixed(page) {
  await page.evaluate(() => {
    const header = document.querySelector('header');
    if (header) header.style.position = 'fixed';
    const mobileBar = document.querySelector('nav[aria-label="Mobile quick actions"]');
    if (mobileBar) mobileBar.style.display = '';
    const floatingBtn = document.querySelector('aside[aria-label="Desktop WhatsApp Contact"]');
    if (floatingBtn) floatingBtn.style.display = '';
  });
}

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // ================= 1. DESKTOP (1440px) =================
  console.log('Capturing Desktop (1440px)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await autoScroll(page);

  // Desktop Hero
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'desktop-hero-1440.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });

  // Desktop Doctor Section
  await page.evaluate(() => {
    const el = document.querySelector('#about');
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, y - 40);
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'desktop-doctor-section.png'),
    clip: { x: 0, y: 0, width: 1440, height: 820 }
  });

  // Desktop Services Section
  await page.evaluate(() => {
    const el = document.querySelector('#services');
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, y - 40);
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'desktop-services-section.png'),
    clip: { x: 0, y: 0, width: 1440, height: 800 }
  });

  // Desktop Visit Us & Map Section
  await page.evaluate(() => {
    const el = document.querySelector('#visit-us');
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, y - 40);
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'desktop-visit-section.png'),
    clip: { x: 0, y: 0, width: 1440, height: 850 }
  });

  // Clean Desktop Fullpage
  await page.evaluate(() => window.scrollTo(0, 0));
  await fixFixedForFullpage(page);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'desktop-full-1440.png'),
    fullPage: true
  });
  await restoreFixed(page);

  // ================= 2. TABLET (768px) =================
  console.log('Capturing Tablet (768px)...');
  await page.setViewport({ width: 768, height: 1024, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await autoScroll(page);
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'tablet-hero-768.png'),
    clip: { x: 0, y: 0, width: 768, height: 1024 }
  });

  await page.evaluate(() => window.scrollTo(0, 0));
  await fixFixedForFullpage(page);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'tablet-full-768.png'),
    fullPage: true
  });
  await restoreFixed(page);

  // ================= 3. MOBILE (360px) =================
  console.log('Capturing Mobile (360px)...');
  await page.setViewport({ width: 360, height: 780, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await autoScroll(page);
  
  // Mobile Hero with sticky bottom action bar
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'mobile-hero-360.png'),
    clip: { x: 0, y: 0, width: 360, height: 780 }
  });

  // Mobile Doctor section
  await page.evaluate(() => {
    const el = document.querySelector('#about');
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, y - 20);
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'mobile-doctor-section.png'),
    clip: { x: 0, y: 0, width: 360, height: 780 }
  });

  // Mobile Clean Full Page
  await page.evaluate(() => window.scrollTo(0, 0));
  await fixFixedForFullpage(page);
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'mobile-full-360.png'),
    fullPage: true
  });

  console.log('All responsive screenshots captured successfully!');
  await browser.close();
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
