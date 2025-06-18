import Template from "../components/core/Auth/Template";
import image from "../assets/Images/login.webp"

const Login = () => {
    return(
        <Template
        title = "Welcom back"
        description= "Build skills for today, tomorrow and beyond."
        description2= "Education to future-proof you carrer."
        image={image}
        formType="login"
        />
    )
}

export default Login;