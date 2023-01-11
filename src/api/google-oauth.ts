import axios from 'axios';
import { getGoogleRefreshToken } from 'utils/utils';

const CONFIG = {
  ClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  ClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET
};

export const exchangeToken = (code: string) => {
  return axios.post('https://oauth2.googleapis.com/token', {
    code,
    client_id: CONFIG.ClientId,
    client_secret: CONFIG.ClientSecret,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:8000'
  });
};

export const refreshToken = async () => {
  const refreshGoogleToken = getGoogleRefreshToken();
  console.log(`refreshGoogleToken`, refreshGoogleToken);
  return axios.post(`https://oauth2.googleapis.com/token`, {
    client_id: CONFIG.ClientId,
    client_secret: CONFIG.ClientSecret,
    refresh_token: refreshGoogleToken,
    grant_type: 'refresh_token'
  });
};
