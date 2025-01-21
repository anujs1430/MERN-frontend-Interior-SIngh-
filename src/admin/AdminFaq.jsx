import React, { useEffect, useState } from "react";
import SectionDisableFunc from "../components/SectionDisableFunc";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const AdminFaq = () => {
  const [data, setData] = useState({
    question: "",
    answer: "",
    isVisible: true,
  });

  const [editFrom, setEditFrom] = useState({
    question: "",
    answer: "",
  });

  const [response, setResponse] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const faqAPI = "http://localhost:8000/api/faq";
  const visibilityAPI = "http://localhost:8000/api/faq/visibility";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        question: data.question,
        answer: data.answer,
      };

      const response = await axios.post(faqAPI, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data.message);

      setRefresh(!refresh);

      setData({
        question: "",
        answer: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${faqAPI}/${id}`);

      setRefresh(!refresh);

      toast.success(response.data.message);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const handleVisibilityToggle = () => {
    const newVisibility = !data.isVisible;
    setData({ ...data, isVisible: newVisibility });

    axios
      .post(visibilityAPI, { isVisible: newVisibility })
      .then((res) => {
        console.log(res);

        toast.success(res.data.message);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEdit = (section) => {
    setEditFrom({
      _id: section._id,
      question: section.question || "",
      answer: section.answer || "",
    });
  };

  const handleEditInput = (e) => {
    const { name, value } = e.target;
    setEditFrom({ ...editFrom, [name]: value });
  };

  const handleEditFormSubmit = async (sectionID) => {
    const formData = {
      question: editFrom.question,
      answer: editFrom.answer,
    };

    try {
      const response = await axios.put(`${faqAPI}/${sectionID}`, formData);

      // console.log(response);
      setRefresh(!refresh);
      toast.success(response.data.message);
      document.querySelector("#exampleModal .btn-close").click();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    axios
      .get(faqAPI)
      .then((res) => {
        setResponse(res.data.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [refresh]);

  return (
    <section>
      <div className="d-flex justify-content-between mb-5">
        <h4>Faq Section Update</h4>
        <SectionDisableFunc
          handleVisibilityToggle={handleVisibilityToggle}
          checked={!data.isVisible}
          visibility={response[0]?.isVisible === true ? "ONN" : "OFF"}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="question" className="form-label">
                Question
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Post you Question..."
                name="question"
                id="question"
                onChange={handleInputChange}
                value={data.question}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="answer" className="form-label">
                Answer
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Post you Answer..."
                name="answer"
                id="answer"
                onChange={handleInputChange}
                value={data.answer}
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>

      <table className="table table-dark table-striped table-responsive table-sm table-bordered mt-5">
        <thead>
          <tr>
            <th width="5%">S no.</th>
            <th>Questions</th>
            <th>Answers</th>
            <th>Visibility</th>
            <th width="10%">Action</th>
          </tr>
        </thead>
        <tbody>
          {response.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.question}</td>
              <td>{item.answer}</td>
              <td>
                <span className="badge text-bg-primary">
                  Visibility: {`${item.isVisible === true ? "ONN" : "OFF"}`}
                </span>
              </td>
              <td>
                <MdDelete
                  className="h4"
                  onClick={() => handleDelete(item._id)}
                />
                &nbsp;
                <FaEdit
                  className="h4"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleEdit(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                FAQ Edit
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
                  handleEditFormSubmit(editFrom._id);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="question" className="form-label">
                    Question
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Post you Question..."
                    name="question"
                    id="question"
                    onChange={handleEditInput}
                    value={editFrom.question}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="answer" className="form-label">
                    Answer
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Post you Answer..."
                    name="answer"
                    id="answer"
                    onChange={handleEditInput}
                    value={editFrom.answer}
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminFaq;
