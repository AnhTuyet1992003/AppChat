import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeSocket, create_room } from '../../../../socket/socket';

const CreateChat = () => {
    const [groupName, setGroupName] = useState('');
    const [groupInfo, setGroupInfo] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [createdGroup, setCreatedGroup] = useState(null); // State để lưu thông tin nhóm đã tạo
    const socketUrl = 'ws://140.238.54.136:8080/chat/chat'; // Replace with your WebSocket URL
    initializeSocket(socketUrl);

    const handleCreateChat = async () => {
        // Reset error message
        setErrorMessage('');

        // Check if groupName is empty
        if (groupName.trim() === '') {
            setErrorMessage('Vui lòng nhập tên nhóm');
            return;
        }

        try {
            const groupData = await create_room(groupName, groupInfo); // Tạo nhóm và nhận lại thông tin của nhóm
            setCreatedGroup(groupData); // Lưu thông tin của nhóm vào state
            localStorage.setItem('createdGroup', JSON.stringify(groupData)); // Lưu thông tin nhóm vào localStorage
            navigate(`/Home/${groupName}`);
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };
    return (
        <div className="d-flex flex-column h-100">
            <div className="tab-header d-flex align-items-center border-bottom">
                <ul className="d-flex justify-content-between align-items-center list-unstyled w-100 mx-4 mb-0">
                    <li>
                        <h3 className="mb-0">
                            Create chat
                        </h3>
                    </li>
                    <li>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <button
                                    className="navigation-toggle btn btn-secondary btn-icon d-xl-none"
                                    type="button"
                                >
                                    <i className="ri-menu-line"/>
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="m-4">
                <div className="input-group">
                    <input
                        aria-describedby="search-member-button"
                        aria-label="Search member"
                        className="form-control form-control-lg form-control-solid"
                        placeholder="Search member"
                        type="text"
                    />
                    <button
                        className="btn btn-secondary btn-lg"
                        id="search-member-button"
                        type="button"
                    >
                        <i className="ri-search-line"/>
                    </button>
                </div>
            </div>
            <div className="text-center mb-4">
                <ul
                    className="nav nav-pills nav-segmented"
                    id="group-pills"
                    role="tablist"
                >
                    <li
                        className="nav-item"
                        role="presentation"
                    >
                        <a
                            aria-controls="pills-create-group-tab"
                            aria-selected="true"
                            className="nav-link active"
                            data-bs-toggle="pill"
                            href="#create-group-tab"
                            id="pills-create-group-tab"
                            role="tab"
                        >
                            Group
                        </a>
                    </li>
                    <li
                        className="nav-item"
                        role="presentation"
                    >
                        <a
                            aria-controls="pills-select-member-tab"
                            aria-selected="false"
                            className="nav-link"
                            data-bs-toggle="pill"
                            href="#select-member-tab"
                            id="pills-select-member-tab"
                            role="tab"
                        >
                            Members
                        </a>
                    </li>
                </ul>
            </div>
            <div className="hide-scrollbar h-100">
                <div className="tab-content m-4 mt-0">
                    <div
                        className="tab-pane fade show active"
                        id="create-group-tab"
                        role="tabpanel"
                    >
                        <div className="card mb-3">
                            <div className="card-body pt-0">
                                <div className="profile text-center">
                                    <div className="profile-img text-primary">
                                        <svg
                                            fill="currentColor"
                                            viewBox="0 0 300 100"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <defs>
                                                <style
                                                    dangerouslySetInnerHTML={{
                                                        __html: '                                                                .st1 {                                                                    fill: #fff;                                                                    opacity: 0.1;                                                                }                                                            '
                                                    }}
                                                />
                                            </defs>
                                            <path
                                                d="M300,0v80c0,11-9,20-20,20H20C9,100,0,91,0,80V0H300z"/>
                                            <path
                                                className="st1"
                                                d="M50,71c-16,0-29,13-29,29h10c0-10.5,8.5-19,19-19s19,8.5,19,19h10C79,84,66,71,50,71z"
                                            />
                                            <path
                                                className="st1"
                                                d="M31.6,0H21.3C21.8,1.6,22,3.3,22,5c0,10.5-8.5,19-19,19c-1,0-2-0.1-3-0.2v10.1C1,34,2,34,3,34c16,0,29-13,29-29                                                                                                                            C32,3.3,31.8,1.6,31.6,0z"
                                            />
                                            <path
                                                className="st1"
                                                d="M238.5,58C217.3,58,200,75.3,200,96.5c0,1.2,0,2.3,0.2,3.5h10.1c-0.1-1.2-0.2-2.3-0.2-3.5                                                                                                                            c0-15.7,12.8-28.5,28.5-28.5S267,80.8,267,96.5c0,1.2-0.1,2.3-0.2,3.5h10.1c0.1-1.2,0.2-2.3,0.2-3.5C277,75.3,259.7,58,238.5,58z"
                                            />
                                            <path
                                                className="st1"
                                                d="M299,22c-11,0-20-9-20-20c0-0.7,0-1.3,0.1-2h-10C269,0.7,269,1.3,269,2c0,16.5,13.5,30,30,30c0.3,0,0.7,0,1,0                                                                                                                            V22C299.7,22,299.3,22,299,22z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="profile-content">
                                        <div className="avatar avatar-lg">
                            <span className="avatar-label bg-success text-white fs-3">
                              <i className="ri-image-line"/>
                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-4">
                                    <div className="input-group">
                                        <input
                                            aria-label="Group name"
                                            className="form-control form-control-lg form-control-solid"
                                            placeholder="Group name"
                                            type="text"
                                            value={groupName}
                                            onChange={(e) => setGroupName(e.target.value)}
                                        />


                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="d-flex align-items-center mx-4 mb-3">
                            <small className="text-muted me-auto">
                                Options
                            </small>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row align-items-center gx-4">
                                    <div className="col-auto">
                                        <div className="avatar">
                            <span className="avatar-label text-muted fs-1">
                              <i className="ri-chat-private-line"/>
                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <h5 className="mb-1">
                                            Make chat private
                                        </h5>
                                        <p className="text-muted mb-0">
                                            Visible only for members
                                        </p>
                                    </div>
                                    <div className="col-auto">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                defaultChecked
                                                defaultValue=""
                                                id="private-check"
                                                type="checkbox"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="select-member-tab"
                        role="tabpanel"
                    >
                        <div>
                            <h5 className="p-2 text-primary">
                                A
                            </h5>
                            <ul className="list-unstyled">
                                <li className="card contact-item">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar avatar-online me-4">
                              <span className="avatar-label bg-soft-primary text-primary">
                                AM
                              </span>
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="d-flex align-items-center mb-1">
                                                    <h5 className="text-truncate mb-0 me-auto">
                                                        Ariel Martinez
                                                    </h5>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="text-truncate me-auto">
                                                        Online
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    defaultValue=""
                                                    id="check-member-1"
                                                    type="checkbox"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="p-2 text-primary">
                                C
                            </h5>
                            <ul className="list-unstyled">
                                <li className="card contact-item">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar avatar-away me-4">
                              <span className="avatar-label">
                                CS
                              </span>
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="d-flex align-items-center mb-1">
                                                    <h5 className="text-truncate mb-0 me-auto">
                                                        Chris Solomon
                                                    </h5>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="text-truncate me-auto">
                                                        Last seen recently
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    defaultValue=""
                                                    id="check-member-2"
                                                    type="checkbox"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="p-2 text-primary">
                                D
                            </h5>
                            <ul className="list-unstyled">
                                <li className="card contact-item mb-3">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar avatar-online me-4">
                              <span className="avatar-label bg-info text-white">
                                DR
                              </span>
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="d-flex align-items-center mb-1">
                                                    <h5 className="text-truncate mb-0 me-auto">
                                                        Deborah Redd
                                                    </h5>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="text-truncate me-auto">
                                                        Online
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    defaultValue=""
                                                    id="check-member-3"
                                                    type="checkbox"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="card contact-item">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar me-4">
                              <span className="avatar-label bg-success text-white">
                                DG
                              </span>
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="d-flex align-items-center mb-1">
                                                    <h5 className="text-truncate mb-0 me-auto">
                                                        Donald Graves
                                                    </h5>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="text-truncate me-auto">
                                                        Last seen 4 days ago
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    defaultValue=""
                                                    id="check-member-4"
                                                    type="checkbox"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="p-2 text-primary">
                                J
                            </h5>
                            <ul className="list-unstyled">
                                <li className="card contact-item mb-3">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar avatar-busy me-4">
                              <span className="avatar-label bg-soft-info text-info">
                                JP
                              </span>
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="d-flex align-items-center mb-1">
                                                    <h5 className="text-truncate mb-0 me-auto">
                                                        Jerry Prater
                                                    </h5>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="text-truncate me-auto">
                                                        Last seen recently
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    defaultValue=""
                                                    id="check-member-5"
                                                    type="checkbox"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="card contact-item">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar avatar-online me-4">
                              <span className="avatar-label bg-danger text-white">
                                JS
                              </span>
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="d-flex align-items-center mb-1">
                                                    <h5 className="text-truncate mb-0 me-auto">
                                                        Joe Stoner
                                                    </h5>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="text-truncate me-auto">
                                                        Online
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    defaultValue=""
                                                    id="check-member-6"
                                                    type="checkbox"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="p-2 text-primary">
                                K
                            </h5>
                            <ul className="list-unstyled">
                                <li className="card contact-item mb-3">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar avatar-online me-4">
                              <span className="avatar-label bg-soft-success text-success">
                                KC
                              </span>
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="d-flex align-items-center mb-1">
                                                    <h5 className="text-truncate mb-0 me-auto">
                                                        Katherine Cassidy
                                                    </h5>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="text-truncate me-auto">
                                                        Online
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    defaultValue=""
                                                    id="check-member-7"
                                                    type="checkbox"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="card contact-item">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar me-4">
                              <span className="avatar-label bg-warning text-white">
                                KS
                              </span>
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="d-flex align-items-center mb-1">
                                                    <h5 className="text-truncate mb-0 me-auto">
                                                        Kelly Smith
                                                    </h5>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="text-truncate me-auto">
                                                        Last seen long time ago
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    defaultValue=""
                                                    id="check-member-8"
                                                    type="checkbox"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="p-2 text-primary">
                                M
                            </h5>
                            <ul className="list-unstyled mb-1">
                                <li className="card contact-item">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar me-4">
                              <span className="avatar-label bg-primary text-white">
                                MC
                              </span>
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <div className="d-flex align-items-center mb-1">
                                                    <h5 className="text-truncate mb-0 me-auto">
                                                        Maurice Coleman
                                                    </h5>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <div className="text-truncate me-auto">
                                                        Last seen 2 mounth ago
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    defaultValue=""
                                                    id="check-member-9"
                                                    type="checkbox"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {errorMessage && (
                <div className="alert alert-danger mt-2" role="alert">
                    {errorMessage}
                </div>
            )}
            <div className="create-chat-footer border-top p-4">
                <button
                    className="btn btn-lg btn-primary w-100"
                    onClick={handleCreateChat}
                >
                    Create Chat
                </button>
            </div>
        </div>
    )
}
export default CreateChat;