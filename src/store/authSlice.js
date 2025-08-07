import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
     theme: "light",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },

     }
})

export const selectUserData = (state) => state.auth.userData;
export const {login, logout, setTheme} = authSlice.actions;
export default authSlice.reducer;