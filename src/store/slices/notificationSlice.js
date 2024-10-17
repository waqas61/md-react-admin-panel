import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const API_URL = 'https://api.mddentalstaffing.com/api/v1/notifications';
const HEADER = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    }
};

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (authToken) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        }
    });
    return response.data.data;
});

const initialState = {
    notifications: [],
    status: 'idle',
    error: null
};


const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification: (state) => {

        },
        addNotification: (state, action) => {
            state.notifications.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notifications = action.payload;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getNotificationsStatus = (state) => state.notifications.status;
export const selectAllNotifications = (state) => state.notifications.notifications;
export const getNotificationsError = (state) => state.notifications.error;

export const { setNotification, addNotification } = notificationSlice.actions;

export default notificationSlice.reducer

