import React from 'react'
import brandLogo from '../assets/images/brand-logo2.png'
import { IoIosMail, IoLogoWhatsapp } from 'react-icons/io'
import { FaFacebook, FaSquarePhone, FaTwitter } from 'react-icons/fa6'
import $ from "jquery";
import { span } from 'framer-motion/client';


const Header = () => {

    const icons = [<IoLogoWhatsapp />, <FaFacebook />, <FaTwitter />]

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 100) {
            $(".top-nav").fadeOut();
            // $(".navbar").css({ top: "0", backgroundColor: "black" });
            $(".navbar").addClass("conditional-nav");
        } else {
            $(".top-nav").fadeIn();
            $(".navbar").removeClass("conditional-nav");
        }
    });

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 100) {
            $(".top-nav").fadeOut();
            // $(".navbar").css({ top: "0", backgroundColor: "black" });
            $(".navbar").addClass("conditional-nav");
        } else {
            $(".top-nav").fadeIn();
            $(".navbar").removeClass("conditional-nav");
        }
    });

    return (
        <>
            <nav className="top-nav">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3">
                        <p className="m-0"><small><IoIosMail className='h5 mb-0' /> simpale@gmail.com</small></p>
                        <p className="m-0"><small><FaSquarePhone className='h6 mb-0' /> 9876543211</small></p>
                    </div>
                    <div className="d-flex gap-2">
                        {icons.map((item, index) => (
                            <span key={index}>{item}</span>
                        ))}
                    </div>
                </div>
            </nav>

            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand text-light" href="#"><img src={brandLogo} alt="brand-logo"
                        width="200px" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#about">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#services">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#portfolio">Portfolio</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#testimonial">Testimonials</a>
                            </li>
                        </ul>
                        <a href="#contact" className="btn btn-primary">Contact Us</a>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
