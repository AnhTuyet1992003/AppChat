import React, { useEffect } from 'react';
import ChatUser from './ChatUser';
import ChatGroup from './ChatGroup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function ChatForm() {
    const { name } = useParams();
    const chatType = useSelector((state) => state.chatType);
    const messages = useSelector((state) => state.messages?.data);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = useSelector((state) => state.login);
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

    return (
        <div className="chat-content hide-scrollbar h-100">
            {!name ? (
                <div className="d-flex justify-content-center align-items-center h-100">
                    <p className="text-muted">Chọn người bạn muốn nhắn để bắt đầu trò chuyện!</p>
                </div>
            ) : (
                <div>
                    {chatType === 'user' && <ChatUser />}
                    {chatType === 'group' && <ChatGroup />}
                </div>
            )}
        </div>
    );
}

export default ChatForm;
