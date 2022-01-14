<script lang="ts">
  export let slug: string;
  export let colored: boolean = false;
</script>

{#if slug === 'imsak'}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="stroke-current h-[1em]"
    ><path
      d="M17 18a5 5 0 0 0-10 0"
      class={colored && 'stroke-teal-500'}
    /><line x1="12" y1="2" x2="12" y2="9" /><line
      x1="4.22"
      y1="10.22"
      x2="5.64"
      y2="11.64"
    /><line x1="1" y1="18" x2="3" y2="18" /><line
      x1="21"
      y1="18"
      x2="23"
      y2="18"
    /><line x1="18.36" y1="11.64" x2="19.78" y2="10.22" /><line
      x1="23"
      y1="22"
      x2="1"
      y2="22"
    /><polyline points="8 6 12 2 16 6" /></svg
  >
{/if}

{#if slug === 'subuh'}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="stroke-current h-[1em]"
    ><path
      d="M17 18a5 5 0 0 0-10 0"
      class={colored && 'stroke-indigo-500'}
    /><line x1="12" y1="2" x2="12" y2="9" /><line
      x1="4.22"
      y1="10.22"
      x2="5.64"
      y2="11.64"
    /><line x1="1" y1="18" x2="3" y2="18" /><line
      x1="21"
      y1="18"
      x2="23"
      y2="18"
    /><line x1="18.36" y1="11.64" x2="19.78" y2="10.22" /><line
      x1="23"
      y1="22"
      x2="1"
      y2="22"
    /><polyline points="8 6 12 2 16 6" /></svg
  >
{/if}

{#if slug === 'syuruk'}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="stroke-current h-[1em]"
    ><path
      d="M17 18a5 5 0 0 0-10 0"
      class={colored && 'stroke-indigo-500'}
    /><line x1="12" y1="2" x2="12" y2="9" /><line
      x1="4.22"
      y1="10.22"
      x2="5.64"
      y2="11.64"
    /><line x1="1" y1="18" x2="3" y2="18" /><line
      x1="21"
      y1="18"
      x2="23"
      y2="18"
    /><line x1="18.36" y1="11.64" x2="19.78" y2="10.22" /><line
      x1="23"
      y1="22"
      x2="1"
      y2="22"
      class="hidden"
    /><polyline points="8 6 12 2 16 6" /></svg
  >
{/if}

{#if slug === 'zohor'}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="stroke-current h-[1em]"
    ><circle
      cx="12"
      cy="12"
      r="5"
      class={colored && 'stroke-orange-400 fill-orange-400'}
    /><line x1="12" y1="1" x2="12" y2="3" /><line
      x1="12"
      y1="21"
      x2="12"
      y2="23"
    /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line
      x1="18.36"
      y1="18.36"
      x2="19.78"
      y2="19.78"
    /><line x1="1" y1="12" x2="3" y2="12" /><line
      x1="21"
      y1="12"
      x2="23"
      y2="12"
    /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line
      x1="18.36"
      y1="5.64"
      x2="19.78"
      y2="4.22"
    /></svg
  >
{/if}

{#if slug === 'asar'}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="stroke-current h-[1em]"
    ><circle
      cx="12"
      cy="12"
      r="5"
      class={colored && 'stroke-orange-400'}
    /><line x1="12" y1="1" x2="12" y2="3" /><line
      x1="12"
      y1="21"
      x2="12"
      y2="23"
    /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line
      x1="18.36"
      y1="18.36"
      x2="19.78"
      y2="19.78"
    /><line x1="1" y1="12" x2="3" y2="12" /><line
      x1="21"
      y1="12"
      x2="23"
      y2="12"
    /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line
      x1="18.36"
      y1="5.64"
      x2="19.78"
      y2="4.22"
    /></svg
  >
{/if}

{#if slug === 'maghrib'}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="stroke-current h-[1em]"
    ><path
      d="M17 18a5 5 0 0 0-10 0"
      class={colored && 'stroke-teal-500'}
    /><line x1="12" y1="9" x2="12" y2="2" /><line
      x1="4.22"
      y1="10.22"
      x2="5.64"
      y2="11.64"
    /><line x1="1" y1="18" x2="3" y2="18" /><line
      x1="21"
      y1="18"
      x2="23"
      y2="18"
    /><line x1="18.36" y1="11.64" x2="19.78" y2="10.22" /><line
      x1="23"
      y1="22"
      x2="1"
      y2="22"
    /><polyline points="16 5 12 9 8 5" /></svg
  >
{/if}

{#if slug === 'isyak'}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="stroke-current h-[1em]"
    ><path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      class={colored && 'stroke-teal-500'}
    /></svg
  >
{/if}
