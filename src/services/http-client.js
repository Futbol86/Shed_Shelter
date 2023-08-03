import axios from 'axios';
import storage from './local-storage';  //-- do not import from ./index since this service is also exported at the same time
import { LC_KEY_AUTH_TOKEN } from '../constants';

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT_URL,
    headers: {
        "Content-Type": "application/json"
    }
});
if (storage.get(LC_KEY_AUTH_TOKEN) !== null && storage.get(LC_KEY_AUTH_TOKEN) !== ''){
    httpClient.defaults.headers.common['Authorization'] = storage.get('auth-token');
}

export default httpClient;