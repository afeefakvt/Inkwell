import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './userSlice';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

let store: any;
let persistor: any;

// Function to create store (called only on client)
export const initializeStore = () => {
  if (typeof window === 'undefined') {
    // On server, just return store without persist
    return configureStore({
      reducer: {
        auth: userAuthReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });
  } else {
    // On client, use redux-persist
    const { persistReducer, persistStore } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = { key: 'auth', storage, whitelist: ['auth'] };
    const persistedReducer = persistReducer(persistConfig, userAuthReducer);

    const clientStore = configureStore({
      reducer: { auth: persistedReducer },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });

    persistor = persistStore(clientStore);
    return clientStore;
  }
};

// Initialize store
store = initializeStore();

export { store, persistor };
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;