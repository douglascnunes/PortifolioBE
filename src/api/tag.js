import { url } from '../util/api.js';
import { getAuthToken } from '../util/auth.js';


export async function getTags({ signal }) {

  const response = await fetch(`${url}tags`, {
    signal,
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tags data");
  }

  return await response.json();
}


export async function getSkills({ signal }) {

  const response = await fetch(`${url}skills`, {
    signal,
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error("Failed to fetch skills data");
  }

  return await response.json();
}



export async function createTag({ signal, tag }) {
  const token = getAuthToken();

  const response = await fetch(`${url}tag`, {
    signal,
    method: 'POST',
    body: tag,
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to create tag");
  }

  return await response.json();
};


export async function updateTag({ signal, tag }) {
  const token = getAuthToken();

  const response = await fetch(`${url}tag/${tag.id}`, {
    signal,
    method: 'PUT',
    body: tag,
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to create tag");
  }

  return await response.json();
};



export async function deleteTag({ signal, tagID }) {
  const token = getAuthToken();

  const response = await fetch(`${url}tag/${tagID}`, {
    signal,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to delete tag");
  }

  return await response.json();
};