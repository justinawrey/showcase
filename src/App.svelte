<script>
  import ThemePicker from "./ThemePicker.svelte";
  import Headline from "./Headline.svelte";
</script>

<style>
  button {
    margin-top: 2rem;
    background-color: transparent;
    color: var(--lightest);
    font-size: var(--fs-sm);
    border: 1px solid;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    font-weight: bold;
    transition-duration: var(--trans-lg);
    transition-property: color, box-shadow;
    box-shadow: 0px 0px 15px -5px hsl(var(--lightest-h), var(--lightest-s), calc(var(
              --lightest-l
            ) - 5%));
  }

  .shine {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }

  .shine:after {
    content: "";
    position: absolute;
    top: -110%;
    left: -210%;
    width: 200%;
    height: 200%;
    opacity: 0;
    transform: rotate(30deg);

    background: rgba(255, 255, 255, 0.13);
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.13) 0%,
      rgba(255, 255, 255, 0.13) 77%,
      rgba(255, 255, 255, 0.5) 92%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  /* Hover state - trigger effect */

  .shine:hover:after {
    opacity: 1;
    top: -30%;
    left: -30%;
    transition-property: left, top, opacity;
    transition-duration: 0.7s, 0.7s, 0.15s;
    transition-timing-function: ease;
  }

  /* Active state */

  .shine:active:after {
    opacity: 0;
  }
</style>

<ThemePicker />
<Headline />

<button class="shine">Take the tou‍️r 🕵️‍♀️</button>
