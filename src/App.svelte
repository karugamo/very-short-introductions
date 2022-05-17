<script lang="ts">
  import bookData from "../data/books-by-subject.json";
  import Tree from "./Tree.svelte";
</script>

<main>
  <h1>Books</h1>
  {#each bookData as rootSubject}
    <Tree tree={rootSubject} />
  {/each}
</main>

<style>
</style>
