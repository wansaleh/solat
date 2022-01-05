<script>
  import { afterUpdate } from 'svelte';

  import DarkMode from 'svelte-dark-mode';

  let theme;

  afterUpdate(() => {
    document.documentElement.className = theme;
  });

  function toggle() {
    theme = theme === 'dark' ? 'light' : 'dark';
  }
</script>

<DarkMode bind:theme />

<button
  type="button"
  class="flex gap-1 justify-center items-center py-0 px-1 w-8 h-8 font-semibold"
  on:click={toggle}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="hover:stroke-brand lg:h-6 h-5 transition duration-200 stroke-current"
  >
    {#if theme === 'dark'}
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    {:else}
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    {/if}
  </svg>
</button>
