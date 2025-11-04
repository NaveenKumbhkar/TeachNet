import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total : localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart(state,actions){
            const course = actions.payload;
            const index = state.cart.findIndex((item) => item._id === course._id);
            
            if(index >= 0){
                toast.error("Course is already added");
                return;
            }

            state.cart.push(course);
            
            state.totalItems++ ;
            state.total += course.price;

            localStorage.setItem("cart" , JSON.stringify(state.cart));
            localStorage.setItem("total" , JSON.stringify(state.total));
            localStorage.setItem("totalItem" , JSON.stringify(state.totalItems));

            toast.success("Course added to cart");
        },
        removeToCart(state,actions){
            const course = actions.payload;
            const index = state.cart.findIndex((item) => item._id === course);

            if(index >= 0){
                state.totalItems--;
                state.total -= state.cart[index].price;
                state.cart.splice(index,1);

                localStorage.getItem("cart" , JSON.stringify(state.cart));
                localStorage.getItem("total" , JSON.stringify(state.total));
                localStorage.getItem("totalItems" , JSON.stringify(state.totalItems));

                toast.success("Course removed successfully");
            }
        },
        resetCart(state){
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;

            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
        }
    }
})

export const {addToCart , removeToCart , resetCart} = cartSlice.actions;
export default cartSlice.reducer;