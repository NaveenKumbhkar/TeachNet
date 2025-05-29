import React from "react";
import framImage from "../../../assets/Images/framImage"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
const Template = ({title,description,description2,image,formType}) => {
    return(
        <div>
            <div>
                <div>
                    <h1>{title}</h1>
                    <p>
                       <span>{description}</span>
                       <span>{description2}</span>
                    </p>
                    {
                        formType === "login" ?
                        (<LoginForm/>) :
                        (<SignUpForm/>)
                    }
                </div>
                <div>
                    <img src={framImage} alt="Pattern" width={500} height={500} loading="lazy" />
                    <img src={image} alt="Student" width={500} height={500} loading="lazy" />
                </div>
            </div>
        </div>
    )
}

export default Template;