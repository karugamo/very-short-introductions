<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Subject } from "../scripts/lib/types";
  import { getAllBooks, sumAllBooks } from "./lib";
  export let child: Subject;

  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch("select");
  }

  const [firstBook, secondBook, ...restBooks] = getAllBooks(child);
</script>

<div class="category child" on:click={onClick}>
  <div class="frontcover">
    <div class="name">{child.name}</div>
  </div>
  <div
    class="book"
    style="background-image: url(https://www.veryshortintroductions.com/view/covers/{firstBook.isbn}.png);"
  />
  <div
    class="book"
    style="background-image: url(https://www.veryshortintroductions.com/view/covers/{secondBook.isbn}.png);"
  />
  {#if restBooks.length === 0 || restBooks.length > 1}
    <div class="morebooks">
      {#if restBooks.length > 0}<div class="count">
          + {sumAllBooks(child) - 2} book{#if restBooks.length > 1}s{/if}
        </div>
      {/if}
    </div>
  {:else}
    <div
      class="book"
      style="background-image: url(https://www.veryshortintroductions.com/view/covers/{restBooks[0]
        .isbn}.png);"
    />
  {/if}
</div>

<style>
  .morebooks {
    width: 30px;
    background-color: #574677;
    color: white;

    display: flex;
    align-items: flex-end;

    box-shadow: inset 4px 0px 4px rgba(0, 0, 0, 0.25);
  }

  .count {
    transform-origin: left top;
    transform: rotate(-90deg);
    width: 120px;
    white-space: nowrap;
    margin-left: 5px;
    margin-bottom: -10px;
  }

  .category {
    display: flex;
    flex-direction: row;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;

    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  }

  .book {
    background-color: #574677;
    width: 30px;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: inset 4px 0px 4px rgba(0, 0, 0, 0.25);
  }

  .name {
    margin-bottom: 8px;
  }

  .child {
    position: relative;
    transition: all 0.2s ease-in-out;
  }

  .child:hover {
    transform: translate3d(0, -5px, 0);
  }

  .frontcover {
    color: white;
    background-color: #574677;
    height: 200px;
    box-sizing: border-box;
    width: 130px;
    display: flex;
    justify-content: flex-end;
    text-align: right;
    align-items: center;
    padding: 8px;

    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  }
</style>
