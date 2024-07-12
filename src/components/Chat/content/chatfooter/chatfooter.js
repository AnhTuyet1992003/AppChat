import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    getPeopleChatMes,
    getRoomChatMes,
    getUsersList, initializeSocket, reLoginUser,
    sendChatToPeople,
    sendChatToRoom
} from "../../../../socket/socket";

import {database, ref, set, child, get, storageRef, storage, getDownloadURL, uploadBytes} from "../../../../firebase";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { encode } from "../../../../utill/convert-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons/faGift";

function ChatFooter() {
    // state quản lý tin nhắn và file
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);

    const dispatch = useDispatch();
    const { type, name } = useParams();
    const username = localStorage.getItem('username');

    // emoji
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [isGifPickerVisible, setGifPickerVisible] = useState(false);

    const navigate = useNavigate();
    const login = useSelector((state) => state.login);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!login.status) {
            if (localStorage.getItem("reLogin") !== null) {
                initializeSocket('ws://140.238.54.136:8080/chat/chat');
                reLoginUser(localStorage.getItem("username"), localStorage.getItem("reLogin"));
            } else {
                navigate("/login");
            }
        }
    }, [dispatch, navigate, login]);

    // gửi tin nhắn
    const sendMessage = async (content, isGif = false) => {
        // Nếu không có nội dung hoặc nội dung chỉ chứa khoảng trắng
        // và không có tệp tin nào được chọn, không thực hiện gửi tin nhắn
        if ((!content || content.trim() === '') && files.length === 0) return;

        // Mã hóa nội dung tin nhắn
        let encodedContent = encode(content);

        if (isGif) {
            encodedContent = `GIF:${encodedContent}`;
        } else if (files.length > 0) {

            // Tải lên file lên Firebase Storage và lấy URL của từng tệp
            const fileUploadPromises = files.map(async (file) => {
                const fileRef = storageRef(storage, `files/${file.name}`);
                await uploadBytes(fileRef, file);
                // Mã hóa tên tệp
                const encodedFileName = encode(file.name);
                return `FILE:${encodedFileName}`;
            });

            const uploadedFiles = await Promise.all(fileUploadPromises);
            // Gửi tin nhắn cho từng tệp tin đã tải lên
            for (const file of uploadedFiles) {
                await sendMessageForFile(file);
            }
        } else {
            // Gửi tin nhắn bình thuờng
            await sendMessageForFile(encodedContent);
        }
    };

    const sendMessageForFile = async (encodedContent) => {
        const fetchSendChat = async () => {
            if (type === 'friend') {
                await sendChatToPeople(name, encodedContent);
                dispatch(getUsersList);
                getPeopleChatMes(name);
            } else if (type === 'group') {
                await sendChatToRoom(name, encodedContent);
                dispatch(getUsersList);
                getRoomChatMes(name);
            }
        };
        await fetchSendChat();
        // Cập nhật danh sách người dùng
        dispatch(getUsersList);
    };

    const handleSendMessage = async () => {
        await sendMessage(message);
        setMessage('');
        setFiles([]);
        setPickerVisible(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleGifClick = (gifUrl) => {
        sendMessage(gifUrl, true);
        setGifPickerVisible(false);
    };

    // cho tệp để tải lên
    const handleFileChange = (e) => {
        // Chuyển đổi danh sách các tệp đã chọn thành mảng
        const selectedFiles = Array.from(e.target.files);
        // Nếu có tệp tin được chọn
        if (selectedFiles.length) {
            // Thêm các tệp tin đã chọn vào mảng `files` hiện tại
            setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        }
    };

    // nút xóa file đã chọn
    const handleDeleteFile = (index) => {
        // Cập nhật danh sách tập tin: loại bỏ phần tử có chỉ số `index`
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };


    if (!name) {
        return null;
    }

    return (
        <>
            {files.length > 0 && (
                <div className="mt-2 containerfile">
                    {files.map((file, index) => (
                        <div key={index} className="d-flex align-items-center fileshow">
                            <button className="btn btn-secondary filename">
                                {file.name}
                            </button>
                            <div className="xoaFile" onClick={() => handleDeleteFile(index)}>
                                x
                            </div>
                        </div>
                    ))}
                </div>
            )}

        <div className="chat-footer d-flex align-items-center border-top px-2 ">
            <div className="container-fluid" style={{ border: '1px solid #black' }}>
                <div className="d-flex align-items-center g-4 itemchat">
                    <div className="input-group">
                        <button className="btn btn-white btn-lg border-0" type="button"
                                onClick={() => setPickerVisible(!isPickerVisible)}>
                            <i className="far fa-grin" style={{ fontSize: '24px' }}></i>
                        </button>
                        <button className="btn btn-white btn-lg border-0" type="button"
                                onClick={() => setGifPickerVisible(!isGifPickerVisible)}>
                            <FontAwesomeIcon icon={faGift} style={{ fontSize: '24px' }} />
                        </button>
                        <div className={isPickerVisible ? 'd-block' : 'd-none'}
                             style={{ position: 'absolute', bottom: '80px', zIndex: 1000 }}>
                            <Picker data={data} previewPosition="none" onEmojiSelect={(e) => {
                                setMessage(message + e.native);
                            }} />
                        </div>
                        <input
                            aria-label="type message"
                            className="form-control form-control-lg border-0"
                            placeholder="Nhập tin nhắn..."
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            style={{ borderRadius: '0' }}
                        />
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            multiple
                        />
                        <button className="btn btn-white btn-lg border-0" type="button"
                                onClick={() => fileInputRef.current.click()}>
                            <i className="ri-attachment-2"/>
                        </button>
                    </div>
                    <button
                        className="btn btn-icon btn-primary btn-lg rounded-circle ms-2"
                        type="submit"
                        onClick={handleSendMessage}
                    >
                        <i className="ri-send-plane-fill" />
                    </button>
                </div>
            </div>

            {isGifPickerVisible && (
                <div className="gif-picker" style={{
                    position: 'absolute',
                    width: '450px',
                    bottom: '80px',
                    zIndex: 1000,
                    backgroundColor: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    marginLeft: '30px',
                    boxShadow: '0 0 10px 0 #dbdbdb'
                }}>
                    <div className="d-flex flex-wrap">
                        {gifList.map((gifUrl, index) => (
                            <img
                                key={index}
                                src={gifUrl}
                                alt={`gif-${index}`}
                                style={{ width: '140px', height: '100px', margin: '1px', cursor: 'pointer' }}
                                onClick={() => handleGifClick(gifUrl)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
        </>
    );
}

export default ChatFooter;
