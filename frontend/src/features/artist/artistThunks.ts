import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Artists } from '../../types';

export const fetchArtists = createAsyncThunk<Artists[]>(
  'artists/fetchArtists',
  async () => {
    const response = await axiosApi.get<Artists[]>('/artists');
    return response.data;
    console.log(response.data);
  }
);
