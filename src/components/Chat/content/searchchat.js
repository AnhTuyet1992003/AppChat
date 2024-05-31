
import React from 'react';


function SearchChat() {

    return (
        <div>
            <div
                className="border-bottom collapse"
                id="search-chat"
            >
                <div className="px-1 py-4">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col">
                                <div className="input-group">
                                    <input
                                        aria-describedby="search-in-chat-button"
                                        aria-label="Search in chat"
                                        className="form-control form-control-lg"
                                        placeholder="Search in chat"
                                        type="text"
                                    />
                                    <button
                                        className="btn btn-white btn-lg border"
                                        id="search-in-chat-button"
                                        type="button"
                                    >
                                        <i className="ri-search-line"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchChat;