import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import { HistoryMutation, TrackHistory } from '../../types';

export const fetchHistory = createAsyncThunk<TrackHistory[], void, { state: RootState }>(
  'history/getAll',
  async (_, { getState }) => {
    const user = getState().users.user;
    if (user) {
      try {
        const response = await axiosApi.get('/track_history', {
          headers: { Authorization: user.token },
        });
        return response.data;
      } catch (e) {
        return e;
      }
    }
  },
);

export const postHistory = createAsyncThunk<void, HistoryMutation, { state: RootState }>(
  'history/postHistory',
  async (data, { getState }) => {
    const user = getState().users.user;
    if (user) {
      try {
        const response = await axiosApi.post('/track_history', data, {
          headers: { Authorization: user.token },
        });
        return response.data;
      } catch (e) {
        return e;
      }
    }
  },
);