import React, { useEffect, useState, useCallback } from 'react';
import {
    checkUser,
    create_room,
    getPeopleChatMes,
    getUsersList,
    initializeSocket,
    joinRoom,
    reLoginUser
} from "../../../../socket/socket";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form, Toast} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../../App.css'

function ChatTab({ toggleSidebar }) {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList.data || []);
    const navigate = useNavigate();
    const login = useSelector((state) => state.login);
    // Tạo phòng
    const [groupName, setGroupName] = useState('');
    const [groupInfo, setGroupInfo] = useState('');
    const createRoomStatus = useSelector(state => state.createRoom.status);

    // Tham gia phòng
    const [roomName, setRoomName] = useState('');
    const joinRoomStatus = useSelector(state => state.joinRoom.status);

    // State quản lý việc hiển thị modal
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalClosed, setModalClosed] = useState(true);

    // State quản lý thông báo lỗi và toast
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessageCreate, setSuccessMessageCreate] = useState('');
    const [errorMessageCreate, setErrorMessageCreate] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (!login.status) {
            if (localStorage.getItem("reLogin") !== null) {
                // Reconnect socket
                initializeSocket('ws://140.238.54.136:8080/chat/chat');
                reLoginUser(localStorage.getItem("username"), localStorage.getItem("reLogin"));
            } else {
                navigate("/login");
            }
        }
    }, [dispatch, navigate, login]);

    useEffect(() => {
        getUsersList();
    }, [dispatch]);

    // Danh sách các người dùng
    const friendsList = userList.filter(user => user.type === 0);
    const groupsList = userList.filter(user => user.type === 1);

    // Sự kiện khi bấm vào 1 người hoặc 1 nhóm để mở đoạn chat
    const handleUserClick = (name) => {
        // Lấy tin nhắn người đó
        getPeopleChatMes(name);
        // Chuyển trang tới cuộc trò chuyện của người đó
        navigate(`/Home/${name}`);
    };

    // Sự kiện bấm vào dấu + để mở bảng
    const handlePlusClick = () => {
        setShowModal(true);
    };

    // Đóng các bảng modal
    const handleCloseModal = () => {
        setShowModal(false);
        setShowJoinModal(false);
        setShowCreateModal(false);
        setErrorMessageCreate('');
        setSuccessMessageCreate('');
        setErrorMessage('');
        setSuccessMessage('');
        setShowToast(false);
        setModalClosed(true); // Đánh dấu là đã đóng modal
        // Reset các state khi đóng modal
        setRoomName('');
        setGroupName('');
        setGroupInfo('');
    };

    const handleJoinClick = () => {
        setShowModal(false);
        setShowJoinModal(true);
    };

    const handleCreateClick = () => {
        setShowModal(false);
        setShowCreateModal(true);
    };

    // Tham gia phòng
    useEffect(() => {
        if (!modalClosed) {
            if (joinRoomStatus === "success") {
                setErrorMessage("");
                setSuccessMessage("Bạn đã tham gia thành công!");
            } else if (joinRoomStatus === "error") {
                setErrorMessage("Phòng không tồn tại. Vui lòng kiểm tra lại.");
                setShowToast(true);
            }
        }
    }, [joinRoomStatus, navigate, roomName, modalClosed]);

    // Tạo phòng
    useEffect(() => {
        if (!modalClosed) {
            if (createRoomStatus === "success") {
                setErrorMessageCreate("");
                setSuccessMessageCreate("Bạn đã tạo phòng thành công!");
            } else if (createRoomStatus === "error") {
                setErrorMessageCreate("Phòng đã tồn tại. Vui lòng nhập tên khác!");
                setShowToast(true);
            }
        }
    }, [createRoomStatus, navigate, groupName, modalClosed]);

    const handleRoomNameChange = (e) => setRoomName(e.target.value);
    // Su kien tham gia phong
    const handleJoinRoom = async (e) => {
        e.preventDefault(); // ngăn các sự kiện click
        if (roomName.trim()) {
            await joinRoom(roomName);
            setModalClosed(false);
            navigate(`/Home/${roomName}`);
        } else {
            setErrorMessage("Vui lòng nhập tên nhóm.");
            setShowToast(true);
        }
    };

    const handleGroupNameChange = (e) => setGroupName(e.target.value);

    const handleCreateRoom = async () => {
        // Reset error message
        setErrorMessageCreate('');
        // Check if groupName is empty
        if (groupName.trim() === '') {
            setErrorMessageCreate('Vui lòng nhập tên nhóm');
            setShowToast(true);
            return;
        }

        try {
            await create_room(groupName, groupInfo);
            setModalClosed(false);
            navigate(`/Home/${groupName}`);
        } catch (error) {
            setErrorMessageCreate('Phòng đã tồn tại. Vui lòng nhập tên khác!');
            setShowToast(true);
            console.error('Error creating room:', error);
        }
    };

    // Memoize the checkUser function
     const memoizedCheckUser = useCallback((name) => checkUser(name), []);



    return (
        <div className="d-flex flex-column h-100">
            <div className="tab-header d-flex align-items-center border-bottom">
                <ul className="d-flex justify-content-between align-items-center list-unstyled w-100 mx-4 mb-0">
                    <li className="d-flex justify-content-between align-items-center w-100">
                        <h3 className="mb-0">Chats</h3>
                        <FontAwesomeIcon icon={faPlus} size="2x" onClick={handlePlusClick}/>
                    </li>
                    <li>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <button
                                    className="navigation-toggle btn btn-secondary btn-icon d-xl-none"
                                    type="button"
                                    onClick={toggleSidebar}
                                >
                                    <i className="ri-menu-line"/>
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="text-center mb-3">
                <ul className="nav nav-pills nav-segmented" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a
                            aria-controls="pills-direct-tab"
                            aria-selected="true"
                            className="nav-link active"
                            data-bs-toggle="pill"
                            href="#direct-tab"
                            id="pills-direct-tab"
                            role="tab"
                        >
                            Bạn bè
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            aria-controls="pills-group-tab"
                            aria-selected="false"
                            className="nav-link"
                            data-bs-toggle="pill"
                            href="#groups-tab"
                            id="pills-group-tab"
                            role="tab"
                        >
                            Nhóm
                        </a>
                    </li>
                </ul>
            </div>
            <div className="hide-scrollbar h-100">
                <div className="tab-content m-4 mt-1">
                    <div className="tab-pane fade show active" id="direct-tab" role="tabpanel">
                        <ul className="list-unstyled js-contact-list mb-0">
                            {friendsList.length === 0 ? (
                                <li>Loading...</li>
                            ) : (
                                friendsList.map((user, index) => (
                                    <li className="card contact-item"
                                        key={index}
                                        onClick={() => handleUserClick(user.name)}
                                    >
                                        <a className="contact-link" href="#"/>
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">

                                                <AvatarComponent key={user.name}  userName={user.name} checkUser={memoizedCheckUser} />
                                                <span
                                                    className="avatar-label bg-soft-info text-info">{user.name.charAt(0)}</span>
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="d-flex align-items-center mb-1">
                                                    <h5 className="text-truncate mb-0 me-auto">{user.name}</h5>
                                                    <p className="small text-muted text-nowrap ms-4 mb-0">14/03</p>

                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="line-clamp me-auto">
                                                        Hi, {user.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className="tab-pane fade" id="groups-tab" role="tabpanel">
                        {groupsList.length === 0 ? (
                            <ul className="list-unstyled">
                                <li>Loading...</li>
                            </ul>
                        ) : (
                            <ul className="list-unstyled js-contact-list mb-0">
                                {groupsList.map((group, index) => (
                                    <li className="card contact-item mb-3"
                                        key={index}
                                        onClick={() => handleUserClick(group.name)}
                                    >
                                        <a className="contact-link" href="#"/>
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar avatar-online me-4">
                                                    <span
                                                        className="avatar-label bg-soft-info text-info">{group.name.charAt(0)}</span>
                                                </div>
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <div className="d-flex align-items-center mb-1">
                                                        <h5 className="text-truncate mb-0 me-auto">{group.name}</h5>
                                                        <p className="small text-muted text-nowrap ms-4 mb-0">11:45
                                                            AM</p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="line-clamp me-auto">
                                                            Hi, {group.name}
                                                        </div>
                                                        <span className="badge rounded-pill bg-primary ms-2">5</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="card-footer d-flex align-items-center justify-content-between overflow-hidden">
                                            <h5 className="mb-0 text-truncate">General</h5>
                                            <p className="mb-0 small text-muted text-nowrap">
                                                Members
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Lựa chọn</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <Button variant="primary" onClick={handleCreateClick} className="m-2">
                        Tạo phòng
                    </Button>
                    <Button variant="secondary" onClick={handleJoinClick} className="m-2">
                        Tham gia phòng
                    </Button>
                </Modal.Body>
            </Modal>
            <Modal show={showJoinModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Tham gia phòng chat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="joinGroupName" className="input-group-custom">
                            <Form.Control
                                type="text"
                                placeholder=" "
                                value={roomName}
                                onChange={handleRoomNameChange}
                            />
                            <Form.Label>Nhập tên phòng</Form.Label>
                        </Form.Group>
                    </Form>
                    {successMessage && <p className="text-success">{successMessage}</p>}
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleJoinRoom}>
                        Tham gia
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCreateModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo phòng chat</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="createGroupName" className="input-group-custom">
                            <Form.Control
                                type="text"
                                placeholder=" "
                                value={groupName}
                                onChange={handleGroupNameChange}
                            />
                            <Form.Label>Nhập tên phòng</Form.Label>
                        </Form.Group>
                    </Form>
                    {successMessageCreate && <p className="text-success">{successMessageCreate}</p>}
                    {errorMessageCreate && <p className="text-danger">{errorMessageCreate}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleCreateRoom}>
                        Tạo
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}
const AvatarComponent = ({userName}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const status = await checkUser(userName);
                setIsLoggedIn(status === 'online');
            } catch (error) {
                console.error("Error checking user:", error);
                setIsLoggedIn(false);
            }
        };
        fetchData();
    }, [userName]);

    return (
        <div>
            <p>{isLoggedIn ? "Online" : "Offline"}</p>
        </div>
    );
};


export default ChatTab;
