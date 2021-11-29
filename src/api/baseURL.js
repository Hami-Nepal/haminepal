<<<<<<< HEAD
let baseURL = "http://localhost:5000/api/v1";
=======
let baseURL = 'https://api.haminepal.org/api/v1';
>>>>>>> 9e9f722a07822ba77aeedb981941db166c6a814f

if (process.env.NODE_ENV === "production") {
  baseURL = "https://api.haminepal.org/api/v1";
}
export default baseURL;
