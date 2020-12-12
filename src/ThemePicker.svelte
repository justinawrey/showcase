<script>
  import shineSun from "./Sun.svelte";
  import invertColors from "../theme/invert";

  let dark = true;

  $: {
    dark;
    invertColors();
  }
</script>

<style>
  .corner {
    position: absolute;
    top: 0px;
    right: 0px;
    margin: 0.4rem;
  }

  .checkbox {
    display: none;
  }
</style>

<!-- <div class="corner">
  <input
    class="checkbox"
    type="checkbox"
    aria-label="Enable light theme?"
    bind:checked={light} />
  <shineSun />
</div> -->
<input
  class="corner"
  type="checkbox"
  aria-label="Enable light theme?"
  bind:checked={dark} />
