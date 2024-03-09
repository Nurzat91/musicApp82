import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Artists, GlobalError } from '../../types';
import { isAxiosError } from 'axios';

export const fetchArtists = createAsyncThunk<Artists[]>(
  'artists/fetchArtists',
  async () => {
    const response = await axiosApi.get<Artists[]>('/artists');
    return response.data;
  }
);

export const deleteArtist = createAsyncThunk<void, string>(
  'artists/deleteArtist',
  async (id) => {
    try {
      await axiosApi.delete('/artists/' + id);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 403) {
        return alert(e.response.data.error as GlobalError);
      }
      throw (e);
    }
  }
);

export const publishedArtist = createAsyncThunk<void, string>(
  'artists/publishedArtist',
  async (id) => {
    await axiosApi.patch('/artists/' + id + '/togglePublished');
  }
);
