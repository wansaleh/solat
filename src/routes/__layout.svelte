<script>
  import nprogress from 'nprogress';

  import Seo from '$lib/components/seo.svelte';
  import Footer from '$lib/components/footer.svelte';
  import Nav from '$lib/components/nav.svelte';

  import '../app.css';
  import '../nprogress.css';
</script>

<svelte:window
  on:sveltekit:navigation-start={() => {
    nprogress.start();
  }}
  on:sveltekit:navigation-end={() => {
    nprogress.done();
  }}
/>

<Seo />

<div class="relative">
  <Nav />

  <main
    class="flex relative flex-col justify-center items-center min-h-screen font-normal"
  >
    <slot />
    <!-- <PageTransition refresh={key}>
    </PageTransition> -->

    <Footer />
  </main>
</div>
