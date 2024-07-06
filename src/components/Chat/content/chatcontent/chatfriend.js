import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { initializeSocket, reLoginUser } from "../../../../socket/socket";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { database, query, ref, orderByChild, equalTo, onValue } from "../../../../firebase";
import { addNewMessage } from "../../../../redux/action/action";

function ChatContent() {
    // Lấy trạng thái đăng nhập từ Redux store
    const login = useSelector((state) => state.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { type, name } = useParams(); // lấy ra type và tên người nhận hoặc phòng
    // Lấy dữ liệu tin nhắn từ Redux store
    const messages = useSelector((state) => state.messages?.data);
    // Lấy danh sách thành viên của nhóm từ Redux store
    const roomData = useSelector((state) => state.joinRoom?.data);
    console.log('Room Data Test: ', roomData);

    // Khai báo userLists để lưu danh sách thành viên
    let userLists = [];

    // Kiểm tra và lấy danh sách thành viên từ roomData
    if (roomData && Array.isArray(roomData)) {
        const firstElement = roomData[0];
        console.log('First Element: ', firstElement);

        if (firstElement && firstElement.userList) {
            userLists = firstElement.userList;
            console.log('User Lists: ', userLists);

            // Duyệt qua từng thành viên trong userLists
            userLists.forEach(user => {
                console.log(`User ID: ${user.id}, User Name: ${user.name}`);
            });
        } else {
            console.log('firstElement hoặc firstElement.userList không tồn tại');
        }
    } else {
        console.log('roomData không phải là mảng hoặc không tồn tại');
    }
    console.log('Message: ', messages);

    // Tạo tham chiếu để cuộn đến cuối tin nhắn
    const messagesEndRef = useRef(null);
    const username = localStorage.getItem("username");

    // Kiểm tra đăng nhập khi mount component
    useEffect(() => {
        if (!login.status) {
            if (localStorage.getItem("reLogin") !== null) {
                // Reconnect socket
                initializeSocket('ws://140.238.54.136:8080/chat/chat');
                reLoginUser(username, localStorage.getItem("reLogin"));
            } else {
                navigate("/login");
            }
        }
    }, [dispatch, navigate, login, username]);


    // Cuộn xuống cuối khi có tin nhắn mới
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Lọc tin nhắn rỗng và sắp xếp theo thời gian gửi
    const filteredMessages = messages ? messages.filter(message => message.mes && message.mes.trim() !== '') : [];
    const sortedMessages = filteredMessages.sort((a, b) => new Date(a.createAt) - new Date(b.createAt));

    // Định dạng timestamp và ngày gửi
    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
            return ""; // Trả về chuỗi rỗng nếu timestamp không hợp lệ
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

    // Định dạng phân cách ngày gửi
    const formatDateSeparator = (timestamp) => {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
            return ""; // Trả về chuỗi rỗng nếu timestamp không hợp lệ
        }
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

    // Hiển thị thông báo nếu chưa chọn người nhận
    if (!name) {
        return <div className="chat-content hide-scrollbar h-100 d-flex justify-content-center align-items-center">
            <p className="text-muted">Chọn người bạn muốn nhắn để bắt đầu trò chuyện!</p>
        </div>;
    }

    // Hiển thị tin nhắn
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
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}

export default ChatContent;
