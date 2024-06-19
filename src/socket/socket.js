// src/socket/socket.js
import store from "../redux/store/store";
import {
    createRoom,
    joinRoom,
    getRoomChatMessages,
    createRoomSuccess,
    createRoomError,
    sendChatToRoom,
    sendChatToPeople,
    checkUser,
    loginSuccess,
    loginError,
    sendChatToPeopleSuccess,
    sendChatToPeopleFailure,
    reLoginSuccess,
    logoutSuccess,
    getUserListSuccess,
    getUserListFailure,
    registerSuccess,
    registerError,
    logoutError,
    getPeopleChatMesSuccess, getPeopleChatMesFailure,
} from "../redux/action/action";
export let socket;
export let isSocketOpen = false;
export const messageQueue = [];
const sendMessageInternal = (message) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else if (socket.readyState === WebSocket.CONNECTING) {
        messageQueue.push(message);
    } else {
        console.error("Socket is closed");
    }
};

export const initializeSocket = (url) => {
    if (socket && socket.readyState !== WebSocket.CLOSED) {
        return;
    }

    socket = new WebSocket(url);

    socket.onopen = () => {
        isSocketOpen = true;
        console.log('WebSocket connection opened.');
        while (messageQueue.length > 0) {
            const message = messageQueue.shift();
            sendMessageInternal(message);
        }
    };
    socket.onmessage = async (message) => {
        const response = JSON.parse(message.data);
        console.log('Received response:', response);
        if (!response.event) {
            console.error('Received response without event:', response);
            return;
        }
        switch (response.event) {
            // xử lý các sự kiện khác
            case "REGISTER":
                if (response.status === "success") {
                    store.dispatch(registerSuccess(response.data));
                } else {
                    store.dispatch(registerError(response.mes));
                }
                break;
            case "LOGIN":
                if (response.status === "success") {
                    localStorage.setItem("reLogin", response.data.RE_LOGIN_CODE);

                    store.dispatch(loginSuccess(response.data));
                } else {
                    store.dispatch(loginError(response.error));
                }
                break;
            case "RE_LOGIN":
                if (response.status === "success") {
                    localStorage.setItem("reLogin", response.data.RE_LOGIN_CODE);
                    store.dispatch(reLoginSuccess(response.data));
                } else {
                    store.dispatch(loginError(response.error));
                }
                break;
            case "GET_USER_LIST":
                if (response.status === "success") {
                    store.dispatch(getUserListSuccess(response.data));
                } else {
                    store.dispatch(getUserListFailure(response.error));
                }
                break;
            case "SEND_CHAT":
                if (response.data.type === "people") {
                    if (response.status === "success") {
                        store.dispatch(sendChatToPeopleSuccess(response.data));
                    } else {
                        store.dispatch(sendChatToPeopleFailure(response.error));
                    }
                }
                break;
            case "LOGOUT":
                if (response.status === "success") {
                    localStorage.clear();
                    store.dispatch(logoutSuccess(response.data || {}));
                } else {
                    store.dispatch(logoutError(response.error));
                }
                break;
            case "GET_PEOPLE_CHAT_MES":
                if (response.status === "success"){
                    store.dispatch(getPeopleChatMesSuccess(response.data));
                }else{
                    store.dispatch(getPeopleChatMesFailure(response.error));
                }
                break;
            case "CREATE_ROOM":
                if (response.status === "success") {
                    store.dispatch(createRoomSuccess(response.data));
                    getUsersList();  // Gọi lại getUsersList để cập nhật danh sách người dùng
                } else {
                    console.log(response.mes)
                    store.dispatch(createRoomError(response.mes));
                }
                break;

            default:
                console.warn("Unhandled socket event:", response.event);
                break;
        }
    };
    socket.onclose = () => {
        //tái thiết lập lại socket
        isSocketOpen = false;
        console.log('WebSocket connection closed. Reconnecting in 5 seconds...');
        setTimeout(() => initializeSocket(url), 5000);
    };

    socket.onerror = (error) => {
        console.log("Socket error: ", error);
    };
};
// hàm đăng nhập
export const loginUser = (user, pass) => {
    if (!socket) return;
    // socket được mở
    if (socket.readyState === WebSocket.OPEN){
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "LOGIN",
                data:{
                    user: user,
                    pass: pass,
                },
            },
        }));
        // đang trong quá trình kết nối
    } else if (socket.readyState === WebSocket.CONNECTING){
        setTimeout(() => {
            loginUser(user, pass);
        }, 2000);
    } else {
        console.log("Socket is close")
    }
};
export const reLoginUser = (user, code) => {
    if (!socket) {
        return;
    }
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "RE_LOGIN",
                data: {
                    user: user,
                    code: code,

                },
            }
        }));

    } else if (socket.readyState === WebSocket.CONNECTING) {
        setTimeout(() => {
            reLoginUser(user, code);
        }, 1000)
    } else {
        console.log("Socket is close")
    }
};
export const getUsersList = () => {
    if (!socket) return;
    const request = () => socket.send(JSON.stringify({
        action: "onchat",
        data: { event: "GET_USER_LIST" },
    }));

    if (socket.readyState === WebSocket.OPEN) {
        request();
    } else if (socket.readyState === WebSocket.CONNECTING) {
        setTimeout(request, 2000);
    } else {
        console.log("Socket is closed");
    }
};
export const logoutUsers = () => {
    if (!socket) return;
    socket.send(JSON.stringify({
        action: "onchat",
        data: {
            event: "LOGOUT",
        },
    }));
};

export const getPeopleChatMes = async (name) => {
    if (!socket) return;

    const sendMessage = () => {
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "GET_PEOPLE_CHAT_MES",
                data: {
                    name: name,
                    page: 1
                }
            }
        }));
    };

    if (socket.readyState === WebSocket.OPEN) {
        sendMessage();
    } else if (socket.readyState === WebSocket.CONNECTING) {
        const intervalId = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
                clearInterval(intervalId);
                sendMessage();
            }
        }, 100); // Retry every 100ms until connected
    } else {
        console.log("Socket is closed");
    }
};

export const register = (user, pass) => {
    if (!socket) return;
    socket.send(JSON.stringify({
        action: "onchat",
        data: {
            event: "REGISTER",
            data: {
                user,
                pass,
            },
        },
    }));
};
export const create_room = async (name) => {
    if (!socket) return;
    await socket.send(JSON.stringify({
        action: "onchat",
        data: {
            event: "CREATE_ROOM",
            data: {
                name: name
            }
        }
    }));

};
export const socketActions = {
    // registerUser: (user, pass) => store.dispatch(register(user, pass)),
    createChatRoom: (nameRoom) => store.dispatch(createRoom(socket, nameRoom)),
    joinChatRoom: (nameRoom) => store.dispatch(joinRoom(socket, nameRoom)),
    fetchRoomChatMessages: (roomName, page) => store.dispatch(getRoomChatMessages(socket, roomName, page)),
    // fetchPeopleChatMessages: (userName, page) => store.dispatch(getPeopleChatMessages(socket, userName, page)),
    sendChatRoom: (roomName, message) => store.dispatch(sendChatToRoom(socket, roomName, message)),
    sendChatPeople: (userName, message) => store.dispatch(sendChatToPeople(socket, userName, message)),
    checkIfUserExists: (userName) => store.dispatch(checkUser(socket, userName)),
    fetchUserList: () => store.dispatch(getUsersList(socket)),
    logoutUser: () => logoutUsers(),
};