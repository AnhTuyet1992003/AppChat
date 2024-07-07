import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { sendChatToPeople, sendChatToRoom } from "../../../../socket/socket";
import {addNewMessage, sendChatSuccess} from "../../../../redux/action/action";
import { database, ref, set, child, get } from "../../../../firebase";
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {encode} from "../../../../utill/convert-text";

function ChatFooter() {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const { type, name } = useParams();
    const username = localStorage.getItem('username');
    const [isPickerVisible, setPickerVisible] = useState(false);

    const handleSendMessage = async () => {
        if (message.trim() === '') return;

        const nextMessageId = await getNextMessageId();

        const newMessage = {
            id: nextMessageId,
            name: username,
            to: name,
            mes: message,
            createAt: new Date().toISOString(),
        };

        dispatch(addNewMessage(newMessage));

        // let mess3 = [];
        // if (message !== '') {
        //     let mess2 = {};
        //     mess2 = {type: "text", content: encode(message)};
        //     mess3.push(mess2);
        //     setMessage('');
        // }

        // let data = {"name": username, "type": type, "to": name, "mes": JSON.stringify(mess3)};
        // let mess2 = {};
        // mess2 = encode(message);
        if (type === 'friend') {
            sendChatToPeople(name,encode(message));
            // dispatch(sendChatSuccess(data));
        } else if (type === 'group') {
            sendChatToRoom(name, encode(message));
        }

        await set(ref(database, 'messages/' + nextMessageId), newMessage);
        setMessage('');
        setPickerVisible(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
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
        <div className="chat-footer d-flex align-items-center border-top px-2" >
            <div className="container-fluid" style={{ border: '1px solid #black' }}>
                <div className="d-flex align-items-center g-4">
                    <div className="input-group">
                        <button className="btn btn-white btn-lg border-0" type="button" onClick={() => setPickerVisible(!isPickerVisible)}>
                            <i className="far fa-grin" style={{ fontSize: '24px' }}></i>
                        </button>
                        <div className={isPickerVisible ? 'd-block' : 'd-none'}
                             style={{ position: 'absolute', bottom: '80px', zIndex: 1000 }}
                        >
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
        </div>
    );
}

export default ChatFooter;
