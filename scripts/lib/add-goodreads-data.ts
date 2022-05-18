import { readFileSync } from "fs";
import { GoodreadsBook, Subject } from "./types.js";

const goodreadsBooks: GoodreadsBook[] = JSON.parse(
  readFileSync("./data/books.json", "utf-8")
);

export default function addGoodReadsData(subject: Subject) {
  let count = 0;
  for (const book of subject.books) {
    book.goodreadsEntry = findGoodreadsBook(book.title);
    if (book.goodreadsEntry) count++;
  }
  for (const childSubject of subject.children) {
    count += addGoodReadsData(childSubject);
  }
  return count;
}

function findGoodreadsBook(title: string) {
  for (const book of goodreadsBooks) {
    if (book.title.toLowerCase().trim() === title.toLowerCase().trim())
      return book;
  }
  return null;
}
