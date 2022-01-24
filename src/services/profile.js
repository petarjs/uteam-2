import axiosInstance from './http';

export const createProfile = async (companyId, uploadFileId, userId) => {
  try {
    const response = await axiosInstance.post('/api/profiles', {
      data: {
        company: companyId,
        profilePhoto: uploadFileId,
        user: userId,
      },
    });
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};
