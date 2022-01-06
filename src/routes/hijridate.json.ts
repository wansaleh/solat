export type HijriDate = {
  date: string;
  format: string;
  day: string;
  weekday: {
    en: string;
    ar: string;
  };
  month: {
    number: number;
    en: string;
    ar: string;
  };
  year: string;
  designation: {
    abbreviated: string;
    expanded: string;
  };
  holidays: any[];
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hijri = await fetch(
    `https://api.aladhan.com/v1/gToH?date=${day}-${month}-${year}`
  ).then((r) => r.json());

  return {
    body: hijri?.data?.hijri,
  };
}
