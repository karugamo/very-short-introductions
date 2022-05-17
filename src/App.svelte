<script lang="ts">
  import bookData from "../data/books.json";

  const books = bookData.sort((a, b) => b.rating - a.rating);
</script>

<main>
  <h1>Books</h1>
  <ol>
    {#each books as book}
      <li>
        <a href="https://www.goodreads.com/{book.url}" target="_blank">
          {book.title} ({book.rating.toFixed(2)})</a
        >
      </li>
    {/each}
  </ol>
</main>

<style>
</style>
