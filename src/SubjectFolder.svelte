<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Subject } from "../scripts/lib/types";
  import { getAllBooks } from "./lib";
  export let child: Subject;

  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch("select");
  }

  const [firstBook, secondBook, ...restBooks] = getAllBooks(child);
</script>

<div class="category child" on:click={onClick}>
  <div class="frontcover">
    <div>
      <div class="name">{child.name}</div>
      <!-- <div class="count">({sumAllBooks(child)})</div> -->
    </div>
  </div>
  <div
    class="book"
    style="background-image: url(https://www.veryshortintroductions.com/view/covers/{firstBook.isbn}.png);"
  />
  <div
    class="book"
    style="background-image: url(https://www.veryshortintroductions.com/view/covers/{secondBook.isbn}.png);"
  />
  <!-- <div class="thirdbook" style="background-image: url(https://www.veryshortintroductions.com/view/covers/{.isbn}.png);"  /> -->
</div>

<style>
  .category {
    display: flex;
    flex-direction: row;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
  }

  .book {
    background-color: white;
    width: 30px;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .name {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .child {
    position: relative;
    transition: all 0.2s ease-in-out;
  }

  .child:hover {
    transform: translate3d(0, -5px, 0);
  }

  .count {
    color: #fff;
  }

  .frontcover {
    color: white;
    background-color: #574677;
    height: 200px;
    box-sizing: border-box;
    width: 130px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    padding: 4px;
  }
</style>
