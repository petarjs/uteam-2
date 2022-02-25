import { configureStore } from '@reduxjs/toolkit';

import { answersApi } from 'services/answersApi';
import { profileApi } from 'services/profileApi';
import { questionApi } from 'services/questionApi';

export default configureStore({
  reducer: {
    [questionApi.reducerPath]: questionApi.reducer,
    [answersApi.reducerPath]: answersApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(questionApi.middleware)
      .concat(answersApi.middleware)
      .concat(profileApi.middleware),
});
