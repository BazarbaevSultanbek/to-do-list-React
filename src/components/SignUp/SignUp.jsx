import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Users } from '../Utils.js';
import { useNavigate, Link } from 'react-router-dom';
import './signUp.scss';
import sign_photo from '../images/signup.jpg';
import { DevTool } from '@hookform/devtools';



const SignUp = () => {
    const [showPassword, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register, handleSubmit, formState, control } = useForm();
    const { errors } = formState;
    const users = new Users().usersFromLocalStorage();
    const navigate = useNavigate()


    const onSubmit = () => {

        if (email.length !== 0 && users.find((user) => user.email === email)) {
            alert('You have already registered!');
        } else {
            let newUser = {
                username: name,
                email: email,
                password: password,
                id: Math.floor(Math.random() * 1000000),
                isAdmin: false,
            }
            localStorage.setItem('CurrentUser', JSON.stringify(newUser))
            new Users().addUser(newUser)
            navigate('/Main')
        }    
    }

    return (
        <div className="sign">
            <div className="container">
                <div className="sign-block">
                    <div className="sign-block-img">
                        <div className="sign-block-img-logo">
                            <span>ToDo</span>
                            <span>List</span>
                        </div>
                        <div className="sign-block-img-photo">
                            <img src={sign_photo} alt="signup_photo" />
                        </div>
                    </div>
                    <div className="sign-block-nav">
                        <h1 className="sign-block-navi-text">Welcome, Create your account</h1>
                        <div className="sign-block-navi-social">
                            <a href="#"><button id="facebook" type="button"><i className="fa-brands fa-facebook"></i><span>Sign up with Facebook</span></button></a>
                            <a href="#"><button id="google" type="button"><i className="fa-brands fa-google"></i><span>Sign up with Google</span></button></a>
                        </div>
                        <h2 className="sign-little-text">-OR-</h2>
                        <form className="sign-block-navi-inner" onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="sign-navi-inner-username">
                                <p>Name</p>
                                <input type="text" name="name"
                                    {...register('name', {
                                        required: { value: true, message: 'Name is required' },
                                    })} autoComplete="off" onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <h4 className="sign-error" style={{ display: errors.name?.message ? 'block' : 'none' }}>
                                {errors.name?.message}
                            </h4>
                            <div className="sign-navi-inner-email">
                                <p>Email/Address</p>
                                <input type="text" name="email"
                                    {...register('email', {
                                        required: { value: true, message: 'Email is required field' },
                                        pattern: {
                                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                            message: 'Invalid email format',
                                        },
                                    })} autoComplete="off" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <h4 className="sign-error" style={{ display: errors.email?.message ? 'block' : 'none' }}>{errors.email?.message}</h4>
                            <div className="sign-navi-inner-pass">
                                <p>Password</p>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    {...register('password', {
                                        required: { value: true, message: 'Password is required' },
                                    })}
                                    autoComplete="off"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <h4 className="sign-error" style={{ display: errors.password?.message ? 'block' : 'none' }}>{errors.password?.message}</h4>
                            <div className="show-pass">
                                <input type="checkbox" id="check" onClick={() => setShow((prev) => !prev)} />
                                <label htmlFor="check" className="check-box">
                                    <span>Show Password</span>
                                </label>
                            </div>
                            <div className="sign-navi-inner-btn">
                                <button id="signUp_btn" type='submit'>Get Started</button>
                            </div>
                        </form>
                        <DevTool control={control} />
                        <div className="sign-block-navi-login">
                            <p>Already have an account? <Link to="/"> Login here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
