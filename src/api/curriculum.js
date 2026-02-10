import { url } from '../util/api.js';
import { getAuthToken } from '../util/auth.js';


export async function getCurriculums({ signal }) {

  const response = await fetch(`${url}curriculums`, {
    signal,
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommendation data");
  }

  return await response.json();
};



export async function activeCurriculum({ signal, curriculumID }) {
  const token = getAuthToken();

  const response = await fetch(`${url}curriculum/${curriculumID}/active`, {
    signal,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to active curriculum");
  }

  return await response.json();
};



export async function createCurriculum({ signal, curriculum }) {
  const token = getAuthToken();

  console.log('Creating curriculum with data:', curriculum);

  const response = await fetch(`${url}curriculum`, {
    signal,
    method: 'POST',
    body: curriculum,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to create curriculum');
  }

  return response.json();
}





export async function deleteCurriculum({ signal, curriculumID }) {
  const token = getAuthToken();

  const response = await fetch(`${url}curriculum/${curriculumID}`, {
    signal,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to delete curriculum");
  }

  return await response.json();
};