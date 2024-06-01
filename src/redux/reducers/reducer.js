import {
    LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_SUCCESS,

} from "../action/action";
import data from "bootstrap/js/src/dom/data";

const initialState = {
    register: {},
    login: {},
    userList: {data: null, error: null},
    logout: {},
    isConnected: false,
    messages: {data: null, error: null},
    active: {name: '', type: null}
};

const socketReducer = (state = initialState, action) => {
    console.log('Action received:', action);
    switch (action.type) {
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
        case LOGOUT_SUCCESS:
            return {
                ...state,
                logout: {status:'success',data: action.data},
            };
        default:
            return state;
    }
}
export default socketReducer;
