import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  value: 0,
};
const newSlice = createSlice({
  name: 'newSlice',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});