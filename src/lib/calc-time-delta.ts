export type TimeDelta = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  completed: boolean;
};

/**
 * Calculates the time difference between a given end date and the current date.
 *
 * @export
 * @param {Date|number|string} date Date or timestamp representation of the end date.
 * @param {CountdownTimeDeltaOptions} [options]
 *  {Date} [now=Date.now()] The current date object.
 *  {number} [precision=0] The precision on a millisecond basis.
 *  {boolean} [controlled=false] Defines whether the calculated value is already provided as the time difference or not.
 *  {number} [offsetTime=0] Defines the offset time that gets added to the start time; only considered if controlled is false.
 *  {boolean} [overtime=false] Defines whether the time delta can go into overtime and become negative or not.
 * @returns Time delta object that includes details about the time difference.
 */
export function calcTimeDelta(
  date: Date | number | string,
  options?: {
    now?: Date;
    precision?: number;
    controlled?: boolean;
    offsetTime?: number;
    overtime?: boolean;
  }
): TimeDelta {
  const {
    now = Date.now(),
    precision = 0,
    controlled,
    offsetTime = 0,
    overtime,
  } = options || {};
  let startTimestamp;

  if (typeof date === 'string') {
    startTimestamp = new Date(date).getTime();
  } else if (date instanceof Date) {
    startTimestamp = date.getTime();
  } else {
    startTimestamp = date;
  }

  if (!controlled) {
    startTimestamp += offsetTime;
  }

  const timeLeft = controlled ? startTimestamp : startTimestamp - now.valueOf();
  const clampedPrecision = Math.min(20, Math.max(0, precision));
  const total = Math.round(
    parseFloat(
      ((overtime ? timeLeft : Math.max(0, timeLeft)) / 1000).toFixed(
        clampedPrecision
      )
    ) * 1000
  );

  const seconds = Math.abs(total) / 1000;

  return {
    total,
    days: Math.floor(seconds / (3600 * 24)),
    hours: Math.floor((seconds / 3600) % 24),
    minutes: Math.floor((seconds / 60) % 60),
    seconds: Math.floor(seconds % 60),
    milliseconds: Number(((seconds % 1) * 1000).toFixed()),
    completed: total <= 0,
  };
}
