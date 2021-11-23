const puppeteer = require('puppeteer');
const { debug } = require('util');
const IMDB_URL = (tt0109686) => `https://www.imdb.com/title/${tt0109686}/`;
const MOVIE_ID = `tt6763664`;

(async () => {
  /* Initiate the Puppeteer browser */
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const browser = await puppeteer.launch({headless: false});

  /* Go to the IMDB Movie page and wait for it to load */
  await page.goto(IMDB_URL(MOVIE_ID), { waitUntil: 'networkidle0' });

  /* Run javascript inside of the page */
  let data = await page.evaluate(() => {

    let title = document.querySelector('div[class="TitleBlock__TitleContainer-sc-1nlhx7j-1 jxsVNt"]').innerText;
    let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
    let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;

    /* Returning an object filled with the scraped data */
    return {
      title,
      rating,
      ratingCount
    }

  });

  /* Outputting what we scraped */
  console.log(data);
  
  await browser.close();

})();
