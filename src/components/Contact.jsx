import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    comment: "",
  });

  // Handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission handler
  const submitHandle = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Send the form data to the backend
      const response = await axios.post(
        "http://localhost:8000/api/cutomers/getcontact",
        formData
      );
      console.log("Form submitted successfully:", response.data);

      // Optionally clear the form after submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        comment: "",
      });

      toast.success(`${formData.name} Your info has been sent.`);
    } catch (err) {
      console.log(
        "Form Submit Error:",
        err.response ? err.response.data : err.message
      );
      toast.error(err.response.data.message);
    }
  };

  const animation1 = {
    initial: { x: "-100%", opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    transition: { duration: 0.5 },
  };

  const animation2 = {
    initial: { y: "+100%", opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="contact py-5 section-devider" id="contact">
      <motion.div {...animation2} className="text-center p-1">
        <p className="text-theme m-0">
          <small>Contact Us</small>
        </p>
        <h2>
          <span className="text-theme">C</span>ontact
          <span className="text-theme"> U</span>s
        </h2>
        <p>
          <i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
            adipisci!
          </i>
        </p>
      </motion.div>
      <div className="container mt-5">
        <div className="d-flex">
          <div className="card w-100">
            <div className="card-body">
              <form className="p-5" onSubmit={submitHandle}>
                <div className="row">
                  <motion.div {...animation1} className="col-lg-6">
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
                        value={formData.name}
                        onChange={handleInputChange}
                        required
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
                        name="phone"
                        placeholder="Enter Phone Number..."
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    {...animation1}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="col-lg-6"
                  >
                    <div className="mb-3 w-100">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter Email..."
                        value={formData.email}
                        onChange={handleInputChange}
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
                        name="subject"
                        placeholder="Enter Subject..."
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  {...animation1}
                  transition={{ duration: 0.7, delay: 0.9 }}
                  className="form-floating mb-3"
                >
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Comments</label>
                </motion.div>
                <motion.div
                  {...animation1}
                  transition={{ duration: 0.7, delay: 1.5 }}
                  className="text-center"
                >
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </motion.div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
