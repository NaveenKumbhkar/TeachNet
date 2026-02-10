
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount"

const SettingsComp = () => {
    return(
        <div>
            <h1 className="mb-14 text-3xl text-richblack-5 font-medium">
                Edit Profile
            </h1>
            <ChangeProfilePicture/>
            <EditProfile/>
            <UpdatePassword/>
            <DeleteAccount/>
        </div>
    )
}

export default SettingsComp;