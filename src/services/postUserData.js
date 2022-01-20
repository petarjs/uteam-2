import axiosInstance from './http';

const postUserData = async (userImg, data, userId) => {
  try {
    const response = await Promise.all([
      axiosInstance.post('upload', userImg),
      axiosInstance.post('companies', {
        data: {
          name: `${data.name}'s Company`,
        },
      }),
      axiosInstance.post('profiles', {
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
