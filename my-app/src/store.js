import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/counter/users_slice";
export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
