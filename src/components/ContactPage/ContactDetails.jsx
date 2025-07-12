
import { BiWorld } from "react-icons/bi";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { IoCall } from "react-icons/io5";

const ContactDetails = () => {
    return(
        <div className="bg-richblack-800 rounded-xl p-4 lg:p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">
                <div className="flex flex-row gap-3 items-center">
                    <HiChatBubbleLeftRight size={25}/>
                    <h1 className="text-lg font-semibold text-richblack-5">Chat on us</h1>
                </div>
                <p className="font-medium">Our friendly team is here to help.</p>
                <p className="font-semibold">Info@teachnet.com</p>
            </div>
            <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">
                <div className="flex flex-row gap-3 items-center">
                    <BiWorld size={25}/>
                    <h1 className="text-lg font-semibold text-richblack-5">Visit us</h1>
                </div>
                <p className="font-medium">come and say hello at our office HQ.</p>
                <p className="font-semibold">Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>                
            </div>
            <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">
                <div className="flex flex-row gap-3 items-center">
                    <IoCall size={25}/>
                    <h1 className="text-lg font-semibold text-richblack-5">Call us</h1>
                </div>
                <p className="font-medium">Mon - Fri From 8am to 5pm.</p>
                <p className="font-semibold">+123 456 789</p>                
            </div>
        </div>
    )
}

export default ContactDetails;