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

function svgToDataUri(svg: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function toSvgImage(book: Book) {
  return `
 <svg width="130" height="200" xmlns="http://www.w3.org/2000/svg">
 <rect width="130" height="200" x="0" y="0" fill="url(#gradient-fill)"/>
 <text text-anchor="end" x="125" y="95" style="fill: white; font: 10px sans-serif;" >${book.title.toUpperCase()}</text>
 <defs xmlns="http://www.w3.org/2000/svg">
         <linearGradient id="gradient-fill" x1="0" y1="200" x2="0" y2="0" gradientUnits="userSpaceOnUse">
           
             <stop offset="0" stop-color="#1f005c"/>
           
             <stop offset="0.14285714285714285" stop-color="#5b0060"/>
           
             <stop offset="0.2857142857142857" stop-color="#870160"/>
           
             <stop offset="0.42857142857142855" stop-color="#ac255e"/>
           
             <stop offset="0.5714285714285714" stop-color="#ca485c"/>
           
             <stop offset="0.7142857142857142" stop-color="#e16b5c"/>
           
             <stop offset="0.8571428571428571" stop-color="#f39060"/>
           
             <stop offset="1" stop-color="#ffb56b"/>
           
         </linearGradient>
       </defs>
 </svg>`.replace(/\n/g, "");
}

export function getCoverImage(book: Book) {
  if (book?.goodreadsEntry?.image) {
    return book.goodreadsEntry.image.replace("._SY75_", "");
  }
  return svgToDataUri(toSvgImage(book));
  // return `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`;
}
