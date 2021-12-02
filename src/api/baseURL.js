let baseURL = 'https://api.haminepal.org/api/v1';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'https://api.haminepal.org/api/v1';
}

export default baseURL;
