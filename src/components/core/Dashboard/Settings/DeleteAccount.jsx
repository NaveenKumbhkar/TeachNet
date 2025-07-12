import { FiTrash2 } from "react-icons/fi";
import { deleteAccount } from "../../../../services/operations/settingsAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const DeleteAccount = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);

    const handelDeleteAccount = () => {
        try{
            dispatch(deleteAccount(token , navigate));
        }
        catch(error){
            console.log("Error message = ",error.message);
        }
    }

    return(
        <div className="bg-pink-900 my-10 flex flex-row p-8 px-12 border-[1px] gap-x-5 border-pink-700 rounded-md">
            <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
                <FiTrash2 className="text-3xl text-pink-200"/>
            </div>
            <div className="flex flex-col gap-y-2">
                <h1 className="text-lg font-semibold text-richblack-5">
                    Delete Account
                </h1>
                <div className="w-3/5 text-pink-25">
                    <p>
                        Would you like to delete account?
                    </p>
                    <p>
                        This account may contain Paid Courses. Deleting your account is
                        permanent and will remove all the contain associated with it.
                    </p>
                    <button
                        type="button"
                        onClick={handelDeleteAccount}
                        className="text-pink-300 w-fit italic cursor-pointer">
                        I want to delete my account.
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccount;