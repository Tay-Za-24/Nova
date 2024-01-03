import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userID : ''
}

const userSlice = createSlice({
    name  : 'user',
    initialState, 
    reducers : {
        setUser : (state, action) => {
            state.userID = action.payload
            console.log(state.userID);
        }
    }
})

export const {setUser} = userSlice.actions;
export const selectUser = (state) => state.user

export default userSlice.reducer;