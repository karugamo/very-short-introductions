<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Subject } from "../scripts/lib/types";
  import { sumAllBooks } from "./lib";
  export let child: Subject;

  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch("select");
  }
</script>

<div class="container child" on:click={onClick}>
  <div>
    <div class="name">{child.name}</div>
    <div class="count">({sumAllBooks(child)})</div>
  </div>
</div>

<style>
  .name {
    font-weight: bold;
    margin-bottom: 8px;
  }

  .count {
    color: #5f787a;
  }

  .container {
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
</style>
