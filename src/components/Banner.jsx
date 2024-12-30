import React, { useEffect, useState } from "react";
import axios from "axios";

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

  return (
    <section className="banner">
      <div className="w-100 h-100 center text-center">
        <div className="w-75 m-auto">
          <h2>{data.heading}</h2>
          <p className="">
            <small>{data.description}</small>
          </p>
          <div className="text-center">
            <a href="#contact" className="btn btn-primary">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
