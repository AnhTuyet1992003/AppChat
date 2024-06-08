// src/socket/socket.js
import store from "../redux/store/store";
// src/socket/socket.js
import {
    login,
    register,
    logout,
    createRoom,
    joinRoom,
    getRoomChatMessages,
    getPeopleChatMessages,
    sendChatToRoom,
    sendChatToPeople,
    checkUser,
    getUserList,
    reLogin,
    loginSuccess,
    loginError,
    getUserListSuccess,
    getUserListFailure,
    sendChatToPeopleSuccess,
    sendChatToPeopleFailure,
    sendMessage, reLoginSuccess,
    logoutSuccess,
    logoutError
} from "../redux/action/action";

let socket = null;
let messageQueue = [];
let isSocketOpen = false;

const sendMessageInternal = (socket, message) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        messageQueue.push(message);
    }
};

export const initializeSocket = (url) => {
    socket = new WebSocket(url);
    socket.onopen = () => {
        isSocketOpen = true;
        while (messageQueue.length > 0) {
            const message = messageQueue.shift();
            sendMessageInternal(socket, message);
        }
    };
    socket.onmessage = async (message) => {
        const response = JSON.parse(message.data);
        switch (response.event) {
            // xử lý các sự kiện khác
            case "REGISTER":
                if (response.status === "success") {
                    // store.dispatch()
                } else {
                    // Handle failure
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
            default:
                break;
            case "LOGOUT":
                if (response.status === "success") {
                    localStorage.clear();
                    store.dispatch(logoutSuccess());
                } else {
                    store.dispatch(logoutError(response.mes));
                }
                break;
        }
    };
    socket.onclose = () => {
        //tái thiết lập lại socket
        initializeSocket(url);
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
        }, 1000);
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
        }, 100) //0.1s
    } else {
        console.log("Socket is close")
    }
};

export const socketActions = {
    registerUser: (user, pass) => store.dispatch(register(socket, user, pass)),
    logoutUser: () => store.dispatch(logout(socket)),
    createChatRoom: (nameRoom) => store.dispatch(createRoom(socket, nameRoom)),
    joinChatRoom: (nameRoom) => store.dispatch(joinRoom(socket, nameRoom)),
    fetchRoomChatMessages: (roomName, page) => store.dispatch(getRoomChatMessages(socket, roomName, page)),
    fetchPeopleChatMessages: (userName, page) => store.dispatch(getPeopleChatMessages(socket, userName, page)),
    sendChatRoom: (roomName, message) => store.dispatch(sendChatToRoom(socket, roomName, message)),
    sendChatPeople: (userName, message) => store.dispatch(sendChatToPeople(socket, userName, message)),
    checkIfUserExists: (userName) => store.dispatch(checkUser(socket, userName)),
    fetchUserList: () => store.dispatch(getUserList(socket))
};