import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminBanner = () => {
  const [data, setData] = useState({
    heading: "",
    description: "",
  });

  const [response, setResponse] = useState([]);

  const bannerAPI = "http://localhost:8000/api/getBanner";

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
      });

      toast.success("Data has been update");

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios
      .get(bannerAPI)
      .then((res) => {
        setResponse(res.data.data);
        console.error(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [data]);

  return (
    <div>
      <h2 className="text-center">Banner Section Update</h2>
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
          </tr>
        </thead>
        <tbody>
          {response.map((items, i) => (
            <tr key={i}>
              <td>{items.heading}</td>
              <td>{items.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBanner;
