import {configureStore} from "@reduxjs/toolkit";
import { artistReducer } from '../features/artist/artistSlice';
import { albumsReducer } from '../features/album/albumSlice';
import { tracksReducer } from '../features/track/trackSlice';

export const store = configureStore({
  reducer: {
    artists: artistReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;