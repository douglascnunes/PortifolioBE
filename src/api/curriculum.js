import { url } from '../util/api.js';
import { getAuthToken } from '../util/auth.js';


export async function getCurriculums({ signal }) {

  const response = await fetch(`${url}curriculums`, {
    signal,
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error("Failed to fetch curriculum data");
  }

  return await response.json();
};



export async function getActiveCurriculum() {

  const response = await fetch(`${url}curriculum/active`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Não foi encontrado um currículo ativo");
    }
    throw new Error("Failed to fetch active curriculum data");
  }

  return response;
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