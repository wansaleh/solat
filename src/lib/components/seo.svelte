<script lang="ts">
  import { page } from '$app/stores';
  import { openGraph } from '$lib/helper';
  import { colorMode } from '$lib/store';

  const defaultMeta = {
    title: 'SvelteKit Starter',
    siteName: 'SvelteKit Starter',
    description: 'SvelteKit Starter With TypeScript & Tailwind.',
    url: 'https://sveltekit-starter-wansaleh.vercel.app',
    image: 'https://sveltekit-starter-wansaleh.vercel.app/og.jpg',
    type: 'website',
    robots: 'follow, index',
  };

  type SeoProps = {
    date?: string;
    templateTitle?: string;
  } & Partial<typeof defaultMeta>;

  const meta: SeoProps = {
    ...defaultMeta,
    ...$$props,
  };
  meta['title'] = $$props.templateTitle
    ? `${$$props.templateTitle} · ${meta.siteName}`
    : meta.title;

  // Use siteName if there is templateTitle
  // but show full title if there is none
  meta.image = openGraph({
    description: meta.description,
    siteName: $$props.templateTitle ? meta.siteName : meta.title,
    templateTitle: $$props.templateTitle,
  });

  type Favicons = {
    rel: string;
    href: string;
    sizes?: string;
    type?: string;
  };

  const favicons: Array<Favicons> = [
    {
      rel: 'apple-touch-icon',
      sizes: '57x57',
      href: '/favicon/apple-icon-57x57.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '60x60',
      href: '/favicon/apple-icon-60x60.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '72x72',
      href: '/favicon/apple-icon-72x72.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '76x76',
      href: '/favicon/apple-icon-76x76.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '114x114',
      href: '/favicon/apple-icon-114x114.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '120x120',
      href: '/favicon/apple-icon-120x120.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '144x144',
      href: '/favicon/apple-icon-144x144.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '152x152',
      href: '/favicon/apple-icon-152x152.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicon/apple-icon-180x180.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      href: '/favicon/android-icon-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '96x96',
      href: '/favicon/favicon-96x96.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/favicon/manifest.json',
    },
  ];
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="robots" content={meta.robots} />
  <meta name="description" content={meta.description} />
  <meta property="og:url" content={`${meta.url}${$page.url.pathname}`} />
  <link rel="canonical" href={`${meta.url}${$page.url.pathname}`} />

  <meta property="og:type" content={meta.type} />
  <meta property="og:site_name" content={meta.siteName} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:title" content={meta.title} />
  <meta name="image" property="og:image" content={meta.image} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@th_clarence" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={meta.image} />
  {#if meta.date}
    <meta property="article:published_time" content={meta.date} />
    <meta name="publish_date" property="og:publish_date" content={meta.date} />
    <meta name="author" property="article:author" content="Wan Saleh" />
  {/if}

  {#each favicons as linkProps (linkProps.href)}
    <link {...linkProps} />
  {/each}

  <meta name="msapplication-TileColor" content="#ffffff" />
  <meta name="msapplication-TileImage" content="/favicon/ms-icon-144x144.png" />
  <meta
    name="theme-color"
    content="#f16522"
    media="(prefers-color-scheme: light)"
  />
  <meta
    name="theme-color"
    content="#0f0e17"
    media="(prefers-color-scheme: dark)"
  />
  <meta name="color-scheme" content={$colorMode} />
</svelte:head>
