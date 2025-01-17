import React, { useEffect, useState } from "react";
import { FaAward } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import axios from "axios";
import { motion } from "framer-motion";

const About = () => {
  const [aboutData, setAboutData] = useState([]);

  const serverPORT = "http://localhost:8000";

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getAbout")
      .then((res) => {
        console.log(setAboutData(res.data[0]));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const animation1 = {
    initial: { x: "-100%", opacity: 0 },
    whileInView: { x: "0", opacity: 1 },
    transition: { duration: 0.5 },
  };
  const animation2 = {
    initial: { y: "+100%", opacity: 0 },
    whileInView: { y: "0", opacity: 1 },
    transition: { duration: 0.8 },
  };

  return (
    <section
      className={`about py-5 ${aboutData.isVisible === false ? "d-none" : ""}`}
      id="about"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="images-container position-relative">
              <motion.img
                {...animation1}
                transition={{ duration: 0.5 }}
                className="about-img1"
                src={`${serverPORT}${aboutData.mainImage}`}
                alt="about-img"
                width="350px"
              />
              <motion.img
                {...animation1}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="about-img2"
                src={`${serverPORT}${aboutData.subImage}`}
                alt="about-img"
                width="300px"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div>
              <p className="text-theme">
                <small>About Us</small>
              </p>
              <motion.h2
                {...animation2}
                transition={{ duration: 0.8 }}
                className="mt-3"
              >
                {aboutData.heading}
              </motion.h2>

              <motion.p
                {...animation2}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-secondary mt-3"
              >
                {aboutData.paragraph}
              </motion.p>

              <div className="mt-4">
                <motion.div
                  {...animation2}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="d-flex gap-2"
                >
                  <div>
                    <FaAward className="text-theme h4" />
                  </div>
                  <div>
                    <h6 className="mb-0">20+ Winnging Award</h6>
                    <p className="text-secondary">
                      <small>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quaerat, consectetur.
                      </small>
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  {...animation2}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="d-flex gap-2 my-3"
                >
                  <div>
                    <SlCalender className="h4 text-theme" />
                  </div>
                  <div>
                    <h6 className="mb-0">20+ Winnging Award</h6>
                    <p className="text-secondary">
                      <small>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quaerat, consectetur.
                      </small>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
