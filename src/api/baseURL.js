let baseURL = 'https://api.haminepal.org/api/v1';

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:5000/api/v1';
}

export default baseURL;
