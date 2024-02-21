import { createSlice } from '@reduxjs/toolkit';

interface UsersState {

}
const initialState: UsersState = {

}
export const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},

});
export const artistReducer = artistSlice.reducer;