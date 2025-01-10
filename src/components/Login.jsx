import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
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
        "http://localhost:8000/api/user/login",
        formData
      );

      localStorage.setItem("token", response.data.token); // Save token

      navigate("/admin/header"); // Redirect to admin panel

      toast.success("Login Successfully");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      setError(errorMsg);

      toast.error(errorMsg);
    }
  };

  return (
    <div className="login-container">
      <div className="col-lg-7 m-auto">
        <div className="card">
          <div className="row w-100">
            <div className="col-lg-5 b bg-theme">
              <div className="welcome-msg">
                <h3>Welcome Back</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Laudantium ipsum.
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="card-body">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit}>
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
                  <div className="text-center">
                    <button className="btn btn-primary" type="submit">
                      Login
                    </button>
                  </div>
                  {error && <p className="error">{error}</p>}
                  <p className="text-center mt-3">
                    New User{" "}
                    <Link className="text-primary" to={"/register"}>
                      Click here to Register
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
