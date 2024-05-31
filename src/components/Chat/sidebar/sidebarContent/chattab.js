
import React from 'react';


function ChatTab() {

    return (
        <div className="d-flex flex-column h-100">
            <div className="tab-header d-flex align-items-center border-bottom">
                <ul className="d-flex justify-content-between align-items-center list-unstyled w-100 mx-4 mb-0">
                    <li>
                        <h3 className="mb-0">
                            Chats
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
                        aria-describedby="search-user-button"
                        aria-label="Search user"
                        className="form-control form-control-lg form-control-solid"
                        placeholder="Search user"
                        type="text"
                    />
                    <button
                        className="btn btn-secondary btn-lg"
                        id="search-user-button"
                        type="button"
                    >
                        <i className="ri-search-line"/>
                    </button>
                </div>
            </div>
            <div className="text-center mb-3">
                <ul
                    className="nav nav-pills nav-segmented"
                    id="pills-tab"
                    role="tablist"
                >
                    <li
                        className="nav-item"
                        role="presentation"
                    >
                        <a
                            aria-controls="pills-direct-tab"
                            aria-selected="true"
                            className="nav-link active"
                            data-bs-toggle="pill"
                            href="#direct-tab"
                            id="pills-direct-tab"
                            role="tab"
                        >
                            Direct
                        </a>
                    </li>
                    <li
                        className="nav-item"
                        role="presentation"
                    >
                        <a
                            aria-controls="pills-group-tab"
                            aria-selected="false"
                            className="nav-link"
                            data-bs-toggle="pill"
                            href="#groups-tab"
                            id="pills-group-tab"
                            role="tab"
                        >
                            Groups
                        </a>
                    </li>
                </ul>
            </div>
            <div className="hide-scrollbar h-100">
                <div className="tab-content m-4 mt-1">
                    <div
                        className="tab-pane fade show active"
                        id="direct-tab"
                        role="tabpanel"
                    >
                        <ul className="list-unstyled js-contact-list mb-0">
                            <li className="card contact-item active mb-3">
                                <a
                                    className="contact-link"
                                    href="index.html"
                                />
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
                                                <p className="small text-muted text-nowrap ms-4 mb-0">
                                                    8:12 AM
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="line-clamp me-auto">
                                                    Yes, I want to participate in the project.
                                                </div>
                                                <span
                                                    className="badge rounded-pill bg-primary ms-2">
                                2
                              </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="card contact-item mb-3">
                                <a
                                    className="contact-link"
                                    href="#"
                                />
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
                                                <p className="small text-muted text-nowrap ms-4 mb-0">
                                                    9:36 AM
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="line-clamp me-auto">
                                                    Okay, I'll try to help.
                                                </div>
                                                <span
                                                    className="badge rounded-pill bg-primary ms-2">
                                2
                              </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="card contact-item mb-3">
                                <a
                                    className="contact-link"
                                    href="#"
                                />
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
                                                <p className="small text-muted text-nowrap ms-4 mb-0">
                                                    10:46 AM
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="line-clamp me-auto">
                                                    This is my favorite pastime!
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="card contact-item mb-3">
                                <a
                                    className="contact-link"
                                    href="#"
                                />
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
                                                <p className="small text-muted text-nowrap ms-4 mb-0">
                                                    3:10 PM
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="line-clamp me-auto">
                                                    This is an interesting solution to the problem.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="card contact-item mb-3">
                                <a
                                    className="contact-link"
                                    href="#"
                                />
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
                                                <p className="small text-muted text-nowrap ms-4 mb-0">
                                                    5:42 PM
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="line-clamp me-auto">
                                                    See you soon.
                                                </div>
                                                <span
                                                    className="badge rounded-pill bg-primary ms-2">
                                3
                              </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="card contact-item mb-3">
                                <a
                                    className="contact-link"
                                    href="#"
                                />
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
                                                <p className="small text-muted text-nowrap ms-4 mb-0">
                                                    15/03
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="line-clamp me-auto">
                                                    Please send me the PSD files, I want to take a
                                                    look.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="card contact-item mb-3">
                                <a
                                    className="contact-link"
                                    href="#"
                                />
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
                                                <p className="small text-muted text-nowrap ms-4 mb-0">
                                                    15/03
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="line-clamp me-auto">
                                                    I have no idea how to complete the task
                                                    correctly.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="card contact-item mb-3">
                                <a
                                    className="contact-link"
                                    href="#"
                                />
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
                                                <p className="small text-muted text-nowrap ms-4 mb-0">
                                                    14/03
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="line-clamp me-auto">
                                                    I will gladly help you, do not worry.
                                                </div>
                                                <span
                                                    className="badge rounded-pill bg-primary ms-2">
                                5
                              </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li className="card contact-item">
                                <a
                                    className="contact-link"
                                    href="#"
                                />
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
                                                <p className="small text-muted text-nowrap ms-4 mb-0">
                                                    14/03
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="line-clamp me-auto">
                                                    There are a few bugs to fix, I can help with
                                                    that.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="groups-tab"
                        role="tabpanel"
                    >
                        <ul className="list-unstyled js-contact-list mb-0">
                            <li className="card contact-item mb-3">
                                <a
                                    className="contact-link"
                                    href="chat-group.html"
                                />
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className="avatar avatar-online me-4">
                            <span className="avatar-label bg-soft-info text-info">
                              JP
                            </span>
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <div className="d-flex align-items-center mb-1">
                                                <h5 className="text-truncate mb-0 me-auto">
                                                    Jerry Prater
                                                </h5>
                                                <p className="small text-muted text-nowrap ms-4 mb-0">
                                                    11:45 AM
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="line-clamp me-auto">
                                                    Hi, John, can you show a photo from the last
                                                    meeting, I would like to have a look at all of
                                                    you.
                                                </div>
                                                <span
                                                    className="badge rounded-pill bg-primary ms-2">
                                5
                              </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="card-footer d-flex align-items-center justify-content-between overflow-hidden">
                                    <h5 className="mb-0 text-truncate">
                                        General
                                    </h5>
                                    <p className="mb-0 small text-muted text-nowrap">
                                        35 Members
                                    </p>
                                </div>
                            </li>
                            <li className="card contact-item mb-3">
                                <a
                                    className="contact-link"
                                    href="#"
                                />
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
                                                <p className="small text-muted text-nowrap ms-4 mb-0">
                                                    1:30 PM
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="line-clamp me-auto">
                                                    Here are the latest files from our project, I'm
                                                    waiting for your positive feedback. Write me as
                                                    soon as you are free.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="card-footer d-flex align-items-center justify-content-between overflow-hidden">
                                    <h5 className="mb-0 text-truncate">
                                        Design Team
                                    </h5>
                                    <p className="mb-0 small text-muted text-nowrap">
                                        15 Members
                                    </p>
                                </div>
                            </li>
                            <li className="card contact-item">
                                <a
                                    className="contact-link"
                                    href="#"
                                />
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
                                                <p className="small text-muted text-nowrap ms-4 mb-0">
                                                    2:55 PM
                                                </p>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="line-clamp me-auto">
                                                    The design of the apartment looks great, I will
                                                    focus on this option.
                                                </div>
                                                <span
                                                    className="badge rounded-pill bg-primary ms-2">
                                2
                              </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="card-footer d-flex align-items-center justify-content-between overflow-hidden">
                                    <h5 className="mb-0 text-truncate">
                                        Real Estate
                                    </h5>
                                    <p className="mb-0 small text-muted text-nowrap">
                                        21 Members
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatTab;