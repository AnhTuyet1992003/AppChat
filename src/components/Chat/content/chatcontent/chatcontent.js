import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { initializeSocket, reLoginUser } from "../../../../socket/socket";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { database, query, ref, orderByChild, equalTo, onValue } from "../../../../firebase";
import { addNewMessage } from "../../../../redux/action/action";
import { decode } from "../../../../utill/convert-text";
import '../../../Chat/content/chatfooter/style.css'; // Đường dẫn tới file CSS đã thiết lập

function ChatContent() {
    const login = useSelector((state) => state.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { name } = useParams();
    const messages = useSelector(state => state.messages?.data);
    const messagesEndRef = useRef(null);
    const username = localStorage.getItem("username");

    useEffect(() => {
        if (!login.status) {
            if (localStorage.getItem("reLogin") !== null) {
                initializeSocket('ws://140.238.54.136:8080/chat/chat');
                reLoginUser(username, localStorage.getItem("reLogin"));
            } else {
                navigate("/login");
            }
        }
    }, [dispatch, navigate, login, username]);

    useEffect(() => {
        if (name && username) {
            const messagesRef = ref(database, 'messages');
            const userQuery = query(messagesRef, orderByChild('name'), equalTo(name));
            const toUserQuery = query(messagesRef, orderByChild('to'), equalTo(username));

            const handleValue = (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const messagesArray = Object.values(data).filter(message =>
                        (message.name === name && message.to === username) ||
                        (message.to === name && message.name === username)
                    );
                    dispatch(addNewMessage(messagesArray));
                }
            };

            const userUnsubscribe = onValue(userQuery, handleValue);
            const toUserUnsubscribe = onValue(toUserQuery, handleValue);

            return () => {
                userUnsubscribe();
                toUserUnsubscribe();
            };
        }
    }, [name, username, dispatch]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sortedMessages = messages ? messages.filter(message => message.mes && message.mes.trim() !== '').sort((a, b) => new Date(a.createAt) - new Date(b.createAt)) : [];

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
            return "";
        }
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'Asia/Ho_Chi_Minh',
            ...(isToday ? {} : { day: '2-digit', month: '2-digit', year: 'numeric' })
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date);
    };

    const renderMessageContent = (message) => {
        if (message.mes.startsWith('GIF:')) {
            const gif = message.mes.replace('GIF:', '');
            const gifUrl = decode(gif);
            return (
                <div className="message-gif">
                    <img src={gifUrl} alt="GIF" style={{ maxWidth: '200px', maxHeight: '450px' }} />
                </div>
            );
        } else {
            return (
                <div className="message-content">
                    <span>{decode(message.mes)}</span>
                </div>
            );
        }
    };

    if (!name) {
        return (
            <div className="chat-content hide-scrollbar h-100 d-flex justify-content-center align-items-center">
                <p className="text-muted">Chọn người bạn muốn nhắn để bắt đầu trò chuyện!</p>
            </div>
        );
    }

    return (
        <div className="chat-content hide-scrollbar h-100">
            <div className="container-fluid g-0 p-4 chat-content">
                {sortedMessages.map((message, index) => (
                    <div key={index} className={`message ${message.name === localStorage.getItem("username") ? "self" : ""}`}>
                        <div className="message-wrap">
                            <div className="message-item">
                                {renderMessageContent(message)}
                                <div className="dropdown align-self-center">
                                    <button
                                        aria-expanded="false"
                                        className="btn btn-icon btn-base btn-sm"
                                        data-bs-toggle="dropdown"
                                        type="button"
                                    >
                                        <i className="ri-more-2-fill"/>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item d-flex align-items-center justify-content-between" href="#">
                                                Edit
                                                <i className="ri-edit-line"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex align-items-center justify-content-between" href="#">
                                                Share
                                                <i className="ri-share-line"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex align-items-center justify-content-between" href="#">
                                                Delete
                                                <i className="ri-delete-bin-line"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="message-info">
                                <div className="avatar avatar-sm">
                                    <span className="avatar-label bg-soft-primary text-primary fs-6">
                                        {message.name ? message.name.charAt(0) : ""}
                                    </span>
                                </div>
                                <div>
                                    <h6 className="mb-0">
                                        {message.name}
                                    </h6>
                                    <small className="text-muted">
                                        {formatTimestamp(message.createAt)}
                                        <i className="ri-check-double-line align-bottom text-success fs-5"/>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef}/>
            </div>
        </div>
    );
}

export default ChatContent;
