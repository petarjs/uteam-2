import _ from 'lodash';

import axiosInstance from './http';

import { PROFILEIMAGEURLPATH, PROFILEIMAGENAME, PROFILEIMAGEID } from 'config/config.js';

export const getUserStats = async () => {
  try {
    const response = await axiosInstance.get('/api/users/me');
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export const getProfileImage = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/profiles?filters[user][id][$eq]=${userId}&populate=profilePhoto`
    );
    return [_.get(response.data, PROFILEIMAGEURLPATH), _.get(response.data, PROFILEIMAGENAME)];
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export const getProfileImageId = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/profiles?filters[user][id][$eq]=${userId}&populate=profilePhoto`
    );
    console.log('profile dataa getprofileimageid !!', response.data, PROFILEIMAGEID);
    return _.get(response.data, PROFILEIMAGEID);
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export const getProfileId = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/profiles?filters[user][id][$eq]=${userId}`);
    console.log('profile idddd iddddd', response.data.data[0].id);
    return response.data.data[0].id;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};
