import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Albums, ApiAlbums } from '../../types';

export const fetchAlbum = createAsyncThunk<Albums[]>(
  'albums/fetchAlbum',
  async () => {
    const response = await axiosApi.get<Albums[]>('/albums');
    return response.data;
    console.log(response.data);
  }
);

export const fetchOneAlbum = createAsyncThunk<ApiAlbums[], string>(
  'albums/fetchOneAlbum',
  async (id) =>{
    const response = await axiosApi.get<ApiAlbums[]>(`/albums/${id}`);
    const dataAlbums = response.data;

    if(dataAlbums === null){
      throw new Error('Not found');
    }

    console.log(dataAlbums);
    return dataAlbums;
  }
);