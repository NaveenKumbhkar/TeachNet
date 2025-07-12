import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Comman/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";
import {formattedDate} from "../../../utils/dataFormatter";


const MyProfile = () => {
    const { user } = useSelector(state => state.profile);
    const navigate = useNavigate();
    return (
        <div>
            <h1 className="text-3xl mb-14 text-richblack-5 font-medium">
                My Profile
            </h1>
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex items-center gap-x-4">
                    <img src={user?.image}
                        alt={`Profile photo - ${user?.firstName}`}
                        className="w-[78px] rounded-full object-cover"
                    />
                    <div className="space-y-1">
                        <p className="text-lg font-semibold text-richblack-5">
                            {`${user?.firstName} ${user?.lastName}`}
                        </p>
                        <p className="text-sm text-richblack-300">
                            {`${user?.email}`}
                        </p>
                    </div>
                </div>
                <IconBtn
                    text="Edit"
                    onclick={() => {
                        navigate("/dashboard/settings");
                    }}>
                    <RiEditBoxLine />
                </IconBtn>
            </div>
            <div className="bg-richblack-800 p-8 px-12 border-[1px] border-richblack-700 rounded-md flex flex-col my-10 gap-y-10">
                <div className="w-full flex items-center justify-between">
                    <p className="text-lg text-richblack-5 font-semibold">
                        About
                    </p>
                    <IconBtn
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings");
                        }}>
                        <RiEditBoxLine />
                    </IconBtn>
                </div>
                <div
                    className={`${user?.additionalDetails?.about ?
                        "text-richblack-5" : "text-richblack-300"
                        } text-sm font-semibold`}>
                    {user?.additionalDetails?.about ?? "Writing something about yourself"}
                </div>
            </div>
            <div className="flex flex-col my-10 gap-y-10 p-8 px-12 bg-richblack-800 border-[1px] rounded-md border-richblack-700">
                <div className="w-full flex items-center justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                        Personal Details
                    </p>
                    <IconBtn
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings");
                        }}>
                        <RiEditBoxLine />
                    </IconBtn>
                </div>
                <div className="flex max-w-[500px] justify-between">
                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">First Name</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.firstName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Email</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.email}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Gender</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.additionalDetails?.gender ?? "Add Gender"}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.lastName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
                            <p className="text-sm font-medium text-richblack-5">
                                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                                    "Add Date Of Birth"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;