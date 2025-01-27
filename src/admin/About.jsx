import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SectionDisableFunc from "../components/SectionDisableFunc";
import { FaEdit } from "react-icons/fa";

const About = () => {
  const [aboutEditData, setAboutEditData] = useState({
    heading: "",
    paragraph: "",
    mainImage: null,
    subImage: null,
    isVisible: true,
  });

  const [response, setResponse] = useState([]);
  const [refresh, setRefresh] = useState([]);

  const aboutAPI = "http://localhost:8000/api/getAbout";
  const visibilityAPI = "http://localhost:8000/api/getAbout/visibility";
  const server = "http://localhost:8000";

  const mainImageReff = useRef(null);
  const subImageReff = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAboutEditData({ ...aboutEditData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setAboutEditData({ ...aboutEditData, [name]: files[0] });
  };

  const aboutSubmitHandle = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file and text data
    const formData = new FormData();
    formData.append("heading", aboutEditData.heading);
    formData.append("paragraph", aboutEditData.paragraph);

    if (aboutEditData.mainImage) {
      formData.append("mainImage", aboutEditData.mainImage);
    }

    if (aboutEditData.subImage) {
      formData.append("subImage", aboutEditData.subImage);
    }

    try {
      const response = await axios.post(aboutAPI, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      console.log("Form submitted successfully:", response.data);

      setRefresh(!refresh);

      setAboutEditData({
        heading: "",
        paragraph: "",
        mainImage: null,
        subImage: null,
      });

      toast.success("Data has been submited");

      // Clear file input fields after submit using refs
      if (mainImageReff.current) mainImageReff.current.value = "";
      if (subImageReff.current) subImageReff.current.value = "";
    } catch (error) {
      console.log("aboutFrom Error:==", error);
    }
  };

  const aboutVisibilityHandle = () => {
    const newVisibility = !aboutEditData.isVisible;
    setAboutEditData({ ...aboutEditData, isVisible: newVisibility });

    axios
      .post(visibilityAPI, { isVisible: newVisibility })
      .then((res) => {
        // console.log(res.data.data);
        toast.success(res.data.message);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (section) => {
    setAboutEditData({
      heading: section.heading,
      paragraph: section.paragraph,
      mainImage: null,
      subImage: null,
      isVisible: true,
    });
  };

  useEffect(() => {
    axios
      .get(aboutAPI)
      .then((res) => {
        setResponse(res.data);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>About section Update</h4>
        <SectionDisableFunc
          handleVisibilityToggle={aboutVisibilityHandle}
          checked={!aboutEditData.isVisible}
          visibility={response[0]?.isVisible === true ? "ONN" : "OFF"}
        />
      </div>

      <form action="" onSubmit={aboutSubmitHandle}>
        <div className="row">
          <div className="col-lg-6 mt-5">
            <div className="mb-3">
              <label htmlFor="mainImage">Main Image</label>
              <input
                type="file"
                id="mainImage"
                onChange={handleFileChange}
                name="mainImage"
                ref={mainImageReff}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="about_heading" className="form-label">
                About Heading
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Heading"
                name="heading"
                id="about_heading"
                onChange={handleInputChange}
                value={aboutEditData.heading}
              />
            </div>
          </div>
          <div className="col-lg-6 mt-5">
            <div className="mb-3">
              <label htmlFor="subImage">Sub Image</label>
              <input
                type="file"
                id="subImage"
                onChange={handleFileChange}
                name="subImage"
                ref={subImageReff}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="about_para" className="form-label">
                About Paragraph
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Paragraph"
                name="paragraph"
                id="about_para"
                onChange={handleInputChange}
                value={aboutEditData.paragraph}
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>

      <table className="table table-dark table-striped mt-5">
        <thead>
          <tr>
            <th>Main Image</th>
            <th>Sub Image</th>
            <th>Heading</th>
            <th>Paragraph</th>
            <th>Section Visibility</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {response.map((items, i) => (
            <tr key={i}>
              <td>
                <img
                  src={`${server}${items.mainImage}`}
                  alt=""
                  width={"150px"}
                />
              </td>
              <td>
                <img
                  src={`${server}${items.subImage}`}
                  alt=""
                  width={"150px"}
                />
              </td>
              <td>{items.heading}</td>
              <td>{items.paragraph}</td>
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

export default About;
