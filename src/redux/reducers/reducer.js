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
    LOGOUT_SUCCESS
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

    const mergeArraysById = (arr1, arr2, arr3) => {
        const mergedArray = arr1.reduce((result, item) => {
            const matchedItem = arr2.find((el) => item.name === el.username && item.type === 0);
            const matchedItem2 = arr3.find((el) => item.name === el.name && item.type === 1);

            if (matchedItem) {
                result.push({...item, ...matchedItem});
            }
            if (matchedItem2) {
                result.push({...item, ...matchedItem2});
            }

            return result;
        }, []);

        return mergedArray;
    };
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
                !(user.name === localStorage.getItem("user") && user.type === 0)
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
            return {
                ...state,
                logout: {status:'success',data: action.data},
            };
        default:
            return state;
    }
};
export default socketReducer;
