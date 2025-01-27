import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const [refresh, setRefresh] = useState(true);
  const [footerData, setFooterData] = useState([]);
  const [headerData, setHeaderData] = useState([]);

  const links = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonial" },
  ];

  const footerAPI = "http://localhost:8000/api/footer";
  const headerAPI = "http://localhost:8000/api/getHeader";
  const server = "http://localhost:8000";

  useEffect(() => {
    axios
      .get(footerAPI)
      .then((res) => {
        setFooterData(res.data.data);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  useEffect(() => {
    axios
      .get(headerAPI)
      .then((res) => {
        setHeaderData(res.data.data);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  const animation1 = {
    initial: { x: "-100%", opacity: 0 },
    whileInView: { x: "0", opacity: 1 },
    transition: { duration: 0.7 },
  };

  return (
    <footer
      className={`pt-5 ${footerData[0]?.isVisible === false ? "d-none" : ""}`}
    >
      <div className="container">
        <div className="row">
          <motion.div {...animation1} className="col-lg-3 pe-5">
            <div className="navbar-brand">
              <img
                src={`${server}${headerData[0]?.brandLogo}`}
                alt="brand-logo"
                width="200px"
              />
            </div>
            <p>
              <small>{footerData[0]?.description}</small>
            </p>
            <div className=" d-flex gap-2">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-whatsapp"></i>
              <i className="bi bi-twitter"></i>
            </div>
          </motion.div>
          <motion.div
            {...animation1}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="col-lg-3"
          >
            <h5>Important Links</h5>
            <ul>
              {links.map((item, i) => (
                <li className="mb-2" key={i}>
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            {...animation1}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="col-lg-3"
          >
            <h5>Our Contact Details</h5>
            <div>
              <p className="mb-0">
                <FaLocationDot /> &nbsp; <small>{footerData[0]?.address}</small>
              </p>
              <p className="mb-0">
                <MdEmail />
                &nbsp; &nbsp;
                <small>
                  <a href="mailto:abc@sample.com">{footerData[0]?.email}</a>
                </small>
              </p>
              <p className="mb-0">
                <FaPhoneAlt />
                &nbsp; &nbsp;
                <small>
                  <a href={`tel:${footerData[0]?.phone}`}>
                    {footerData[0]?.phone}
                  </a>
                </small>
              </p>
            </div>
          </motion.div>
          <motion.div
            {...animation1}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="col-lg-3"
          >
            <iframe
              className="rounded-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.226449141036!2d77.36377801048474!3d28.622974475568423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce506afcf5f5d%3A0xe15b28be98e266c9!2sCodeGenIT%20Private%20Limited!5e0!3m2!1sen!2sin!4v1734001109115!5m2!1sen!2sin"
              width="100%"
              height="250px"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>

        <div className="border-bottom"></div>

        <div className="text-center py-3">
          <motion.p
            {...animation1}
            transition={{ duration: 0.7, delay: 1.5 }}
            className="mb-0"
          >
            <small>
              2024 Copyright @<a href="#">Interior Singh</a> Power by{" "}
              <a target="blank" href="https://codegenit.com/">
                CodegenIT Pvt Ltd
              </a>
            </small>
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
