import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getPeopleChatMes, getUsersList, sendChatToPeople, sendChatToRoom} from "../../../../socket/socket";

import {database, ref, set, child, get} from "../../../../firebase";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {encode} from "../../../../utill/convert-text";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGift} from "@fortawesome/free-solid-svg-icons/faGift";

function ChatFooter() {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const {type, name} = useParams();
    const username = localStorage.getItem('username');
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [isGifPickerVisible, setGifPickerVisible] = useState(false);
    const navigate = useNavigate();
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

    const sendMessage = async (content, isGif = false) => {
        if (content.trim() === '') return;

        const nextMessageId = await getNextMessageId();
        const encodedContent = isGif ? `GIF:${encode(content)}` : encode(content);

        const newMessage = {
            id: nextMessageId,
            name: username,
            to: name,
            mes: encodedContent,
            createAt: new Date().toISOString(),
        };

        const fecthSendChat = async () => {
            if (type === 'friend') {
                sendChatToPeople(name, encodedContent);
                dispatch(getUsersList);
                getPeopleChatMes(name);
                navigate(`/Home/friend/${name}`);
            } else if (type === 'group') {
                sendChatToRoom(name, encodedContent);
                dispatch(getUsersList);
            }
        }
        fecthSendChat().then(r => {
            dispatch(getUsersList);
        });

        // await set(ref(database, 'messages/' + nextMessageId), newMessage);
    };

    const handleSendMessage = () => {
        sendMessage(message);
        setMessage('');
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
            <div className="container-fluid" style={{border: '1px solid #black'}}>
                <div className="d-flex align-items-center g-4">
                    <div className="input-group">
                        <button className="btn btn-white btn-lg border-0" type="button"
                                onClick={() => setPickerVisible(!isPickerVisible)}>
                            <i className="far fa-grin" style={{fontSize: '24px'}}></i>
                        </button>
                        <button className="btn btn-white btn-lg border-0" type="button"
                                onClick={() => setGifPickerVisible(!isGifPickerVisible)}>
                            <FontAwesomeIcon icon={faGift} style={{fontSize: '24px'}}/>
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
                        <button className="btn btn-white btn-lg border-0" type="button">
                            <i className="ri-attachment-2"/>
                        </button>
                        <button className="btn btn-white btn-lg border-0" type="button">
                            <i className="ri-chat-smile-2-line"/>
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
                    width:'450px',
                    bottom: '80px',
                    zIndex: 1000,
                    backgroundColor: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    marginBottom:'20px',
                    marginLeft:'30px',
                    boxShadow: '0 0 10px 0 #dbdbdb'
                }}>
                    <div className="d-flex flex-wrap">
                        {gifList.map((gifUrl, index) => (
                            <img
                                key={index}
                                src={gifUrl}
                                alt={`gif-${index}`}
                                style={{width: '140px', height: '100px', margin: '1px', cursor: 'pointer'}}
                                onClick={() => handleGifClick(gifUrl)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatFooter;