import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import SectionDisableFunc from "../components/SectionDisableFunc";

const AdminService = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    image: null,
    isVisible: true,
  });

  const [response, setResponse] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const server = "http://localhost:8000";
  const serviceAPI = "http://localhost:8000/api/getServices";
  const visibilityAPI = "http://localhost:8000/api/getServices/visibility";

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

    formData.append("title", data.title);
    formData.append("description", data.description);

    if (data.image) {
      formData.append("image", data.image);
    }

    try {
      const response = await axios.post(serviceAPI, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setData({
        title: "",
        description: "",
        image: null,
      });

      if (imageReff.current) imageReff.current.value = "";

      toast.success("Data has been Updated");

      // console.log(response.data);
    } catch (error) {
      console.error("service: ", error);
    }
  };

  // delete API call
  const deleteHandle = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/getServices/${id}`
      );

      toast.success("Service deleted successfully");
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const serviceVisibilityHandle = () => {
    const newVisibility = !data.isVisible;

    setData({ ...data, isVisible: newVisibility });

    axios
      .post(visibilityAPI, { isVisible: newVisibility })
      .then((res) => {
        // console.log(res.data.data);
        toast.success("Services visibility updated");
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error updating Services visibility");
      });
  };

  useEffect(() => {
    axios
      .get(serviceAPI)
      .then((res) => {
        setResponse(res.data.data);
        // console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [data, refresh]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>Services Section Update</h4>
        <SectionDisableFunc
          handleVisibilityToggle={serviceVisibilityHandle}
          checked={!data.isVisible}
          visibility={response[0]?.isVisible === true ? "ONN" : "OFF"}
        />
      </div>

      <form onSubmit={submitHandle}>
        <div className="row">
          <div className="col-lg-6 mt-5">
            <div className="mb-3">
              <label className="form-label" htmlFor="title">
                Title
              </label>
              <input
                className="form-control"
                type="text"
                id="title"
                name="title"
                placeholder="Enter title Here..."
                onChange={handleInputChange}
                value={data.title}
                required
              />
            </div>
          </div>
          <div className="col-lg-6 mt-5">
            <div className="mb-3">
              <label className="form-label" htmlFor="description">
                Description
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
          <div className="">
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
            Update
          </button>
        </div>
      </form>

      <table className="table table-dark table-striped mt-5">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Descrition</th>
            <th>Action</th>
            <th>Section Visibility</th>
          </tr>
        </thead>
        <tbody>
          {response.map((items, i) => (
            <tr key={i}>
              <td>
                <img src={`${server}${items.image}`} alt="" width={"150px"} />
              </td>
              <td>{items.title}</td>
              <td>{items.description}</td>
              <td>
                <MdDeleteForever
                  className="h3"
                  onClick={() => deleteHandle(items._id)}
                />
              </td>
              <td>
                <span className="badge text-bg-primary">
                  {items.isVisible === true
                    ? "Visibility: ONN"
                    : "Visibility: OFF"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminService;
