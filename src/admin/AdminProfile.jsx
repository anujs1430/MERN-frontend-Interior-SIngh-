import React, { useEffect, useState } from "react";
import { FaUserSecret } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import Loader from "./Loader";
import SectionDisableFunc from "../components/SectionDisableFunc";

const AdminProfile = () => {
  const API = "http://localhost:8000/api/user/getUser";
  const [userInfo, setUserInfo] = useState(null); // State to store user info
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const [editProfile, setEditProfile] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token not found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(API, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching user info");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const editProfileHandle = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
    console.log(editProfile);
  };

  const prefillHandle = () => {
    setEditProfile({
      name: userInfo.name || "",
      email: userInfo.email || "",
      currentPassword: "",
      newPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const editAPI = "http://localhost:8000/api/user/updateUser";

      if (!token) {
        setError("Token not found");
        return;
      }

      const response = await axios.put(
        editAPI,
        {
          name: editProfile.name,
          email: editProfile.email,
          currentPassword: editProfile.currentPassword,
          newPassword: editProfile.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the state with the updated user info
      setUserInfo((prevInfo) => ({
        ...prevInfo,
        name: editProfile.name || prevInfo.name,
        email: editProfile.email || prevInfo.email,
      }));

      setEditProfile({
        name: "",
        email: "",
        currentPassword: "",
        newPassword: "",
      });

      document.querySelector("#exampleModal .btn-close").click();

      toast.success(response.data.message);
    } catch (err) {
      console.log(err);

      const errorMsg =
        err.response?.data?.message || "Error in updating profile";

      setError(errorMsg);

      document.querySelector("#exampleModal .btn-close").click();

      toast.error(errorMsg);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p>Error: {error} Please Refresh the page</p>;

  return (
    <>
      <section className="profile">
        <h4 className="text-center">Profile Information</h4>
        <div className="row">
          <div className="col-lg-4 mt-5">
            <div className="card">
              <div className="card-body">
                <div className="text-center">
                  <FaUserSecret className="h1" />
                  <h5>{userInfo.name}</h5>
                </div>
                <table className="table mt-5">
                  <tbody>
                    <tr>
                      <th>UID:</th>
                      <td>{userInfo._id}</td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td>{userInfo.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-8 mt-5">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>General Information</h5>
                  <FaEdit
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={prefillHandle}
                  />
                </div>
                <table className="table mt-5">
                  <tbody>
                    <tr>
                      <th>Name:</th>
                      <td>{userInfo.name}</td>
                    </tr>
                    <tr>
                      <th>Email:</th>
                      <td>{userInfo.email}</td>
                    </tr>
                    <tr>
                      <th>Phone:</th>
                      <td>{userInfo.phone || "Not provided"}</td>
                    </tr>
                    <tr>
                      <th>Blood Group:</th>
                      <td>{userInfo.bloodGroup || "Not provided"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal  */}
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
                Edit Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    name="name"
                    value={editProfile.name}
                    onChange={editProfileHandle}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    value={editProfile.email}
                    onChange={editProfileHandle}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="currPassword" className="form-label">
                    Current Password (Optional)
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="currPassword"
                    name="currentPassword"
                    value={editProfile.currentPassword}
                    onChange={editProfileHandle}
                    placeholder="Only if you want to change the password also"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password (Optional)
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={editProfile.newPassword}
                    onChange={editProfileHandle}
                    placeholder="Only if you want to change the password also"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </form>
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
