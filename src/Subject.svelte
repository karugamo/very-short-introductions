<script lang="ts">
  import type { Subject } from "../scripts/lib/types";
  export let tree;
  export let onSelectSubject;

  const { name, children, books = [], subjectBook } = tree as Subject;
</script>

<section>
  <h3>{name}</h3>
  <div class="container">
    {#each books as book}
      <div class="image">
        <a href={book.url} target="_blank">
          <img
            src={`https://www.veryshortintroductions.com/view/covers/${book.isbn}.png`}
            alt={book.title}
            height="200"
            width="130"
          /></a
        >
      </div>
    {/each}
    {#each children as child}
      <div class="subcategory" on:click={() => onSelectSubject(child)}>
        <h4>{child.name}</h4>
      </div>
    {/each}
  </div>
</section>

<style>
  :root {
    font-family: sans-serif;
  }

  section {
    background-color: lightgray;
    padding: 32px;
    margin-top: 8px;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .subcategory {
    border: 1px solid black;
    background-color: white;
    height: 200px;
    box-sizing: border-box;
    width: 130px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    cursor: pointer;
  }

  .image {
    height: 200px;
  }
</style>
