
import React from 'react';


function ChatHeader() {

    return (
        <div className="chat-header d-flex align-items-center border-bottom px-2">
            <div className="container-fluid">
                <div className="row align-items-center g-0">
                    <div className="col-8 col-sm-5">
                        <div className="d-flex align-items-center">
                            <div className="d-block d-xl-none me-3">
                                <button
                                    className="chat-hide btn btn-icon btn-base btn-sm"
                                    type="button"
                                >
                                    <i className="ri-arrow-left-s-line"/>
                                </button>
                            </div>
                            <div className="avatar avatar-online avatar-sm me-3">
                      <span className="avatar-label bg-soft-primary text-primary fs-6">
                        AM
                      </span>
                            </div>
                            <div className="flex-grow-1 overflow-hidden">
                                <h6 className="d-block text-truncate mb-1">
                                    Ariel Martinez
                                </h6>
                                <p className="d-block text-truncate text-success fs-6 mb-0">
                                    Available
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-4 col-sm-7">
                        <ul className="list-inline text-end mb-0">
                            <li className="list-inline-item d-none d-sm-inline-block">
                                <button
                                    aria-expanded="false"
                                    className="btn btn-icon btn-base"
                                    data-bs-target="#search-chat"
                                    data-bs-toggle="collapse"
                                    title="Search"
                                    type="button"
                                >
                                    <i className="ri-search-line"/>
                                </button>
                            </li>
                            <li className="list-inline-item d-none d-sm-inline-block">
                                <button
                                    className="chat-info-toggle btn btn-icon btn-base"
                                    title="Chat info"
                                    type="button"
                                >
                                    <i className="ri-user-3-line"/>
                                </button>
                            </li>
                            <li className="list-inline-item">
                                <div className="dropdown">
                                    <button
                                        aria-expanded="false"
                                        className="btn btn-icon btn-base"
                                        data-bs-toggle="dropdown"
                                        title="Menu"
                                        type="button"
                                    >
                                        <i className="ri-more-fill"/>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li className="d-block d-sm-none">
                                            <a
                                                aria-expanded="false"
                                                className="dropdown-item d-flex align-items-center justify-content-between"
                                                data-bs-target="#search-chat"
                                                data-bs-toggle="collapse"
                                                href="#"
                                            >
                                                Search
                                                <i className="ri-search-line"/>
                                            </a>
                                        </li>
                                        <li className="d-block d-sm-none">
                                            <a
                                                className="chat-info-toggle dropdown-item d-flex align-items-center justify-content-between"
                                                href="#"
                                            >
                                                Chat Info
                                                <i className="ri-information-line"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item d-flex align-items-center justify-content-between"
                                                href="#"
                                            >
                                                Archive
                                                <i className="ri-archive-line"/>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="dropdown-item d-flex align-items-center justify-content-between"
                                                href="#"
                                            >
                                                Mute
                                                <i className="ri-volume-mute-line"/>
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
                                                Block
                                                <i className="ri-forbid-line"/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader;