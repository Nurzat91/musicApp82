import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Albums, GlobalError } from '../../types';
import { isAxiosError } from 'axios';

export const fetchAlbum = createAsyncThunk<Albums[], string>(
  'albums/fetchAlbum',
  async (id) => {
    const response = await axiosApi.get('/albums?artist=' + id);
    return response.data.reverse();
  }
);

export const deleteAlbum = createAsyncThunk<void, string>(
  'albums/deleteAlbum',
  async (id) => {
    try {
      await axiosApi.delete('/albums/' + id);
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 403) {
        return alert(e.response.data.error as GlobalError);
      }
      throw (e);
    }
  }
);

export const publishedAlbum = createAsyncThunk<void, string>(
  'albums/publishedAlbum',
  async (id) => {
    await axiosApi.patch('/albums/' + id + '/togglePublished');
  }
);