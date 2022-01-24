import axiosInstance from './http';

export const createCompany = async (username) => {
  try {
    const response = await axiosInstance.post('/api/companies', {
      data: {
        name: `${username}'s Company`,
      },
    });
    console.log('kompanija ???: ', response);
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};
