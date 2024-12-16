import React from "react";
import brandIcon from "../assets/images/brand-logo2.png";

const Footer = () => {
  const links = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Testimonials", href: "#testimonial" },
  ];

  return (
    <footer className="pt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 pe-5">
            <img src={brandIcon} alt="brand-logo" width="200px" />
            <p>
              <small>
                Lorem ipsum dolor sit, amet consectetur adipisicing elitLorem
                ipsum dolor sit, amet consectetur adipisicing elit.
              </small>
            </p>
            <div className=" d-flex gap-2">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-whatsapp"></i>
              <i className="bi bi-twitter"></i>
            </div>
          </div>
          <div className="col-lg-3">
            <h5>Important Links</h5>
            <ul>
              {links.map((item, i) => (
                <li className="mb-2" key={i}>
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3">
            <h5>Our Contact Details</h5>
            <div>
              <p className="mb-0">
                <i className="bi bi-geo-fill"></i>{" "}
                <small>94 XYZ, Chor Bazaar, Wakandapur (Delhi)</small>
              </p>
              <p className="mb-0">
                <i className="bi bi-envelope-at-fill"></i>{" "}
                <small>
                  <a href="mailto:abc@sample.com">abc@sample.com</a>
                </small>
              </p>
              <p className="mb-0">
                <i className="bi bi-telephone-forward-fill"></i>{" "}
                <small>
                  <a href="tel:+919876543211">+91 9876543211</a>
                </small>
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <iframe
              className="rounded-2"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.226449141036!2d77.36377801048474!3d28.622974475568423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce506afcf5f5d%3A0xe15b28be98e266c9!2sCodeGenIT%20Private%20Limited!5e0!3m2!1sen!2sin!4v1734001109115!5m2!1sen!2sin"
              width="100%"
              height="250px"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="border-bottom"></div>

        <div className="text-center py-3">
          <p className="mb-0">
            <small>
              2024 Copyright @<a href="#">Interior Singh</a> Power by{" "}
              <a target="blank" href="https://codegenit.com/">
                CodegenIT Pvt Ltd
              </a>
            </small>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
