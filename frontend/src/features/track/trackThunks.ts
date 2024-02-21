import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const fetchArtists = createAsyncThunk<>(
  'tracks/fetchAll',
  async () => {
    const dishesResponse = await axiosApi.get<>('/tracks');
    return dishesResponse.data;
  }
);