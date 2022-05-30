<script lang="ts">
  import type { Subject } from "../scripts/lib/types";
  import { sumAllBooks } from "./lib";
  import SubjectFolder from "./SubjectFolder.svelte";
  export let tree;
  export let onSelectSubject;

  const { name, children, books = [], subjectBook } = tree as Subject;
</script>

<section>
  <h3>{name} ({sumAllBooks(tree)})</h3>
  <div class="container">
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
  <div class="spacer" />
  <div class="container">
    {#each children as child}
      <SubjectFolder on:select={() => onSelectSubject(child)} {child} />
    {/each}
  </div>
</section>

<style>
  .spacer {
    height: 32px;
  }
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

  :root {
    font-family: sans-serif;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .image {
    height: 200px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    background-color: transparent;
  }
</style>
