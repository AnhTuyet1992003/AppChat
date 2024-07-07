import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef} from "react";
import {reLoginUser, initializeSocket} from "../../../../socket/socket";
import {decode} from "../../../../utill/convert-text";

function ChatContent() {
    // Lấy trạng thái đăng nhập từ Redux store
    const loginUser = useSelector((state) => state.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {name} = useParams(); // lấy ra tên người nhận
    // Lấy dữ liệu tin nhắn từ Redux store
    const messages = useSelector(state => state.messages?.data);
    console.log('Messages:', messages);

    // Tạo tham chiếu để cuộn đến cuối tin nhắn
    const messagesEndRef = useRef(null);

    const username = localStorage.getItem("username");

    // kiểm tra đăng nhập
    useEffect(() => {
        if (!loginUser.status) {
            if (localStorage.getItem("reLogin") !== null) {
                // Reconnect socket
                initializeSocket('ws://140.238.54.136:8080/chat/chat');
                reLoginUser(username, localStorage.getItem("reLogin"));
            } else {
                navigate("/login");
            }
        }
    }, [dispatch, navigate, loginUser, username]);

    // cuộn xuong cuối khi co tin nhắn mới
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    // không hiển thị nếu đoạn tin nhắn rỗng
    const filteredMessages = messages ? messages.filter(message => message.mes && message.mes.trim() !== '') : [];
    // Sắp xếp tin nhắn theo ngày giờ gửi
    const sortedMessages = filteredMessages.sort((a, b) => new Date(a.createAt) - new Date(b.createAt));

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
            ...(isToday ? {} : {day: '2-digit', month: '2-digit', year: 'numeric'})
        };
        return new Intl.DateTimeFormat('vi-VN', options).format(date);
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
                    return (
                        <div key={index}
                             className={`message ${message.name === localStorage.getItem("username") ? "self" : ""}`}>
                            <div className="message-wrap">
                                <div className="message-item">
                                    <div className="message-content">
                                        <span>
                                            {decode(message.mes)}
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
                    );
                })}
                <div ref={messagesEndRef}/>
            </div>
        </div>
    );
}

export default ChatContent;
