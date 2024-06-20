import '../../../scss/styles-light.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'magnific-popup/dist/magnific-popup.css';
import 'magnific-popup';
import CreateChat from "./sidebarContent/createchat";
import FriendsTab from "./sidebarContent/friendstab";
import ChatTab from "./sidebarContent/chattab";
import NotificationsTab from "./sidebarContent/notificationstab";
import SettingTab from "./sidebarContent/settingtab";
import { useState } from "react";

function Sidebar() {
    const [activeTab, setActiveTab] = useState('chats-tab');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleChatCreated = () => {
        setActiveTab('chats-tab');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="navigation navbar border-end h-100 py-6">
                <a className="logo d-none d-xl-block mb-6" href="#">
                    <img alt="" src="/image/logo.png" />
                </a>
                <ul className="nav nav-pills" role="tablist">
                    <li className="nav-item mt-xl-auto mb-5" role="presentation">
                        <a
                            aria-selected={activeTab === 'create-chat-tab'}
                            className={`nav-link ${activeTab === 'create-chat-tab' ? 'active' : ''}`}
                            data-bs-toggle="pill"
                            href="#create-chat-tab"
                            role="tab"
                            title="Create chat"
                            onClick={() => setActiveTab('create-chat-tab')}
                        >
                            <i className="ri-quill-pen-line" />
                        </a>
                    </li>
                    <li className="nav-item mb-5" role="presentation">
                        <a
                            aria-selected={activeTab === 'friends-tab'}
                            className={`nav-link ${activeTab === 'friends-tab' ? 'active' : ''}`}
                            data-bs-toggle="pill"
                            href="#friends-tab"
                            role="tab"
                            title="Friends"
                            onClick={() => setActiveTab('friends-tab')}
                        >
                            <i className="ri-group-line" />
                        </a>
                    </li>
                    <li className="nav-item mb-5" role="presentation">
                        <a
                            aria-selected={activeTab === 'chats-tab'}
                            className={`nav-link ${activeTab === 'chats-tab' ? 'active' : ''}`}
                            data-bs-toggle="pill"
                            href="#chats-tab"
                            role="tab"
                            title="Chats"
                            onClick={() => setActiveTab('chats-tab')}
                        >
                            <i className="ri-chat-3-line" />
                        </a>
                    </li>
                    <li className="nav-item mb-5" role="presentation">
                        <a
                            aria-selected={activeTab === 'notifications-tab'}
                            className={`nav-link ${activeTab === 'notifications-tab' ? 'active' : ''}`}
                            data-bs-toggle="pill"
                            href="#notifications-tab"
                            role="tab"
                            title="Notifications"
                            onClick={() => setActiveTab('notifications-tab')}
                        >
                            <i className="ri-notification-3-line" />
                        </a>
                    </li>
                    <li className="nav-item mb-5" role="presentation">
                        <a
                            aria-selected={activeTab === 'settings-tab'}
                            className={`nav-link ${activeTab === 'settings-tab' ? 'active' : ''}`}
                            data-bs-toggle="pill"
                            href="#settings-tab"
                            role="tab"
                            title="Settings"
                            onClick={() => setActiveTab('settings-tab')}
                        >
                            <i className="ri-settings-4-line" />
                        </a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a
                            className="text-decoration-none"
                            data-bs-target="#modal-account"
                            data-bs-toggle="modal"
                            href="#"
                            title="Account"
                        >
                            <div className="avatar avatar-online avatar-sm">
                                <span className="avatar-label bg-soft-success text-success fs-6">
                                    JD
                                </span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="sidebar border-end overflow-hidden h-100">
                <div className="tab-content h-100">
                    <div
                        className={`tab-pane fade h-100 ${activeTab === 'create-chat-tab' ? 'show active' : ''}`}
                        id="create-chat-tab"
                        role="tabpanel"
                    >
                        <CreateChat onChatCreated={handleChatCreated} />
                    </div>
                    <div
                        className={`tab-pane fade h-100 ${activeTab === 'friends-tab' ? 'show active' : ''}`}
                        id="friends-tab"
                        role="tabpanel"
                    >
                        <FriendsTab />
                    </div>
                    <div
                        className={`tab-pane fade h-100 ${activeTab === 'chats-tab' ? 'show active' : ''}`}
                        id="chats-tab"
                        role="tabpanel"
                    >
                        <ChatTab />
                    </div>
                    <div
                        className={`tab-pane fade h-100 ${activeTab === 'notifications-tab' ? 'show active' : ''}`}
                        id="notifications-tab"
                        role="tabpanel"
                    >
                        <NotificationsTab />
                    </div>
                    <div
                        className={`tab-pane fade h-100 ${activeTab === 'settings-tab' ? 'show active' : ''}`}
                        id="settings-tab"
                        role="tabpanel"
                    >
                        <SettingTab />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;