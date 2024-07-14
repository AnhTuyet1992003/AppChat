
import React, {useEffect,useState} from 'react';
import {useParams} from "react-router-dom";
import {getPeopleChatMes,getRoomChatMes} from "../../../socket/socket";
import {useSelector} from "react-redux";


function UserProfile() {
    const {type, name } = useParams();
    const listUser = useSelector((state) => state.listUser);
    useEffect(() => {
        if (name) {
            if (type === 'friend') {
                getPeopleChatMes(name);
            } else if (type === 'group') {
                getRoomChatMes(name);
            }
        }
    }, [type,name]);
    return (
        <div className="chat-info h-100 border-start">
            <div className="d-flex flex-column h-100">
                <div className="chat-info-header d-flex align-items-center border-bottom">
                    <ul className="d-flex justify-content-between align-items-center list-unstyled w-100 mx-4 mb-0">
                        <li>
                            <h3 className="mb-0">
                                Thông tin của {name}
                            </h3>
                        </li>
                        <li>
                            <button className="chat-info-close btn btn-icon btn-base px-0">
                                <i className="ri-close-line"/>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="hide-scrollbar h-100">
                    <div className="text-center p-4 pt-14">
                        <div className="avatar avatar-xl mb-4">
                  <span className="avatar-label bg-soft-primary text-primary fs-3">
                    {name ? name.charAt(0) : ""}
                  </span>
                        </div>
                        <h5>
                            {name}
                        </h5>
                        <div className="text-center">
                        </div>
                    </div>
                    <div className="text-center mb-2">
                        <ul
                            className="nav nav-pills nav-segmented"
                            id="pills-tab-user-profile"
                            role="tablist"
                        >
                            <li
                                className="nav-item"
                                role="presentation"
                            >
                                <button
                                    aria-controls="pills-about"
                                    aria-selected="true"
                                    className="nav-link active"
                                    data-bs-target="#pills-about"
                                    data-bs-toggle="pill"
                                    id="pills-about-tab"
                                    role="tab"
                                    type="button"
                                >
                                    About
                                </button>
                            </li>
                            <li
                                className="nav-item"
                                role="presentation"
                            >
                                <button
                                    aria-controls="pills-files"
                                    aria-selected="false"
                                    className="nav-link"
                                    data-bs-target="#pills-files"
                                    data-bs-toggle="pill"
                                    id="pills-files-tab"
                                    role="tab"
                                    type="button"
                                >
                                    Files
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div
                        className="tab-content"
                        id="pills-tab-user-profile-content"
                    >
                        <div
                            aria-labelledby="pills-about-tab"
                            className="tab-pane fade show active"
                            id="pills-about"
                            role="tabpanel"
                        >
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item py-4">
                                    <h6 className="mb-1">{type === 'group' ? 'Danh sách user' : 'Name'}</h6>
                                    <p className="text-truncate mb-0">
                                        {type === 'group' && (
                                            /* Render danh sách người dùng */
                                            <div style={{ marginLeft: '30px' }}>
                                                {listUser && listUser.length > 0 ? (
                                                    <p>
                                                        {listUser.map((user, index) => (
                                                            <li key={index}>{user.name}</li>
                                                        ))}
                                                    </p>
                                                ) : (
                                                    <span>Không có người dùng</span>
                                                )}
                                            </div>
                                        )}
                                    </p>
                                </li>
                                <li className="list-group-item py-4">
                                    <h6 className="mb-1">
                                        Email
                                    </h6>
                                    <p className="text-truncate mb-0">
                                        ariel@gmail.com
                                    </p>
                                </li>
                                <li className="list-group-item py-4">
                                    <h6 className="mb-1">
                                        Phone
                                    </h6>
                                    <p className="text-truncate mb-0">
                                        646-210-1784
                                    </p>
                                </li>
                                <li className="list-group-item py-4">
                                    <h6 className="mb-1">
                                        Location
                                    </h6>
                                    <p className="text-truncate mb-0">
                                        New York, USA
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div
                            aria-labelledby="pills-files-tab"
                            className="tab-pane fade"
                            id="pills-files"
                            role="tabpanel"
                        >
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item py-4">
                                    <div className="row align-items-center gx-4">
                                        <div className="col-auto">
                                            <div className="avatar avatar-sm">
                            <span className="avatar-label">
                              <i className="ri-image-line"/>
                            </span>
                                            </div>
                                        </div>
                                        <div className="col overflow-hidden">
                                            <h6 className="text-truncate mb-1">
                                                Image002.jpg
                                            </h6>
                                            <ul className="list-inline m-0">
                                                <li className="list-inline-item">
                                                    <p className="text-uppercase text-muted mb-0 fs-6">
                                                        365 KB
                                                    </p>
                                                </li>
                                                <li className="list-inline-item">
                                                    <p className="text-uppercase text-muted mb-0 fs-6">
                                                        JPG
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-auto">
                                            <div className="dropdown">
                                                <button
                                                    aria-expanded="false"
                                                    className="btn btn-icon btn-base btn-sm"
                                                    data-bs-toggle="dropdown"
                                                    type="button"
                                                >
                                                    <i className="ri-more-fill"/>
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-right">
                                                    <li>
                                                        <a
                                                            className="dropdown-item d-flex align-items-center justify-content-between"
                                                            href="#"
                                                        >
                                                            Download
                                                            <i className="ri-download-line"/>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item d-flex align-items-center justify-content-between"
                                                            href="#"
                                                        >
                                                            Share
                                                            <i className="ri-share-line"/>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <div className="dropdown-divider"/>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item d-flex align-items-center justify-content-between"
                                                            href="#"
                                                        >
                                                            Delete
                                                            <i className="ri-delete-bin-line"/>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;