import { url } from '../util/api.js';


export default async function secretlogin(loginData) {

  const response = await fetch(url + 'secretlogin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  };

  if (!response.ok) {
    throw new Response(JSON.stringify(
      { message: 'Não foi possível realizar login.' },
      { status: 500 }
    ))
  }
  
  return await response.json();
}