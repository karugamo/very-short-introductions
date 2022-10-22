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

export function getCoverImage(book: Book) {
  if (book?.goodreadsEntry?.image) {
    return book.goodreadsEntry.image.replace("._SY75_", "");
  }
  return `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`;
}
