<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch, url }) {
    const code = url.searchParams.get('code') || '';
    const times = await fetch(`/times.json?code=${code}`).then((r) => r.json());
    const hijri = await fetch(`/hijridate.json`).then((r) => r.json());

    return {
      props: {
        times,
        hijri,
      },
    };
  }
</script>

<script lang="ts">
  import {
    formatDistance,
    formatDistanceToNow,
    formatDistanceToNowStrict,
    parse,
    setMonth,
    setYear,
  } from 'date-fns';
  import type { HijriDate } from './hijridate.json';
  import type { Day, Times } from './times.json';
  import codes from '$lib/jakim-codes.json';
  import TimeIcon from '$lib/components/time-icon.svelte';

  type SolatTime = {
    slug: string;
    name: string;
    time24: string;
    time12: string;
    ampm: string;
    date: Date;
  };

  export let times: Day[];
  // export let hijri: HijriDate;
  let code = 'wly01';
  const timeNames = {
    imsak: 'Imsak',
    subuh: 'Subuh',
    syuruk: 'Syuruk',
    zohor: 'Zuhur',
    asar: 'Asar',
    maghrib: 'Maghrib',
    isyak: 'Isyak',
  };

  let now = new Date();
  $: setInterval(() => {
    now = new Date();
  }, 1000);

  const allArea = codes.map((c) => c.areas).flat();
  $: areaName = allArea.find((a) => a.code === code)?.name;
  const dateStr = now.toISOString().split('T')[0];
  let today: Day;
  let solatTimes: SolatTime[];
  let nextSolat: SolatTime;
  $: {
    today = times.find((t) => t.date === dateStr);
    solatTimes = Object.keys(today.times)
      .map((k) => {
        const time24 = today.times[k];
        const hour = Number(time24.split(':')[0]);
        const minute = Number(time24.split(':')[1]);
        const time12 =
          (hour % 12 === 0 ? 12 : hour % 12) +
          ':' +
          String(minute).padStart(2, '0');
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const date = parse(time24, 'HH:mm', now);

        return {
          slug: k,
          name: timeNames[k],
          time24,
          time12,
          ampm,
          date,
        };
      })
      .filter((t) => t.slug !== 'imsak');

    solatTimes.forEach((t) => {
      if (!nextSolat && t.date > now && t.slug !== 'syuruk') {
        nextSolat = t;
      }
    });
  }
</script>

<div class="layout">
  <div class="flex justify-between">
    <div>
      <h1 class="lg:text-xl text-lg font-medium">Waktu Solat</h1>
      <h2 class="lg:text-xl text-lg font-extralight">
        {areaName}
      </h2>
    </div>

    <div class="text-right">
      <div class="text-lg">
        {nextSolat.name}, {nextSolat.time12}
        {nextSolat.ampm}
      </div>
      <div class="text-xl font-semibold">
        {formatDistanceToNowStrict(nextSolat.date)}
      </div>
    </div>
  </div>

  <div class="flex justify-between mt-10 text-center">
    {#each solatTimes as time (time.slug)}
      <div class="p-8">
        <div class="text-xs font-semibold">{time.name}</div>
        <div class="flex justify-center my-2 text-3xl">
          <TimeIcon slug={time.slug} />
        </div>
        <div class="text-xl font-semibold tracking-wider">{time.time12}</div>
        <div class="-mt-1 text-sm">{time.ampm}</div>
      </div>
    {/each}
  </div>
</div>
