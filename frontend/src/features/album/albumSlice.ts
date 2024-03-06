import { createSlice} from '@reduxjs/toolkit';
import { fetchAlbum} from './albumThunks';
import { Albums} from '../../types';
import { RootState } from '../../app/store';

interface UsersState {
  fetchLoading: boolean;
  items: Albums[];
  fetchOneLoading: boolean;
  // data: ApiAlbums[];
}
const initialState: UsersState = {
  fetchLoading: false,
  items: [],
  fetchOneLoading: false,
  // data: [],
}
export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, {payload: data}) => {
      state.fetchLoading = false;
      state.items = data;
    });
    builder.addCase(fetchAlbum.rejected, (state) => {
      state.fetchLoading = false;
    });

    // builder.addCase(fetchOneAlbum.pending, (state) => {
    //   state.fetchOneLoading = true;
    // });
    // builder.addCase(fetchOneAlbum.fulfilled, (state, {payload: data}: PayloadAction<ApiAlbums[]>) => {
    //   state.fetchOneLoading = false;
    //   state.data = data;
    // });
    // builder.addCase(fetchOneAlbum.rejected, (state) => {
    //   state.fetchOneLoading = false;
    // });

  },

});
export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.items;
export const selectLoading = (state: RootState) => state.albums.fetchLoading;
// export const selectOneAlbums= (state: RootState) => state.albums.data;
// export const selectAlbumsLoading = (state: RootState) => state.albums.fetchOneLoading;