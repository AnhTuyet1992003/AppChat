// reducer.js
import {
    GET_USER_LIST_FAILURE,
    GET_USER_LIST_SUCCESS,
    LOGIN_ERROR, LOGIN_SUCCESS, SEND_CHAT_TO_PEOPLE_FAILURE, SEND_CHAT_TO_PEOPLE_SUCCESS,

} from "../action/action";
import data from "bootstrap/js/src/dom/data";

const initialState = {
    register: {},
    login: {},
    userList: { data: null, error: null },
    logout: {},
    isConnected: false,
    messages: { data: null, error: null },
    active: { name: '', type: null }
};

const socketReducer = (state = initialState, action) => {
    console.log('Action received:', action);
    switch (action.type) {
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
        case GET_USER_LIST_SUCCESS:
            return {
                ...state,
                userList: { data: action.data, error: null },
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
        default:
            return state;
    }
};
export default socketReducer;
