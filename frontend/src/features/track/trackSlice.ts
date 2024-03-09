import { createSlice } from '@reduxjs/toolkit';
import { Tracks } from '../../types';
import { deleteTracks, fetchTracks, publishedTracks } from './trackThunks';
import { RootState } from '../../app/store';

interface UsersState {
  data: Tracks [];
  fetchLoading: boolean;
  tracksDeleting: boolean;
  publishedLoading: boolean;
}
const initialState: UsersState = {
  data: [],
  fetchLoading: false,
  tracksDeleting: false,
  publishedLoading: false,
}
export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, {payload: data}) => {
      state.fetchLoading = false;
      state.data = data;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(deleteTracks.pending, (state) => {
      state.tracksDeleting = true;
    });
    builder.addCase(deleteTracks.fulfilled, (state) => {
      state.tracksDeleting = false;
    });
    builder.addCase(deleteTracks.rejected, (state) => {
      state.tracksDeleting = false;
    });

    builder.addCase(publishedTracks.pending, (state) => {
      state.publishedLoading = true;
    });
    builder.addCase(publishedTracks.fulfilled, (state) => {
      state.publishedLoading = false;
    });
    builder.addCase(publishedTracks.rejected, (state) => {
      state.publishedLoading = false;
    });

  },

});
export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.data;
export const selectLoading = (state: RootState) => state.tracks.fetchLoading;
export const removeLoading = (state: RootState) => state.tracks.tracksDeleting;
export const publishLoading = (state: RootState) => state.tracks.publishedLoading;