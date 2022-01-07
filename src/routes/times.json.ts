import { areas } from '$lib/jakim-zones.json';

export type Times = {
  imsak: string;
  subuh: string;
  syuruk: string;
  zohor: string;
  asar: string;
  maghrib: string;
  isyak: string;
};

export type Day = {
  date: string;
  format: string;
  times: Times;
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ url }) {
  const validCodes = areas.map((a) => a.code);
  const code = url.searchParams.get('code') || 'wly01';

  if (!validCodes.includes(code)) {
    return {
      status: 404,
      body: {
        message: 'Invalid code',
      },
    };
  }

  const res = await fetch(
    `https://cms.waktusolat.digital/esolatjson.php?zon=${code} `
  ).then((r) => r.json());

  if (!res.solat) {
    return {
      status: 404,
      body: {
        message: 'Not found',
      },
    };
  }

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  const times = res.solat.map(
    ({
      date,
      imsak,
      subuh,
      syuruk,
      zohor,
      asar,
      maghrib,
      iswak,
      // direction,
    }) => ({
      date: `${year}-${String(month).padStart(2, '0')}-${date}`,
      format: 'yyyy-mm-dd',
      times: {
        imsak: imsak.substring(0, 5),
        subuh: subuh.substring(0, 5),
        syuruk: syuruk.substring(0, 5),
        zohor: zohor.substring(0, 5),
        asar: asar.substring(0, 5),
        maghrib: maghrib.substring(0, 5),
        isyak: iswak.substring(0, 5),
      },
    })
  );

  return {
    body: { times, code },
  };
}
