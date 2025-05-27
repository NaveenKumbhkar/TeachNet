import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTolatItems(state,actions){
            state.totalItems = actions.payload;
        }
    }
})

export const {} = cartSlice.actions;
export default cartSlice.reducer;