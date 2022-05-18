import { readFileSync, writeFileSync } from "fs";
import { BookEntry } from "./process-subject-books.js";

const booksBySubject = JSON.parse(
  readFileSync("./data/books-by-subject.json", "utf-8")
);

const newTree: Subject = {
  name: "Root",
  subjectId: "root",
  children: [],
  books: [],
};

let purged = 0;

function traverseTree(subtree: RawSubject[], parent: Subject) {
  for (const rawSubject of subtree) {
    if (subjectWithOnlyOneBook(rawSubject)) {
      addBooks(parent, rawSubject.books);
      console.log(
        `${rawSubject.name}\t\t->\t\t${cleanTitle(rawSubject.books[0].Title)}`
      );
      purged++;
      continue;
    }
    const subject = addSubjectWithoutChildren(parent, rawSubject);
    if (shouldContinueTraverse(rawSubject))
      traverseTree(rawSubject.children, subject);
  }

  function shouldContinueTraverse(rawSubject: RawSubject): boolean {
    if (rawSubject.children.length === 0) return false;
    return true;
  }

  function subjectWithOnlyOneBook(subject: RawSubject) {
    const numberOfBooks = subject.books?.length ?? 0;
    const hasOnlyOneBook = numberOfBooks === 1;
    const hasChildSubjects = subject.children.length > 0;

    return hasOnlyOneBook && !hasChildSubjects;
  }
}

traverseTree(booksBySubject, newTree);
console.log(`\n\nPurged: ${purged} subjects with only one book`);

writeFileSync(
  "./data/purged-subjects-with-books.json",
  JSON.stringify(newTree, null, 2)
);

function addSubjectWithoutChildren(
  parentSubject: Subject,
  rawSubject: RawSubject
) {
  const newSubject = {
    subjectId: rawSubject.subjectId,
    name: rawSubject.name,
    books: (rawSubject.books ?? []).map(convertBookEntry),
    children: [],
  };
  parentSubject.children.push(newSubject);
  return newSubject;
}

interface RawSubject {
  subjectId: string;
  name: string;
  facetValue: string;
  books?: BookEntry[];
  children: RawSubject[];
}

interface Subject {
  name: string;
  subjectId: string;
  books: Book[];
  children: Subject[];
}

function addBooks(subject: Subject, bookEntries?: BookEntry[]) {
  for (const bookEntry of bookEntries ?? []) {
    subject.books.push(convertBookEntry(bookEntry));
  }
}

function addBook(subject: Subject, book: any) {
  if (subject.books) {
    subject.books.push(book);
  } else {
    subject.books = [book];
  }
}

interface Book {
  title: string;
  uploadDate: string;
  module: string;
  authors: string;
  printDate: string;
  doi: string;
  disciplines: string;
  isbn: string;
  url: string;
  moduleName: string;
}

function convertBookEntry(bookEntry: BookEntry): Book {
  return {
    title: cleanTitle(bookEntry.Title),
    uploadDate: bookEntry["Upload Date"],
    module: bookEntry.Module,
    authors: bookEntry.Authors,
    printDate: bookEntry["Print Publication Date"],
    doi: bookEntry.DOI,
    isbn: bookEntry.ISBN,
    disciplines: bookEntry["Sub-discipline"],
    url: bookEntry.LINK,
    moduleName: bookEntry["Site Module Name"],
  };
}

function cleanTitle(title: string) {
  return title.replace(": A Very Short Introduction", "");
}
