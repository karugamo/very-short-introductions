<script lang="ts">
  import bookData from "../data/books.json";

  const books = bookData.sort((a, b) => b.rating - a.rating);
</script>

<main>
  <h1>Books</h1>
  <ul>
    {#each books as book}
      <li>
        {book.title} ({book.rating.toFixed(2)})
      </li>
    {/each}
  </ul>
</main>

<style>
</style>
