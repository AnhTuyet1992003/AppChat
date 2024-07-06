
import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {sendChatToPeople, sendChatToRoom} from "../../../../socket/socket";
import {addNewMessage} from "../../../../redux/action/action";
import {database, ref, set, child, get} from "../../../../firebase";



function ChatFooter() {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const {type, name } = useParams();
    const username = localStorage.getItem('username');
    const handleSendMessage = async () => {
        if (message.trim() === '') return;

        // tạo id mới
        const nextMessageId = await getNextMessageId();

        const newMessage = {
            id: nextMessageId,
            name: username,
            to: name,
            mes: message,
            createAt: new Date().toISOString(),
        };

        dispatch(addNewMessage(newMessage)); // Thêm tin nhắn mới vào Redux store ngay lập tức
        // let data = {"name": username, "type": type, "to": name};
        if(type==='friend'){
            sendChatToPeople(name, message); // Gửi tin nhắn tới server
        }else if(type==='group'){
            sendChatToRoom(name,message);
        }
        // lưu tin nhắn vao firebase
        await set(ref(database, 'messages/' + nextMessageId), newMessage);
        setMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };
    // hàm lưu id là số tăng dần
    const getNextMessageId = async () => {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'messages'));
        const messages = snapshot.val();
        const ids = messages ? Object.keys(messages).map(Number) : [];
        return ids.length ? Math.max(...ids) + 1 : 1;
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
                                type="button"
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
                                    onClick={handleSendMessage}
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