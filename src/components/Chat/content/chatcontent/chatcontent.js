import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { initializeSocket, reLoginUser } from "../../../../socket/socket";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { database, query, ref, orderByChild, equalTo, onValue } from "../../../../firebase";
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
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // không hiển thị nếu đoạn tin nhắn rỗng
    const filteredMessages = messages ? messages.filter(message => message.mes && message.mes.trim() !== '') : [];
    // Sắp xếp tin nhắn theo ngày giờ gửi
    const sortedMessages = filteredMessages.sort((a, b) => new Date(a.createAt) - new Date(b.createAt));

    // const sortedMessages = messages ? messages.filter(message => message.mes && message.mes.trim() !== '').sort((a, b) => new Date(a.createAt) - new Date(b.createAt)) : [];

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

    const formatDateSeparator = (timestamp) => {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
            return ""; // Trả về chuỗi rỗng nếu timestamp không hợp lệ
        }
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        if (isToday) {
            return "Hôm nay";
        }
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'Asia/Ho_Chi_Minh'
        }).format(date);
    };

    const renderMessageContent = (message) => {
        if (message.mes.startsWith('GIF:')) {
            const gif = message.mes.replace('GIF:', '');
            const gifUrl = decode(gif);
            return (
                <div className="message-gif">
                    <img src={gifUrl} alt="GIF" style={{ maxWidth: '200px', maxHeight: '450px', borderRadius:'12px' }} />
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
        <div className="chat-content h-100">
            <div className="container-fluid g-0 p-4 chat-content">
                {sortedMessages.map((message, index) => (
                    <div key={index} className={`message ${message.name === localStorage.getItem("username") ? "self" : ""}`}>
                        <div className="message-wrap">
                            <div className="message-item">
                                {renderMessageContent(message)}
                                <span>{formatDateSeparator(messages.createAt)}</span>
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
                                            <a className="dropdown-item d-flex align-items-center justify-content-between"
                                               href="#">
                                                Edit
                                                <i className="ri-edit-line"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex align-items-center justify-content-between"
                                               href="#">
                                                Share
                                                <i className="ri-share-line"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item d-flex align-items-center justify-content-between"
                                               href="#">
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