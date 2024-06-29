import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Authentication.css';
import { initializeSocket, loginUser, reLoginUser } from "../../socket/socket";
import $ from 'jquery';
import { resetStatus } from "../../redux/action/action";
import { getDatabase, ref, get, set, query, orderByChild, equalTo } from "firebase/database";
import { database } from "../../firebase"; // Import Firebase config

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const loginStatus = useSelector((state) => state.login.status);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const dbRef = ref(getDatabase());
        setError("");
        initializeSocket('ws://140.238.54.136:8080/chat/chat');
        $('.modal-backdrop').remove();
        $('body').removeClass('modal-open');
        $('body').css('padding-right', '');
    }, []);

    useEffect(() => {
        if (loginStatus === "success") {
            setError("");
            if (localStorage.getItem("username") === null) {
                localStorage.setItem("username", username);
            }
            navigate('/Home');
        } else if (loginStatus === "error") {
            localStorage.removeItem("reLogin");
            localStorage.removeItem("username");
            setError("Tên đăng nhập hoặc mật khẩu không chính xác");
        }
    }, [loginStatus, navigate]);

    useEffect(() => {
        if (localStorage.getItem("reLogin") !== null && loginStatus !== 'success') {
            initializeSocket('ws://140.238.54.136:8080/chat/chat');
            reLoginUser(localStorage.getItem("username"), localStorage.getItem("reLogin"));
        }
    }, [loginStatus]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Vui lòng nhập tên đăng nhập và mật khẩu");
            return;
        }
        setError("");
        dispatch(resetStatus());
        loginUser(username, password);

        const db = getDatabase();
        const usersRef = ref(db, 'users');
        const userQuery = query(usersRef, orderByChild('username'), equalTo(username));
        const snapshot = await get(userQuery);

        if (snapshot.exists()) {
            const userData = snapshot.val();
            const userKey = Object.keys(userData)[0]; // Assuming username is unique
            const existingUser = userData[userKey];

            if (existingUser.password === password) {
                console.log('User already exists with correct password');
                return;
            }
        } else {
            // Save new user
            const newUserId = Date.now(); // Use a timestamp as a unique ID
            set(ref(db, `users/${newUserId}`), {
                id: newUserId,
                username: username,
                password: password
            }).then(() => {
                console.log('User saved successfully');
            }).catch((error) => {
                console.error('Error saving user: ', error);
            });
        }
    };

    return (
        <div>
            <section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img src="/image/signin-image.jpg" alt="sign up image" width={400} height={500} /></figure>
                            <Link to="/Register" className="signup-image-link">
                                <FontAwesomeIcon style={{ fontSize: '22px' }} icon={faUser} /> Tạo tài khoản
                            </Link>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Đăng nhập</h2>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <form method="POST" className="register-form" id="login-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="your_username">
                                        <FontAwesomeIcon style={{ fontSize: '22px' }} icon={faUser} />
                                    </label>
                                    <input
                                        type="text"
                                        name="your_username"
                                        id="your_username"
                                        placeholder="Username của bạn"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        style={{ fontFamily: 'Courier New' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass">
                                        <FontAwesomeIcon style={{ fontSize: '22px' }} icon={faLock} />
                                    </label>
                                    <input
                                        type="password"
                                        name="your_pass"
                                        id="your_pass"
                                        placeholder="Mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ fontFamily: 'Courier New' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me" className="agree-term visually-hidden" />
                                    <label htmlFor="remember-me" className="label-agree-term">
                                        <span><span></span></span>Ghi nhớ tài khoản
                                    </label>
                                </div>

                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Login" />
                                </div>
                            </form>
                            <div className="social-login">
                                <span className="social-label">Or login with</span>
                                <ul className="socials">
                                    <li>
                                        <a href="#"><i className="display-flex-center zmdi zmdi-facebook">
                                            <FontAwesomeIcon icon={faFacebookF} style={{ fontSize: '16px' }} />
                                        </i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="display-flex-center zmdi zmdi-twitter">
                                            <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '16px' }} />
                                        </i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="display-flex-center zmdi zmdi-google">
                                            <FontAwesomeIcon icon={faGoogle} style={{ fontSize: '16px' }} />
                                        </i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
