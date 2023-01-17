// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from'../store';

// const initialState: HomeMenuText = {
//   status: 'idle',
//   data: '',
// };

// export interface HomeMenuText {
//   status: string;
//   data: string;
// }

// export const getHomeMenuText = createAsyncThunk(
//   'spanData/getSpanData',
//   async (spanId: string) => {
//     const url = 'http://172.0.0.1/api/traces/getIndivSpanDetails/';

//     const response = await fetch(url);
//     const data = await response.json();

//     return data;
//   }
// );

// /**
//  * Handles reducer logic related to Span Data View Type Updates
//  */
// export const homeMenuTextSlice = createSlice({
//   name: 'spanData',
//   initialState: initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getHomeMenuText.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(
//         getHomeMenuText.fulfilled,
//         (state, action: PayloadAction<HomeMenuText>) => {
//           state.status = 'idle';
//           state = action.payload;
//         }
//       )
//       .addCase(getHomeMenuText.rejected, (state) => {
//         state.status = 'failed';
//       });
//   },
// });

// export const selectHomeMenuText = (state: RootState) => state.homeMenuText;
// export default homeMenuTextSlice.reducer;
