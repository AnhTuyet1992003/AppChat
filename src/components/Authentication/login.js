import React, { useState } from "react";
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

const Login = () => {


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
                            <form method="POST" className="register-form" id="login-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="your_email"><FontAwesomeIcon style={{fontSize: '22px'}} icon={faUser} /></label>
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
                            {error && <p style={{color: 'red'}}>{error}</p>}
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
