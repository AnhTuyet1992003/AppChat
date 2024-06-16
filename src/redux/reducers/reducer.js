
// reducer.js
import {
    GET_USER_LIST_FAILURE,
    GET_USER_LIST_SUCCESS,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    RE_LOGIN_ERROR,
    RE_LOGIN_SUCCESS,
    SEND_CHAT_TO_PEOPLE_FAILURE,
    SEND_CHAT_TO_PEOPLE_SUCCESS,
    LOGOUT_SUCCESS, LOGOUT_ERROR, RESET_LOGOUT_STATUS, NOT_LOGIN
} from "../action/action";
import data from "bootstrap/js/src/dom/data";

const initialState = {
    register: {},
    login: {},
    logout: {},
    messages: { data: null, error: null },
    active: { name: '', type: null },
    userList: { data: null, error: null },
    userData: {},
    active2: {},
    data2: {},
    data3: {},

};

const socketReducer = (state = initialState, action) => {

    console.log('Action received:', action);

    if (!action || !action.type) {
        console.error('Received action without type:', action);
        return state;
    }
    switch (action.type) {
        case NOT_LOGIN:
            return {
                ...state,
                login: {},
            };
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
        case RESET_LOGOUT_STATUS:
            return {
                ...state,
                logout: {},
            };
        default:
            return state;
    }
};
export default socketReducer;
