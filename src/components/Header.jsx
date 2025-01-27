import React, { useEffect, useState } from "react";
import { IoIosMail, IoLogoWhatsapp } from "react-icons/io";
import { FaFacebook, FaSquarePhone, FaTwitter } from "react-icons/fa6";
import $ from "jquery";
import axios from "axios";
import { motion } from "framer-motion";

const Header = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getHeader")
      .then((res) => {
        setData(res.data.data[0]);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  const serverPORT = "http://localhost:8000";

  const icons = [<IoLogoWhatsapp />, <FaFacebook />, <FaTwitter />];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // add event listener on scroll
    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const animation1 = {
    initial: { x: "-100%", opacity: 0 },
    whileInView: { x: "0", opacity: 1 },
    transition: { duration: 0.5 },
  };

  const navbarBgColor = data.navbarBgColor || "transparent"; // Default to white if no color is set

  return (
    <>
      <nav
        className={`top-nav ${data.isVisible === false ? "d-none" : ""} ${
          isScrolled ? "d-none" : ""
        }`}
      >
        <div className="d-flex justify-content-between align-items-center">
          <motion.div {...animation1} className="d-flex gap-3">
            <p className="m-0">
              <small>
                <IoIosMail className="h5 mb-0" /> {data.email}
              </small>
            </p>
            <p className="m-0">
              <small>
                <FaSquarePhone className="h6 mb-0" /> {data.phone}
              </small>
            </p>
          </motion.div>
          <motion.div
            {...animation1}
            transition={{ delay: "0.5" }}
            className="d-flex gap-2"
          >
            {icons.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </motion.div>
        </div>
      </nav>

      <nav
        className={`navbar navbar-expand-lg ${
          data.isVisible === false ? "d-none" : ""
        } ${isScrolled ? "conditional-nav" : ""}`}
        style={{ backgroundColor: navbarBgColor }}
      >
        <div className="container">
          <motion.a
            {...animation1}
            className="navbar-brand text-light"
            href="#"
          >
            <img src={`${serverPORT}${data.brandLogo}`} alt="brand-logo" />
          </motion.a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <motion.ul
              {...animation1}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="navbar-nav mx-auto mb-2 mb-lg-0"
            >
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#portfolio">
                  Portfolio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonial">
                  Testimonials
                </a>
              </li>
            </motion.ul>
            <motion.a
              {...animation1}
              transition={{ duration: 0.5, delay: 1 }}
              href="#contact"
              className="btn btn-primary"
            >
              Contact Us
            </motion.a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
