export interface GoodreadsBook {
  rating: number;
  numberOfRatings: number;
  url: string;
  title: string;
  image: string;
}

export interface Subject {
  name: string;
  subjectId: string;
  subjectBook?: Book;
  books: Book[];
  children: Subject[];
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
  goodreadsEntry?: GoodreadsBook;
}