import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserExist: false,
    user: {},
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUser: (state, action) => {
            state.isUserExist = true;
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.isUserExist = false;
            state.user = {};
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     isUserExist: false,
//     user: null,
//     loading: true, // Add a loading state
//   },
//   reducers: {
//     saveUser: (state, action) => {
//       state.isUserExist = true;
//       state.user = action.payload;
//       state.loading = false; // Set loading to false when user is fetched
//     },
//     clearUser: (state) => {
//       state.isUserExist = false;
//       state.user = null;
//       state.loading = false; // Set loading to false when user is cleared
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//   },
// });

// export const { saveUser, clearUser, setLoading } = userSlice.actions;
// export default userSlice.reducer;
