import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [seeLess, setseeLess] = useState(true);
  const [data, setData] = useState([]);

  const server = "http://localhost:8000";

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/getPortfolio")
      .then((res) => {
        setData(res.data.data);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  $(document).ready(function () {
    const $lightbox = $(".lightbox");
    const $lightboxImage = $(".lightbox-image");
    const $photos = $(".photo");
    let currentIndex = 0;

    function showLightbox(index) {
      const imgSrc = $photos.eq(index).find("img").attr("src");
      $lightboxImage.attr("src", imgSrc);
      $lightbox.fadeIn();
      currentIndex = index;
    }

    function closeLightbox() {
      $lightbox.fadeOut();
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % $photos.length;
      showLightbox(currentIndex);
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + $photos.length) % $photos.length;
      showLightbox(currentIndex);
    }

    $photos.on("click", function () {
      const index = $(this).data("index");
      showLightbox(index);
    });

    $(".lightbox .close").on("click", closeLightbox);
    $(".lightbox .next").on("click", showNext);
    $(".lightbox .prev").on("click", showPrev);

    $(document).on("keydown", function (e) {
      if ($lightbox.is(":visible")) {
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
        if (e.key === "Escape") closeLightbox();
      }
    });
  });

  const seeMoreHandle = () => {
    setseeLess(!seeLess);
  };

  const animation1 = {
    initial: { y: "+100%", opacity: 0 },
    whileInView: { y: "0", opacity: 1 },
    transition: { duration: 0.5 },
  };

  return (
    <section
      className={`portfolio py-5 ${
        data[0]?.isVisible === false ? "d-none" : ""
      }`}
      id="portfolio"
    >
      <motion.div {...animation1} className="text-center p-1">
        <p className="text-theme m-0">
          <small>Portfolio</small>
        </p>
        <h2>
          <span className="text-theme">O</span>ur
          <span className="text-theme"> P</span>ortfolio
        </h2>
        <p>
          <i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
            adipisci!
          </i>
        </p>
      </motion.div>
      <div className="container">
        <div className={`gallery ${seeLess && "seeLess"}`}>
          {data.map((item, i) => (
            <motion.div
              {...animation1}
              className="photo"
              data-index={i}
              key={i}
            >
              <img src={`${server}${item.image}`} alt={item.alt} />
              <div className="overlay">{item.description}</div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={seeMoreHandle}>
            See More
          </button>
        </div>

        <div className="lightbox">
          <span className="close">&times;</span>
          <img className="lightbox-image" src="" alt="Lightbox" />
          <button className="prev">&lt;</button>
          <button className="next">&gt;</button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
