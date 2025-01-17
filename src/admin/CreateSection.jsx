import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import SectionDisableFunc from "../components/SectionDisableFunc";

const CreateSection = () => {
  const [formData, setFormData] = useState({
    subName: "",
    sectionName: "",
    mainHeading: "",
    subPara: "",
    image: null,
    mainParagraph: "",
    isVisible: true,
  });

  const [editForm, setEditForm] = useState({
    subName: "",
    sectionName: "",
    mainHeading: "",
    subPara: "",
    image: null,
    mainParagraph: "",
  });

  const [res, setRes] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const server = "http://localhost:8000";
  const sectionAPI = "http://localhost:8000/api/createSection";
  const visibilityAPI = "http://localhost:8000/api/createSection/visibility";

  const imageRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    newFormData.append("subName", formData.subName);
    newFormData.append("sectionName", formData.sectionName);
    newFormData.append("mainHeading", formData.mainHeading);
    newFormData.append("subPara", formData.subPara);
    newFormData.append("mainParagraph", formData.mainParagraph);

    if (formData.image) {
      newFormData.append("image", formData.image);
    }

    try {
      const response = await axios.post(sectionAPI, newFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({
        subName: "",
        sectionName: "",
        mainHeading: "",
        subPara: "",
        image: null,
        mainParagraph: "",
      });

      setRefresh(!refresh);

      if (imageRef.current) imageRef.current.value = "";

      toast.success("New section created successfully");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`${sectionAPI}/${id}`)
      .then((res) => {
        setRefresh(!refresh);
        // console.log(res.data);
        toast.success("Section deleted successfully");
      })

      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (section) => {
    setEditForm({
      _id: section._id,
      subName: section.subName || "",
      sectionName: section.sectionName || "",
      mainHeading: section.mainHeading || "",
      subPara: section.subPara || "",
      image: null,
      mainParagraph: section.mainParagraph || "",
    });
  };

  const handleEditSubmit = async (section) => {
    const updatedData = new FormData();

    updatedData.append("subName", editForm.subName);
    updatedData.append("sectionName", editForm.sectionName);
    updatedData.append("mainHeading", editForm.mainHeading);
    updatedData.append("subPara", editForm.subPara);
    updatedData.append("mainParagraph", editForm.mainParagraph);

    if (editForm.image) {
      updatedData.append("image", editForm.image);
    }

    try {
      const response = axios.put(`${sectionAPI}/${section}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Section updated successfully");
      document.querySelector("#exampleModal .btn-close").click();
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleEditFileChange = (e) => {
    const { name, files } = e.target;
    setEditForm({ ...editForm, [name]: files[0] });
  };

  const handleVisibilityToggle = (id, currentVisibility) => {
    const newVisibility = !currentVisibility;

    setFormData({ ...formData, isVisible: newVisibility });

    axios
      .post(`http://localhost:8000/api/createSection/visibility/${id}`, {
        isVisible: newVisibility,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Custome section visibility updated");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    axios
      .get(sectionAPI)
      .then((res) => {
        setRes(res.data.data);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  return (
    <>
      <section className="createSection">
        <div className="text-center mb-5">
          <h4>Create a New Section</h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <div className="mb-3">
                <label htmlFor="subName" className="form-label">
                  Sub Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="subName"
                  id="subName"
                  onChange={handleInputChange}
                  value={formData.subName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sectionName" className="form-label">
                  Section Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="sectionName"
                  id="sectionName"
                  onChange={handleInputChange}
                  value={formData.sectionName}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mainHeading" className="form-label">
                  Section's Main Heading
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="mainHeading"
                  id="mainHeading"
                  onChange={handleInputChange}
                  value={formData.mainHeading}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label htmlFor="subPara" className="form-label">
                  Sub Paragraph
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="subPara"
                  id="subPara"
                  onChange={handleInputChange}
                  value={formData.subPara}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Section Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  id="image"
                  onChange={handleFileChange}
                  ref={imageRef}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mainParagraph" className="form-label">
                  Section Main Paragraph
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="mainParagraph"
                  id="mainParagraph"
                  onChange={handleInputChange}
                  value={formData.mainParagraph}
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
              <th>S No.</th>
              <th>Section Name</th>
              <th>Section Heading</th>
              <th>Visibility</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {res.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.sectionName}</td>
                <td>{item.mainHeading}</td>
                <td>
                  <SectionDisableFunc
                    padding={"4.5em"}
                    handleVisibilityToggle={() =>
                      handleVisibilityToggle(item._id, item.isVisible)
                    }
                    visibility={item.isVisible === true ? "ONN" : "OFF"}
                    checked={!item.isVisible}
                  />
                </td>
                <td>
                  <FaEdit
                    className="h5"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => handleEdit(item)} // Pass the current item
                  />
                  &nbsp;
                  <MdDelete
                    className="h5"
                    onClick={() => handleDelete(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Modal */}
      <div
        className="modal fade modal-xl"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Section Edit Form
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSubmit(editForm._id);
                }}
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="subName" className="form-label">
                        Sub Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="subName"
                        id="subName"
                        value={editForm.subName}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="sectionName" className="form-label">
                        Section Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="sectionName"
                        id="sectionName"
                        value={editForm.sectionName}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mainHeading" className="form-label">
                        Section's Main Heading
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="mainHeading"
                        id="mainHeading"
                        value={editForm.mainHeading}
                        onChange={handleEditInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label htmlFor="subPara" className="form-label">
                        Sub Paragraph
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="subPara"
                        id="subPara"
                        value={editForm.subPara}
                        onChange={handleEditInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">
                        Section Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        name="image"
                        id="image"
                        onChange={handleEditFileChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="mainParagraph" className="form-label">
                        Section Main Paragraph
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        name="mainParagraph"
                        id="mainParagraph"
                        value={editForm.mainParagraph}
                        onChange={handleEditInputChange}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSection;
