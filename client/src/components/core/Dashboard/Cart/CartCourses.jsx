import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { removeToCart } from "../../../../slices/cartSlice"


const CartCourses = () => {
    const { cart } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    return (
        <div className="w-full flex flex-col">
            {
                cart.map((course, index) => (
                    <div
                        key={course._id || index}
                        className={`flex w-full flex-wrap items-start justify-between gap-6 
                            ${index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
                            } ${index !== 0 && "mt-6"} `}
                    >
                        <div className="lg:w-[75%] flex flex-col gap-4 md:flex-row">
                            <img src={course?.thumbnail}
                                alt={course?.courseName}
                                className="w-[150px] h-[150px] rounded-lg object-cover"
                            />
                            <div className="flex flex-col space-y-1">
                                <p className="text-lg font-medium text-richblack-5">
                                    {course?.courseName}
                                </p>
                                <p className="text-sm text-richblack-300">
                                    {course?.category?.name}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-5">4.8</span>
                                    <ReactStars
                                        count={5}
                                        value={course?.ratingAndReviews?.length}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<FaStar />}
                                        fullIcon={<FaStar />}
                                    />
                                    <span className="text-richblack-400">
                                        {course?.ratingAndReviews?.length} Ratings
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-fit flex lg:flex-col justify-between items-baseline lg:items-end space-y-2">
                            <p className="mb-6 text-3xl font-medium text-yellow-100">
                                ₹ {course?.price}
                            </p>
                            <button
                                onClick={() => dispatch(removeToCart(course._id))}
                                className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200"
                            >
                                <RiDeleteBin6Line />
                                <span>Remove</span>
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CartCourses;