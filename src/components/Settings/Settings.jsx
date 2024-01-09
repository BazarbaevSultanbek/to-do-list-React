import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Users, CurrentUser } from "../Utils";
import "./Settings.scss";

function Settings({ background, setBackground }) {
    const [showModule, setShowModule] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { register, formState, handleSubmit, setValue, getValues } = useForm();
    const { errors } = formState;
    const currentUser = new CurrentUser().CurrentUserFromLocalStorage();
    const users = new Users().usersFromLocalStorage();

    const Cancel = () => {
        setShowModule(false);
        setValue("username", "");
        setValue("email", "");
        setValue("password", "");
    };

    const EditUser = () => {
        const { photo, username, email, password } = getValues();
        const updateProfile = {
            photo: photo,
            username: username,
            email: email,
            password: password,
            isAdmin: currentUser.isAdmin,
            id: currentUser.id,
        };

        const updatedUsers = users.map((item) => {
            if (item.id === currentUser.id) {
                return updateProfile;
            }
            return item;
        });

        if (password.legth >0) {
            localStorage.setItem("CurrentUser", JSON.stringify(updateProfile));
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            setShowModule(false);
        }
    };

    useEffect(() => {
        if (currentUser) {
            setValue("username", currentUser.username);
            setValue("email", currentUser.email);
            setValue("password", currentUser.password);
        } else {
            setValue("username", "");
            setValue("email", "");
            setValue("password", "");
        }
    }, [currentUser, setValue]);

    return (
        <div className="Settings">
            <div className="Settings-container">
                <div className="Settings-logo"><h1>Settings</h1></div>
                <div className="Settings-block">
                    <div className="Settings-block-profile">
                        <div><i className="fa-solid fa-user"></i><span>Profile</span>
                        </div>
                        <button onClick={() => setShowModule(true)}><i className="fa-solid fa-pen"></i></button>
                    </div>
                    <div className="Settings-block-theme">
                        <div><i className="fa-solid fa-palette"></i><span>Theme</span></div>
                        <select name="color" id="color" onChange={(e) => setBackground(e.target.value)} value={background}>
                            <option value="rgb(255, 107, 107, 0.3)" style={{ backgroundColor: "rgb(255, 107, 107, 0.3)" }}>Red</option>
                            <option value="white" style={{ backgroundColor: "white" }}>White</option>
                            <option value="rgb(140, 233, 154 ,0.7)" style={{ backgroundColor: "rgb(140, 233, 154 ,0.7)" }}>Green</option>
                            <option value="rgb(241, 91, 181, 0.3)" style={{ backgroundColor: "rgb(241, 91, 181, 0.3)" }}>Pink</option>
                            <option value="rgb(218, 119, 242, 0.4)" style={{ backgroundColor: "rgb(218, 119, 242, 0.4)" }}>Purple</option>
                            <option value="grey" style={{ backgroundColor: "grey" }}>Grey</option>
                            <option value="rgb(208, 167, 97, 0.5)" style={{ backgroundColor: "rgb(208, 167, 97, 0.5)" }}>Brown</option>
                        </select>
                    </div>
                    <div className="Settings-block-donate">
                        <i className="fa-solid fa-heart"></i>
                        <span>Donate</span>
                    </div>
                    <div className="Settings-block-share">
                        <i className="fa-solid fa-share-nodes"></i>
                        <span>Share Website</span>
                    </div>
                    <div className="Settings-block-feedback">
                        <i className="fa-solid fa-comments"></i>
                        <span>Feedback</span>
                    </div>
                    <div className="Settings-block-privacy">
                        <i className="fa-solid fa-shield"></i>
                        <span>Privacy Policy</span>
                    </div>
                    <div className="Settings-module" style={{ display: showModule ? "block" : "none" }}>
                        <div className="Settings-module-block">
                            <form className="Settings-module-inner" onSubmit={handleSubmit(EditUser)} noValidate>
                                <div className="Settings-module-inner-navi"><h4>Profile</h4><div>
                                    <label htmlFor="username"><i className="fa-solid fa-user"></i>Name</label>
                                    <input type="text" id="username" autoComplete="off" onChange={(e) => setValue("username", e.target.value)}
                                        {...register("username", {
                                            required: { value: true, message: "Name is required" },
                                        })} />
                                </div>
                                    <p className="profile-error">{errors.username?.message}</p>
                                    <div>
                                        <label htmlFor="email"><i className="fa-solid fa-envelope"></i>Email</label>
                                        <input type="text" id="email" autoComplete="off" onChange={(e) => setValue("email", e.target.value)}
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: "Email is required field",
                                                },
                                                pattern: {
                                                    value:
                                                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                    message: "Invalid email format",
                                                },
                                            })}
                                        />
                                    </div>
                                    <p className="profile-error">{errors.email?.message}</p>

                                    <div className="profile-pass">
                                        <label htmlFor="password">
                                            <i className={showPassword ? "fa-solid fa-unlock" : "fa-solid fa-lock"}></i>Password</label>
                                        <input type={showPassword ? "text" : "password"} id="password" onChange={(e) => setValue("password", e.target.value)} autoComplete="off"
                                            {...register("password", {
                                                required: {
                                                    value: true,
                                                    message: "Password is required",
                                                },
                                            })} />
                                        <label htmlFor="password" onClick={() => setShowPassword((prev) => !prev)} id="profile-pass-log">
                                            <i className={showPassword ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"} style={{ color: "#b5b5b5" }}></i>
                                        </label>
                                    </div>
                                    <p className="profile-error">{errors.password?.message}</p>
                                    <div className="btn-class">
                                        <button type="button" className="btn btn-outline-primary" id="cancel_btn" onClick={() => Cancel()}>Cancel changes</button>
                                        <button className="btn btn-outline-primary" id="save_btn" onClick={() => EditUser()}>Save changes</button>
                                    </div>
                                </div>
                            </form>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
