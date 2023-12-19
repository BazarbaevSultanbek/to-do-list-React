import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Users } from '../Utils.js';
import './login.scss';
import login_Photo from '../images/login.jpg';

function Login() {
    const users = new Users().usersFromLocalStorage();
    const [showPassword, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const navigate = useNavigate();


    const onSubmit = () => {
        const user = users.find((user) => user.email === email && user.password === password);
        if (user) {
            alert(`Welcome ${user.username}`);
            const currentUserInfo = {
                username: user.username,
                email: email,
                password: password,
                id: user.id,
                photo: user.photo,
                isAdmin: user.isAdmin,
            };
            localStorage.setItem('CurrentUser', JSON.stringify(currentUserInfo));
            navigate('/Main');

        } else {
            alert('Your password or email is wrong!');
        }
    };

    return (
        <div className="Login">
            <div className="container">
                <div className="Login-block">
                    <div className="Login-block-navi">
                        <div className="Login-block-navi-logo">
                            <span>ToDo</span>
                            <span>List</span>
                        </div>
                        <h1 className="Login-block-navi-text">Welcome Back, Please login to your account</h1>
                        <div className="Login-block-navi-social">
                            <a href="https://www.facebook.com">
                                <button id="facebook">
                                    <i className="fa-brands fa-facebook"></i>
                                    <span>Login with Facebook</span>
                                </button>
                            </a>
                            <a href="https://www.google.com">
                                <button id="google">
                                    <i className="fa-brands fa-google"></i>
                                    <span>Login with Google</span>
                                </button>
                            </a>
                        </div>
                        <h2 className="little-text">-OR-</h2>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="Login-block-navi-inner">
                                <div className="Login-navi-inner-email">
                                    <p>Email/Address</p>
                                    <input
                                        type="text"
                                        name="email"
                                        {...register('email', {
                                            required: { value: true, message: 'Email is required field' },
                                            pattern: {
                                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                message: 'Invalid email format',
                                            },
                                        })}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="off"
                                    />
                                    <h4 className="error">{errors.email?.message}</h4>
                                </div>
                                <div className="Login-navi-inner-pass">
                                    <p>Password</p>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        {...register('password', {
                                            required: { value: true, message: 'Password is required field' },
                                        })}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="off"
                                    />
                                    <h4 className="error">{errors.password?.message}</h4>
                                </div>
                                <div className="Login-navi-inner-forget">
                                    <div className="show-pass">
                                        <input type="checkbox" id="check" onClick={() => setShow((prev) => !prev)} />
                                        <label htmlFor="check" className="check-box">
                                            <span>Show Password</span>
                                        </label>
                                    </div>
                                    <a href="#">Forget password?</a>
                                </div>
                                <div className="Login-navi-inner-btn">
                                    <button id="login-btn" type="submit">
                                        Login
                                    </button>
                                    <Link to="/SignUp">
                                        <button type="button" id="sign-btn">
                                            Sign up
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                        <div className="Login-block-navi-bottom">
                            <p>By signing up, you agree List's </p>
                            <a href="#">Terms and Conditions <span>&</span> Privacy Policy</a>
                        </div>
                    </div>
                    <div className="Login-block-img">
                        <img src={login_Photo} alt="login_door" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
