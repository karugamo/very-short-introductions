import got from 'got'
import { JSDOM } from 'jsdom'

const {body} = await got('https://www.goodreads.com/list/show/43502.The_Oxford_Very_Short_Introductions_Series')

const document = new JSDOM(body).window.document


const bookElements = Array.from(document.querySelectorAll('[itemtype="http://schema.org/Book"]'))

for (const bookElement of bookElements) {
  const book = await parseBookElement(bookElement)
  console.log(book)
}

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