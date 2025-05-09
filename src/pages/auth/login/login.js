import { useEffect, useState } from 'react';
import '../../../assets/styles/register.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/auth.service';
import Logo from '../../../components/utils/Logo';

function Login() {

    const navigate = useNavigate();

    useEffect(() => {
        if (AuthService.getCurrentUser()) {
            navigate("/user/dashboard");
        } else if (AuthService.getCurrentUser()) {
            navigate("/admin/transactions");
        }
    }, [])


    const { register, handleSubmit, formState } = useForm();

    const [response_error, setResponseError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true)
        await AuthService.login_req(data.email, data.password).then(
            () => {
                setResponseError("");
                navigate("/user/dashboard");
                localStorage.setItem("message", JSON.stringify({ status: "SUCCESS", text: "Login successfull!" }))
            },
            (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                console.log(resMessage);
                if (resMessage === "Bad credentials") {
                    setResponseError("Invalid email or password!");
                } else {
                    setResponseError("Something went wrong: Try again later!");
                }
            }
        );
        setIsLoading(false);
    }

    return (
        <div className='container'>
            <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                <Logo />
                <h2>Login</h2>
                {
                    (response_error !== "") && <p>{response_error}</p>
                }

                <div className='input-box'>
                    <label>Email</label><br />
                    <input
                        type='text'
                        {...register('email', {
                            required: "Email is required!",
                            pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Invalid email address!" }
                        })}
                    />
                    {formState.errors.email && <small>{formState.errors.email.message}</small>}
                </div>

                <div className='input-box'>
                    <label>Password</label><br />
                    <input
                        type='password'
                        {
                        ...register('password', {
                            required: 'Password is required!'
                        })
                        }
                    />
                    {formState.errors.password && <small>{formState.errors.password.message}</small>}
                </div>

                <div className='input-box'>
                    <input type='submit' value={isLoading ? "Logging in..." : 'Login'}
                        className={isLoading ? "button button-fill loading" : "button button-fill"}
                    />
                </div>
            </form>
        </div>
    )
}

export default Login;