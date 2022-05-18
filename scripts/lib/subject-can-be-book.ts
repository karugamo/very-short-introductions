import { Subject } from "../purge-subject-tree.js";
import { BookWithSubject } from "./purge-duplicate-books.js";

// should also work for Mathematics > Pure Mathematics > Mathematics

export default function moveBooksWithSubjectNameIntoSubject(subject: Subject) {
  const bookWithSubject = findBookInSubjectTree(subject, subject.name);
  const titles: string[] = [];

  if (bookWithSubject) {
    subject.subjectBook = bookWithSubject.book;
    bookWithSubject.subject.books = bookWithSubject.subject.books.filter(
      (b) => b.doi !== bookWithSubject.book.doi
    );
    titles.push(bookWithSubject.book.title);
  }
  for (const childSubject of subject.children) {
    titles.push(...moveBooksWithSubjectNameIntoSubject(childSubject));
  }
  return titles;
}

function findBookInSubjectTree(
  subject: Subject,
  subjectName: string
): BookWithSubject | null {
  for (const book of subject.books) {
    if (book.title === subjectName) return { book, subject };
  }
  for (const childSubject of subject.children) {
    const potentialSubject = findBookInSubjectTree(childSubject, subjectName);
    if (potentialSubject) return potentialSubject;
  }
  return null;
}
