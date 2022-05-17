import got from 'got'
import { JSDOM } from 'jsdom'
import {writeFileSync} from 'fs'

const {body} = await got('https://www.goodreads.com/list/show/43502.The_Oxford_Very_Short_Introductions_Series')

const document = new JSDOM(body).window.document


const bookElements = Array.from(document.querySelectorAll('[itemtype="http://schema.org/Book"]'))

const books = []

for (const bookElement of bookElements) {
  const book = await parseBookElement(bookElement)
  books.push(book)
}

writeFileSync('./data/books.json', JSON.stringify(books, null, 2))
console.log(`✅ Wrote ${books.length} books to data/books.json`)

async function parseBookElement(bookElement: Element) {
  const title = bookElement.querySelector('[itemprop="name"]').textContent

  const image = bookElement.querySelector('a img').getAttribute('src')

  const url = bookElement.querySelector('a').getAttribute('href')

  const {rating, numberOfRatings} = parseRatingText(bookElement.querySelector('.minirating').textContent)

  return {rating, numberOfRatings, url, title, image}

}

// 3.83 avg rating — 2,193 ratings
function parseRatingText(text: string) {
  const [rating, count] = text.replace(',', '').split(' — ')
  return {
    rating: parseFloat(rating),
    numberOfRatings: parseInt(count)
  }
}