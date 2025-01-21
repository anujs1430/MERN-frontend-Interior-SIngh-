import React, { useEffect, useState } from "react";
import SectionDisableFunc from "../components/SectionDisableFunc";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

const AdminFooter = () => {
  const [response, setResponse] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [fromData, setFromData] = useState({
    description: "",
    email: "",
    address: "",
    phone: "",
    isVisible: true,
  });

  const footerAPI = "http://localhost:8000/api/footer";
  const visibilityAPI = "http://localhost:8000/api/footer/visibility";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFromData({ ...fromData, [name]: value });
    // console.log(fromData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(footerAPI, fromData);

      setFromData({
        description: "",
        email: "",
        address: "",
        phone: "",
        isVisible: true,
      });

      setRefresh(!refresh);

      toast.success(res.data.message);
    } catch (error) {
      console.error(error.message);

      toast.error(error.message);
    }
  };

  const handleEdit = (footerData) => {
    setFromData({
      description: footerData.description,
      email: footerData.email,
      address: footerData.address,
      phone: footerData.phone,
      isVisible: footerData.isVisible,
    });
  };

  const handleVisibilityToggle = async () => {
    const newVisibilityAPI = !fromData.isVisible;
    setFromData({ ...fromData, isVisible: newVisibilityAPI });
    try {
      const res = await axios.post(visibilityAPI, {
        isVisible: newVisibilityAPI,
      });
      setRefresh(!refresh);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    axios
      .get(footerAPI)
      .then((res) => {
        setResponse(res.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [refresh]);

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center">
        <h4>Footer Management</h4>
        <SectionDisableFunc
          handleVisibilityToggle={handleVisibilityToggle}
          checked={!fromData.isVisible}
          visibility={response[0]?.isVisible === true ? "ONN" : "OFF"}
        />
      </div>

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                name="description"
                id="description"
                onChange={handleInputChange}
                value={fromData.description}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                onChange={handleInputChange}
                value={fromData.email}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label className="form-label" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                name="address"
                id="address"
                onChange={handleInputChange}
                value={fromData.address}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                name="phone"
                id="phone"
                onChange={handleInputChange}
                value={fromData.phone}
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      <table className="table table-dark table-striped table-responsive table-sm table-bordered mt-5">
        <thead>
          <tr>
            <th width="5%">S No.</th>
            <th>Description</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Visibility</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {response.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.description}</td>
              <td>{item.address}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                <span className="badge text-bg-primary">
                  Visibility: {item.isVisible === true ? "ONN" : "OFF"}
                </span>
              </td>
              <td>
                <FaEdit className="h4" onClick={() => handleEdit(item)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AdminFooter;
