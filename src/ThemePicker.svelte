<script>
  let light = false;

  function toggle() {
    light = !light;
    invertColors();
  }

  function invertColors() {
    const root = document.documentElement;
    const lightest = getComputedStyle(root).getPropertyValue("--lightest");
    const darkest = getComputedStyle(root).getPropertyValue("--darkest");
    root.style.setProperty("--lightest", darkest);
    root.style.setProperty("--darkest", lightest);
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

<button class="corner" on:click={toggle}>{light ? 'dark' : 'light'}</button>
