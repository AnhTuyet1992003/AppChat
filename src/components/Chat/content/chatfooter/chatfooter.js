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

import { database, ref, set, child, get, storageRef, storage, getDownloadURL, uploadBytes } from "../../../../firebase";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { encode } from "../../../../utill/convert-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons/faGift";

function ChatFooter() {
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);

    const dispatch = useDispatch();
    const { type, name } = useParams();
    const username = localStorage.getItem('username');

    const [isPickerVisible, setPickerVisible] = useState(false);
    const [isGifPickerVisible, setGifPickerVisible] = useState(false);

    const navigate = useNavigate();
    const login = useSelector((state) => state.login);
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const gifList = [
        "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExanNqMHpxcHo2cDFmbDlqNHk5Y3BhNHpzYTZqdjk2dTU4NWg0NndlZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7vDoUoDZHoUQxMPkd7/giphy.webp",
        "https://media0.giphy.com/media/oKQGM5S2mwx5C/giphy.webp?cid=82a1493bo0nvjpdk35jsd5n6qte8jj8sruymuqpbsglhm5y0&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
        "https://media0.giphy.com/media/e6BTJ8bAak7V5Kv2FB/200.webp?cid=82a1493bzu5igskf5yvdc25le0xzjfd0ue30lgvdc0cyxh6y&ep=v1_gifs_trending&rid=200.webp&ct=g",
        "https://media3.giphy.com/media/C5oD3WouufnWORp7wP/giphy.webp?cid=82a1493bhnnzmesl9xiapoa4638em1rrncm6up7ed6074xt6&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
        "https://media2.giphy.com/media/J2WQhnfK2WuUE/200.webp?cid=82a1493bhnnzmesl9xiapoa4638em1rrncm6up7ed6074xt6&ep=v1_gifs_trending&rid=200.webp&ct=g",
        "https://media4.giphy.com/media/8H80IVPjAdKY8/200w.webp?cid=82a1493bhgilpwzgp6jfkr8lwq49yj294ind9yamxjudvii3&ep=v1_gifs_trending&rid=200w.webp&ct=g",
        "https://media0.giphy.com/media/xD6m65jnkgkwTSOnDp/giphy.webp?cid=790b7611cb8xqe66nq90srrbhyquz14gy2uqj5d1vua9r0ry&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
        "https://media1.giphy.com/media/YTbZzCkRQCEJa/200.webp?cid=790b7611cb8xqe66nq90srrbhyquz14gy2uqj5d1vua9r0ry&ep=v1_gifs_trending&rid=200.webp&ct=g",
        "https://media1.giphy.com/media/tHIRLHtNwxpjIFqPdV/giphy.webp?cid=790b7611cb8xqe66nq90srrbhyquz14gy2uqj5d1vua9r0ry&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
        "https://media0.giphy.com/media/Fc0glzAjfjsaV0IfUQ/giphy.webp?cid=82a1493b41wmq8a7y8lh0myg4c1i1c3440mxrshlhwmvr2j7&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
        "https://media4.giphy.com/media/fvjBHSTYMcE1fKcrP9/200.webp?cid=82a1493bw11uj0sjjt0pj7hz2k84olu4l5lp3xpjwz0pnceg&ep=v1_gifs_trending&rid=200.webp&ct=g",
        "https://media3.giphy.com/media/kyLYXonQYYfwYDIeZl/200.webp?cid=790b761145cnlovyqgdfsa9jeownbghxj2uxjz34teyk92r3&ep=v1_gifs_trending&rid=200.webp&ct=g"

    ];
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

    const sendMessage = async (content, isGif = false) => {
        if ((!content || content.trim() === '') && files.length === 0 && images.length === 0) return;

        let encodedContent = encode(content);

        if (isGif) {
            encodedContent = `GIF:${encodedContent}`;
            await sendMessageForFile(encodedContent);

        } else if (files.length > 0 || images.length > 0) {
            const fileUploadPromises = files.map(async (file) => {
                const fileRef = storageRef(storage, `files/${file.name}`);
                await uploadBytes(fileRef, file);
                const encodedFileName = encode(file.name);
                return `FILE:${encodedFileName}`;
            });

            const imageUploadPromises = images.map(async (image) => {
                const imageRef = storageRef(storage, `images/${image.name}`);
                await uploadBytes(imageRef, image);
                const imageURL = await getDownloadURL(imageRef);
                return `IMAGE:${imageURL}`;
            });

            const uploadedFiles = await Promise.all(fileUploadPromises);
            const uploadedImages = await Promise.all(imageUploadPromises);

            for (const file of uploadedFiles) {
                await sendMessageForFile(file);
            }
            for (const image of uploadedImages) {
                await sendMessageForFile(image);
            }
        } else {
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
        dispatch(getUsersList);
    };

    const handleSendMessage = async () => {
        await sendMessage(message);
        setMessage('');
        setFiles([]);
        setImages([]);
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

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length) {
            setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
        }
    };

    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        if (selectedImages.length) {
            setImages((prevImages) => [...prevImages, ...selectedImages]);
        }
    };

    const handleDeleteFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleDeleteImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
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

            {images.length > 0 && (
                <div className="mt-2 containerfile">
                    {images.map((image, index) => (
                        <div key={index} className="d-flex align-items-center fileshow">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={image.name}
                                className="image-preview"
                                style={{maxWidth: '80px', maxHeight: '60px'}}
                            />

                            <div className="xoaFile" onClick={() => handleDeleteImage(index)}>
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
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={imageInputRef}
                                multiple
                            />
                            <button className="btn btn-white btn-lg border-0" type="button"
                                    onClick={() => imageInputRef.current.click()}>
                                <i className="far fa-image"/>
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