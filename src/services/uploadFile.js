import axiosInstance from './http';

export const uploadFile = async (userImg) => {
  try {
    const response = await axiosInstance.post('/api/upload', userImg);
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};
