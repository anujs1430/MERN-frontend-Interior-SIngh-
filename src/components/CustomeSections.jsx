import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const CustomeSections = () => {
  const [response, setResponse] = useState([]);

  const sectionAPI = "http://localhost:8000/api/createSection";
  const server = "http://localhost:8000";

  useEffect(() => {
    axios
      .get(sectionAPI)
      .then((res) => {
        setResponse(res.data.data);
      })
      .catch((error) => {
        console.error(error);
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
    <>
      {response?.map((item, i) => (
        <section
          className={`customeSection py-5 ${
            item.isVisible === false ? "d-none" : ""
          }`}
          key={i}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="images-container position-relative">
                  <motion.img
                    {...animation1}
                    transition={{ duration: 0.5 }}
                    className="about-img1 object-fit-cover"
                    src={`${server}/${item.image}`}
                    alt="about-img"
                    width="100%"
                    height={"400px"}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div>
                  <p className="text-theme">
                    <small>{item.subName}</small>
                  </p>
                  <motion.h2
                    {...animation2}
                    transition={{ duration: 0.8 }}
                    className="mt-3"
                  >
                    {item.mainHeading}
                  </motion.h2>

                  <motion.p
                    {...animation2}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-secondary mt-3"
                  >
                    {item.mainParagraph}
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default CustomeSections;
