import axiosInstance from './http';

const postUserData = async (userImg, data, userId) => {
  try {
    const response = await Promise.all([
      axiosInstance.post('/api/upload', userImg),
      axiosInstance.post('/api/companies', {
        data: {
          name: `${data.username}'s Company`,
        },
      }),
      axiosInstance.post('/api/profiles', {
        data: {
          name: data.name,
          profilePhoto: userImg,
          user: userId,
        },
      }),
    ]);

    console.log(response.data, '🚀🤘');
    return response;
  } catch (err) {
    console.error(`${err.message}, 💥🤯`);
  }
};

export default postUserData;
