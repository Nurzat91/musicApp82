import { createSlice } from '@reduxjs/toolkit';

interface UsersState {

}
const initialState: UsersState = {

}
export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},

});
export const albumsReducer = albumsSlice.reducer;