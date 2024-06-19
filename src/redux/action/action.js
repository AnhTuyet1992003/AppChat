// redux/actions/action.js
let messageQueue = [];


export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const logoutSuccess = (data) => ({
    type: LOGOUT_SUCCESS,
    data: data || {}
});

export const logoutError = (error) => ({
    type: LOGOUT_ERROR,
    error
});
// action/action.js
export const RESET_LOGOUT_STATUS = 'RESET_LOGOUT_STATUS';

export const resetLogoutStatus = () => ({
    type: RESET_LOGOUT_STATUS,
});
export const sendMessage = (socket, message) => {
    if (socket) {
        socket.send(JSON.stringify(message));
        return {
            type: 'SEND_MESSAGE',
            payload: message
        };
    }
};
// login
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (data) => ({ type: LOGIN_SUCCESS, data });
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = (error) => ({ type: LOGIN_ERROR, error });
export const registerSuccess = (data) => ({type: REGISTER_SUCCESS, data: data});

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const registerError = (error) => ({type: REGISTER_ERROR, error});


export const GET_USER_LIST_SUCCESS = 'GET_USER_LIST_SUCCESS';
export const GET_USER_LIST_FAILURE = 'GET_USER_LIST_FAILURE';
export const getUserListSuccess = (data) => ({type: GET_USER_LIST_SUCCESS, data});
export const getUserListFailure = (error) => ({type: GET_USER_LIST_FAILURE, error});

export const RE_LOGIN_SUCCESS = 'RE_LOGIN_SUCCESS';
export const reLoginSuccess = (data) => ({ type: RE_LOGIN_SUCCESS, data });
export const RE_LOGIN_ERROR = 'RE_LOGIN_ERROR';
export const reLoginError = (error) => ({ type: RE_LOGIN_ERROR, error });
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_ERROR = "CREATE_ROOM_ERROR";
export const createRoomSuccess = (data) => ({type: CREATE_ROOM_SUCCESS, data});
export const createRoomError = (error) => ({type: CREATE_ROOM_ERROR, error});

// send chat to people
export const SEND_CHAT_TO_PEOPLE_SUCCESS = 'SEND_CHAT_TO_PEOPLE_SUCCESS';
export const sendChatToPeopleSuccess = (data) => ({ type: SEND_CHAT_TO_PEOPLE_SUCCESS, data });

export const SEND_CHAT_TO_PEOPLE_FAILURE = 'SEND_CHAT_TO_PEOPLE_FAILURE';
export const sendChatToPeopleFailure = (error) => ({ type: SEND_CHAT_TO_PEOPLE_FAILURE, error });

// websocket actions
export const register = (socket, user, pass) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'REGISTER',
        data: { user, pass }
    }
});


export const createRoom = (socket, nameRoom) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'CREATE_ROOM',
        data: { name: nameRoom }
    }
});

export const joinRoom = (socket, nameRoom) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'JOIN_ROOM',
        data: { name: nameRoom }
    }
});

export const getRoomChatMessages = (socket, roomName, page) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'GET_ROOM_CHAT_MES',
        data: { name: roomName, page }
    }
});

export const getPeopleChatMessages = (socket, userName, page) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'GET_PEOPLE_CHAT_MES',
        data: { name: userName, page }
    }
});

export const sendChatToRoom = (socket, roomName, message) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'SEND_CHAT',
        data: { type: "room", to: roomName, mes: message }
    }
});

export const sendChatToPeople = (socket, userName, message) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'SEND_CHAT',
        data: { type: "people", to: userName, mes: message }
    }
});

export const checkUser = (socket, userName) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'CHECK_USER',
        data: { user: userName }
    }
});
