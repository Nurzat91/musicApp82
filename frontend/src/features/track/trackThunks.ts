import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { GlobalError, Tracks } from '../../types';
import { isAxiosError } from 'axios';

export const fetchTracks = createAsyncThunk<Tracks[], string>(
  'tracks/fetchTracks',
  async (id) => {
    const response = await axiosApi.get('/tracks?album=' + id);
    return response.data.reverse();
  }
);

export const deleteTracks = createAsyncThunk<void, string>(
  'tracks/deleteTracks',
  async (id) => {
    try {
      await axiosApi.delete('/tracks/' + id);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 403) {
        return alert(e.response.data.error as GlobalError);
      }
      throw (e);
    }
  }
);

export const publishedTracks = createAsyncThunk<void, string>(
  'tracks/publishedTracks',
  async (id) => {
    await axiosApi.patch('/tracks/' + id + '/togglePublished');
  }
);