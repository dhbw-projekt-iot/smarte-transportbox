import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import devicesSlice from './deviceSlice';
import logSlice from './logSlice';
import transportationTasksSlice from './transportationTaskSlice';

export const store = configureStore({
  reducer: {
    // list reducers here or combine them and list root reducer
    log: logSlice,
    transportationTasks: transportationTasksSlice,
    devices: devicesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
