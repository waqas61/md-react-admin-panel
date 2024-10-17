import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import menuListReducer from "./slices/menuListSlice";
import notificationReducer from "./slices/notificationSlice";
import checkInReducer from "./slices/checkInSlice";
import customizationSlice from "./slices/customizationSlice";
import loadingReducer from "./reducer/loadingReducer";

export const store = configureStore({

  reducer: {
    user: userReducer,
    auth: authReducer,
    loading: loadingReducer,
    notifications: notificationReducer,
    ischeckedInState: checkInReducer,
    mainMenuList: menuListReducer,
    customization: customizationSlice,
  }
});
