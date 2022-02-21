import _ from 'lodash';

import axiosInstance from './http';

import { COMPANYLOGOID } from 'config/config.js';

export const createCompany = async (username, profileId) => {
  try {
    const response = await axiosInstance.post('/api/companies', {
      data: {
        name: `${username}'s Company`,
        profiles: profileId,
      },
    });
    console.log('kompanija ???: ', response);
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export const getCompany = async (profileId) => {
  try {
    const response = await axiosInstance.get(
      `/api/companies?filters[profiles][id][$eq]=${profileId}&populate=*`
    );
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export const changeCompanyNamee = async (companyId, newName) => {
  try {
    const response = await axiosInstance.put(`/api/companies/${companyId}`, {
      data: {
        name: newName,
      },
    });
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export const getCompanyLogoId = async (profileId) => {
  try {
    const response = await axiosInstance.get(
      `/api/companies?filters[profiles][id][$eq]=${profileId}&populate=*`
    );
    console.log('get comp logo idddd', response.data, COMPANYLOGOID);
    return _.get(response.data, COMPANYLOGOID);
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export const changeCompanyLogoo = async (companyId, uploadFileId) => {
  try {
    const response = await axiosInstance.put(`/api/companies/${companyId}`, {
      data: {
        logo: uploadFileId,
      },
    });
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export const addProfileToCompany = async (companyId, profileId) => {
  try {
    const thisCompany = await getCompany(profileId);
    const companyProfileIds = thisCompany.data[0].attributes.profiles.data.map(
      (profile) => profile.id
    );
    const response = await axiosInstance.put(`/api/companies/${companyId}`, {
      data: {
        profiles: [...companyProfileIds, profileId],
      },
    });
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export const getCompanies = async () => {
  try {
    const response = await axiosInstance.get(`/api/companies`);
    return response.data;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};
