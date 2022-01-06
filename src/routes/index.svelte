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
  let code = 'sgr01';

  async function refetch(code) {
    times = await fetch(`/times.json?code=${code}`).then((r) => r.json());
  }

  let position;
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

  $: areaNames = areas.filter((a) => a.code === code).map((a) => a.name);

  const dateStr = now.toISOString().split('T')[0];
  let today: Day = times.find((t) => t.date === dateStr);

  $: solatTimes = getSolatTimes(today, now);
  $: hijriDate = `${Number(hijri.day)} ${
    hijriMonthNames[hijri.month.number - 1]
  } ${hijri.year}`;

  let nextSolat: SolatTime;
  $: {
    solatTimes.forEach((t) => {
      if (!nextSolat && t.date > now && t.slug !== 'syuruk') {
        nextSolat = t;
      }
    });
    if (!nextSolat) {
      const _nextSubuh = solatTimes[0];
      const _nextDate = addDays(_nextSubuh.date, 1);
      _nextSubuh.date = _nextDate;
      nextSolat = _nextSubuh;
    }
  }

  let diff: TimeDelta;
  $: {
    diff = calcTimeDelta(nextSolat.date, { now });
  }
</script>

<Geolocation getPosition bind:position />

<div class="layout">
  <div class="flex justify-between items-end lg:text-lg text-sm leading-tight">
    <div>
      <div class="font-medium">
        {format(now, 'd MMM yyyy')} &middot;
        {hijriDate}
      </div>
      <div class="font-light max-w-sm">
        {areaNames.join(', ')}
      </div>
    </div>

    <div class="text-right">
      <div class="font-light flex items-center gap-2">
        <TimeIcon slug={nextSolat.slug} />
        <span>
          {nextSolat.name}, {nextSolat.time12}
          {nextSolat.ampm}
        </span>
      </div>
      <div class="font-semibold">
        {#if diff.hours > 1}
          {diff.hours}h
        {/if}
        {#if diff.minutes > 1}
          {String(diff.minutes).padStart(2, '0')}m
        {/if}
        {String(diff.seconds).padStart(2, '0')}s
      </div>
    </div>
  </div>

  <div class="flex justify-between mt-10 text-center">
    {#each solatTimes as time (time.slug)}
      <div class="p-2 lg:p-6">
        <div class="text-xs font-semibold">{time.name}</div>
        <div class="flex justify-center lg:my-2 my-1 lg:text-3xl text-2xl">
          <TimeIcon slug={time.slug} colored />
        </div>
        <div class="lg:text-xl text-base font-semibold">
          {time.time12}
        </div>
        <div class="-mt-1 lg:text-sm text-xs font-medium">{time.ampm}</div>
      </div>
    {/each}
  </div>
</div>
