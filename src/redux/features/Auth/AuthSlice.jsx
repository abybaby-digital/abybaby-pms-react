import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: true,
    token: null,
    user: {},
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setLogInState: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUsers: (state, action) => {
            state.user = action.payload;
        },
    }
})

export const { setToken, setUsers, setLogInState , setTriggerLogin , resetTriggerLogin } = authSlice.actions;
export default authSlice.reducer;