import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";

const CustomerQuery = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const getCustomerAPI = "http://localhost:8000/api/cutomers";

  useEffect(() => {
    axios
      .get(getCustomerAPI)
      .then((res) => {
        setResponse(res.data.data);
        // console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refresh]);

  //   delete handle
  const deleteHandle = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/cutomers/${id}`
      );
      setRefresh(!refresh);
      toast.success("Customer query deleted successfully");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section>
      <h4>Customers Queries</h4>

      <table className="table table-dark table-striped table-responsive table-sm table-bordered mt-5">
        <thead>
          <tr>
            <th>S No.</th>
            <th width="16%">Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Comments</th>
            <th>Date & Time</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {response?.map((items, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{items.name}</td>
              <td>{items.email}</td>
              <td>{items.phone}</td>
              <td>{items.subject}</td>
              <td>{items.comment}</td>
              <td>{items.createdAt}</td>
              <td>
                <MdDelete
                  className="h3"
                  onClick={() => deleteHandle(items._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CustomerQuery;
