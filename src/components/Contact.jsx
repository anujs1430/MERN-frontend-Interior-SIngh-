import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");

  console.log(name, email, phone, subject, comment);

  return (
    <section className="contact py-5 section-devider" id="contact">
      <div className="text-center p-1">
        <p className="text-theme m-0">
          <small>Contact Us</small>
        </p>
        <h2>
          <span className="text-theme">C</span>ontact{" "}
          <span className="text-theme">U</span>s
        </h2>
        <p>
          <i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
            adipisci!
          </i>
        </p>
      </div>
      <div className="container mt-5">
        <div className="d-flex">
          <div className="card w-100">
            <div className="card-body">
              <form className="p-5">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3 w-100">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Full Name..."
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 w-100">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Enter Phone Number..."
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3 w-100">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 w-100">
                      <label htmlFor="subject" className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Enter Subject..."
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Comments</label>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
