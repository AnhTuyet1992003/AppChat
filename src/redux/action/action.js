// redux/actions/action.js
let messageQueue = [];

// action/action.js
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

// đặt lại trạng thái khi logout thành công tránh bi
export const RESET_LOGOUT_STATUS = 'RESET_LOGOUT_STATUS';
export const resetLogoutStatus = () => ({
    type: RESET_LOGOUT_STATUS,
});

// đăng nhập
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (data) => ({ type: LOGIN_SUCCESS, data });
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = (error) => ({ type: LOGIN_ERROR, error });
export const registerSuccess = (data) => ({type: REGISTER_SUCCESS, data: data});

// đăng ký
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const registerError = (error) => ({type: REGISTER_ERROR, error});

// lay danh sach nguoi da nhan tin
export const GET_USER_LIST_SUCCESS = 'GET_USER_LIST_SUCCESS';
export const GET_USER_LIST_FAILURE = 'GET_USER_LIST_FAILURE';
export const getUserListSuccess = (data) => ({type: GET_USER_LIST_SUCCESS, data});
export const getUserListFailure = (error) => ({type: GET_USER_LIST_FAILURE, error});

// ket noi lai khi tai lai trang hoac mat ket noi
export const RE_LOGIN_SUCCESS = 'RE_LOGIN_SUCCESS';
export const reLoginSuccess = (data) => ({ type: RE_LOGIN_SUCCESS, data });
export const RE_LOGIN_ERROR = 'RE_LOGIN_ERROR';
export const reLoginError = (error) => ({ type: RE_LOGIN_ERROR, error });

// Tạo phòng
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_ERROR = "CREATE_ROOM_ERROR";
export const createRoomSuccess = (data) => ({type: CREATE_ROOM_SUCCESS, data});
export const createRoomError = (error) => ({type: CREATE_ROOM_ERROR, error});

// Gửi tin nhắn
export const SEND_CHAT_TO_PEOPLE_SUCCESS = 'SEND_CHAT_TO_PEOPLE_SUCCESS';
export const sendChatToPeopleSuccess = (data) => ({ type: SEND_CHAT_TO_PEOPLE_SUCCESS, data });

//
export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
export const addNewMessage = (message) => ({
    type: ADD_NEW_MESSAGE,
    payload: message
});
export const SEND_CHAT_TO_PEOPLE_FAILURE = 'SEND_CHAT_TO_PEOPLE_FAILURE';
export const sendChatToPeopleFailure = (error) => ({ type: SEND_CHAT_TO_PEOPLE_FAILURE, error });
// Lay tin nhan cua 2 nguoi
export const GET_PEOPLE_CHAT_MES_SUCCESS = 'GET_PEOPLE_CHAT_MES_SUCCESS';
export const getPeopleChatMesSuccess = (data) => ({ type: GET_PEOPLE_CHAT_MES_SUCCESS, data });

export const GET_PEOPLE_CHAT_MES_FAILURE = 'GET_PEOPLE_CHAT_MES_FAILURE';
export const getPeopleChatMesFailure = (error) => ({ type: GET_PEOPLE_CHAT_MES_FAILURE, error });

// Tham gia phòng
export const JOIN_ROOM_SUCCESS = "JOIN_ROOM_SUCCESS";
export const joinRoomSuccess = (data) => ({type: JOIN_ROOM_SUCCESS, data});

export const JOIN_ROOM_FAILURE = "JOIN_ROOM_FAILURE";
export const joinRoomFailure = (error) => ({type: JOIN_ROOM_FAILURE, error});

// websocket actions
export const register = (socket, user, pass) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'REGISTER',
        data: { user, pass }
    }
});


export const checkUser = (socket, userName) => sendMessage(socket, {
    action: "onchat",
    data: {
        event: 'CHECK_USER',
        data: { user: userName }
    }
});