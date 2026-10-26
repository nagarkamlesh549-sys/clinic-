import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function checkSticky() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 780, isMobile: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  const getPos = async () => {
    return await page.evaluate(() => {
      const container = document.querySelector('[class*="h-[180vh]"]');
      const stickyDiv = container?.firstElementChild;
      const h1 = document.querySelector('h1');
      const r = el => el ? { top: el.getBoundingClientRect().top, bottom: el.getBoundingClientRect().bottom, height: el.getBoundingClientRect().height } : null;
      return {
        containerRect: r(container),
        stickyRect: r(stickyDiv),
        h1Rect: r(h1),
        scrollY: window.scrollY
      };
    });
  };

  console.log('At scroll 0:', await getPos());

  await page.evaluate(() => window.scrollTo(0, 450));
  await new Promise(r => setTimeout(r, 200));

  console.log('At scroll 450:', await getPos());

  await browser.close();
}

checkSticky().catch(console.error);
