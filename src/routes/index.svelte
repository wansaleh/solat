<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ fetch, url }) {
    const code = url.searchParams.get('code') || '';
    const res = await fetch(`/times.json?code=${code}`).then((r) => r.json());
    const hijri = await fetch(`/hijridate.json`).then((r) => r.json());

    return {
      props: {
        times: res.times,
        code: res.code,
        hijri,
      },
    };
  }
</script>

<script lang="ts">
  import { addDays, format } from 'date-fns';
  import Geolocation from 'svelte-geolocation';

  import type { Day } from './times.json';
  import { areas } from '$lib/jakim-zones.json';
  import TimeIcon from '$lib/components/time-icon.svelte';
  import getSolatTimes, { SolatTime } from '$lib/solat-times';
  import { calcTimeDelta, TimeDelta } from '$lib/calc-time-delta';
  import getNearestArea, { Area } from '$lib/nearest-area';

  export let times: Day[];
  export let hijri;
  export let code: string;

  async function refetch(code) {
    const res = await fetch(`/times.json?code=${code}`).then((r) => r.json());
    times = res.times;
  }

  let position;
  let loading = false;
  let nearestArea: Area = null;
  $: nearestArea =
    position && position.coords
      ? getNearestArea(position.coords.latitude, position.coords.longitude)
      : null;
  $: if (nearestArea) {
    code = nearestArea.code;
    refetch(code);
  }

  const hijriMonthNames = [
    'Muh',
    'Saf',
    'Rab I',
    'Rab II',
    'Jum I',
    'Jum II',
    'Rej',
    'Sya',
    'Ram',
    'Syw',
    'Zul Q',
    'Zul H',
  ];

  let now = new Date();
  $: setInterval(() => {
    now = new Date();
  }, 1000);
  $: dateStr = now.toISOString().split('T')[0];
  $: areaNames = areas.filter((a) => a.code === code).map((a) => a.name);

  let today: Day;
  $: today = times.find((t) => t.date === dateStr);

  $: solatTimes = getSolatTimes(today, now);
  $: hijriDate = `${Number(hijri.day)} ${
    hijriMonthNames[hijri.month.number - 1]
  } ${hijri.year}`;

  let nextSolat: SolatTime;
  $: solatTimes.forEach((time) => {
    if (!nextSolat && time.date > now && time.slug !== 'syuruk') {
      nextSolat = time;
    }
  });
  $: if (!nextSolat) {
    const _nextSubuh = solatTimes[0];
    const _nextDate = addDays(_nextSubuh.date, 1);
    _nextSubuh.date = _nextDate;
    nextSolat = _nextSubuh;
  }

  let diff: TimeDelta;
  $: diff = calcTimeDelta(nextSolat.date, { now });
</script>

<Geolocation getPosition bind:position bind:loading />

<div class="layout">
  <div
    class="lg:text-lg lg:text-left flex flex-wrap gap-4 justify-between items-end mb-10 text-sm leading-tight text-center"
  >
    <div class="lg:w-auto w-full">
      <div class="text-lg font-medium">
        {format(now, 'iiii')} &middot;
        {format(now, 'd MMM yyyy')} &middot;
        {hijriDate}
      </div>
      <div class="max-w-sm font-light">
        {#if loading}
          <svg
            class="animate-spin mr-1 -mt-0.5 h-4 w-4 text-current inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        {/if}
        {areaNames.join(', ')}
      </div>
    </div>

    <div
      class="lg:w-auto lg:block lg:text-right lg:text-lg gap-2 w-full text-xl text-center"
    >
      <div class="font-light">
        {nextSolat.name}, {nextSolat.time12}
        {nextSolat.ampm}
      </div>
      <div class="font-semibold">
        in
        {#if diff.hours > 0}
          {diff.hours}h
        {/if}
        {#if diff.minutes > 0}
          {String(diff.minutes).padStart(2, '0')}m
        {/if}
        {String(diff.seconds).padStart(2, '0')}s
      </div>
    </div>
  </div>

  <div
    class="lg:flex hidden justify-between items-start -mx-8 mt-10 text-center"
  >
    {#each solatTimes as time (time.slug)}
      <div
        class="relative p-8 px-12 rounded-lg {nextSolat.slug === time.slug &&
          'bg-gray-500/20'}"
      >
        <div class="text-base font-semibold">{time.name}</div>

        <div class="flex justify-center my-4 text-4xl">
          <TimeIcon slug={time.slug} colored />
        </div>

        <div class="text-xl font-semibold">
          {time.time12}
        </div>

        <div class="text-sm font-medium">{time.ampm}</div>

        {#if nextSolat.slug === time.slug}
          <div class="block mt-2 text-xs font-bold">
            <span
              class="dark:text-black dark:bg-white px-2 text-white bg-black rounded-full"
            >
              Next
            </span>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="lg:hidden flex flex-col gap-1">
    {#each solatTimes as time (time.slug)}
      <div
        class="lg:p-6 flex relative gap-4 items-center p-4 text-xl leading-none rounded-lg {nextSolat.slug ===
          time.slug && 'bg-gray-500/20'}"
      >
        <div class="flex justify-center my-1 text-2xl">
          <TimeIcon slug={time.slug} colored />
        </div>

        <div class="font-semibold">{time.name}</div>

        {#if nextSolat.slug === time.slug}
          <span
            class="dark:text-black dark:bg-white px-2 text-xs font-bold text-white bg-black rounded-full"
          >
            Next
          </span>
        {/if}

        <div class="flex-1" />

        <div class="font-semibold">
          {time.time12}
          <small class="text-[0.65em]">{time.ampm}</small>
        </div>
      </div>
    {/each}
  </div>
</div>
