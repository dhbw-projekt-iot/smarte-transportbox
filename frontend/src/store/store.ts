import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logSlice from './logSlice';

export const store = configureStore({
  reducer: {
    // list reducers here or combine them and list root reducer
    log: logSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
