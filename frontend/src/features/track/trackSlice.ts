import { createSlice } from '@reduxjs/toolkit';

interface UsersState {

}
const initialState: UsersState = {

}
export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},

});
export const tracksReducer = tracksSlice.reducer;