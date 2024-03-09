import { createSlice} from '@reduxjs/toolkit';
import { deleteAlbum, fetchAlbum, publishedAlbum } from './albumThunks';
import { Albums} from '../../types';
import { RootState } from '../../app/store';

interface UsersState {
  fetchLoading: boolean;
  items: Albums[];
  fetchOneLoading: boolean;
  albumDeleting: boolean;
  publishedLoading: boolean;
}
const initialState: UsersState = {
  fetchLoading: false,
  items: [],
  fetchOneLoading: false,
  albumDeleting: false,
  publishedLoading: false,
}
export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, {payload: data}) => {
      state.fetchLoading = false;
      state.items = data;
    });
    builder.addCase(fetchAlbum.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(deleteAlbum.pending, (state) => {
      state.albumDeleting = true;
    });
    builder.addCase(deleteAlbum.fulfilled, (state) => {
      state.albumDeleting = false;
    });
    builder.addCase(deleteAlbum.rejected, (state) => {
      state.albumDeleting = false;
    });

    builder.addCase(publishedAlbum.pending, (state) => {
      state.publishedLoading = true;
    });
    builder.addCase(publishedAlbum.fulfilled, (state) => {
      state.publishedLoading = false;
    });
    builder.addCase(publishedAlbum.rejected, (state) => {
      state.publishedLoading = false;
    });

  },

});
export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.items;
export const selectLoading = (state: RootState) => state.albums.fetchLoading;
export const removeLoading = (state: RootState) => state.albums.albumDeleting;
export const publishLoading = (state: RootState) => state.albums.publishedLoading;