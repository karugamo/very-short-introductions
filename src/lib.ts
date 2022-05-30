import type { Subject } from "scripts/lib/types";

export function sumAllBooks(subject: Subject) {
  return (
    (subject.books?.length ?? 0) +
    subject.children.reduce((sum, child) => sum + sumAllBooks(child), 0)
  );
}