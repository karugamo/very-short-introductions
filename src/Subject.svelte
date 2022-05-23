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
      <div class="subcategory child" on:click={() => onSelectSubject(child)}>
        <div>
          <div class="subcategoryname">{child.name}</div>
          <div class="subcategorycount">({sumAllBooks(child)})</div>
        </div>
      </div>
    {/each}
    {#each books as book}
      <div class="image child">
        <a href={book.url} target="_blank">
          <img
            src={`https://www.veryshortintroductions.com/view/covers/${book.isbn}.png`}
            alt={book.title}
            height="200"
            width="130"
          />
        </a>
        {#if book.goodreadsEntry}<div class="rating">
            <a
              href={`https://goodreads.com${book.goodreadsEntry?.url}`}
              target="_blank">{book.goodreadsEntry?.rating?.toFixed(2)} ★</a
            >
          </div>{/if}
      </div>
    {/each}
  </div>
</section>

<style>
  .rating {
    position: absolute;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.6);
    padding: 4px;
    text-align: right;
    box-sizing: border-box;
    width: 100%;
    color: var(--primary-text);
  }

  .rating a {
    color: var(--primary-text);
    text-decoration: none;  
  }
  .child {
    position: relative;
    transition: all 0.2s ease-in-out;
  }
  .child:hover {
    transform: translate3d(0, -5px, 0);
  }

  .subcategoryname {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .subcategorycount {
    color: #5f787a;
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
    background-color: transparent;
  }
</style>
