// const API_URL = 'https://uteam-api-7nngy.ondigitalocean.app/api/';
// const API_URL_LOCAL = 'http://localhost:1337/api/';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:1337/api/';

const REGEXFOREMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// console.log(API_URL);
export { API_URL, REGEXFOREMAIL };
