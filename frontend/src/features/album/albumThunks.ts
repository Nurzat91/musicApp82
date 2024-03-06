import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Albums} from '../../types';

export const fetchAlbum = createAsyncThunk<Albums[], string>(
  'albums/fetchAlbum',
  async (id) => {
    const response = await axiosApi.get('/albums?artist=' + id);
    return response.data.reverse();
  }
);

// export const fetchOneAlbum = createAsyncThunk<ApiAlbums[], string>(
//   'albums/fetchOneAlbum',
//   async (id) =>{
//     const response = await axiosApi.get<ApiAlbums[]>(`/albums/${id}`);
//     const dataAlbums = response.data;
//
//     if(dataAlbums === null){
//       throw new Error('Not found');
//     }
//
//     return dataAlbums;
//   }
// );