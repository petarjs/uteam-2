import axiosInstance from './http';

export const changeUserStats = async (userId, newName) => {
  try {
    const response = await axiosInstance.put(`/api/users/${userId}`, {
      username: newName,
    });
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export const forgotPassword = async (userEmail) => {
  // ne pokazuje ni da je poslao request :S?!?!?!
  try {
    const response = await axiosInstance.post('/api/auth/forgot-password', {
      email: userEmail,
    });
    console.log('forgot password reponse datAAAAa', response.data);
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export const resetPassword = async (userId, newPassword) => {
  try {
    const response = await axiosInstance.put(`/api/users/${userId}`, {
      password: newPassword,
    });
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};
