import React, { useState } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "example@example.com" && password === "password"){
            // Dang nhap thanh cong
            console.log("Dang nhap thanh cong");
            setError(""); // Xoa thong bao neu co
        } else {
            setError("Email hoac mat khau khong dung"); // Thong bao loi
        }
    };

    return (
        <div>
            <section className="sign-in">
                <div className="container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img src="/image/signin-image.jpg" alt="sign up image" width={400} height={500}/></figure>
                            <Link to="/Register" className="signup-image-link">Tạo tài khoản</Link>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="login-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="your_email"><i
                                        className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input
                                        type="email"
                                        name="your_email"
                                        id="your_email"
                                        placeholder="Email của bạn"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{fontFamily: 'Courier New'}}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input
                                        type="password"
                                        name="your_pass"
                                        id="your_pass"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{fontFamily: 'Courier New'}}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me"
                                           className="agree-term visually-hidden"/>
                                    <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember
                                        me</label>
                                </div>

                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit"
                                           value="Log in"/>
                                </div>
                            </form>
                            {error && <p style={{color: 'red'}}>{error}</p>}
                            <div className="social-login">
                                <span className="social-label">Or login with</span>
                                <ul className="socials">
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
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
