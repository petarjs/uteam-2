import { REGEXFOREMAIL as regexEmail } from 'config/config.js';
// Helpers:
const isEmail = (email) => regexEmail.test(email);
const isPassword = (password) =>
  password.trim() !== '' && password.length >= 6 && password.length <= 20;

export { isEmail, isPassword };
