<script>
  import ThemePicker from "./ThemePicker.svelte";
  import Headline from "./Headline.svelte";
</script>

<ThemePicker />
<Headline />

<button class="shine">Take the tou‍️r 🕵️‍♀️</button>

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
    box-shadow: 0px 0px 13px -6px hsl(var(--lightest-h), var(--lightest-s), calc(var(
              --lightest-l
            ) - 5%));
  }

  button:hover,
  button:focus {
    box-shadow: 0px 0px 18px -6px hsl(var(--lightest-h), var(--lightest-s), calc(var(
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
    top: -130%;
    left: -210%;
    width: 200%;
    height: 300%;
    opacity: 0;
    transform: rotate(-30deg);
    transition-property: left, top, opacity;
    transition-duration: 0.7s, 0.7s, 0.15s;
    transition-timing-function: ease;

    background: rgba(255, 255, 255, 0.13);
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.13) 0%,
      rgba(255, 255, 255, 0.13) 77%,
      rgba(255, 255, 255, 0.5) 92%,
      rgba(255, 255, 255, 0.8) 100%
    );
  }

  .shine:hover:after,
  .shine:focus:after {
    opacity: 1;
    top: -30%;
    left: -75%;
  }

  /* Active state */

  .shine:active:after {
    opacity: 0;
  }
</style>
