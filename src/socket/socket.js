// src/socket/socket.js
import store from "../redux/store/store";
import {
    createRoomSuccess,
    createRoomError,
    loginSuccess,
    loginError,
    sendChatToPeopleSuccess,
    sendChatToPeopleFailure,
    reLoginSuccess,
    logoutSuccess,
    getUserListSuccess,
    getUserListFailure,
    registerSuccess,
    registerError,
    logoutError,
    getPeopleChatMesSuccess,
    getPeopleChatMesFailure,
    joinRoomSuccess,
    joinRoomFailure,
    checkUserSuccess,
    checkUserError,
    addNewMessage,
    getRoomChatMesSuccess,
    getRoomChatMesFailure,
    sendChatToRoomSuccess,
    sendChatToRoomFailure,
} from "../redux/action/action";

export let socket;
export let isSocketOpen = false;
export const messageQueue = [];
const sendMessageInternal = (message) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else if (socket.readyState === WebSocket.CONNECTING) {
        messageQueue.push(message);
    } else {
        console.error("Socket is closed");
    }
};

export const initializeSocket = (url) => {
    if (socket && socket.readyState !== WebSocket.CLOSED) {
        return;
    }

    socket = new WebSocket(url);

    socket.onopen = () => {
        isSocketOpen = true;
        console.log('WebSocket connection opened.');
        while (messageQueue.length > 0) {
            const message = messageQueue.shift();
            sendMessageInternal(message);
        }
    };
    socket.onmessage = async (message) => {
        const response = JSON.parse(message.data);
        console.log('Received response:', response);
        if (!response.event) {
            console.error('Received response without event:', response);
            return;
        }
        if (response.event === "ADD_NEW_MESSAGE") {
            store.dispatch(addNewMessage(response.data));
            console.log('Dispatched ADD_NEW_MESSAGE:', response.data); // Thêm dòng này để kiểm tra dữ liệu được dispatch
        }
        switch (response.event) {
            case "ADD_NEW_MESSAGE":
                console.log('Dispatching ADD_NEW_MESSAGE with data:', response.data);
                await dispatch(addNewMessage(response.data));
                break;
            // xử lý các sự kiện khác
            case "REGISTER":
                if (response.status === "success") {
                    store.dispatch(registerSuccess(response.data));
                } else {
                    store.dispatch(registerError(response.mes));
                }
                break;
            case "LOGIN":
                if (response.status === "success") {
                    localStorage.setItem("reLogin", response.data.RE_LOGIN_CODE);

                    store.dispatch(loginSuccess(response.data));
                } else {
                    store.dispatch(loginError(response.error));
                }
                break;
            case "RE_LOGIN":
                if (response.status === "success") {
                    localStorage.setItem("reLogin", response.data.RE_LOGIN_CODE);
                    store.dispatch(reLoginSuccess(response.data));
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
                        store.dispatch(addNewMessage(response.data.message));
                    } else {
                        store.dispatch(sendChatToPeopleFailure(response.error));
                    }
                } else if (response.data.type === "room") {
                    if (response.status === "success") {
                        store.dispatch(sendChatToRoomSuccess(response.data));
                        store.dispatch(addNewMessage(response.data.message));
                    } else {
                        store.dispatch(sendChatToRoomFailure(response.error));
                    }
                }
                store.dispatch(getUsersList);
                break;
            case "LOGOUT":
                if (response.status === "success") {
                    localStorage.clear();
                    store.dispatch(logoutSuccess(response.data || {}));
                } else {
                    store.dispatch(logoutError(response.error));
                }
                break;
            case "GET_PEOPLE_CHAT_MES":
                if (response.status === "success") {
                    store.dispatch(getPeopleChatMesSuccess(response.data));
                } else {
                    store.dispatch(getPeopleChatMesFailure(response.error));
                }
                break;
            case "GET_ROOM_CHAT_MES":
                if (response.status === "success") {
                    store.dispatch(getRoomChatMesSuccess(response.data));
                } else {
                    store.dispatch(getRoomChatMesFailure(response.error));
                }
                break;
            case "CREATE_ROOM":
                if (response.status === "success") {
                    store.dispatch(createRoomSuccess(response.data));
                    getUsersList();  // Gọi lại getUsersList để cập nhật danh sách người dùng
                } else {
                    console.log(response.mes)
                    store.dispatch(createRoomError(response.mes));
                }
                break;
            case "JOIN_ROOM":
                if (response.status === "success") {
                    store.dispatch(joinRoomSuccess(response.data));
                    getUsersList();  // Gọi lại getUsersList để cập nhật danh sách người dùng
                } else {
                    store.dispatch(joinRoomFailure(response.mes));
                }
                break;
            case "CHECK_USER":
                if (response.status === "success") {
                    store.dispatch(checkUserSuccess(response.data)); // Gửi action CHECK_USER_SUCCESS với dữ liệu từ server
                } else {
                    store.dispatch(checkUserError(response.message)); // Gửi action CHECK_USER_ERROR nếu có lỗi
                }
                break;


            default:
                console.warn("Unhandled socket event:", response.event);
                break;
        }
    };
    socket.onclose = () => {
        //tái thiết lập lại socket
        isSocketOpen = false;
        console.log('WebSocket connection closed. Reconnecting in 5 seconds...');
        setTimeout(() => initializeSocket(url), 5000);
    };

    socket.onerror = (error) => {
        console.log("Socket error: ", error);
    };
};
// hàm đăng nhập
export const loginUser = (user, pass) => {
    if (!socket) return;
    // socket được mở
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user: user,
                    pass: pass,
                },
            },
        }));
        // đang trong quá trình kết nối
    } else if (socket.readyState === WebSocket.CONNECTING) {
        setTimeout(() => {
            loginUser(user, pass);
        }, 2000);
    } else {
        console.log("Socket is close")
    }
};
export const reLoginUser = (user, code) => {
    if (!socket) {
        return;
    }
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "RE_LOGIN",
                data: {
                    user: user,
                    code: code,

                },
            }
        }));

    } else if (socket.readyState === WebSocket.CONNECTING) {
        setTimeout(() => {
            reLoginUser(user, code);
        }, 1000)
    } else {
        console.log("Socket is close")
    }
};
// export const getUsersList = () => {
//     if (!socket) return;
//     const request = () => socket.send(JSON.stringify({
//         action: "onchat",
//         data: {event: "GET_USER_LIST"},
//     }));
//
//     if (socket.readyState === WebSocket.OPEN) {
//         request();
//     } else if (socket.readyState === WebSocket.CONNECTING) {
//         setTimeout(request, 2000);
//     } else {
//         console.log("Socket is closed");
//     }
// };
export const getUsersList = () => {
    if (!socket) return;
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "GET_USER_LIST",
            },
        }));
    } else if (socket.readyState === WebSocket.CONNECTING) {
        console.log("WebSocket connection is still in CONNECTING state. Retry in a moment.");
        setTimeout(() => {
            getUsersList();
        }, 1000); // Retry after 1 second
    } else {
        console.log("WebSocket connection is in CLOSING or CLOSED state.");
        // Re-establish the WebSocket connection or handle the error as needed
    }
};
export const logoutUsers = () => {
    if (!socket) return;
    socket.send(JSON.stringify({
        action: "onchat",
        data: {
            event: "LOGOUT",
        },
    }));
};

export const getPeopleChatMes = async (name) => {
    if (!socket) return;

    const sendMessage = () => {
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "GET_PEOPLE_CHAT_MES",
                data: {
                    name: name,
                    page: 1
                }
            }
        }));
    };

    if (socket.readyState === WebSocket.OPEN) {
        sendMessage();
    } else if (socket.readyState === WebSocket.CONNECTING) {
        const intervalId = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
                clearInterval(intervalId);
                sendMessage();
            }
        }, 100); // Retry every 100ms until connected
    } else {
        console.log("Socket is closed");
    }
};
export const getRoomChatMes = async (name) => {
    if (!socket) return;

    const sendMessage1 = () => {
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "GET_ROOM_CHAT_MES",
                data: {
                    name: name,
                    page: 1
                }
            }
        }));
    };

    if (socket.readyState === WebSocket.OPEN) {
        sendMessage1();
    } else if (socket.readyState === WebSocket.CONNECTING) {
        const intervalId = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
                clearInterval(intervalId);
                sendMessage1();
            }
        }, 100); // Retry every 100ms until connected
    } else {
        console.log("Socket is closed");
    }
};

export const register = (user, pass) => {
    if (!socket) return;
    socket.send(JSON.stringify({
        action: "onchat",
        data: {
            event: "REGISTER",
            data: {
                user,
                pass,
            },
        },
    }));
};
export const create_room = async (name) => {
    if (!socket) return;
    await socket.send(JSON.stringify({
        action: "onchat",
        data: {
            event: "CREATE_ROOM",
            data: {
                name: name
            }
        }
    }));

};
export const joinRoom = (name) => {
    if (!socket) return;
    socket.send(JSON.stringify({
        action: "onchat",
        data: {
            event: "JOIN_ROOM",
            data: {
                name: name
            }
        }
    }));
};
export const sendChatToPeople = (to, message) => {
    if (!socket) return;

    const sendMessage = () => {
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: "people",
                    to: to,
                    mes: message
                }
            }
        }));
    };

    if (socket.readyState === WebSocket.OPEN) {
        sendMessage();
    } else if (socket.readyState === WebSocket.CONNECTING) {
        const intervalId = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
                clearInterval(intervalId);
                sendMessage();
            }
        }, 100); // Retry every 100ms until connected
    } else {
        console.log("Socket is closed");
    }
};
export const sendChatToRoom = (to, message) => {
    if (!socket) return;

    const sendMessage = () => {
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: "room",
                    to: to,
                    mes: message
                }
            }
        }));
    };

    if (socket.readyState === WebSocket.OPEN) {
        sendMessage();
    } else if (socket.readyState === WebSocket.CONNECTING) {
        const intervalId = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
                clearInterval(intervalId);
                sendMessage();
            }
        }, 100); // Retry every 100ms until connected
    } else {
        console.log("Socket is closed");
    }
};

export const checkUser = (user) => {
    return new Promise((resolve, reject) => {
        // Gửi yêu cầu tới server
        const sendMessage = () => {
            const message = JSON.stringify({
                action: "onchat",
                data: {
                    event: "CHECK_USER",
                    data: {
                        user: user
                    }
                }
            });

            console.log("Sending request to server:", message); // Log the message to console

            socket.send(message);
        };

        // Xử lý phản hồi từ server
        const handleResponse = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data && data.event === "CHECK_USER") {
                    if (data.status === "success" && data.data && typeof data.data.status === "boolean") {
                        resolve(data.data.status ? "online" : "offline"); // Trả về 'online' nếu true, 'offline' nếu false
                    } else {
                        reject("Invalid data format from server");
                    }
                }
            } catch (error) {
                reject("Error parsing server response");
            }
        };

        // Xử lý lỗi khi gửi hoặc nhận tin nhắn từ server
        const handleError = (error) => {
            reject(error); // Xử lý lỗi socket
        };

        // Đăng ký các event listener cho socket
        socket.addEventListener("message", handleResponse);
        socket.addEventListener("error", handleError);

        // Kiểm tra trạng thái socket và gửi tin nhắn
        if (socket.readyState === WebSocket.OPEN) {
            sendMessage();
        } else if (socket.readyState === WebSocket.CONNECTING) {
            const intervalId = setInterval(() => {
                if (socket.readyState === WebSocket.OPEN) {
                    clearInterval(intervalId);
                    sendMessage();
                }
            }, 100); // Thử lại mỗi 100ms cho đến khi kết nối thành công
        } else {
            reject("Socket is closed"); // Xử lý socket đã đóng
        }
    });
};

export const socketActions = {
    logoutUser: () => logoutUsers(),
};