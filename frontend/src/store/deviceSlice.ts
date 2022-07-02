import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BACKEND_URL } from '../config/envVars';

interface deviceState {
  devices: any[];
}

const initialState: deviceState = {
  devices: [],
};

export const fetchDevices = createAsyncThunk(
  'devices/devices',
  async (thunkAPI) => {
    const response = await axios.get(BACKEND_URL + '/public/devices');
    return response;
  },
);

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.devices = action.payload.data;
    });
  },
});

// export const { setTransportationTask, RemoveransportationTask } = transportationTasksSlice.actions;
export default devicesSlice.reducer;
