import { FiTrash2 } from "react-icons/fi";
import { deleteAccount } from "../../../../services/operations/settingsAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ConfirmationModal from "../../../Comman/ConfirmationModal";


const DeleteAccount = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handelDeleteAccount = () => {
        try{setConfirmationModal({
                                        text1: "Are you sure you want to delete your account?",
                                        text2: "This action cannot be undone. All your data, including your courses, progress, and personal information, will be permanently deleted.",
                                        btn1Text: "Delete Account",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => dispatch(deleteAccount(token , navigate)),
                                        btn2Handler: () => setConfirmationModal(null),
                                    })
            //dispatch(deleteAccount(token , navigate));
        }
        catch(error){
            console.log("Error message = ",error.message);
        }
    }

    return(
        <div className="bg-pink-900 my-10 flex flex-col md:flex-row p-8 px-4 md:px-12 border-[1px] gap-5 border-pink-700 rounded-md">
            <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
                <FiTrash2 className="text-3xl text-pink-200"/>
            </div>
            <div className="flex flex-col gap-y-2">
                <h1 className="text-lg font-semibold text-richblack-5">
                    Delete Account
                </h1>
                <div className="md:w-3/5 text-pink-25">
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
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default DeleteAccount;