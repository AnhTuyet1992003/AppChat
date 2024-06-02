import { useEffect, useRef, useState } from 'react';
import '../scss/styles-light.min.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'magnific-popup/dist/magnific-popup.css';
import 'magnific-popup';
import ChatBox from "./Chat/chat";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { initializeSocket, socketActions } from "../socket/socket";

function Home() {
    const chatContainerRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const reLoginCode = localStorage.getItem('RE_LOGIN_CODE');
        const reLoginUser = localStorage.getItem('RE_LOGIN_USER');
        console.log("get: " + reLoginCode);

        if (!reLoginCode || !reLoginUser) {
            navigate('/login');
            return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/src/scss/styles-dark.min.css';
        link.media = '(prefers-color-scheme: dark)';
        document.head.appendChild(link);

        const socketInstance = initializeSocket();
        setSocket(socketInstance);

        return () => {
            document.head.removeChild(link);
        };
    }, [navigate]);

    useEffect(() => {
        if (socket) {
            const reLoginCode = localStorage.getItem('RE_LOGIN_CODE');
            const reLoginUser = localStorage.getItem('RE_LOGIN_USER');
            if (reLoginCode && reLoginUser) {
                dispatch(socketActions.reLoginUser(reLoginUser, reLoginCode));
            }
        }
    }, [socket, dispatch]);

    useEffect(() => {
        $(document).on('click', '.js-contact-list .contact-item', function () {
            $(".contact-item").removeClass("active");
            $(this).addClass("active");
        });

        $('.navigation-toggle').on("click", function (e) {
            e.stopPropagation();
            $('.navigation').toggleClass("navigation-visible");
        });

        $('.navigation').on("click", function (e) {
            e.stopPropagation();
        });

        $('body,html').on("click", function () {
            $('.navigation').removeClass('navigation-visible');
        });

        $(window).on("resize", function () {
            if ($(this).width() > 1200) {
                $('.navigation').removeClass('navigation-visible');
            }
        }).trigger('resize');

        $(".chat-hide").on("click", function () {
            $(".main").removeClass("main-visible");
        });

        $(".chat-info-toggle").on("click", function () {
            $(".chat-info").toggleClass('chat-info-visible');
        });

        $(".chat-info-close").on("click", function () {
            $(".chat-info").removeClass("chat-info-visible");
        });

        $('.shared-image-list').magnificPopup({
            delegate: 'a.shared-image',
            type: 'image',
            mainClass: 'mfp-fade',
            closeOnContentClick: true,
            showCloseBtn: false,
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease',
            },
            image: {
                cursor: 'pointer',
            }
        });

        return () => {
            $(document).off('click', '.js-contact-list .contact-item');
            $('.navigation-toggle').off("click");
            $('.navigation').off("click");
            $('body,html').off("click");
            $(window).off("resize");
            $(".chat-hide").off("click");
            $(".chat-info-toggle").off("click");
            $(".chat-info-close").off("click");
        };
    }, []);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    });

    return (
        <>
            <ChatBox />
        </>
    )
}

export default Home;
