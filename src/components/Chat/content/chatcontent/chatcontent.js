
import React from 'react';


function ChatContent() {

    return (
        <div className="chat-content hide-scrollbar h-100">
            <div className="container-fluid g-0 p-4">
                <div className="message">
                    <div className="message-wrap">
                        <div className="message-item">
                            <div className="message-content">
                                <h6>
                                    Shared Photos:
                                </h6>
                                <div className="shared-image-list row align-items-center g-3">
                                    <div className="col">
                                        <a
                                            className="shared-image"
                                            href="/image/reset-dark.png"
                                        >
                                            <img
                                                alt="preview"
                                                className="img-fluid rounded-2"
                                                data-action="zoom"
                                                src="/image/reset-dark.png"
                                            />
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a
                                            className="shared-image"
                                            href="/image/signin-dark.png"
                                        >
                                            <img
                                                alt="preview"
                                                className="img-fluid rounded-2"
                                                data-action="zoom"
                                                src="/image/signin-dark.png"
                                            />
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a
                                            className="shared-image"
                                            href="/image/signup-dark.png"
                                        >
                                            <img
                                                alt="preview"
                                                className="img-fluid rounded-2"
                                                data-action="zoom"
                                                src="/image/signup-dark.png"
                                            />
                                        </a>
                                    </div>
                                    <div className="col">
                                        <a
                                            className="shared-image"
                                            href="/image/reset-dark.png"
                                        >
                                            <img
                                                alt="preview"
                                                className="img-fluid rounded-2"
                                                data-action="zoom"
                                                src="/image/reset-dark.png"
                                            />
                                        </a>
                                    </div>
                                </div>
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
                        Hi Ariel, it looks great except for a few things.
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
                <div className="message">
                    <div className="message-wrap">
                        <div className="message-item">
                            <div className="message-content">
                      <span>
                        Looks like I should do some more design work, thanks for the help.
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
                        <div className="message-item">
                            <div className="message-content">
                      <span>
                        Perhaps enough work for today, tell us how you spend time with your friends.
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
                                9:37 PM
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
                        We combine recreation and sports, there are many ways to relax, you can join us at any time.
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
                                9:42 PM
                                <i className="ri-check-double-line align-bottom text-success fs-5"/>
                            </small>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message-wrap">
                        <div className="message-item">
                            <div className="message-content">
                      <span>
                        Great, I love outdoor activities, invite me for a company next time.
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
                                9:46 PM
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
                        Of course, Ariel, I will. Here is a photo report from the last meeting.
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
                        <div className="message-item">
                            <div className="message-content">
                                <div className="d-flex align-items-center">
                                    <button
                                        className="btn btn-lg btn-icon btn-secondary rounded-circle me-3">
                                        <i className="ri-download-line"/>
                                    </button>
                                    <div>
                                        <h5 className="mb-0">
                                            photo_archive.zip
                                        </h5>
                                    </div>
                                </div>
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
                                9:53 PM
                                <i className="ri-check-double-line align-bottom text-success fs-5"/>
                            </small>
                        </div>
                    </div>
                </div>
                <div className="message">
                    <div className="message-wrap">
                        <div className="message-item">
                            <div className="message-content">
                                <div>
                                    Writing
                                    <div className="type-indicator">
                                        <span/>
                                        <span/>
                                        <span/>
                                    </div>
                                </div>
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
                        </div>
                    </div>
                </div>
            </div>
            <div className="js-scroll-to-bottom"/>
        </div>
    )
}

export default ChatContent;