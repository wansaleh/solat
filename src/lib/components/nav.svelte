<script lang="ts">
  import { page } from '$app/stores';
  import ThemeSelect from './theme-select.svelte';
</script>

<div
  class="flex absolute top-0 right-0 left-0 z-50 justify-between items-center p-6"
>
  <a
    sveltekit:prefetch
    href="/"
    class="lg:text-base group flex gap-2 items-center text-sm font-semibold leading-tight"
  >
    <span class="group-hover:text-brand transition duration-300">
      Logo Here
    </span>
  </a>

  <ul class="lg:gap-2 flex items-center text-sm font-semibold">
    <li>
      <a
        rel="external"
        href="https://github.com/wansaleh/sveltekit-starter"
        class="hover:underline"
      >
        Github
      </a>
    </li>
    <li>
      <ThemeSelect />
    </li>
  </ul>
</div>
