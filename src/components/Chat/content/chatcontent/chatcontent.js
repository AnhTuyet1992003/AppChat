
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getPeopleChatMes, initializeSocket, reLoginUser} from "../../../../socket/socket";


function ChatContent() {
    const login = useSelector((state) => state.login);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const messages = useSelector((state) => state.socket.messages.data);
    // Duy trì đăng nhập
    useEffect(() => {
        if (!login.status) {
            if (localStorage.getItem("reLogin") !== null) {
                // kêt nối lại socket
                initializeSocket('ws://140.238.54.136:8080/chat/chat');
                reLoginUser(localStorage.getItem("username"), localStorage.getItem("reLogin"));
            } else {
                navigate("/login");
            }

        }else{
            const username = localStorage.getItem("username");
            getPeopleChatMes(username);
        }
    }, [dispatch, navigate, login]);
    return (
        <div className="chat-content hide-scrollbar h-100">
            <div className="container-fluid g-0 p-4">
                <div className="message">
                    <div className="message-wrap">
                        <div className="message-item">
                            <div className="message-content">
                      <span>
                        Hi John, please take a look at the result of my work, this is a project that I am currently working on.
                      </span>
                            </div>
                            <div className="dropdown align-self-center">
                                <button
                                    aria-expanded="false"
                                    className="btn btn-icon btn-base btn-sm"
                                    data-bs-toggle="dropdown"
                                    type="button"
                                >
                                    <i className="ri-more-2-fill"/>
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a
                                            className="dropdown-item d-flex align-items-center justify-content-between"
                                            href="#"
                                        >
                                            Edit
                                            <i className="ri-edit-line"/>
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
                    <div className="message-info">
                        <div className="avatar avatar-sm">
                    <span className="avatar-label bg-soft-primary text-primary fs-6">
                      AM
                    </span>
                        </div>
                        <div>
                            <h6 className="mb-0">
                                Ariel Martinez
                            </h6>
                            <small className="text-muted">
                                9:15 PM
                                <i className="ri-check-double-line align-bottom text-success fs-5"/>
                            </small>
                        </div>
                    </div>
                </div>
                <div className="message self">
                    <div className="message-wrap">

                        <div className="message-item">
                            <div className="message-content">
                      <span>
                        Now I will try to explain, the primari color is strongly out of the general composition, try to use flatter colors.
                      </span>
                            </div>
                            <div className="dropdown align-self-center">
                                <button
                                    aria-expanded="false"
                                    className="btn btn-icon btn-base btn-sm"
                                    data-bs-toggle="dropdown"
                                    type="button"
                                >
                                    <i className="ri-more-2-fill"/>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a
                                            className="dropdown-item d-flex align-items-center justify-content-between"
                                            href="#"
                                        >
                                            Edit
                                            <i className="ri-edit-line"/>
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
                    <div className="message-info">
                        <div className="avatar avatar-sm">
                    <span className="avatar-label bg-soft-success text-success fs-6">
                      JD
                    </span>
                        </div>
                        <div>
                            <h6 className="mb-0">
                                John Davis
                            </h6>
                            <small className="text-muted">
                                9:26 PM
                                <i className="ri-check-double-line align-bottom text-success fs-5"/>
                            </small>
                        </div>
                    </div>
                </div>

                <div className="separator">
                <span className="separator-title fs-7 ls-1">
                  Today
                </span>
                </div>
                {/*<div className="message">*/}
                {/*    <div className="message-wrap">*/}
                {/*        <div className="message-item">*/}
                {/*            <div className="message-content">*/}
                {/*                <div>*/}
                {/*                    Writing*/}
                {/*                    <div className="type-indicator">*/}
                {/*                        <span/>*/}
                {/*                        <span/>*/}
                {/*                        <span/>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="message-info">*/}
                {/*        <div className="avatar avatar-sm">*/}
                {/*    <span className="avatar-label bg-soft-primary text-primary fs-6">*/}
                {/*      AM*/}
                {/*    </span>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <h6 className="mb-0">*/}
                {/*                Ariel Martinez*/}
                {/*            </h6>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className="js-scroll-to-bottom"/>
        </div>
    )
}

export default ChatContent;