import { readFileSync } from "fs";
import { JSDOM } from "jsdom";

const tree = new JSDOM(readFileSync("./data/subjecttree.html", "utf-8")).window
  .document.body;

const subjects: { [subjectId: string]: Subject } = {};

traverseUl(tree);

console.log(subjects)

function traverseUl(parent: HTMLElement, parentSubject?: string) {
  for (const ul of Array.from(parent.childNodes)) {
    if (ul.nodeName === "UL") {
      traverseLi(ul as HTMLUListElement, parentSubject);
    }
  }
}

function traverseLi(ul: HTMLUListElement, parentSubject?: string) {
  for (const li of Array.from(ul.childNodes)) {
    if (li.nodeName === "LI") {
      const subject = parseItem(li as HTMLLIElement);
      subject.parentSubject = parentSubject;
      subjects[subject.subjectId] = subject;
      traverseUl(li as HTMLElement, subject.subjectId);
    }
  }
}

function parseItem(listElement: HTMLLIElement): Subject {
  const facetValue = listElement.getAttribute("data-facet-value");
  const name = listElement.querySelector(".c-Link span").textContent;
  const subjectId = facetValue.split(":")[1];
  return { subjectId, facetValue, name, parentSubject: null };
}

interface Subject {
  subjectId: string;
  facetValue: string;
  name: string;
  parentSubject?: string;
}
