import { url } from '../util/api.js';
import { getAuthToken } from '../util/auth.js';


export async function getRecommendation({ signal }) {

  const response = await fetch(`${url}recommendations`, {
    signal,
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommendation data");
  }

  return await response.json();
}


export async function createRecommendation({ signal, recommendation }) {
  const token = getAuthToken();

  const response = await fetch(`${url}recommendation`, {
    signal,
    method: 'POST',
    body: JSON.stringify(recommendation),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to create recommendation");
  }

  return await response.json();
};


export async function updateRecommendation({ signal, recommendation }) {
  const token = getAuthToken();

  const response = await fetch(`${url}recommendation/${recommendation.id}`, {
    signal,
    method: 'PUT',
    body: JSON.stringify(recommendation),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to create recommendation");
  }

  return await response.json();
};



export async function deleteRecommendation({ signal, recommendationID }) {
  const token = getAuthToken();

  const response = await fetch(`${url}recommendation/${recommendationID}`, {
    signal,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  });

  if (!response.ok) {
    throw new Error("Failed to delete recommendation");
  }

  return await response.json();
};