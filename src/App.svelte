<script lang="ts">
  import type { Subject as SubjectType } from "scripts/lib/types";
  import bookData from "../data/purged-subjects-with-books.json";
  import Subject from "./Subject.svelte";

  const root: SubjectType = {
    name: "Very Short Introductions",
    subjectId: "root",
    books: [],
    children: bookData,
  };

  let path: SubjectType[] = [root];

  const subjectToPath = calculateAllPaths(root);
  console.log(subjectToPath);

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
  {#each path as subject}
    <a href="#{subject.subjectId}">{subject.name}</a
    >{#if currentSubject !== subject}<span class="separator">> </span>{/if}
  {/each}
  {#key currentSubject}
    <Subject tree={currentSubject} {onSelectSubject} />
  {/key}
</main>

<style>
  .separator {
    margin: 0 0.5em;
  }

  main {
    margin: 32px;
  }
</style>
