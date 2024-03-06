import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistReducer } from '../features/artist/artistSlice';
import { albumsReducer } from '../features/album/albumSlice';
import { tracksReducer } from '../features/track/trackSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { usersReducer } from '../features/users/usersSlice';
import { trackHistoryReducer} from '../features/trackHistory/TrackHistorySlice';

const usersPersistConfig = {
  key: 'musicApp:users',
  storage,
  whitelist: ['user'],
};
const rootReducer = combineReducers({
  artists: artistReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  trackHistory: trackHistoryReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;