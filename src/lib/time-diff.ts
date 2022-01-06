export type TimeDiff = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function timeDiff(startDate: Date, endDate: Date) {
  let delta = Math.abs(endDate.valueOf() - startDate.valueOf()) / 1000;
  const isNegative = startDate > endDate ? -1 : 1;
  return [
    ['days', 24 * 60 * 60],
    ['hours', 60 * 60],
    ['minutes', 60],
    ['seconds', 1],
  ].reduce(
    (acc, [key, value]: [string, number]) => (
      (acc[key] = Math.floor(delta / value) * isNegative),
      (delta -= acc[key] * isNegative * value),
      acc
    ),
    {}
  );
}
