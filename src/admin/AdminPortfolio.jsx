import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import Loader from "./Loader";
import SectionDisableFunc from "../components/SectionDisableFunc";

const AdminPortfolio = () => {
  const [data, setData] = useState({
    description: "",
    image: null,
    isVisible: true,
  });
  const [response, setResponse] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(true);

  const portfolioAPI = "http://localhost:8000/api/getPortfolio";
  const visibilityAPI = "http://localhost:8000/api/getPortfolio/visibility";
  const server = "http://localhost:8000";

  const imageReff = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setData({ ...data, [name]: files[0] });
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", data.description);

    if (data.image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(portfolioAPI, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData({
        description: "",
        image: null,
        isVisible: true,
      });

      if (imageReff.current) imageReff.current.value = null;

      toast.success(response.data.message);

      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteHandle = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/getPortfolio/${id}`
      );

      toast.success(response.data.message);
      setRefresh(!refresh);
      // console.log(response);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const protfolioVisibilityHandle = () => {
    const newVisibility = !data.isVisible;
    setData({ ...data, isVisible: newVisibility });

    axios
      .post(visibilityAPI, { isVisible: newVisibility })
      .then((res) => {
        toast.success(res.data.message);

        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);

        toast.error(error.message);
      });
  };

  useEffect(() => {
    axios
      .get(portfolioAPI)
      .then((res) => {
        setResponse(res.data.data);
        setRefresh(!refresh);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>Profile Information</h4>
        <SectionDisableFunc
          handleVisibilityToggle={protfolioVisibilityHandle}
          checked={!data.isVisible}
          visibility={response[0]?.isVisible === true ? "ONN" : "OFF"}
        />
      </div>

      <form onSubmit={submitHandle}>
        <div className="row">
          <div className="col-lg-6 mt-5">
            <div className="mb-3">
              <label className="form-label" htmlFor="description">
                description
              </label>
              <input
                className="form-control"
                type="text"
                id="description"
                name="description"
                placeholder="Enter description Here..."
                onChange={handleInputChange}
                value={data.description}
                required
              />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="image">Card Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              ref={imageReff}
            />
          </div>
        </div>
        <div className="mt-3 text-center">
          <button className="btn btn-primary" type="submit">
            Add Portfolio
          </button>
        </div>
      </form>

      {loader ? (
        <Loader />
      ) : (
        <table className="table table-dark table-striped mt-5">
          <thead>
            <tr>
              <th>Image</th>
              <th>Description</th>
              <th>Section Visibility</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {response.map((item, i) => (
              <tr key={i}>
                <td>
                  <img
                    src={`${server}${item.image}`}
                    alt=""
                    width={"70px"}
                    height={"70px"}
                  />
                </td>
                <td>{item.description}</td>
                <td>
                  <span className="badge text-bg-primary">
                    Visibility: {item.isVisible === true ? "ONN" : "OFF"}
                  </span>
                </td>
                <td>
                  <MdDeleteForever
                    className="h3"
                    onClick={() => deleteHandle(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPortfolio;
