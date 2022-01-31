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

export const changeProfilePhoto = async (profileId, uploadFileId) => {
  try {
    const response = await axiosInstance.put(`/api/profiles/${profileId}`, {
      data: {
        profilePhoto: uploadFileId,
      },
    });
    console.log('change proflie photoo data???', response.data);
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};
