import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  MdCreateNewFolder,
  MdDragIndicator,
  MdWorkspacePremium,
} from "react-icons/md";
import { BiSolidDetail } from "react-icons/bi";
import {
  FaImage,
  FaImages,
  FaPeopleGroup,
  FaPersonCircleQuestion,
} from "react-icons/fa6";
import { RiCustomerService2Fill, RiCustomerServiceFill } from "react-icons/ri";
import Loader from "./Loader";

const AdminSectionOrder = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sections from the backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/sectionOrdering")
      .then((res) => {
        setSections(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
  }, []);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const reorderedSections = [...sections];

    // Move the dragged section to the new position
    const draggedItem = reorderedSections[draggedIndex];
    reorderedSections.splice(draggedIndex, 1);
    reorderedSections.splice(index, 0, draggedItem);

    setSections(reorderedSections);
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const saveOrder = () => {
    const sectionsOrder = sections.map((section) => section._id); // Get the section IDs in the new order
    axios
      .put("http://localhost:8000/api/sectionOrdering", {
        sectionsOrder,
      })
      .then(() => toast.success("Order updated successfully"))
      .catch((error) => console.error("Error updating order:", error));
  };

  const icons = {
    HeroBanner: <FaImage />,
    About: <BiSolidDetail />,
    Service: <RiCustomerServiceFill />,
    Portfolio: <MdWorkspacePremium />,
    Testimonials: <FaPeopleGroup />,
    Banner: <FaImages />,
    Contact: <RiCustomerService2Fill />,
    Faq: <FaPersonCircleQuestion />,
    CustomeSection: <MdCreateNewFolder />,
  };

  if (loading)
    return (
      <p>
        <Loader />
      </p>
    );

  return (
    <div>
      <div className="text-center">
        <h3 className="mb-0">Section Order Management</h3>
        <p>Manage sections ordering just by Drag and Drop</p>
      </div>
      <div>
        {sections.map((section, index) => (
          <div
            key={section._id}
            className="section-item"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
          >
            <h6>
              <MdDragIndicator />
              &nbsp;&nbsp;
              {icons[section.name]} &nbsp;
              {section.name}
            </h6>
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-3" onClick={saveOrder}>
        Update
      </button>
    </div>
  );
};

export default AdminSectionOrder;
