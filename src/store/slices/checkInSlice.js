import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const API_URL = 'https://api.mddentalstaffing.com/api/v1/check-in';
const HEADER = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
    }
};

export const fetchIscheckedIn = createAsyncThunk('ischeckedInState/ischeckedIn', async () => {
    const response = await axios.get(API_URL, HEADER);
    return response.data.data.is_checked_in;
});

const initialState = {
    ischeckedInState: null,
    status: 'idle',
    error: null
};


const checkInSlice = createSlice({
    name: 'ischeckedInState',
    initialState,
    reducers: {
        setNotification: (state) => {

        },
        setIscheckedIn: (state, action) => {
            state.ischeckedInState = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIscheckedIn.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchIscheckedIn.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.ischeckedInState = action.payload;
            })
            .addCase(fetchIscheckedIn.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const getCheckedInStatus = (state) => state.ischeckedInState.status;

export const selectIscheckedIn = (state) => state.ischeckedInState.ischeckedInState;
export const getCheckedInStatusError = (state) => state.ischeckedInState.error;
export const { setNotification, setIscheckedIn } = checkInSlice.actions;

export default checkInSlice.reducer

