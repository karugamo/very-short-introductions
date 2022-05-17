import { writeFileSync } from "fs";
import got from "got";
import { JSDOM } from "jsdom";

const { body } = await got(
  "https://www.goodreads.com/list/show/43502.The_Oxford_Very_Short_Introductions_Series"
);

const document = new JSDOM(body).window.document;

const bookElements = Array.from(
  document.querySelectorAll('[itemtype="http://schema.org/Book"]')
);

const books = [];

for (const bookElement of bookElements) {
  const book = await parseBookElement(bookElement);
  books.push(book);
}

writeFileSync("./data/books.json", JSON.stringify(books, null, 2));
console.log(`✅ Wrote ${books.length} books to data/books.json`);

async function parseBookElement(bookElement: Element) {
  const title = bookElement
    .querySelector('[itemprop="name"]')
    .textContent.replace(": A Very Short Introduction", "");

  const image = bookElement.querySelector("a img").getAttribute("src");

  const url = bookElement.querySelector("a").getAttribute("href");

  const { rating, numberOfRatings } = parseRatingText(
    bookElement.querySelector(".minirating").textContent
  );

  return { rating, numberOfRatings, url, title, image };
}

function parseRatingText(text: string) {
  const [rating, numberOfRatings] = text
    .replace(",", "")
    .match(/(\d\.\d\d) avg rating — (\d+) ratings/)
    .map(parseFloat);
  return { rating, numberOfRatings };
}
