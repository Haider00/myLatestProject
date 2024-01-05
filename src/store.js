import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { notes } from './pages/api/notesApi';
import { users } from './pages/api/usersapi';
export const store = configureStore({
  reducer: {
    [users.reducerPath]: users.reducer,
    [notes.reducerPath]: notes.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(users.middleware, notes.middleware),
});

setupListeners(store.dispatch);
