import { url } from "../util/api";


export async function getProjectItems({ signal }) {

  const response = await fetch(`${url}project/items`, {
    signal,
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error("Failed to fetch project items data");
  }

  return await response.json();
}