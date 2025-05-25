import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null
}
const profileSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        setUser(state,actions){
            state.user = actions.payload
        }
    }
})

export const { user } = profileSlice.actions;
export default profileSlice.reducer;