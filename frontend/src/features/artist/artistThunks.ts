import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const fetchArtists = createAsyncThunk<>(
  'artists/fetchAll',
  async () => {
    const dishesResponse = await axiosApi.get<>('/artists');
    return dishesResponse.data;
  }
);