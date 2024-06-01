import { useEffect, useRef } from 'react';

import '../scss/styles-light.min.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'magnific-popup/dist/magnific-popup.css';
import 'magnific-popup';
import ChatBox from "./Chat/chat";

function Home() {
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '%PUBLIC_URL%/src/scss/styles-dark.min.css';
        link.media = '(prefers-color-scheme: dark)';
        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    useEffect(() => {
        // Toggle active state on contact item
        $(document).on('click', '.js-contact-list .contact-item', function () {
            $(".contact-item").removeClass("active");
            $(this).addClass("active");
        });

        // Open and close navigation
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

        // Hide navigation while resize window on desktop view
        $(window).on("resize", function () {
            if ($(this).width() > 1200) {
                $('.navigation').removeClass('navigation-visible');
            }
        }).trigger('resize');

        // Hide chat
        $(".chat-hide").on("click", function () {
            $(".main").removeClass("main-visible");
        });

        // Show info panel
        $(".chat-info-toggle").on("click", function () {
            $(".chat-info").toggleClass('chat-info-visible');
        });

        // Hide info panel
        $(".chat-info-close").on("click", function () {
            $(".chat-info").removeClass("chat-info-visible");
        });

        // Magnific popup
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

        // Cleanup function to remove event listeners on component unmount
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

    // Scroll chat to bottom whenever new messages are added
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