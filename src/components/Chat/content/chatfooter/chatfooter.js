
import React from 'react';


function ChatFooter() {

    return (
        <div className="chat-footer d-flex align-items-center border-top px-2">
            <div className="container-fluid">
                <div className="row align-items-center g-4">
                    <div className="col">
                        <div className="input-group">
                            <button
                                className="btn btn-white btn-lg border"
                                type="button"
                            >
                                <i className="ri-attachment-2"/>
                            </button>
                            <input
                                aria-label="type message"
                                className="form-control form-control-lg"
                                placeholder="Type message"
                                type="text"
                            />
                            <button
                                className="btn btn-white btn-lg border"
                                type="button"
                            >
                                <i className="ri-chat-smile-2-line"/>
                            </button>
                        </div>
                    </div>
                    <div className="col-auto">
                        <ul className="list-inline d-flex align-items-center mb-0">
                            <li className="list-inline-item">
                                <button
                                    className="btn btn-icon btn-primary btn-lg rounded-circle"
                                    type="submit"
                                >
                                    <i className="ri-send-plane-fill"/>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatFooter;