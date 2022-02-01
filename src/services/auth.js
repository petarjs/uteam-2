import axiosInstance from './http';

export const login = async (identifier, password) => {
  const user = { identifier, password };

  try {
    const response = await axiosInstance.post('/api/auth/local/', user);
    console.log(response.data.user, '🚀🤘USER');
    console.log('token', response.data.jwt);
    // console.log(response.data.user, '🚀🤘USER');
    // console.log('token', response.data.jwt);

    return response;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
    return err.response;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axiosInstance.post(`/api/auth/local/register`, {
      username: username,
      email: email,
      password: password,
    });
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};
