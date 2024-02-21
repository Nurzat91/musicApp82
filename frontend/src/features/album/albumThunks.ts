import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const fetchAlbum = createAsyncThunk<>(
  'albums/fetchAll',
  async () => {
    const dishesResponse = await axiosApi.get<>('/albums');
    return dishesResponse.data;
  }
);