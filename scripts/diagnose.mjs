import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function diagnose() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Let's inject a monitor into the page
  const metrics = await page.evaluate(async () => {
    // Check how many images in DOM have loaded
    const container = document.querySelector('[class*="h-[175vh]"], [class*="h-[200vh]"]');
    const rect = container?.getBoundingClientRect();
    const windowH = window.innerHeight;
    const containerH = container?.offsetHeight;
    
    return {
      containerFound: !!container,
      containerH,
      windowH,
      rectTop: rect?.top,
      scrollY: window.scrollY
    };
  });
  console.log('Metrics at top:', metrics);

  // Scroll to 500
  await page.evaluate(() => {
    window.scrollTo({ top: 500 });
  });

  await new Promise(r => setTimeout(r, 500));

  const metrics500 = await page.evaluate(() => {
    const container = document.querySelector('[class*="h-[175vh]"], [class*="h-[200vh]"]');
    const rect = container?.getBoundingClientRect();
    const windowH = window.innerHeight;
    const containerH = container?.offsetHeight;
    const scrollDist = -rect.top;
    const totalScrollable = containerH - windowH;
    const progress = Math.max(0, Math.min(1, scrollDist / totalScrollable));
    const targetFrame = Math.min(240, Math.max(1, Math.round(progress * 239) + 1));
    return {
      rectTop: rect?.top,
      scrollDist,
      totalScrollable,
      progress,
      targetFrame
    };
  });
  console.log('Metrics at 500px scroll:', metrics500);

  // Wait 3 seconds to let images preload and check how many images are loaded in memory
  await new Promise(r => setTimeout(r, 3000));

  await browser.close();
}

diagnose().catch(console.error);
