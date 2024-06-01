
import React from 'react';


function FriendsTab() {

    return (
        <div className="d-flex flex-column h-100">
            <div className="tab-header d-flex align-items-center border-bottom">
                <ul className="d-flex justify-content-between align-items-center list-unstyled w-100 mx-4 mb-0">
                    <li>
                        <h3 className="mb-0">
                            Friends
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
                        aria-describedby="search-friends-button"
                        aria-label="Search friends"
                        className="form-control form-control-lg form-control-solid"
                        placeholder="Search friends"
                        type="text"
                    />
                    <button
                        className="btn btn-secondary btn-lg"
                        id="search-friends-button"
                        type="button"
                    >
                        <i className="ri-search-line"/>
                    </button>
                </div>
            </div>
            <div className="hide-scrollbar h-100">
                <div className="m-4">
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
                                                        Start chat
                                                        <i className="ri-message-2-line"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                                        href="#"
                                                    >
                                                        Edit contact
                                                        <i className="ri-edit-line"/>
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
                                                        Block user
                                                        <i className="ri-forbid-line"/>
                                                    </a>
                                                </li>
                                            </ul>
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
                                                        Start chat
                                                        <i className="ri-message-2-line"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                                        href="#"
                                                    >
                                                        Edit contact
                                                        <i className="ri-edit-line"/>
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
                                                        Block user
                                                        <i className="ri-forbid-line"/>
                                                    </a>
                                                </li>
                                            </ul>
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
                                                        Start chat
                                                        <i className="ri-message-2-line"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                                        href="#"
                                                    >
                                                        Edit contact
                                                        <i className="ri-edit-line"/>
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
                                                        Block user
                                                        <i className="ri-forbid-line"/>
                                                    </a>
                                                </li>
                                            </ul>
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
                                                        Start chat
                                                        <i className="ri-message-2-line"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                                        href="#"
                                                    >
                                                        Edit contact
                                                        <i className="ri-edit-line"/>
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
                                                        Block user
                                                        <i className="ri-forbid-line"/>
                                                    </a>
                                                </li>
                                            </ul>
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
                                                        Start chat
                                                        <i className="ri-message-2-line"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                                        href="#"
                                                    >
                                                        Edit contact
                                                        <i className="ri-edit-line"/>
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
                                                        Block user
                                                        <i className="ri-forbid-line"/>
                                                    </a>
                                                </li>
                                            </ul>
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
                                                        Start chat
                                                        <i className="ri-message-2-line"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                                        href="#"
                                                    >
                                                        Edit contact
                                                        <i className="ri-edit-line"/>
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
                                                        Block user
                                                        <i className="ri-forbid-line"/>
                                                    </a>
                                                </li>
                                            </ul>
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
                                                        Start chat
                                                        <i className="ri-message-2-line"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                                        href="#"
                                                    >
                                                        Edit contact
                                                        <i className="ri-edit-line"/>
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
                                                        Block user
                                                        <i className="ri-forbid-line"/>
                                                    </a>
                                                </li>
                                            </ul>
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
                                                        Start chat
                                                        <i className="ri-message-2-line"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                                        href="#"
                                                    >
                                                        Edit contact
                                                        <i className="ri-edit-line"/>
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
                                                        Block user
                                                        <i className="ri-forbid-line"/>
                                                    </a>
                                                </li>
                                            </ul>
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
                                                        Start chat
                                                        <i className="ri-message-2-line"/>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="dropdown-item d-flex align-items-center justify-content-between"
                                                        href="#"
                                                    >
                                                        Edit contact
                                                        <i className="ri-edit-line"/>
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
                                                        Block user
                                                        <i className="ri-forbid-line"/>
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
    )
}

export default FriendsTab;