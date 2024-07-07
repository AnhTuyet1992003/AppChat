
import {
    GET_USER_LIST_FAILURE,
    GET_USER_LIST_SUCCESS,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    RE_LOGIN_ERROR,
    RE_LOGIN_SUCCESS,
    SEND_CHAT_TO_PEOPLE_FAILURE,
    SEND_CHAT_TO_PEOPLE_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    RESET_STATUS,
    GET_PEOPLE_CHAT_MES_SUCCESS,
    GET_PEOPLE_CHAT_MES_FAILURE,
    JOIN_ROOM_SUCCESS,
    JOIN_ROOM_FAILURE,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_ERROR,
    CHECK_USER_SUCCESS,
    CHECK_USER_ERROR,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    SEND_CHAT_TO_ROOM_SUCCESS,
    SEND_CHAT_TO_ROOM_FAILURE,
    GET_ROOM_CHAT_MES_SUCCESS, GET_ROOM_CHAT_MES_FAILURE, SEND_CHAT_SUCCESS,

} from "../action/action";
import { format } from 'date-fns'; // Import format từ date-fns
import {sendChatToPeople} from "../../socket/socket"
const initialState = {
    register: {},
    login: {},
    logout: {},
    listUser:{},
    messages: { data: [], error: null },
    message1:{data:[]},
    active: { name: '', type: null },
    userList: { data: null, error: null },
    checkUser: { status: null, data: null, error: null }, // Thêm trạng thái kiểm tra người dùng
    userStatuses: [],
    joinRoom: { status: null, data: null, error: null }, // Thêm trạng thái joinRoom
    createRoom: { status: null, data: null, error: null }, // Thêm trạng thái createRoom

};

const socketReducer = (state = initialState, action) => {

    console.log('Action received:', action);

    if (!action || !action.type) {
        console.error('Received action without type:', action);
        return state;
    }

    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                register: {status: 'success', data: action.data}
            };
        case REGISTER_ERROR:
            return {
                ...state,
                register: {status: 'error', error: action.error}
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                login: {status: 'success', data: action.data},
            };
        case LOGIN_ERROR:
            return {
                ...state,
                login: {status: 'error', data: action.error},
            };
        case RE_LOGIN_SUCCESS:
            return {
                ...state,
                login: {status: 'success', data: action.data},
            };
        case RE_LOGIN_ERROR:
            return {
                ...state,
                login: {status: 'error', data: action.error},
            };

        case GET_USER_LIST_SUCCESS:
            const userList = action.data;
            let userListRemoveMySelf = userList.filter(user =>
                !(user.name === localStorage.getItem("username") && user.type === 0)
            );
            return {
                ...state,
                userList: {data: userListRemoveMySelf, error: null}
            };
        case GET_USER_LIST_FAILURE:
            return {
                ...state,
                userList: {data: null, error: action.error},
            };
        case SEND_CHAT_TO_PEOPLE_SUCCESS:
            let newmess = action.payload;
            if (state.userList.data && state.userList.data.findIndex(user => user && user.name === newmess.name && user.type === newmess.type) === -1) {
                // Nếu không có, gửi tin nhắn trống đến người dùng mới để khởi tạo cuộc trò chuyện
                sendChatToPeople(newmess.name, "");
            }
            // Kiểm tra xem nội dung tin nhắn mới có rỗng không
            if (newmess.mes !== "") {
                sendChatToPeople(newmess.name, "");
            }

            return {
                ...state,
                messages: { data: [...state.messages.data, newmess], error: null }
            };
        case SEND_CHAT_TO_PEOPLE_FAILURE:
            return {
                ...state,
                messages: {data: null, error: action.error},
            };
        case SEND_CHAT_TO_ROOM_SUCCESS:
            return {
                ...state,
                messages: {data: action.data, error: null},
            };
        case SEND_CHAT_TO_ROOM_FAILURE:
            return {
                ...state,
                messages: {data: null, error: action.error},
            };
        case SEND_CHAT_SUCCESS:
            let newmess3 = action.data;
            newmess3.createAt = format(new Date(new Date().getTime() - 25200000), 'yyyy-MM-dd HH:mm:ss');
            return {...state, message: {data: [...state.message.data, newmess3], error: action.error}};
        case LOGOUT_SUCCESS:
            console.log('Processing LOGOUT_SUCCESS action');
            return {
                ...state,
                logout: {status: 'success', data: action.data},
                login: {},
                userList: {data: null, error: null},
            };
        case LOGOUT_ERROR:
            return {
                ...state,
                logout: {status: 'error', error: action.error}
            };
        case RESET_STATUS:
            return {
                ...state,
                logout: {},
                register: {},
            };
        case JOIN_ROOM_SUCCESS:
            const roomJoin = action.data.chatData;
            return {
                ...state,
                messages: {error: null},
                joinRoom: {data: [...(state.joinRoom.data || []), roomJoin], error: null, status: 'success'}
            };
        case JOIN_ROOM_FAILURE:
            return {
                ...state,
                joinRoom: {data: state.joinRoom.data, error: action.error, status: 'error'}
            };
        case CREATE_ROOM_SUCCESS:
            const room = action.data;
            return {
                ...state,
                messages: {error: null},
                createRoom: {data: [...(state.createRoom.data || []), room], error: null, status: 'success'}
            };
        case CREATE_ROOM_ERROR:
            return {
                ...state,
                createRoom: {data: state.createRoom.data, error: action.error, status: 'error'}
            };
        case CHECK_USER_SUCCESS:
            return {
                ...state,
                userStatuses: action.data, // Update userStatuses with data received
            };
        case CHECK_USER_ERROR:
            return {
                ...state,
                userStatuses: [], // Reset userStatuses or handle error case

            };

        case GET_PEOPLE_CHAT_MES_SUCCESS:
            return {
                ...state,
                messages: {data: action.data, error: null},
            };
        case GET_PEOPLE_CHAT_MES_FAILURE:
            return {
                ...state,
                messages: {data: [], error: action.error}
            };
        case GET_ROOM_CHAT_MES_SUCCESS:
            const newList = action.data.userList.map(user => ({name: user.name}));
            // Phần tử mới
            const newElement = {name: action.data.own};
            // Sử dụng toán tử spread
            const finalList = [newElement, ...newList];
            return {
                ...state,
                messages: {data: action.data.chatData, error: null},
                message1: {data: action.data.chatData},
                listUser: finalList
            };
        case GET_ROOM_CHAT_MES_FAILURE:
            // const messroom = action.data;
            return {
                ...state,
                messages: {data: [], error: action.error}
            };
        default:
            return state;
    }
};

export default socketReducer;
