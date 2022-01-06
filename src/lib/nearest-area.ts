import { areas } from '$lib/jakim-zones.json';

export type Area = {
  code: string;
  state: string;
  name: string;
  lat: string;
  lng: string;
};

function distance(
  lat1: number | string,
  lon1: number | string,
  lat2: number | string,
  lon2: number | string,
  unit: 'K' | 'N' = 'K'
) {
  const radlat1 = (Math.PI * Number(lat1)) / 180;
  const radlat2 = (Math.PI * Number(lat2)) / 180;
  const theta = Number(lon1) - Number(lon2);
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == 'K') {
    dist = dist * 1.609344;
  }
  if (unit == 'N') {
    dist = dist * 0.8684;
  }
  return dist;
}

export default function getNearestArea(lat: number, lng: number): Area {
  let nearest = 9e9;
  let nearestArea: Area = null;

  for (const area of areas) {
    const distanceToArea = distance(area.lat, area.lng, lat, lng);
    if ((!nearest && !nearestArea) || distanceToArea < nearest) {
      nearest = distanceToArea;
      nearestArea = area;
    }
  }

  return nearestArea;
}
