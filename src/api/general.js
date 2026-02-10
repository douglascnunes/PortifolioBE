import { url } from '../util/api.js';


export async function getGeneral({ signal }) {

  const response = await fetch(`${url}general`, {
    signal,
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error("Failed to fetch general data");
  }

  return await response.json();
}