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
    ADD_NEW_MESSAGE,
    CHECK_USER_SUCCESS,
    CHECK_USER_ERROR, REGISTER_SUCCESS, REGISTER_ERROR,
} from "../action/action";

const initialState = {
    register: {},
    login: {},
    logout: {},
    messages: { data: [], error: null },
    active: { name: '', type: null },
    userList: { data: null, error: null },
    checkUser: { status: null, data: null, error: null }, // Thêm trạng thái kiểm tra người dùng
    userStatuses: {}, // Thêm trạng thái của bạn bè
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
                register: {status: 'success', data: action.data}};
        case REGISTER_ERROR:
            return {
                ...state,
                register: {status: 'error', error: action.error}};
        case LOGIN_SUCCESS:
            return {
                ...state,
                login: { status: 'success', data: action.data },
            };
        case LOGIN_ERROR:
            return {
                ...state,
                login: { status: 'error', data: action.error },
            };
        case RE_LOGIN_SUCCESS:
            return {
                ...state,
                login: { status: 'success', data: action.data },
            };
        case RE_LOGIN_ERROR:
            return {
                ...state,
                login: { status: 'error', data: action.error },
            };

        case GET_USER_LIST_SUCCESS:
            const userList = action.data;
            let userListRemoveMySelf = userList.filter(user =>
                !(user.name === localStorage.getItem("username") && user.type === 0)
            );
            return {
                ...state,
                userList: { data: userListRemoveMySelf, error: null }
            };
        case GET_USER_LIST_FAILURE:
            return {
                ...state,
                userList: { data: null, error: action.error },
            };
        case SEND_CHAT_TO_PEOPLE_SUCCESS:
            return {
                ...state,
                messages: { data: action.data, error: null },
            };
        case SEND_CHAT_TO_PEOPLE_FAILURE:
            return {
                ...state,
                messages: { data: null, error: action.error },
            };
        case LOGOUT_SUCCESS:
            console.log('Processing LOGOUT_SUCCESS action');
            return {
                ...state,
                logout: { status: 'success', data: action.data },
                login: {},
                userList: { data: null, error: null },
            };
        case LOGOUT_ERROR:
            return {
                ...state,
                logout: { status: 'error', error: action.error }
            };
        case RESET_STATUS:
            return {
                ...state,
                logout: {},
                register: {},
            };
        case JOIN_ROOM_SUCCESS:
            const roomJoin = action.data;
            return {
                ...state,
                messages: { error: null },
                joinRoom: { data: [...(state.joinRoom.data || []), roomJoin], error: null, status: 'success' }
            };
        case JOIN_ROOM_FAILURE:
            return {
                ...state,
                joinRoom: { data: state.joinRoom.data, error: action.error, status: 'error' }
            };
        case CREATE_ROOM_SUCCESS:
            const room = action.data;
            return {
                ...state,
                messages: { error: null },
                createRoom: { data: [...(state.createRoom.data || []), room], error: null, status: 'success' }
            };
        case CREATE_ROOM_ERROR:
            return {
                ...state,
                createRoom: { data: state.createRoom.data, error: action.error, status: 'error' }
            };
        case CHECK_USER_SUCCESS:
            if (action.payload && action.payload.user) {
                return {
                    ...state,
                    userStatuses: {
                        ...state.userStatuses,
                        [action.payload.user]: action.payload.status === 'online' ? 'online' : 'offline',
                    },
                    checkUser: { status: 'success', data: action.payload, error: null },
                };
            } else {
                return state; // Xử lý nếu action.payload không hợp lệ
            }

        case CHECK_USER_ERROR:
            return {
                ...state,
                checkUser: { status: 'error', data: null, error: action.payload },
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
        case ADD_NEW_MESSAGE:
            console.log('Reducer - ADD_NEW_MESSAGE:', action.payload); // Thêm dòng này để kiểm tra dữ liệu được nhận vào reducer
            return {
                ...state,
                messages: { data: [...state.messages.data, action.payload], error: null }
            };
        default:
            return state;
    }
};

export default socketReducer;
