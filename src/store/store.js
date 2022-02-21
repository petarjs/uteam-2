import { configureStore } from '@reduxjs/toolkit';

import { questionApi } from 'services/questionApi';

export default configureStore({
  reducer: {
    [questionApi.reducerPath]: questionApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(questionApi.middleware),
});
