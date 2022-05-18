import { Book, Subject } from "../purge-subject-tree.js";

const booksWithParentByTitle: {
  [title: string]: BookWithSubject[];
} = {};

export default function purgeDuplicateBooks(subject: Subject) {
  const booksWithParentByTitle = collectBooksByTitle(subject);

  const titles = Object.keys(booksWithParentByTitle);

  let count = 0;

  for (const title of titles) {
    const books = booksWithParentByTitle[title];
    if (books.length <= 1) continue;
    const booksByOldestFirst = sortByDate(books);
    const outdatedEditions = booksByOldestFirst.slice(0, -1);
    count += outdatedEditions.length;
    removeBooks(outdatedEditions);
  }

  return count;
}

export function collectBooksByTitle(subject: Subject) {
  for (const book of subject.books) {
    addBook(book, subject);
  }
  for (const childSubject of subject.children) {
    collectBooksByTitle(childSubject);
  }
  return booksWithParentByTitle;
}

function addBook(book: Book, subject: Subject) {
  if (!booksWithParentByTitle[book.title]) {
    booksWithParentByTitle[book.title] = [{ book, subject }];
  } else {
    booksWithParentByTitle[book.title].push({ book, subject });
  }
}

function removeBooks(books: BookWithSubject[]) {
  for (const { book, subject } of books) {
    subject.books = subject.books.filter((b) => b.doi !== book.doi);
  }
}

function sortByDate(books: BookWithSubject[]) {
  return books.sort((a, b) => {
    return Number(a.book.printDate) - Number(b.book.printDate);
  });
}

export interface BookWithSubject {
  book: Book;
  subject: Subject;
}
