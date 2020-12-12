<script>
  let x = null;
  let y = null;

  function track(e) {
    x = e.clientX;
    y = e.clientY;
  }
</script>

<style>
  .header {
    margin: 0;
    font-size: var(--fs-lg);
    color: var(--lightest);
  }

  .subheader {
    color: var(--lightest);
    font-size: var(--fs-md);
    margin: 0.5rem;
  }
</style>

<svelte:body on:mousemove={track} />
<h1 class="header">Justin Awrey</h1>
<h2 class="subheader">One stop web designer + developer.</h2>
