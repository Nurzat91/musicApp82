import { createSlice } from '@reduxjs/toolkit';
import { Tracks } from '../../types';
import { fetchTracks } from './trackThunks';
import { RootState } from '../../app/store';

interface UsersState {
  data: Tracks [];
  fetchLoading: boolean;
}
const initialState: UsersState = {
  fetchLoading: false,
  data: [],
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

  },

});
export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.data;
export const selectLoading = (state: RootState) => state.tracks.fetchLoading;