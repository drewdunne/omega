import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
// import { HomeMenuText, homeMenuTextSlice } from './slices/MenuSlice';

export const store = configureStore({
  reducer: {
    // homeMenuText: homeMenuTextSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
