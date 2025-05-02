import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // your backend

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page = 1) => {
    const res = await axios.get(`http://localhost:3000/users?page=${page}&limit=5`);
    return res.data;
  });
  

export const getUser = createAsyncThunk('users/getUser', async (id) => {
    const res = await axios.get(`${API_URL}/users/${id}`);
    return res.data;
  });
export const createUser = createAsyncThunk('users/createUser', async (user) => {
  const res = await axios.post(`${API_URL}/users`, user);
  return res.data;
});
export const updateUser = createAsyncThunk('users/updateUser', async ({ id, userData }) => {
    const res = await axios.put(`${API_URL}/users/${id}`, userData);
    return res.data;
  });
  
export const   deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
  return id;
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: null,
    page: 1,
    totalPages: 1
  },
  
  reducers: {},
  extraReducers: builder => {
    builder
    .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload.data;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(u => u._id !== action.payload);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.list.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  }
});

export default userSlice.reducer;
