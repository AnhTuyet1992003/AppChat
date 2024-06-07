import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Authentication.css';
import {initializeSocket, loginUser, reLoginUser, socketActions} from "../../socket/socket";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const loginStatus = useSelector((state) => state.login.status);
    const navigate = useNavigate();
    useEffect(() => {
        initializeSocket('ws://140.238.54.136:8080/chat/chat');
    }, []);
    // đăng nhập
    useEffect(() => {
        if (loginStatus === "success") {
            if (localStorage.getItem("user") === null) {
                //lưu vào user vào localStorage
                localStorage.setItem("user", username);
            }
            //đăng nhập thành công chuyển hướng đến trang home
            navigate('/Home');
        } else if (loginStatus === "error") {
            setError("Tên đăng nhập hoặc mật khẩu không chính xác");
        }
    }, [loginStatus, navigate]);

    //duy trì đăng nhập
    useEffect(() => {
        if (localStorage.getItem("reLogin") !== null && loginStatus !== 'success') {
            // kêt nối lại socket
            initializeSocket('ws://140.238.54.136:8080/chat/chat');
            reLoginUser(localStorage.getItem("user"), localStorage.getItem("reLogin"));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Vui lòng nhập tên đăng nhập và mật khẩu");
            return;
        }
        setError("");
        loginUser(username, password);
    };

    return (
        <div>
            <section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img src="/image/signin-image.jpg" alt="sign up image" width={400} height={500}/></figure>
                            <Link to="/Register" className="signup-image-link"><FontAwesomeIcon style={{fontSize: '22px'}} icon={faUser} />  Tạo tài khoản</Link>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Đăng nhập</h2>
                            {error && <p style={{color: 'red'}}>{error}</p>}
                            <form method="POST" className="register-form" id="login-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="your_username"><FontAwesomeIcon style={{fontSize: '22px'}} icon={faUser} /></label>
                                    <input
                                        type="username"
                                        name="your_username"
                                        id="your_username"
                                        placeholder="Username của bạn"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        style={{fontFamily: 'Courier New'}}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass"><FontAwesomeIcon style={{fontSize: '22px'}} icon={faLock} /></label>
                                    <input
                                        type="password"
                                        name="your_pass"
                                        id="your_pass"
                                        placeholder="Mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{fontFamily: 'Courier New'}}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me"
                                           className="agree-term visually-hidden"/>
                                    <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Ghi nhớ tài khoản</label>
                                </div>

                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit"
                                           value="Log in"/>
                                </div>
                            </form>
                            <div className="social-login">
                                <span className="social-label">Or login with</span>
                                <ul className="socials">
                                    <li><a href="#"><i
                                        className="display-flex-center zmdi zmdi-facebook"><FontAwesomeIcon icon={faFacebookF} style={{ fontSize: '16px' }} /></i></a>
                                    </li>
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"><FontAwesomeIcon icon={faTwitter} style={{ fontSize: '16px' }} /></i></a></li>
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-google"><FontAwesomeIcon icon={faGoogle} style={{ fontSize: '16px' }} /></i></a></li>
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
