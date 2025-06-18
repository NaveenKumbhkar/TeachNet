import Template from "../components/core/Auth/Template";
import image from "../assets/Images/signup.webp"

const Signup = () => {
    return(
        <Template
        title = "Join the millions learning to code with TeachNet for free"
        description= "Build skills for today, tomorrow and beyond."
        description2= "Education to future-proof you carrer."
        image={image}
        formType="signup"
        />
    )
}

export default Signup;