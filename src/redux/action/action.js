
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (data) => ({type: LOGIN_SUCCESS, data});
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = (error) => ({type: LOGIN_ERROR, error});
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const logoutSuccess = () => ({type: LOGOUT_SUCCESS});
export const logoutError = (error) => ({type: LOGOUT_ERROR, error});
export const sendMessage = (socket, message) => {
    if (socket) {
        socket.send(JSON.stringify(message));
        return {
            type: 'SEND_MESSAGE',
            payload: message
        };
    }
};

//websocket action
export const register = (socket, user, pass) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'REGISTER',
        data: { user, pass}
    }
});

export const login = (socket, user, pass) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'LOGIN',
        data: { user, pass}
    }
});

export const reLogin = (socket, user, code) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'RE_LOGIN',
        data: { user, code}
    }
});

export const logout = (socket) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'LOGOUT',
    }
});

export const creatRoom = (socket, nameRoom) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'CREATE_ROOM',
        data: { name: nameRoom}
    }
});

export const joinRoom = (socket, nameRoom) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'JOIN_ROOM',
        data: { name: nameRoom}
    }
});

export const getRoomChatMessages = (socket, roomName, page) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'GET_ROOM_CHAT_MES',
        data: { name: roomName, page}
    }
});

export const getPeopleChatMessages = (socket, userName, page) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'GET_PEOPLE_CHAT_MES',
        data: { name: userName, page}
    }
});

export const sendChatToRoom = (socket, roomName, message) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'SEND_CHAT',
        data: { type: "room", to: roomName, mes: message}
    }
});

export const sendChatToPeople = (socket, userName, message) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'SEND_CHAT',
        data: { type: "people", to: userName, mes: message}
    }
});

export const checkUser = (socket, userName) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'CHECK_USER',
        data: { user: userName}
    }
});

export const getUserList = (socket) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'GET_USER_LIST',
    }
});