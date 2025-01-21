import React, { useEffect, useState } from "react";
import axios from "axios";

const Faq = () => {
  const [response, setResponse] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const faqAPI = "http://localhost:8000/api/faq";

  useEffect(() => {
    axios
      .get(faqAPI)
      .then((res) => {
        setResponse(res.data.data);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  return (
    <section
      className={`faq py-5 ${response[0]?.isVisible === false ? "d-none" : ""}`}
    >
      <div className="container">
        <div className="text-center p-1">
          <p className="text-theme m-0">
            <small>FAQ's</small>
          </p>
          <h2>
            <span className="text-theme">F</span>requently
            <span className="text-theme"> A</span>sked
            <span className="text-theme"> Q</span>uestion
          </h2>
          <p>
            <i>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
              adipisci!
            </i>
          </p>
        </div>

        <div className="accordion accordion-flush" id="accordionFlushExample">
          {response.map((item, i) => (
            <div className="accordion-item" key={i}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${i}`}
                  aria-expanded="false"
                  aria-controls={`${i}`}
                >
                  <h6 className="mb-0">{item.question}</h6>
                </button>
              </h2>
              <div
                id={`${i}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
