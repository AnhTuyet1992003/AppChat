import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { register } from '../../socket/socket';
import { useDispatch, useSelector } from "react-redux";
import { resetStatus } from "../../redux/action/action";
import { getDatabase, ref, set, get, query, orderByChild, equalTo } from "firebase/database";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Add showPassword state
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registerStatus = useSelector((state) => state.register.status);
    const [agree, setAgree] = useState(false);

    useEffect(() => {
        if (registerStatus === "success") {
            setError("");
            saveUserToFirebase();
            navigate('/Login');
            dispatch(resetStatus());
        } else if (registerStatus === "error") {
            setError("Tài khoản đã tồn tại");
        }
    }, [registerStatus, navigate, dispatch]);

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password || !agree) {
            setError('Vui lòng nhập đầy đủ thông tin và chọn đồng ý');
            return;
        }
        if (!validatePassword(password)) {
            setError('Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ cái, số và ký tự đặc biệt.');
            return;
        }

        register(username, password);
    };

    const saveUserToFirebase = async () => {
        const db = getDatabase();
        const usersRef = ref(db, 'users');
        const userQuery = query(usersRef, orderByChild('username'), equalTo(username));
        const snapshot = await get(userQuery);

        if (!snapshot.exists()) {
            // Get the highest existing userId
            const allUsersSnapshot = await get(usersRef);
            let newUserId = 1;
            if (allUsersSnapshot.exists()) {
                const users = allUsersSnapshot.val();
                const userIds = Object.keys(users).map(id => parseInt(id, 10));
                newUserId = Math.max(...userIds) + 1;
            }

            // Save new user
            set(ref(db, `users/${newUserId}`), {
                id: newUserId,
                username: username,
                password: password // Consider hashing the password before storing it
            }).then(() => {
                console.log('User saved successfully');
            }).catch((error) => {
                console.error('Error saving user: ', error);
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Đăng ký</h2>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <form method="POST" className="register-form" id="register-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <FontAwesomeIcon icon={faUser}/>
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
                                    <label htmlFor="pass">
                                        <FontAwesomeIcon icon={faLock}/>
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"} // Toggle password visibility
                                        name="pass"
                                        id="pass"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        className="password-icon"
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            cursor: 'pointer',
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)'
                                        }}
                                    />
                                </div>
                                <div className="form-group" style={{marginTop: '-10px'}}>
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
