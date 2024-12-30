import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const AdminColors = () => {
  const [data, setdata] = useState({
    primaryColor: "",
    secondaryColor: "",
    heroBanner: null,
    secondaryBanner: null,
  });

  const [response, setResponse] = useState([]);

  const colorsAPI = "http://localhost:8000/api/getColors";
  const server = "http://localhost:8000";

  const heroBanner = useRef(null);
  const secondaryBanner = useRef(null);

  const inputChangeHandle = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  const fileChangeHandle = (e) => {
    const { name, files } = e.target;
    setdata({ ...data, [name]: files[0] });
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("primaryColor", data.primaryColor);
    formData.append("secondaryColor", data.secondaryColor);

    if (data.heroBanner) {
      formData.append("heroBanner", data.heroBanner);
    }

    if (data.secondaryBanner) {
      formData.append("secondaryBanner", data.secondaryBanner);
    }

    try {
      const response = await axios.post(colorsAPI, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Color has been updated");

      setdata({
        primaryColor: "",
        secondaryColor: "",
      });

      if (heroBanner.current) heroBanner.current.value = "";
      if (secondaryBanner.current) secondaryBanner.current.value = "";

      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    axios
      .get(colorsAPI)
      .then((res) => {
        setResponse(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [data]);

  return (
    <>
      <form onSubmit={submitHandle}>
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="primaryColor">Primary Color</label>
              <input
                type="color"
                id="primaryColor"
                name="primaryColor"
                onChange={inputChangeHandle}
                value={data.primaryColor}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="secondaryColor">Secondary Color</label>
              <input
                type="color"
                id="secondaryColor"
                name="secondaryColor"
                onChange={inputChangeHandle}
                value={data.secondaryColor}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="heroBanner">Hero Banner</label>
              <input
                type="file"
                id="heroBanner"
                name="heroBanner"
                onChange={fileChangeHandle}
                // value={data.heroBanner}
                ref={heroBanner}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="secondaryBanner">Secondary Banner</label>
              <input
                type="file"
                id="secondaryBanner"
                name="secondaryBanner"
                onChange={fileChangeHandle}
                // value={data.secondaryBanner}
                ref={secondaryBanner}
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      <table className="table table-dark table-striped mt-5">
        <thead>
          <tr>
            <th>Primary Color</th>
            <th>Secondary Color</th>
            <th>Hero Banner</th>
            <th>Secondary Banner</th>
          </tr>
        </thead>

        <tbody>
          {response &&
            response.map((items, i) => (
              <tr key={i}>
                <td>
                  <input type="color" value={items.primaryColor} readOnly />
                </td>
                <td>
                  <input type="color" value={items.secondaryColor} readOnly />
                </td>
                <td>
                  <img
                    src={`${server}${items.heroBanner}`}
                    alt="banner"
                    width={"200px"}
                  />
                </td>
                <td>
                  <img
                    src={`${server}${items.secondaryBanner}`}
                    alt="banner"
                    width={"200px"}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminColors;
