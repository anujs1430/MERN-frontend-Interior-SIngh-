import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Banner = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getBanner")
      .then((res) => {
        setData(res.data.data[0]);
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

  return (
    <section className={`banner ${data?.isVisible === false ? "d-none" : ""}`}>
      <div className="w-100 h-100 center text-center">
        <div className="w-75 m-auto">
          <motion.h2 {...animation1}>{data.heading}</motion.h2>
          <motion.p
            {...animation1}
            transition={{ duration: 0.5, delay: 0.4 }}
            className=""
          >
            <small>{data.description}</small>
          </motion.p>
          <motion.div
            {...animation1}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center"
          >
            <a href="#contact" className="btn btn-primary">
              Get Started
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
