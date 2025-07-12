import { useSelector } from "react-redux";
import CartCourses from "./CartCourses";
import TotalAmount from "./TotalAmount";



const CartComp = () => {
    const { total , totalItems } = useSelector(state => state.cart);

    return(
        <div>
            <h1 className="text-3xl font-semibold text-richblack-5 mb-14">Cart</h1>
            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
                {totalItems} Course in cart
            </p>
            {
                total == 0 ? (
                    <p className="mt-14 text-center text-3xl text-richblack-100">
                        Your cart is empty
                    </p>
                ) :(
                    <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                        <CartCourses/>
                        <TotalAmount/>
                    </div>
                )
            }
        </div>
    )
}

export default CartComp;