import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SectionDisableFunc from "../components/SectionDisableFunc";
import { FaEdit } from "react-icons/fa";

const AdminBanner = () => {
  const [data, setData] = useState({
    heading: "",
    description: "",
    isVisible: true,
  });
  const [response, setResponse] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const bannerAPI = "http://localhost:8000/api/getBanner";
  const visibilityAPI = "http://localhost:8000/api/getBanner/visibility";

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(bannerAPI, data);

      setData({
        heading: "",
        description: "",
        isVisible: true,
      });

      toast.success(response.data.message);
      setRefresh(!refresh);
      // console.log(response);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const bannerVisibilityHandle = () => {
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

  const handleEdit = (section) => {
    setData({
      heading: section.heading,
      description: section.description,
      isVisible: true,
    });
  };

  useEffect(() => {
    axios
      .get(bannerAPI)
      .then((res) => {
        setResponse(res.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>Banner Section Update</h4>
        <SectionDisableFunc
          handleVisibilityToggle={bannerVisibilityHandle}
          checked={!data.isVisible}
          visibility={response[0]?.isVisible === true ? "ONN" : "OFF"}
        />
      </div>

      <form onSubmit={submitHandle}>
        <div className="row">
          <div className="col-lg-6 mt-5">
            <div className="mb-3">
              <label className="form-label" htmlFor="heading">
                Heading
              </label>
              <input
                className="form-control"
                type="text"
                id="heading"
                name="heading"
                placeholder="Enter Heading Here..."
                onChange={handleInputChange}
                value={data.heading}
                required
              />
            </div>
          </div>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Enter description here..."
              id="floatingTextarea"
              name="description"
              onChange={handleInputChange}
              value={data.description}
              required
            ></textarea>
            <label htmlFor="floatingTextarea">Description</label>
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
            <th>Heading</th>
            <th>Description</th>
            <th>Section Visibility</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {response.map((items, i) => (
            <tr key={i}>
              <td>{items.heading}</td>
              <td>{items.description}</td>
              <td>
                <span className="badge text-bg-primary">
                  Visibility: {items.isVisible === true ? "ONN" : "OFF"}
                </span>
              </td>
              <td>
                <FaEdit className="h4" onClick={() => handleEdit(items)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBanner;
