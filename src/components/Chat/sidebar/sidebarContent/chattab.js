

import React, {useEffect, useRef} from 'react';
import {getPeopleChatMes, getUsersList, initializeSocket, reLoginUser} from "../../../../socket/socket";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";



function ChatTab({ toggleSidebar }) {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList.data || []);

    useEffect(() => {
        getUsersList();
    }, [dispatch]);

    // danh sach cac nguoi dung
    const friendsList = userList.filter(user => user.type === 0);
    // danh sach phong chat
    const groupsList = userList.filter(user => user.type === 1);

    return (
        <div className="d-flex flex-column h-100">
            <div className="tab-header d-flex align-items-center border-bottom">
                <ul className="d-flex justify-content-between align-items-center list-unstyled w-100 mx-4 mb-0">
                    <li>
                        <h3 className="mb-0">Chats</h3>
                    </li>
                    <li>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <button
                                    className="navigation-toggle btn btn-secondary btn-icon d-xl-none"
                                    type="button"
                                    onClick={toggleSidebar}
                                >
                                    <i className="ri-menu-line" />
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
                            {/* Nội dung của tab "Direct" */}
                            {friendsList.length === 0 ? (
                                <li>Loading...</li>
                            ) : (
                                friendsList.map((user, index) => (
                            <li className="card contact-item" key={index}>
                                <a className="contact-link" href="#" />
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="avatar avatar-busy me-4">
                                            <span className="avatar-label bg-soft-info text-info">{user.name.charAt(0)}</span>
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
                                </div>
                            </li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className="tab-pane fade" id="groups-tab" role="tabpanel">
                        {groupsList === 0 ? (
                            <ul className="list-unstyled">
                                <li>Loading...</li>
                            </ul>
                        ) : (
                            <ul className="list-unstyled js-contact-list mb-0">
                                {groupsList.map((group, index) => (
                                    <li className="card contact-item mb-3" key={index}>
                                        <a className="contact-link" href="#" />
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar avatar-online me-4">
                                                    <span className="avatar-label bg-soft-info text-info">{group.name.charAt(0)}</span>
                                                </div>
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <div className="d-flex align-items-center mb-1">
                                                        <h5 className="text-truncate mb-0 me-auto">{group.name}</h5>
                                                        <p className="small text-muted text-nowrap ms-4 mb-0">11:45 AM</p>
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
                                        <div className="card-footer d-flex align-items-center justify-content-between overflow-hidden">
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
        </div>
    );
}

export default ChatTab;
