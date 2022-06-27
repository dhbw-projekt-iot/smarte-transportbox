import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface eventState {
  transportationTasks: any[];
}

const initialState: eventState = {
  transportationTasks: [],
};

export const fetchTransportationTasks = createAsyncThunk(
  'transportationTask/fetchTransportationTasks',
  async (thunkAPI) => {
    const response = await axios.get('http://localhost:4004/public/tasks');
    return response;
  },
);

export const transportationTasksSlice = createSlice({
  name: 'transportationTasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransportationTasks.fulfilled, (state, action) => {
      state.transportationTasks = action.payload.data;
    });
  },
});

// export const { setTransportationTask, RemoveransportationTask } = transportationTasksSlice.actions;
export default transportationTasksSlice.reducer;
