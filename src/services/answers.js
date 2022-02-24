import axiosInstance from './http';

export const getAnswers = async (profileId) => {
  console.log('nswer profile id', profileId);
  try {
    const response = await axiosInstance.get(
      `/api/answers?filters[profile][id][$eq]=${profileId}&populate=*`
    );
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

export const changeAnswer = async (answerId, answerText) => {
  try {
    const response = await axiosInstance.put(`/api/answers/${answerId}`, {
      data: {
        answer: answerText,
      },
    });
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};
