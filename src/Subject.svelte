<script lang="ts">
  import type { Subject } from "../scripts/lib/types";
  export let tree;
  export let onSelectSubject;

  const { name, children, books = [], subjectBook } = tree as Subject;

  function sumAllBooks(subject: Subject) {
    return (
      (subject.books?.length ?? 0) +
      subject.children.reduce((sum, child) => sum + sumAllBooks(child), 0)
    );
  }
</script>

<section>
  <h3>{name} ({sumAllBooks(tree)})</h3>
  <div class="container">
    {#each children as child}
      <div class="subcategory" on:click={() => onSelectSubject(child)}>
        <div>
          <div class="subcategoryname">{child.name}</div>
          <div class="subcategorycount">({sumAllBooks(child)})</div>
        </div>
      </div>
    {/each}
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
  </div>
</section>

<style>
  .subcategoryname {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .subcategorycount {
    color: #5F787A;
  }

  :root {
    font-family: sans-serif;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .subcategory {
    border: 2px solid #574677;
    color: var(--primary-text);
    border-radius: 4px;
    background-color: #f0f0f0;
    height: 200px;
    box-sizing: border-box;
    width: 130px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    cursor: pointer;
    padding: 4px;
  }

  .image {
    height: 200px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  }
</style>
