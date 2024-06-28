
import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {sendChatToPeople} from "../../../../socket/socket";
import {addNewMessage} from "../../../../redux/action/action";


function ChatFooter() {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const { name } = useParams();

    const handleSendMessage = () => {
        if (message.trim() === '') return;
        const newMessage = {
            name: localStorage.getItem('username'),
            mes: message,
            createAt: new Date().toISOString(),
        };
        dispatch(addNewMessage(newMessage)); // Thêm tin nhắn mới vào Redux store ngay lập tức
        sendChatToPeople(name, message); // Gửi tin nhắn tới server
        setMessage(''); // Reset input field
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    if (!name) {
        return null;
    }
    return (
        <div className="chat-footer d-flex align-items-center border-top px-2">
            <div className="container-fluid">
                <div className="row align-items-center g-4">
                    <div className="col">
                        <div className="input-group">
                            <button
                                className="btn btn-white btn-lg border"
                                type="button"
                            >
                                <i className="ri-attachment-2"/>
                            </button>
                            <input
                                aria-label="type message"
                                className="form-control form-control-lg"
                                placeholder="Nhập tin nhắn..."
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button
                                className="btn btn-white btn-lg border"
                                type="button"  onClick={handleSendMessage}
                            >
                                <i className="ri-chat-smile-2-line"/>
                            </button>
                        </div>
                    </div>
                    <div className="col-auto">
                        <ul className="list-inline d-flex align-items-center mb-0">
                            <li className="list-inline-item">
                                <button
                                    className="btn btn-icon btn-primary btn-lg rounded-circle"
                                    type="submit"
                                >
                                    <i className="ri-send-plane-fill"/>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatFooter;