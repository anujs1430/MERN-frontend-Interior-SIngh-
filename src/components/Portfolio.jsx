import React, { useEffect, useState } from "react";
// import img1 from "../assets/images/about1.jpeg";
// import img2 from "../assets/images/about2.webp";
// import img3 from "../assets/images/img1.jpg";
import axios from "axios";
import $ from "jquery";

const Portfolio = () => {
  const [seeLess, setseeLess] = useState(true);
  const [data, setData] = useState([]);

  const server = "http://localhost:8000";

  //   const images = [
  //     { src: img1, alt: "Photo 1", description: "Photo 1 Description" },
  //     { src: img2, alt: "Photo 2", description: "Photo 2 Description" },
  //     { src: img3, alt: "Photo 3", description: "Photo 3 Description" },
  //     { src: img3, alt: "Photo 4", description: "Photo 4 Description" },
  //     { src: img3, alt: "Photo 5", description: "Photo 5 Description" },
  //     { src: img3, alt: "Photo 6", description: "Photo 6 Description" },
  //     { src: img3, alt: "Photo 7", description: "Photo 7 Description" },
  //     { src: img3, alt: "Photo 8", description: "Photo 8 Description" },
  //     { src: img3, alt: "Photo 9", description: "Photo 9 Description" },
  //     { src: img3, alt: "Photo 10", description: "Photo 10 Description" },
  //     { src: img3, alt: "Photo 11", description: "Photo 11 Description" },
  //     { src: img3, alt: "Photo 12", description: "Photo 12 Description" },
  //     { src: img3, alt: "Photo 13", description: "Photo 13 Description" },
  //   ];

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

  return (
    <section className="portfolio py-5" id="portfolio">
      <div className="text-center p-1">
        <p className="text-theme m-0">
          <small>Portfolio</small>
        </p>
        <h2>
          <span className="text-theme">O</span>ur
          <span className="text-theme">P</span>ortfolio
        </h2>
        <p>
          <i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
            adipisci!
          </i>
        </p>
      </div>
      <div className="container">
        <div className={`gallery ${seeLess && "seeLess"}`}>
          {data.map((item, i) => (
            <div className="photo" data-index={i} key={i}>
              <img src={`${server}${item.image}`} alt={item.alt} />
              <div className="overlay">{item.description}</div>
            </div>
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
