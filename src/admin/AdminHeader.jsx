import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import SectionDisableFunc from "../components/SectionDisableFunc";

const AdminHeader = () => {
  const [data, setData] = useState({
    email: "",
    phone: "",
    brandLogo: null,
    navbarBgColor: "#ffffff", // Default color
    isTransparent: false, // New state for transparency
    isVisible: true,
  });
  const [response, setResponse] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const server = "http://localhost:8000";
  const headerAPI = "http://localhost:8000/api/getHeader";
  const updateHeaderAPI = "http://localhost:8000/api/getHeader/visibility"; // New endpoint for updating visibility

  const imageReff = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setData({ ...data, [name]: checked }); // Dynamically update the key matching the checkbox's "name" attribute
      // Assign its value as "checked" (true or false) depending on whether the checkbox is selected
      toast.success("Navbar background visibility changed");
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setData({ ...data, [name]: files[0] });
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append(
      "navbarBgColor",
      data.isTransparent ? "transparent" : data.navbarBgColor
    );

    if (data.brandLogo) {
      formData.append("brandLogo", data.brandLogo);
    }

    try {
      const response = await axios.post(headerAPI, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData({
        email: "",
        phone: "",
        brandLogo: null,
        navbarBgColor: "#ffffff", // Reset the color picker to default
        isTransparent: false,
      });

      setRefresh(!refresh);

      // Clear file input fields after submit using refs
      if (imageReff.current) imageReff.current.value = "";

      toast.success("Data has been updated successfully");

      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle visibility toggle and send the update to the backend
  const handleHeaderVisibilityToggle = () => {
    const newVisibility = !data.isVisible;
    setData({ ...data, isVisible: newVisibility });

    // Send the visibility update to the backend via the new route
    axios
      .post(updateHeaderAPI, {
        isVisible: newVisibility,
      })
      .then((response) => {
        toast.success("Header visibility updated");

        setRefresh(!refresh);

        console.log(response.data.data);
      })
      .catch((error) => {
        toast.error("Error updating header visibility");

        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(headerAPI)
      .then((res) => {
        setResponse(res.data.data);
        setRefresh(!refresh);
      })

      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4 className="text-center">Header Section Update</h4>
        {/* Add the toggle for header visibility */}
        {/* <div className="mt-3">
        <label>Hide Header Section:</label>
        <input
          type="checkbox"
          checked={!data.isVisible}
          onChange={handleHeaderVisibilityToggle}
        />
        <span>Header Hidden</span>
        </div> */}
        <SectionDisableFunc
          handleVisibilityToggle={handleHeaderVisibilityToggle}
          checked={!data.isVisible}
          visibility={response[0]?.isVisible == true ? "ONN" : "OFF"}
        />
      </div>
      <form onSubmit={submitHandle}>
        <div className="row">
          <div className="col-lg-6 mt-5">
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                type="text"
                id="email"
                name="email"
                placeholder="Enter email Here..."
                onChange={handleInputChange}
                value={data.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="brandLogo">Brand Logo</label>
              <input
                type="file"
                id="brandLogo"
                name="brandLogo"
                onChange={handleFileChange}
                ref={imageReff}
              />
            </div>
          </div>
          <div className="col-lg-6 mt-5">
            <div className="mb-3">
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <input
                className="form-control"
                type="number"
                maxLength={10}
                id="phone"
                name="phone"
                placeholder="Enter phone Here..."
                onChange={handleInputChange}
                value={data.phone}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="navbarBgColor">Navbar Background Color</label>
              <input
                type="color"
                id="navbarBgColor"
                name="navbarBgColor"
                onChange={handleInputChange}
                value={data.navbarBgColor}
                disabled={data.isTransparent} // Disable if transparent is checked
              />
              <label>
                <input
                  type="checkbox"
                  name="isTransparent"
                  checked={data.isTransparent}
                  onChange={handleInputChange}
                />
                &nbsp; Transparent
              </label>
            </div>
          </div>
        </div>
        <div className="mt-3 text-center">
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </div>
      </form>

      <table className="table table-dark table-striped mt-5">
        <thead>
          <tr>
            <th width="6%">Image</th>
            <th>Email</th>
            <th>Navbar BG Color</th>
            <th>Phone</th>
            <th>Section Visibility</th>
          </tr>
        </thead>
        <tbody>
          {response.map((items, i) => (
            <tr key={i}>
              <td>
                <img
                  src={`${server}${items.brandLogo}`}
                  alt=""
                  width={"100%"}
                />
              </td>
              <td>{items.email}</td>
              <td>
                <input
                  type={
                    items.navbarBgColor === "transparent" ? "text" : "color"
                  }
                  value={items.navbarBgColor}
                  readOnly
                />
              </td>
              <td>{items.phone}</td>
              <td>
                {items.isVisible == true ? (
                  <span className="badge text-bg-primary">Visibility: ON</span>
                ) : (
                  <span className="badge text-bg-primary">Visibility: OFF</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHeader;
