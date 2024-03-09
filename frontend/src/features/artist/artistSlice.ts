import { createSlice} from '@reduxjs/toolkit';
import { deleteArtist, fetchArtists, publishedArtist } from './artistThunks';
import { RootState } from '../../app/store';
import {Artists } from '../../types';

interface UsersState {
  fetchLoading: boolean;
  dataArtists: Artists[];
  artistDeleting: boolean;
  publishedLoading: boolean;
}
const initialState: UsersState = {
  fetchLoading: false,
  dataArtists: [],
  artistDeleting: false,
  publishedLoading: false,
}
export const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, {payload: data}) => {
      state.fetchLoading = false;
      state.dataArtists = data;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(deleteArtist.pending, (state) => {
      state.artistDeleting = true;
    });
    builder.addCase(deleteArtist.fulfilled, (state) => {
      state.artistDeleting = false;
    });
    builder.addCase(deleteArtist.rejected, (state) => {
      state.artistDeleting = false;
    });

    builder.addCase(publishedArtist.pending, (state) => {
      state.publishedLoading = true;
    });
    builder.addCase(publishedArtist.fulfilled, (state) => {
      state.publishedLoading = false;
    });
    builder.addCase(publishedArtist.rejected, (state) => {
      state.publishedLoading = false;
    });

  },

});
export const artistReducer = artistSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.dataArtists;
export const selectLoading = (state: RootState) => state.artists.fetchLoading;
export const removeLoading = (state: RootState) => state.artists.artistDeleting;
export const publishLoading = (state: RootState) => state.artists.publishedLoading;
