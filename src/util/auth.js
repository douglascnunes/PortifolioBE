import { redirect } from "react-router-dom";



export function authenticateStorage({ token }) {
  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 5);
  localStorage.setItem('expiration', expiration.toISOString());
};


export function tokenLoader() {
  const token = getAuthToken();
  return token;
};

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime()
  return duration;
}


export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  };

  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
};


export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token || token === 'EXPIRED') {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    throw redirect('/');
  }
  return null
};