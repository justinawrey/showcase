<script>
  import invertColors from "../theme/invert";

  let light = false;

  $: {
    light;
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
</style>

<label class="corner">
  <input type="checkbox" bind:checked={light} />
  <span class="slider round" />
</label>
