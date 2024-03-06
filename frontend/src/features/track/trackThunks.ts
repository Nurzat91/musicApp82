import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Tracks } from '../../types';

export const fetchTracks = createAsyncThunk<Tracks[], string>(
  'tracks/fetchTracks',
  async (id) => {
    const response = await axiosApi.get('/tracks?album=' + id);
    return response.data.reverse();
  }
);