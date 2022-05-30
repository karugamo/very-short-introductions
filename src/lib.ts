import type { Book, Subject } from "scripts/lib/types";

export function sumAllBooks(subject: Subject) {
  return getAllBooks(subject).length;
}

export function getAllBooks(subject: Subject): Book[] {
  return [
    ...(subject.books ?? []),
    ...subject.children.flatMap((child) => getAllBooks(child)),
  ];
}
