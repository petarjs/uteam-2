import { configureStore } from '@reduxjs/toolkit';

import { answersApi } from 'services/answersApi';
import { questionApi } from 'services/questionApi';

export default configureStore({
  reducer: {
    [questionApi.reducerPath]: questionApi.reducer,
    [answersApi.reducerPath]: answersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(questionApi.middleware).concat(answersApi.middleware),
});
