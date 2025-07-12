import { useSelector } from "react-redux";
import IconBtn from "../../../Comman/IconBtn";


const TotalAmount = () => {
    const {cart , total} = useSelector(state => state.cart);

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Courseds by handleBuyCourse = ",courses);
    }
    return(
        <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
            <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
            <IconBtn
            text="Buy now"
            onclick={handleBuyCourse}
            customClasses=""/>
        </div>
    )
}

export default TotalAmount;