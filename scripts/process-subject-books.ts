import { parse } from "csv-string";
import { readFileSync, writeFileSync } from "fs";

const subjects = JSON.parse(readFileSync("./data/subjects.json", "utf-8"));

const booksCsv = readFileSync("./data/books.csv", "utf-8");

const books: BookEntry[] = parse(booksCsv, { output: "objects" }) as any;

const outdatedSubjects = ["Environmental Science"];

for (const book of books) {
  console.log(book.Title);
  addToSubjectTree(book);
}

writeFileSync(
  "./data/books-by-subject.json",
  JSON.stringify(subjects, null, 2),
  "utf-8"
);

function addToSubjectTree(book: any) {
  const subjectList = parseSubjectList(book["Sub-discipline"]);
  let subject = null;
  let n = 1;
  while (!subject && n <= subjectList.length) {
    subject = findSubjectFromTree(joinLast(subjectList, n));
    n++;
  }
  if (!subject) throw new Error(`Could not find subject ${book["Sub-discipline"]}`);

  subject.books = subject.books || [];
  subject.books.push(book);
  return subject;
}

function joinLast(list: string[], n: number) {
  return list.slice(-n).join(", ");
}

function parseSubjectList(subjectList: string) {
  return subjectList
    .split(", ")
    .filter(
      (subject) => subject !== "null" && !outdatedSubjects.includes(subject)
    );
}

function findSubjectFromTree(
  subjectName: string,
  subjectSubTree: any = subjects
) {
  for (const subject of subjectSubTree) {
    if (subject.name === subjectName) return subject;

    const childSubject = findSubjectFromTree(subjectName, subject.children);
    if (childSubject) return childSubject;
  }
}

export interface BookEntry {
  Title: string;
  "Upload Date": string;
  Module: string;
  Authors: string;
  "Print Publication Date": string;
  DOI: string;
  ISBN: string;
  "Sub-discipline": string;
  LINK: string;
  "Site Module Name": string;
}
