import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { notes } from './pages/api/notesApi';
import { users } from './pages/api/usersapi';
import userSlice from './pages/api/userSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    [users.reducerPath]: users.reducer,
    [notes.reducerPath]: notes.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(users.middleware, notes.middleware),
});

setupListeners(store.dispatch);
