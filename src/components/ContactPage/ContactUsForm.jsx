import { useEffect, useState } from "react";
import { useFomr } from "react-hook-form";

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handelSubmit,
        reset,
        formState: { error, isSubmitSuccessful }
    } = useFomr();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(
                {
                    firstname: "",
                    lastname: "",
                    email: "",
                    phoneNo: "",
                    message: "",
                }
            )
        }
    },[reset,isSubmitSuccessful]);

    return (
        <form action="">
            <div>
                
            </div>
        </form>
    )
}