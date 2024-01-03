import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedDate : null,
}

const dateSlice = createSlice({
    name : 'date',
    initialState, 
    reducers : {
        setDate : (state, action) => {
            state.selectedDate = action.payload
            console.log("Redux" , action.payload);
        }
    }
})

export const {setDate} = dateSlice.actions
export const selectDate = (state) => state.date

export default dateSlice.reducer;