import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Services = () => {
  const [data, setData] = useState([]);

  const server = "http://localhost:8000";

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getServices/")
      .then((res) => {
        console.log(setData(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <section
      className={`services section-devider py-5 ${
        data[0]?.isVisible === false ? "d-none" : ""
      }`}
      id="services"
    >
      <div className="text-center p-1">
        <p className="text-theme m-0">
          <small>Services</small>
        </p>
        <h2>
          <span className="text-theme">O</span>ur
          <span className="text-theme"> S</span>ervices
        </h2>
        <p className="mb-0">
          <i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
            adipisci!
          </i>
        </p>
      </div>
      <div className="container mt-3">
        <Slider {...settings}>
          {data.map((items, i) => (
            <div className="card" style={{ width: "22rem" }} key={i}>
              <img
                src={`${server}${items.image}`}
                className="card-img-top m-auto"
                alt="image"
                width={"100%"}
              />
              <div className="card-body">
                <h5 className="card-title">{items.title}</h5>
                <p className="card-text text-secondary">
                  <small>{items.description}</small>
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Services;
