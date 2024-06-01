// src/socket/socket.js
import store from "../redux/store/store";
import {
    login,
    register,
    logout,
    creatRoom,
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
    getUserListSucces,
    getUserListSuccess,
    getUserListFailure,
    sendChatToPeopleSuccess,
    sendChatToPeopleFailure
} from "../redux/action/action";

let socket = null;

export const initializeSocket = (url) => {
    socket = new WebSocket(url);
    socket.onmessage = async (message) => {
        const response = JSON.parse(message.data);
        switch (response.event){
            case "REGISTER":
                if (response.status === "success"){
                    // store.dispatch()
                } else {
                    // Handle failure
                }
                break;
            case "LOGIN":
                if (response.status === "success"){
                    store.dispatch(loginSuccess(response.data));
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
        }
    }
};

export const socketActions = {
    registerUser: (user, pass) => store.dispatch(register(socket, user, pass)),
    loginUser: (user, pass) => store.dispatch(login(socket, user, pass)),
    reLoginUser: (user, code) => store.dispatch(reLogin(socket, user, code)),
    logoutUser: () => store.dispatch(logout(socket)),
    createChatRoom: (nameRoom) => store.dispatch(creatRoom(socket, nameRoom)),
    joinChatRoom: (nameRoom) => store.dispatch(joinRoom(socket, nameRoom)),
    fetchRoomChatMessages: (roomName, page) => store.dispatch(getRoomChatMessages(socket, roomName, page)),
    fetchPeopleChatMessages: (userName, page) => store.dispatch(getPeopleChatMessages(socket, userName, page)),
    sendChatRoom: (roomName, message) => store.dispatch(sendChatToRoom(socket, roomName, message)),
    sendChatPeople: (userName, message) => store.dispatch(sendChatToPeople(socket, userName, message)),
    checkIfUserExists: (userName) => store.dispatch(checkUser(socket, userName)),
    fetchUserList: () => store.dispatch(getUserList(socket))
};
