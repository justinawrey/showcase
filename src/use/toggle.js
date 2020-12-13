import { writable } from 'svelte/store'

export default function createToggle(init) {
  const store = writable(init)

  function toggle() {
    store.update(val => !val)
  }

  return {
    subscribe: store.subscribe,
    store,
    toggle
  }
}
