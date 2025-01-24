import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: null,
    user: {},
    triggerLogin: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setLogInState: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUsers: (state, action) => {
            state.user = action.payload;
        },
        setTriggerLogin: (state,action) => {
            state.triggerLogin = action.payload;
        },
    }
})

export const { setToken, setUsers, setLogInState , setTriggerLogin , resetTriggerLogin } = authSlice.actions;
export default authSlice.reducer;