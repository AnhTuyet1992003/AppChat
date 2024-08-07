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
import axios from 'axios'; // Make sure to import axios
import '@fortawesome/fontawesome-free/css/all.min.css';
import { encode } from "../../../../utill/convert-text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons/faGift";

function ChatFooter() {
    // state quản lý tin nhắn và file
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const dispatch = useDispatch();
    const {type, name} = useParams();
    const username = localStorage.getItem('username');

    // Emoji, GIF
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [gifResults, setGifResults] = useState([]); // State for search results
    const [isGifPickerVisible, setGifPickerVisible] = useState(false);


    const navigate = useNavigate();
    const login = useSelector((state) => state.login);
    const fileInputRef = useRef(null);
    const [videos, setVideos] = useState([]);

    const imageInputRef = useRef(null);
    const videoInputRef = useRef(null);

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
        "https://media4.giphy.com/media/jZC7j19LG8s6zsLnoL/200.gif?cid=81a08d72s3a94jcgp81arvcmrbbuhr2ca6qzv7ei2pvrjf8a&ep=v1_gifs_search&rid=200.gif&ct=g",
        "https://media3.giphy.com/media/kyLYXonQYYfwYDIeZl/200.webp?cid=790b761145cnlovyqgdfsa9jeownbghxj2uxjz34teyk92r3&ep=v1_gifs_trending&rid=200.webp&ct=g",
        "https://media1.giphy.com/media/u6iGNlB8JCb1DymF53/giphy.webp?cid=82a1493bpyxsi8rhdzjfdzpwb69m3wwsd88sa51ga50jza5a&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
        "https://media4.giphy.com/media/2WGDUTmsB4DzFuvZ2t/200.webp?cid=82a1493b6f6nsy4uo2qwz3iv42zn20k2xflp0xi6ysewb253&ep=v1_gifs_trending&rid=200.webp&ct=g",
        "https://media0.giphy.com/media/GiWEowj3nQv9C/200.webp?cid=82a1493bjos1iupiuhz95l19ffujjjjjk7y6q8iohate2rk4&ep=v1_gifs_trending&rid=200.webp&ct=g",
        "https://media4.giphy.com/media/tbRcseHU5ieXAEhlQw/giphy.webp?cid=82a1493bjos1iupiuhz95l19ffujjjjjk7y6q8iohate2rk4&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
        "https://media4.giphy.com/media/l1KVaj5UcbHwrBMqI/200.webp?cid=82a1493btojm2l6ctzkfi7vngazlinthqq2ssyy9pt260g67&ep=v1_gifs_trending&rid=200.webp&ct=g",
        "https://media2.giphy.com/media/ZqlvCTNHpqrio/200.webp?cid=790b76118xdfxi9w241h93a4btvmttnwdu8ui9gcqtdqpkf6&ep=v1_gifs_trending&rid=200.webp&ct=g"

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

    useEffect(() => {
        if (searchTerm === '') {
            fetchDefaultGifs();
        } else {
            fetchSearchGifs(searchTerm);
        }
    }, [searchTerm]);
    const fetchDefaultGifs = () => {
        setGifResults(gifList);
    };

    // Function to fetch GIFs based on a search term
    const fetchSearchGifs = async (term) => {
        try {
            const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
                params: {
                    api_key: 'X4r1rEOUEs10qzX12AZBHbc5FcpcjNdG',
                    q: term,
                    limit: 18
                }
            });
            setGifResults(response.data.data.map(gif => gif.images.fixed_height.url));
        } catch (error) {
            console.error('Error fetching search gifs:', error);
        }
    };


    const handleGifClick = (gifUrl) => {
        sendMessage(gifUrl, true);
        setGifPickerVisible(false);
    };



    // gửi tin nhắn
    const sendMessage = async (content, isGif = false) => {
        if ((!content || content.trim() === '') && files.length === 0 && images.length === 0 && videos.length === 0) return;

        let encodedContent = encode(content);
        if (isGif) {
            encodedContent = `GIF:${encodedContent}`;
            await sendMessageForFile(encodedContent);
        } else if (files.length > 0 || images.length > 0 || videos.length > 0) {
            const fileUploadPromises = files.map(async (file) => {
                const fileRef = storageRef(storage, `files/${file.name}`);
                await uploadBytes(fileRef, file);
                return `FILE:${encode(file.name)}`;
            });

            const imageUploadPromises = images.map(async (image) => {
                const imageRef = storageRef(storage, `images/${image.name}`);
                await uploadBytes(imageRef, image);
                const imageURL = await getDownloadURL(imageRef);
                return `IMAGE:${imageURL}`;
            });

            const videoUploadPromises = videos.map(async (video) => {
                const videoRef = storageRef(storage, `videos/${video.name}`);
                await uploadBytes(videoRef, video);
                const videoURL = await getDownloadURL(videoRef);
                return `VIDEO:${videoURL}`;
            });

            const uploadedFiles = await Promise.all(fileUploadPromises);
            const uploadedImages = await Promise.all(imageUploadPromises);
            const uploadedVideos = await Promise.all(videoUploadPromises);

            for (const file of uploadedFiles) {
                await sendMessageForFile(file);
            }
            for (const image of uploadedImages) {
                await sendMessageForFile(image);
            }
            for (const video of uploadedVideos) {
                await sendMessageForFile(video);
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

        // Cập nhật danh sách người dùng
        dispatch(getUsersList);
    };

    const handleSendMessage = async () => {
        await sendMessage(message);
        setMessage('');
        setFiles([]);
        setImages([]);
        setVideos([]);

        setPickerVisible(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
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


    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        if (selectedImages.length) {
            setImages((prevImages) => [...prevImages, ...selectedImages]);
        }
    };

    const handleVideoChange = (e) => {
        const selectedVideos = Array.from(e.target.files);
        if (selectedVideos.length) {
            setVideos((prevVideos) => [...prevVideos, ...selectedVideos]);
        }
    };

    // nút xóa file đã chọn
    const handleDeleteFile = (index) => {
        // Cập nhật danh sách tập tin: loại bỏ phần tử có chỉ số `index`
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
    const handleDeleteImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));

    };
    const handleDeleteVideo = (index) => {
        setVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
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
            {videos.length > 0 && (
                <div className="mt-2 containerfile">
                    {videos.map((video, index) => (
                        <div key={index} className="d-flex align-items-center fileshow">
                            <video
                                src={URL.createObjectURL(video)}
                                alt={video.name}
                                className="video-preview"
                                style={{ maxWidth: '100px', maxHeight: '80px' }}
                                controls
                            />
                            <div className="xoaFile" onClick={() => handleDeleteVideo(index)}>
                                x
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="chat-footer d-flex align-items-center border-top px-2 ">
                <div className="container-fluid" style={{border: '1px solid #black'}}>
                    <div className="d-flex align-items-center g-4 itemchat">
                        <div className="input-group">
                            <button className="btn btn-white btn-lg border-0" type="button"
                                    onClick={() => setPickerVisible(!isPickerVisible)}>
                                <i className="far fa-grin-beam" style={{fontSize: '20px'}}></i>
                            </button>
                            <button className="btn btn-white btn-lg border-0" type="button"
                                    onClick={() => setGifPickerVisible(!isGifPickerVisible)}>
                                <FontAwesomeIcon icon={faGift} style={{fontSize: '20px'}}/>
                            </button>
                            <div className={isPickerVisible ? 'd-block' : 'd-none'}
                                 style={{position: 'absolute', bottom: '80px', zIndex: 1000}}>
                                <Picker data={data} previewPosition="none" onEmojiSelect={(e) => {
                                    setMessage(message + e.native);
                                }}/>
                            </div>
                            <input
                                aria-label="type message"
                                className="form-control form-control-lg border-0"
                                placeholder="Nhập tin nhắn..."
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                style={{borderRadius: '0'}}
                            />
                            <input
                                type="file"
                                style={{display: 'none'}}
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
                                style={{display: 'none'}}
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={imageInputRef}
                                multiple
                            />
                            <button className="btn btn-white btn-lg border-0" type="button"
                                    onClick={() => imageInputRef.current.click()}>
                                <i className="far fa-image"/>
                            </button>
                            <input
                                type="file"
                                style={{display: 'none'}}
                                accept="video/*"
                                onChange={handleVideoChange}
                                ref={videoInputRef} // Create a ref for this input if needed
                                multiple
                            />
                            <button className="btn btn-white btn-lg border-0" type="button"
                                    onClick={() => videoInputRef.current.click()}>
                                <i className="far fa-video"/> {/* Use an appropriate icon */}
                            </button>

                        </div>
                        <button
                            className="btn btn-icon btn-primary btn-lg rounded-circle ms-2"
                            type="submit"
                            onClick={handleSendMessage}
                        >
                            <i className="ri-send-plane-fill"/>
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
                        <input
                            type="text"
                            placeholder="Search GIFs"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                        <div className="d-flex flex-wrap">
                            {gifResults.map((gifUrl, index) => (
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