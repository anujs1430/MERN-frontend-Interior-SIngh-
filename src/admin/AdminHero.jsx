import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SectionDisableFunc from "../components/SectionDisableFunc";

const AdminHero = () => {
  const [heroData, setHeroData] = useState({
    title: "",
    heading: "",
    paragraph: "",
    isVisible: true,
  });

  const [response, setResponse] = useState([]);

  const heroAPI = "http://localhost:8000/api/getHero";
  const heroVisibilityAPI = "http://localhost:8000/api/getHero/visibility";

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setHeroData({ ...heroData, [name]: value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(heroAPI, heroData);

      setHeroData({
        title: "",
        heading: "",
        paragraph: "",
      });

      toast.success("Data has been updated");

      console.log("Data Submit:==", response);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle visibility toggle and send the update to the backend
  const sectionDisableHandle = () => {
    console.log("toggle visibility");
    const newVisibility = !heroData.isVisible;
    setHeroData({ ...heroData, isVisible: newVisibility });

    axios
      .post(heroVisibilityAPI, { isVisible: newVisibility })
      .then((res) => {
        console.log(res.data.data);
        toast.success("Hero Banner visibility updated");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error updating Hero Banner visibility");
      });
  };

  useEffect(() => {
    axios
      .get(heroAPI)
      .then((res) => {
        setResponse(res.data.data);
        console.lo;
      })

      .catch((error) => {
        console.error(error);
      });
  }, [heroData, sectionDisableHandle]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4 className="text-center">Hero Section Update</h4>
        <SectionDisableFunc
          handleVisibilityToggle={sectionDisableHandle}
          checked={!heroData.isVisible}
          visibility={response[0]?.isVisible == true ? "ONN" : "OFF"}
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
                placeholder="Enter Title Here..."
                onChange={handleInputChange}
                value={heroData.title}
                required
              />
            </div>
          </div>
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
                value={heroData.heading}
                required
              />
            </div>
          </div>
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Enter paragraph here..."
              id="floatingTextarea"
              name="paragraph"
              onChange={handleInputChange}
              value={heroData.paragraph}
              required
            ></textarea>
            <label htmlFor="floatingTextarea">Paragraph</label>
          </div>
        </div>
        <div className="mt-3 text-center">
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </div>
      </form>

      <table className="mt-5 table table-dark table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Heading</th>
            <th>Paragraph</th>
            <th>Section Visibility</th>
          </tr>
        </thead>
        <tbody>
          {response.map((item, i) => (
            <tr key={i}>
              <td>{item.title}</td>
              <td>{item.heading}</td>
              <td>{item.paragraph}</td>
              <td>
                {item.isVisible == true ? (
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

export default AdminHero;
