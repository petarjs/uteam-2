// const API_ENDPOINT = 'https://uteam-61de5-default-rtdb.firebaseio.com/users.json';
const API_ENDPOINT = 'http://localhost:1337';
const REGEXFOREMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PROFILEIMAGEURLPATH = `data[0].attributes.profilePhoto.data.attributes.url`;
const PROFILEIMAGENAME = `data[0].attributes.name`;
export { API_ENDPOINT, REGEXFOREMAIL, PROFILEIMAGEURLPATH, PROFILEIMAGENAME };
