import { readFileSync, writeFileSync } from "fs";
import { JSDOM } from "jsdom";

const tree = new JSDOM(readFileSync("./data/subjecttree.html", "utf-8")).window
  .document.body;

const subjects: Subject[] = [];

traverseUl(tree, subjects);

writeFileSync('./data/subjects.json', JSON.stringify(subjects, null, 2));

function traverseUl(parent: HTMLElement, parentChildren: Subject[] = []) {
  for (const ul of Array.from(parent.childNodes)) {
    if (ul.nodeName === "UL") {
      traverseLi(ul as HTMLUListElement, parentChildren);
    }
  }
}

function traverseLi(ul: HTMLUListElement, parentChildren: Subject[]) {
  for (const li of Array.from(ul.childNodes)) {
    if (li.nodeName === "LI") {
      const subject = parseItem(li as HTMLLIElement);
      parentChildren.push(subject);
      traverseUl(li as HTMLElement, subject.children);
    }
  }
}

function parseItem(listElement: HTMLLIElement): Subject {
  const facetValue = listElement.getAttribute("data-facet-value");
  const name = listElement.querySelector(".c-Link span").textContent;
  const subjectId = facetValue.split(":")[1];
  return { subjectId, facetValue, name, children: [] };
}

interface Subject {
  subjectId: string;
  facetValue: string;
  name: string;
  children: Subject[];
}
