
import '../../../scss/styles-light.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'magnific-popup/dist/magnific-popup.css';
import 'magnific-popup';
import Createchat from "./sidebarContent/createchat";
import FriendsTab from "./sidebarContent/friendstab";
import ChatTab from "./sidebarContent/chattab";
import NotificationsTab from "./sidebarContent/notificationstab";
import SettingTab from "./sidebarContent/settingtab";

function Sidebar() {
    return (
<>
        <div className="navigation navbar border-end h-100 py-6">
            <a className="logo d-none d-xl-block mb-6" href="#">
                <img alt="" src="/image/logo.png" />
            </a>
            <ul className="nav nav-pills" role="tablist">
                <li className="nav-item mt-xl-auto mb-5" role="presentation">
                    <a
                        aria-selected="false"
                        className="nav-link"
                        data-bs-toggle="pill"
                        href="#create-chat-tab"
                        role="tab"
                        title="Create chat"
                    >
                        <i className="ri-quill-pen-line"/>
                    </a>
                </li>
                <li
                    className="nav-item mb-5"
                    role="presentation"
                >
                    <a
                        aria-selected="false"
                        className="nav-link"
                        data-bs-toggle="pill"
                        href="#friends-tab"
                        role="tab"
                        title="Friends"
                    >
                        <i className="ri-group-line"/>
                    </a>
                </li>
                <li
                    className="nav-item mb-5"
                    role="presentation"
                >
                    <a
                        aria-selected="true"
                        className="nav-link active"
                        data-bs-toggle="pill"
                        href="#chats-tab"
                        role="tab"
                        title="Chats"
                    >
                        <i className="ri-chat-3-line"/>
                    </a>
                </li>
                <li
                    className="nav-item mb-5"
                    role="presentation"
                >
                    <a
                        aria-selected="false"
                        className="nav-link"
                        data-bs-toggle="pill"
                        href="#notifications-tab"
                        role="tab"
                        title="Notifications"
                    >
                        <i className="ri-notification-3-line"/>
                    </a>
                </li>
                <li
                    className="nav-item mb-5"
                    role="presentation"
                >
                    <a
                        aria-selected="false"
                        className="nav-link"
                        data-bs-toggle="pill"
                        href="#settings-tab"
                        role="tab"
                        title="Settings"
                    >
                        <i className="ri-settings-4-line"/>
                    </a>
                </li>
                <li
                    className="nav-item"
                    role="presentation"
                >
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
                    className="tab-pane fade h-100"
                    id="create-chat-tab"
                    role="tabpanel"
                >
                    <Createchat />
                </div>
                <div
                    className="tab-pane fade h-100"
                    id="friends-tab"
                    role="tabpanel"
                >
                    <FriendsTab />
                </div>
                <div
                    className="tab-pane fade show active h-100"
                    id="chats-tab"
                    role="tabpanel"
                >
                    <ChatTab />
                </div>
                <div
                    className="tab-pane fade h-100"
                    id="notifications-tab"
                    role="tabpanel"
                >
                    <NotificationsTab />
                </div>
                <div
                    className="tab-pane fade h-100"
                    id="settings-tab"
                    role="tabpanel"
                >
                    <SettingTab />
                </div>
            </div>
        </div>
</>
    )
}

export default Sidebar;