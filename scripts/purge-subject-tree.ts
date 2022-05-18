import { readFileSync, writeFileSync } from "fs";
import purgeDuplicateBooks from "./lib/purge-duplicate-books.js";
import moveBooksWithSubjectNameIntoSubject from "./lib/subject-can-be-book.js";
import { BookEntry } from "./process-subject-books.js";

const rawSubjects = JSON.parse(
  readFileSync("./data/books-by-subject.json", "utf-8")
) as RawSubject[];

const oldTree: Subject = {
  name: "Root",
  subjectId: "root",
  children: rawSubjects.map(convertRawSubjectToSubject),
  books: [],
};

const newTree: Subject = {
  name: "Root",
  subjectId: "root",
  children: [],
  books: [],
};

let purgedSubjectsWithOnlyOneBook = 0;
let purgedSubjectsWithOnlyOneSubCategory = 0;

function traverseTree(subjects: Subject[], parent: Subject) {
  for (const subject of subjects) {
    if (subjectWithOnlyOneBook(subject)) {
      addBooks(parent, subject.books);
      purgedSubjectsWithOnlyOneBook++;
      continue;
    }

    if (subjectWithoutBooksAndOneSubCategory(subject)) {
      traverseTree(subject.children, parent);
      purgedSubjectsWithOnlyOneSubCategory++;
      continue;
    }

    const childSubject = addSubjectWithoutChildren(parent, subject);
    if (shouldContinueTraverse(subject))
      traverseTree(subject.children, childSubject);
  }

  function shouldContinueTraverse(rawSubject: Subject): boolean {
    if (rawSubject.children.length === 0) return false;
    return true;
  }

  function subjectWithoutBooksAndOneSubCategory(subject: Subject) {
    return (subject.books?.length ?? 0) === 0 && subject.children.length === 1;
  }

  function subjectWithOnlyOneBook(subject: Subject) {
    const numberOfBooks = subject.books?.length ?? 0;
    const hasOnlyOneBook = numberOfBooks === 1;
    const hasChildSubjects = subject.children.length > 0;

    return hasOnlyOneBook && !hasChildSubjects;
  }
}

console.log("\n\n");

const purgedDulplicateEditions = purgeDuplicateBooks(oldTree);
console.log(`Purged ${purgedDulplicateEditions} more outdated editions`);

traverseTree(oldTree.children, newTree);

const subjectsWithBooks = moveBooksWithSubjectNameIntoSubject(newTree);

console.log(
  `Found ${subjectsWithBooks.length} subjects with matching book titles`
);

console.log(
  `Purged: ${purgedSubjectsWithOnlyOneBook} subjects with only one book`
);

console.log(
  `Purged ${purgedSubjectsWithOnlyOneSubCategory} subjects with only one child subject and no books`
);

writeFileSync(
  "./data/purged-subjects-with-books.json",
  JSON.stringify(newTree.children, null, 2)
);

function addSubjectWithoutChildren(
  parentSubject: Subject,
  childSubject: Subject
) {
  const newSubject = { ...childSubject, children: [] };
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

export interface Subject {
  name: string;
  subjectId: string;
  subjectBook?: Book;
  books: Book[];
  children: Subject[];
}

function addBooks(subject: Subject, books?: Book[]) {
  for (const book of books ?? []) {
    subject.books.push(book);
  }
}

export interface Book {
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
  return title.split(":")[0];
}

function convertRawSubjectToSubject(rawSubject: RawSubject): Subject {
  return {
    name: rawSubject.name,
    subjectId: rawSubject.subjectId,
    books: rawSubject.books?.map(convertBookEntry) ?? [],
    children: rawSubject.children.map(convertRawSubjectToSubject),
  };
}
