<script lang="ts">
  import type { Book, Subject } from "../scripts/lib/types";
  import { getCoverImage, sumAllBooks } from "./lib";
  import SubjectFolder from "./SubjectFolder.svelte";
  export let tree;
  export let onSelectSubject;

  const { name, children, books = [], subjectBook } = tree as Subject;

  function getLink(book: Book) {
    if (book.goodreadsEntry) {
      return book.goodreadsEntry.url;
    }
    return `https://www.goodreads.com/search?q=${book.title}: A Very Short Introduction`;
  }
</script>

<section>
  <h3>{name} ({sumAllBooks(tree)})</h3>
  <div class="container">
    {#each books as book}
      <div class="image child">
        <a href={getLink(book)} target="_blank">
          <img
            src={getCoverImage(book)}
            alt={book.title}
            height="200"
            width="130"
          />
          {#if book.goodreadsEntry}<div class="rating">
              {book.goodreadsEntry?.rating?.toFixed(2)} ★
            </div>
          {/if}
        </a>
      </div>
    {/each}
  </div>
  {#if books.length > 0}<div class="spacer" />{/if}
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
    border-radius: 4px;
    overflow: hidden;
    height: 200px;
    box-shadow: 0px 0px 5px rgba(77, 77, 77, 0.5);
    background-color: transparent;
  }
</style>
