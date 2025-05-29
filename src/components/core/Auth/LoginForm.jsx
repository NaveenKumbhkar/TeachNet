
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";


const LoginForm = () => {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData , setFormData] = useState({
        email:"",
        password:""
    })

    const {email,password} = formData;

    function handlerOnChange(event){
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name] : event.target.value
        }))
    }

    function handleOnSubmit (event) {
        event.preventDefault();
        dispatch(login(email,password,Navigate));
    }
    return(
        <div>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="">
                    <p>Email Address <span>*</span></p>
                    <input 
                    type="email"
                    name="email"
                    value={email}
                    required
                    onChange={handlerOnChange}
                    placeholder="Enter email address" 
                    />
                </label>
                
                <label htmlFor="">
                    <p>Password <span>*</span></p>
                    <input 
                    type="password"
                    name="password"
                    value={password}
                    required
                    onChange={handlerOnChange}
                    placeholder="Enter password" 
                    />
                    <span onClick={(() => setShowPassword((prev) => !prev))}>
                        {
                            showPassword ? (<AiOutlineEye/>) : (<AiOutlineEyeInvisible/>)
                        }
                    </span>
                    <Link to="forget-password">
                        <p>Forget password</p>
                    </Link>
                </label>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;