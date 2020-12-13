export default function invertColors() {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);

  let test = '--lightxst-t'

  const lightestH = computedStyle.getPropertyValue(`${test}`);
  const lightestS = computedStyle.getPropertyValue("--lightest-s");
  const lightestL = computedStyle.getPropertyValue("--lightest-l");
  const darkestH = computedStyle.getPropertyValue("--darkest-h");
  const darkestS = computedStyle.getPropertyValue("--darkest-s");
  const darkestL = computedStyle.getPropertyValue("--darkest-l");

  root.style.setProperty("--lightest-h", darkestH);
  root.style.setProperty("--lightest-s", darkestS);
  root.style.setProperty("--lightest-l", darkestL);
  root.style.setProperty("--darkest-h", lightestH);
  root.style.setProperty("--darkest-s", lightestS);
  root.style.setProperty("--darkest-l", lightestL);
}