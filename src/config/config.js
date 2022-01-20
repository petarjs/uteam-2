// const API_ENDPOINT = 'https://uteam-61de5-default-rtdb.firebaseio.com/users.json';
const API_URL =
  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : 'http://localhost:1337';

const REGEXFOREMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PROFILEIMAGEURLPATH = `data[0].attributes.profilePhoto.data.attributes.url`;
const PROFILEIMAGENAME = `data[0].attributes.name`;
export { API_URL, REGEXFOREMAIL, PROFILEIMAGEURLPATH, PROFILEIMAGENAME };
// const API_URL = 'https://uteam-api-7nngy.ondigitalocean.app/api/';
// const API_URL_LOCAL = 'http://localhost:1337/api/';
