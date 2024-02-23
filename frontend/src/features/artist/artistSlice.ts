import { createSlice} from '@reduxjs/toolkit';
import { fetchArtists} from './artistThunks';
import { RootState } from '../../app/store';
import {Artists } from '../../types';

interface UsersState {
  fetchLoading: boolean;
  dataArtists: Artists[];
}
const initialState: UsersState = {
  fetchLoading: false,
  dataArtists: [],
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

  },

});
export const artistReducer = artistSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.dataArtists;
export const selectLoading = (state: RootState) => state.artists.fetchLoading;
