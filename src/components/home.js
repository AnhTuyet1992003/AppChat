import { useEffect, useRef, useState } from 'react';
import '../scss/styles-light.min.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'magnific-popup/dist/magnific-popup.css';
import 'magnific-popup';
import ChatBox from "./Chat/chat";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {initializeSocket, reLoginUser} from "../socket/socket";

function Home() {
    const login = useSelector((state) => state.login);
    const chatContainerRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
console.log("user:"+localStorage.getItem("username"))
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

        }
    }, [dispatch, navigate, login]);

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
