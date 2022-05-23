<script context="module">
  // retain module scoped expansion state for each tree node
  const _expansionState = {
    /* treeNodeId: expanded <boolean> */
  };
</script>

<script lang="ts">
  //	import { slide } from 'svelte/transition'
  import type { Subject } from "../scripts/lib/types";
  export let tree;
  const { name, children, books = [], subjectBook } = tree as Subject;

  let expanded = _expansionState[name] || false;
  const toggleExpansion = () => {
    expanded = _expansionState[name] = !expanded;
  };
  $: arrowDown = expanded;
</script>

<ul>
  <!-- transition:slide -->
  <li>
    {#if children.length || books.length}
      <span on:click={toggleExpansion}>
        <span class="arrow" class:arrowDown>&#x25b6</span>
        {#if subjectBook}
          <a target="_blank" href={subjectBook.goodreadsEntry ? `https://goodreads.com/${subjectBook.goodreadsEntry.url}` : subjectBook.url}>{name}</a>
          {#if subjectBook.goodreadsEntry}({subjectBook.goodreadsEntry.rating.toFixed(
              2
            )}){/if}
        {:else}
          {name}
        {/if}
      </span>
      {#if expanded}
        {#each children as child}
          <svelte:self tree={child} />
        {/each}
        {#each books as book}
          <li>
            <span>
              <span class="no-arrow" />
              <a target="_blank" href={book.url}>{book.title}</a>
              {#if book.goodreadsEntry}({book.goodreadsEntry.rating.toFixed(
                  2
                )}){/if}
            </span>
          </li>
        {/each}
      {/if}
    {:else}
      <span>
        <span class="no-arrow" />
        {name}
      </span>
    {/if}
  </li>
</ul>

<style>
  ul {
    margin: 0;
    list-style: none;
    padding-left: 1.2rem;
    user-select: none;
  }
  .no-arrow {
    padding-left: 1rem;
  }
  .arrow {
    cursor: pointer;
    display: inline-block;
    /* transition: transform 200ms; */
  }
  .arrowDown {
    transform: rotate(90deg);
  }
</style>
