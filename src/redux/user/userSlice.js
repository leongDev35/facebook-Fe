import { createSlice } from "@reduxjs/toolkit";
import { login, updateUser } from "../../service/userService";
import { socket } from "../../App";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('user'))
}
const useSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log(state);
                if (action.payload.accessToken) {
                    state.currentUser = action.payload;
                    localStorage.setItem('user', JSON.stringify(action.payload))
                }

            })
            .addCase(updateUser.fulfilled, (state, action) => {
                
                console.log(state.currentUser);
                console.log(action);

                state.currentUser = {...state.currentUser, userData: action.payload}
                localStorage.setItem('user', JSON.stringify(state.currentUser))

            })
    }
})

export default useSlice.reducer;