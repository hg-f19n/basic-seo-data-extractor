const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const { Parser } = require('json2csv');

async function extractDataFromUrl(url) {
  try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const title = $('title').toString();
      const canonical = $('link[rel="canonical"]').toString();
      const h1sHtml = $('h1').map((i, el) => $(el).toString()).get();
      const h1sText = $('h1').map((i, el) => $(el).text().trim()).get();

      return { 
          url, 
          title, 
          canonical, 
          h1_html: h1sHtml.join(' | '), 
          h1_text: h1sText.join(' | ') 
      };
  } catch (error) {
      console.error(`Error fetching ${url}: `, error.message);
      return { url, error: error.message };
  }
}
async function processUrls(file) {
    const urls = fs.readFileSync(file, 'utf8').split('\n');
    const results = [];

    for (const url of urls) {
        if (url) {
            const data = await extractDataFromUrl(url.trim());
            results.push(data);
        }
    }

    const parser = new Parser({ fields: ['url', 'title', 'canonical', 'h1_html', 'h1_text'] });
    const csv = parser.parse(results);
    fs.writeFileSync('output.csv', csv);

    console.log('Data extraction completed. Check output.csv');
}

// Replace 'urls.txt' with your file name
processUrls('urls.txt');
