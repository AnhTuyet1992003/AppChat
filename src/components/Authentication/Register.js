import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { register } from '../../redux/action/action';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [agree, setAgree] = useState(false);
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');
    const [accountExists, setAccountExists] = useState(false);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(password);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !email || !password || !rePassword || !agree || !gender) {
            setError('Vui lòng nhập đủ thông tin và chọn đồng ý với các điều khoản.');
            return;
        }

        if (password !== rePassword) {
            setError('Mật khẩu không khớp.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ cái, số và ký tự đặc biệt.');
            return;
        }

        const socket = new WebSocket('ws://140.238.54.136:8080/chat/chat');
        socket.onopen = () => {
            register(socket, username, password);
        };

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.event === 'REGISTER' && response.status === 'success') {
                navigate('/Login');
            } else if (response.event === 'REGISTER' && response.status === 'error') {
                setAccountExists(true);
                setError(response.message);
            }
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            socket.close();
        };
    };

    return (
        <div>
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Đăng ký</h2>
                            {accountExists && <p style={{ color: 'red' }}>Tài khoản đã tồn tại.</p>}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <form method="POST" className="register-form" id="register-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <FontAwesomeIcon style={{fontSize: '22px'}} icon={faUser}/>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Nhập username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <FontAwesomeIcon style={{fontSize: '22px'}} icon={faEnvelope}/>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Nhập Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass">
                                        <FontAwesomeIcon style={{fontSize: '22px'}} icon={faLock}/>
                                    </label>
                                    <input
                                        type="password"
                                        name="pass"
                                        id="pass"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="re-pass">
                                        <FontAwesomeIcon style={{fontSize: '22px'}} icon={faLock}/>
                                    </label>
                                    <input
                                        type="password"
                                        name="re_pass"
                                        id="re_pass"
                                        placeholder="Nhập lại mật khẩu"
                                        value={rePassword}
                                        onChange={(e) => setRePassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                                    <label className="mr-3">Giới tính: </label>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="radio"
                                            id="male"
                                            name="gender"
                                            value="male"
                                            checked={gender === 'male'}
                                            onChange={(e) => setGender(e.target.value)}
                                            style={{ marginLeft: '100px' }}
                                        />
                                        <span>Nam</span>

                                        <input
                                            type="radio"
                                            id="female"
                                            name="gender"
                                            value="female"
                                            checked={gender === 'female'}
                                            onChange={(e) => setGender(e.target.value)}
                                            style={{ marginLeft: '50px' }}
                                        />
                                        <span >Nữ</span>

                                        <input
                                            type="radio"
                                            id="other"
                                            name="gender"
                                            value="other"
                                            checked={gender === 'other'}
                                            onChange={(e) => setGender(e.target.value)}
                                            style={{ marginLeft: '50px' }}
                                        />
                                        <span>Khác</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="checkbox"
                                        name="agree-term"
                                        id="agree-term"
                                        className="agree-term"
                                        checked={agree}
                                        onChange={(e) => setAgree(e.target.checked)}
                                    />
                                    <label htmlFor="agree-term" className="label-agree-term">
                                        <span><span></span></span> Đồng ý với các điều khoản
                                    </label>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit"
                                           value="Đăng ký"/>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure>
                                <img width={400} height={500} src="/image/signup-image.jpg" alt="sing up image"/>
                            </figure>
                            <Link to="/Login" className="signup-image-link">
                                Đã có tài khoản? Đăng nhập!
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;
