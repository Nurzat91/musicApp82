import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Tracks } from '../../types';

export const fetchTracks = createAsyncThunk<Tracks[]>(
  'tracks/fetchTracks',
  async () => {
    const dishesResponse = await axiosApi.get<Tracks[]>('/tracks');
    return dishesResponse.data;
  }
);