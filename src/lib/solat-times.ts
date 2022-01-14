import { parse } from 'date-fns';
import type { Day } from 'src/routes/times.json';

export type SolatTime = {
  slug: string;
  name: string;
  time24: string;
  time12: string;
  ampm: string;
  date: Date;
};

export const timeNames = {
  imsak: 'Imsak',
  subuh: 'Subuh',
  syuruk: 'Syuruk',
  zohor: 'Zuhur',
  asar: 'Asar',
  maghrib: 'Maghrib',
  isyak: 'Isyak',
};

export default function getSolatTimes(
  day: Day,
  now: Date,
  hideTimes: string[] = ['imsak']
): SolatTime[] {
  const solatTimes: SolatTime[] = Object.keys(day.times)
    .map((k) => {
      const time24 = day.times[k];
      const hour = Number(time24.split(':')[0]);
      const minute = Number(time24.split(':')[1]);
      const time12 =
        (hour % 12 === 0 ? 12 : hour % 12) +
        ':' +
        String(minute).padStart(2, '0');
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const date = parse(time24, 'HH:mm', now);
      // console.log(time24, date);

      return {
        slug: k,
        name: timeNames[k],
        time24,
        time12,
        ampm,
        date,
      };
    })
    .filter((t) => !hideTimes.includes(t.slug));

  return solatTimes;
}
