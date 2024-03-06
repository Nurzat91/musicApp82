import { createSlice } from '@reduxjs/toolkit';
import { TrackHistory } from '../../types';
import { fetchHistory, postHistory } from './TrackHistoryThunks';
import { RootState } from '../../app/store';

interface Initial {
  data: TrackHistory[];
  fetchLoading: boolean;
  loading: boolean;
}

const initialState: Initial = {
  data: [],
  fetchLoading: false,
  loading: false,
};

export const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.fetchLoading = false;
    });
    builder.addCase(fetchHistory.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(postHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postHistory.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(postHistory.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;
export const selectTracksHistory = (state: RootState) => state.trackHistory.data;
export const selectFetchLoading = (state: RootState) => state.trackHistory.fetchLoading;
export const selectPostLoading = (state: RootState) => state.trackHistory.loading;