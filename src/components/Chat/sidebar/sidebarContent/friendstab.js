import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../../../../socket/socket";

function FriendsTab(props) {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList.data);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        getUsersList();
    }, [dispatch]);

    useEffect(() => {
        if (userList) {
            setFilteredUsers(
                userList.filter(user =>
                    user.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, userList]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="d-flex flex-column h-100">
            <div className="tab-header d-flex align-items-center border-bottom">
                <ul className="d-flex justify-content-between align-items-center list-unstyled w-100 mx-4 mb-0">
                    <li>
                        <h3 className="mb-0">Friends</h3>
                    </li>
                    <li>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <button
                                    className="navigation-toggle btn btn-secondary btn-icon d-xl-none"
                                    type="button"
                                >
                                    <i className="ri-menu-line" />
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className="m-4">
                <div className="input-group">
                    <input
                        aria-describedby="search-friends-button"
                        aria-label="Search friends"
                        className="form-control form-control-lg form-control-solid"
                        placeholder="Search friends"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button
                        className="btn btn-secondary btn-lg"
                        id="search-friends-button"
                        type="button"
                    >
                        <i className="ri-search-line" />
                    </button>
                </div>
            </div>
            <div className="hide-scrollbar h-100">
                <div className="m-4">
                    <div>
                        {/*<h5 className="p-2 text-primary">A</h5>*/}
                        {!filteredUsers || filteredUsers.length === 0 ? (
                            <ul className="list-unstyled">
                                <li>Loading...</li>
                            </ul>
                        ) : (
                            filteredUsers.map((user, index) => (
                                <ul className="list-unstyled" key={index}>
                                    <li className="card contact-item">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center">
                                                <div className="avatar avatar-busy me-4">
                                                <span className="avatar-label bg-soft-primary text-primary">
                                                </span>
                                                </div>
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <div className="d-flex align-items-center mb-1">
                                                        <h5 className="text-truncate mb-0 me-auto">
                                                            {user.name}
                                                        </h5>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="text-truncate me-auto">
                                                            Online
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="dropdown">
                                                    <button
                                                        aria-expanded="false"
                                                        className="btn btn-icon btn-base btn-sm"
                                                        data-bs-toggle="dropdown"
                                                        type="button"
                                                    >
                                                        <i className="ri-more-fill" />
                                                    </button>
                                                    <ul className="dropdown-menu dropdown-menu-right">
                                                        <li>
                                                            <a
                                                                className="dropdown-item d-flex align-items-center justify-content-between"
                                                                href="#"
                                                            >
                                                                Start chat
                                                                <i className="ri-message-2-line" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className="dropdown-item d-flex align-items-center justify-content-between"
                                                                href="#"
                                                            >
                                                                Edit contact
                                                                <i className="ri-edit-line" />
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <div className="dropdown-divider" />
                                                        </li>
                                                        <li>
                                                            <a
                                                                className="dropdown-item d-flex align-items-center justify-content-between"
                                                                href="#"
                                                            >
                                                                Block user
                                                                <i className="ri-forbid-line" />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            )))}
                    </div>
                </div>
            </div>
            <div className="invite-footer border-top p-4">
                <button
                    className="btn btn-lg btn-primary w-100"
                    data-bs-target="#modal-invite"
                    data-bs-toggle="modal"
                >
                    Invite Friends
                </button>
            </div>
        </div>
    );
}

export default FriendsTab;