import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Authentication.css';

const Register = () => {


    return (
        <div>
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Đăng ký</h2>
                            <form method="POST" className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="name"><FontAwesomeIcon style={{fontSize: '22px'}} icon={faUser} /></label>
                                    <input type="text" name="name" id="name" placeholder="Nhập username"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><FontAwesomeIcon style={{fontSize: '22px'}} icon={faEnvelope} /></label>
                                    <input type="email" name="email" id="email" placeholder="Nhập Email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><FontAwesomeIcon style={{fontSize: '22px'}} icon={faLock} /></label>
                                    <input type="password" name="pass" id="pass" placeholder="Nhập mật khẩu"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="re-pass"><FontAwesomeIcon style={{fontSize: '22px'}} icon={faLock} /></label>
                                    <input type="password" name="re_pass" id="re_pass"
                                           placeholder="Nhập lại mật khẩu"/>
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term"/>
                                    <label htmlFor="agree-term" className="label-agree-term"><span><span></span></span>
                                    Đồng ý với các điều khoản</label>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit"
                                           value="Register"/>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img width={400} height={500} src="/image/signup-image.jpg" alt="sing up image"/>
                            </figure>
                            <Link to="/Login" className="signup-image-link">Đã có tài khoản? Đăng nhập!</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;
