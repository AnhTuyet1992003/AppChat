import React, {useEffect, useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPeopleChatMes, initializeSocket, reLoginUser } from "../../../../socket/socket";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is included
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Ensure Bootstrap JS is included

function ChatContent() {
    const login = useSelector((state) => state.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { name } = useParams();
    const messages = useSelector((state) => state.messages?.data);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        if (!login.status) {
            if (localStorage.getItem("reLogin") !== null) {
                // Reconnect socket
                initializeSocket('ws://140.238.54.136:8080/chat/chat');
                reLoginUser(localStorage.getItem("username"), localStorage.getItem("reLogin"));
            } else {
                navigate("/login");
            }
        }
    }, [dispatch, navigate, login]);

    useEffect(() => {
        if (name) {
            // lay danh sach tin nhan theo ten da chon trong danh sach ban be/ group
            getPeopleChatMes(name);
        }
    }, [name]);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    // Sap xep tin nhan theo ngay gio gui
    const sortedMessages = messages ? [...messages].sort((a, b) => new Date(a.createAt) - new Date(b.createAt)) : [];

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
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

    const formatDateSeparator = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        if (isToday) {
            return "hôm nay";
        }
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'Asia/Ho_Chi_Minh'
        }).format(date);
    };

    if (!name) {
        return <div className="chat-content hide-scrollbar h-100 d-flex justify-content-center align-items-center">
            <p className="text-muted">Chọn người bạn muốn nhắn để bắt đầu trò chuyện!</p>
        </div>
    }

    return (
        <div className="chat-content hide-scrollbar h-100">
            <div className="container-fluid g-0 p-4">
                {sortedMessages.map((message, index) => {
                    const showDateSeparator = index === 0 || new Date(sortedMessages[index].createAt).toDateString() !== new Date(sortedMessages[index - 1].createAt).toDateString();
                    return (
                        <React.Fragment key={index}>
                            {showDateSeparator && (
                                <div className="separator">
                                    <span className="separator-title fs-7 ls-1">
                                        {formatDateSeparator(message.createAt)}
                                    </span>
                                </div>
                            )}
                            <div
                                className={`message ${message.name === localStorage.getItem("username") ? "self" : ""}`}>
                                <div className="message-wrap">
                                    <div className="message-item">
                                        <div className="message-content">
                                            <span>
                                                {message.mes}
                                            </span>
                                        </div>
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
                                                    <a
                                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                                        href="#"
                                                    >
                                                        Edit
                                                        <i className="ri-edit-line"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                                        href="#"
                                                    >
                                                        Share
                                                        <i className="ri-share-line"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                                        href="#"
                                                    >
                                                        Delete
                                                        <i className="ri-delete-bin-line"/>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="message-info">
                                    <div className="avatar avatar-sm">
                                        <span className="avatar-label bg-soft-primary text-primary fs-6">
                                            {message.name.charAt(0)}
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
                        </React.Fragment>
                    );
                })}
                <div ref={messagesEndRef}/>
            </div>
        </div>
    );
}

export default ChatContent;
