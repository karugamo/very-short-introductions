<script lang="ts">
  import type { Subject as SubjectType } from "scripts/lib/types";
  import bookData from "../data/purged-subjects-with-books.json";
  import Subject from "./Subject.svelte";

  const root: SubjectType = {
    name: "All",
    subjectId: "root",
    books: [],
    children: bookData,
  };

  let path: SubjectType[] = [root];

  const subjectToPath = calculateAllPaths(root);
  let randomCategory =
    Object.keys(subjectToPath)[
      Math.floor(Math.random() * Object.keys(subjectToPath).length)
    ];

  function onSelectSubject(subject: SubjectType) {
    history.pushState(null, null, `#${subject.subjectId}`);
    path = [...path, subject];
  }

  addEventListener("popstate", () => {
    const subjectId = location.hash.slice(1);
    if (subjectId !== "root") {
      path = [root, ...subjectToPath[subjectId]];
    } else {
      path = [root];
    }
    randomCategory =
      Object.keys(subjectToPath)[
        Math.floor(Math.random() * Object.keys(subjectToPath).length)
      ];
  });

  type SubjectToPath = { [id: string]: SubjectType[] };

  function calculateAllPaths(root: SubjectType): SubjectToPath {
    const paths: { [id: string]: SubjectType[] } = {};

    for (const child of root.children) {
      paths[child.subjectId] = [child];
      for (const [subjectId, path] of Object.entries(
        calculateAllPaths(child)
      )) {
        paths[subjectId] = [child, ...path];
      }
    }

    return paths;
  }

  $: currentSubject = path[path.length - 1];
</script>

<main>
  <section class="content">
    <h1>Very Short Introductions</h1>
    {#each path as subject}
      <a href="#{subject.subjectId}">{subject.name}</a
      >{#if currentSubject !== subject}<span class="separator">> </span>{/if}
    {/each}
    {#key currentSubject}
      <Subject tree={currentSubject} {onSelectSubject} />
    {/key}
    <section class="buttons">
      <a href={"#" + randomCategory}>Show random category</a>
    </section>
  </section>
</main>

<style>
  h1 {
    margin-top: 0;
    margin-bottom: 16px;
    color: #2d5d82;
    font-size: 32px;
    text-shadow: 2px 2px 0 rgba(255,255,255,0.5);
    font-family: Georgia, 'Times New Roman', Times, serif;
  }
  .buttons {
    margin-top: 16px;
    text-align: center;
  }
  :root {
    --primary-text: #40315c;
  }

  a {
    color: var(--primary-text);
  }

  .separator {
    margin: 0 0.5em;
  }

  @media (min-width: 800px) {
    .content {
      width: 800px;
    }
  }

  main {
    margin: 32px;
    display: flex;
    justify-content: center;
  }
</style>
