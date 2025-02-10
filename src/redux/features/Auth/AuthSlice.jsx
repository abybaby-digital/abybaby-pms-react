import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true', // Persist login state,
    token: null,
    user: {},
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isAuthenticated = true;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUsers: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            sessionStorage.clear();
        },
    }
})

export const { setToken, setUsers, logout, loginSuccess, setTriggerLogin, resetTriggerLogin } = authSlice.actions;
export default authSlice.reducer;