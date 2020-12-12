<script>
  import people from "../stores/people";
  import createToggle from "../use/toggle";
  const open = createToggle(false);

  function addCarlos() {
    $people = [...$people, "Carlos"];
  }
</script>

<button on:click={open.toggle}>See people</button>
<button on:click={addCarlos}>Add Carlos</button>

{#if $open}
  <ul>
    {#each $people as person}
      <li>{person}</li>
    {/each}
  </ul>
{/if}
