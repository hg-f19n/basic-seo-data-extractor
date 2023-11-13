readme.md
# Web Content Extractor

This Node.js script is designed to extract specific HTML elements from a list of web pages. It reads URLs from a text file, fetches each web page, and extracts the `<title>` element, `<link rel="canonical">` element, and all `<h1>` elements (both their HTML and text content). The extracted data is then saved to a CSV file.

## Features

- Extracts the full HTML of the `<title>` and `<link rel="canonical">` elements.
- Extracts the full HTML and the text content of all `<h1>` elements.
- Handles multiple `<h1>` elements per page.
- Outputs the results in a CSV file.

## Installation

Before running the script, ensure you have Node.js installed. Then, install the required packages:

```bash
npm install axios cheerio json2csv
```

## Usage

1.  Create a text file (e.g., `urls.txt`) and list the URLs you want to scrape, each on a new line.

2.  Run the script using Node.js:

    bashCopy code

    `node extractData.js`

3.  The script will create an `output.csv` file containing the extracted data.


## Script Breakdown

-   `extractDataFromUrl(url)`: Fetches and parses the HTML content of a given URL, then extracts the required elements.
-   `processUrls(file)`: Reads a list of URLs from a file, processes each URL using `extractDataFromUrl`, and saves the results to a CSV file.


## Output Format

The CSV file will contain the following columns:

-   `url`: The URL of the web page.
-   `title`: The full HTML of the `<title>` element.
-   `canonical`: The full HTML of the `<link rel="canonical">` element.
-   `h1_html`: The full HTML of all `<h1>` elements.
-   `h1_text`: The text content of all `<h1>` elements.


## Notes

-   The script assumes that each URL is on a new line in the text file.
-   Network errors or inaccessible URLs will be logged to the console.
-   Ensure you have the legal right to scrape the websites you target, as this script makes HTTP requests and parses content from these sites.