import axiosInstance from './http';

export const createProfile = async (companyId, uploadFileId, userId, username) => {
  try {
    const response = await axiosInstance.post('/api/profiles', {
      data: {
        status: 'pending',
        company: companyId,
        profilePhoto: uploadFileId,
        user: userId,
        name: username,
      },
    });
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};
export const changeProfileName = async (profileId, newName) => {
  try {
    const response = await axiosInstance.put(`/api/profiles/${profileId}`, {
      data: {
        name: newName,
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

export const getProfiles = async () => {
  try {
    const response = await axiosInstance.get('/api/profiles?sort=createdAt:desc&populate=*');
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

export const deleteProfile = async (profileId) => {
  try {
    const response = await axiosInstance.delete(`/api/profiles/${profileId}`);
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

export const approveProfile = async (profileId) => {
  try {
    const response = await axiosInstance.put(`/api/profiles/${profileId}`, {
      data: {
        status: 'published',
      },
    });
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

export const unapproveProfile = async (profileId) => {
  try {
    const response = await axiosInstance.put(`/api/profiles/${profileId}`, {
      data: {
        status: 'pending',
      },
    });
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};
