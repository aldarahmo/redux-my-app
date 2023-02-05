import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const userService = axios.create({
  baseURL: "https://gorest.co.in/public/v2/users",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer 5e9d7df3a868b3411123b44707fb68663ef02d029fbf4410327dfd9f7c440b20",
  },
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    values: [],
    loaded: false,
    status: "active",
  },
  reducers: {
    loadUsers: (state, action) => {
      state.values = action.payload;
    },
    removeUser: (state, action) => {
      state.values = state.values.filter((u) => u.id !== action.payload) || [];
    },
  },
});

export const loadUsersAsync = () => (dispatch) => {
  userService.get().then(({ data }) => {
    dispatch(loadUsers(data));
  });
};

export const deleteUseAsync = (userId, succes, fail) => (dispatch) => {
  userService
    .delete(`/${userId}`)
    .then((res) => {
      if (res.status === 200) {
        succes();
        dispatch(removeUser(userId));
      }
    })
    .catch((error) => {
      fail(error);
    });
};
const { loadUsers, removeUser } = usersSlice.actions;
export const selectUsersLoaded = (state) => state.users.loaded;
export const selectUsers = (state) => state.users.values;
export const selectStatus = (state) => state.users.status;

export default usersSlice.reducer;
