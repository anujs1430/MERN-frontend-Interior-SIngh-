import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        formData
      );

      console.log(response);

      toast.success("Registration Successful!");

      navigate("/login"); // Redirect to login page
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";

      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="login-container register-container">
      <div className="col-lg-7 m-auto">
        <div className="card">
          <div className="row w-100">
            <div className="col-lg-7">
              <div className="card-body">
                <h2 className="text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="text-center mb-3">
                    <button className="btn btn-primary" type="submit">
                      Register
                    </button>
                    {error && <p className="error">{error}</p>}
                  </div>
                  <p className="text-center">
                    Already have account{" "}
                    <Link className="text-primary" to={"/login"}>
                      Log in
                    </Link>
                  </p>
                </form>
              </div>
            </div>
            <div className="col-lg-5 b bg-theme">
              <div className="welcome-msg">
                <h2>Welcome {formData.name || "New User"}</h2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Laudantium ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
