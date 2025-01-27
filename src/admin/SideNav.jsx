import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdCreateNewFolder,
  MdDashboard,
  MdVideoSettings,
} from "react-icons/md";
import { IoDesktopSharp } from "react-icons/io5";
import { BiSolidDetail } from "react-icons/bi";
import { MdWorkspacePremium } from "react-icons/md";
import { FaPeopleGroup, FaPersonCircleQuestion } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { IoColorPalette } from "react-icons/io5";
import { RiCustomerService2Fill, RiCustomerServiceFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import axios from "axios";
import toast from "react-hot-toast";
import { LuPanelBottomClose } from "react-icons/lu";

const SideNav = () => {
  const [response, setResponse] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const location = useLocation();

  // console.log(location.pathname);

  const headerAPI = "http://localhost:8000/api/getHeader";
  const server = "http://localhost:8000";

  const navLinks = [
    { label: "Header Section", to: "/admin/header", icon: <MdDashboard /> },

    {
      label: "Hero banner Section",
      to: "/admin/hero",
      icon: <IoDesktopSharp />,
    },

    { label: "About Section", to: "/admin/about", icon: <BiSolidDetail /> },

    {
      label: "Our services Section",
      to: "/admin/service",
      icon: <RiCustomerServiceFill />,
    },

    {
      label: "Our Portfolio Section",
      to: "/admin/portfolio",
      icon: <MdWorkspacePremium />,
    },

    {
      label: "Our Testimonials Section",
      to: "/admin/testimonials",
      icon: <FaPeopleGroup />,
    },

    { label: "Our Banner Section", to: "/admin/banner", icon: <FaImage /> },

    {
      label: "Theme Colors & Banners",
      to: "/admin/colors",
      icon: <IoColorPalette />,
    },

    {
      label: "Customers Queries",
      to: "/admin/customer-query",
      icon: <RiCustomerService2Fill />,
    },

    {
      label: "Section Order Management",
      to: "/admin/sectionOrder",
      icon: <MdVideoSettings />,
    },

    {
      label: "Create New Section",
      to: "/admin/createSection",
      icon: <MdCreateNewFolder />,
    },

    {
      label: "FAQ's Management",
      to: "/admin/faq",
      icon: <FaPersonCircleQuestion />,
    },

    {
      label: "Footer Management",
      to: "/admin/footer",
      icon: <LuPanelBottomClose />,
    },
  ];

  const logoutHandle = () => {
    localStorage.clear("authToken");
    toast.success("Logout Successfully");
  };

  useEffect(() => {
    axios
      .get(headerAPI)
      .then((res) => {
        setResponse(res.data.data);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  return (
    <aside>
      <div className="fixed-top">
        <div className="image-container">
          {response.map((items, i) => (
            <img key={i} src={`${server}${items.brandLogo}`} alt="" />
          ))}
        </div>
        <ul>
          {navLinks.map((items, i) => (
            <li key={items.label}>
              <Link
                className={`btn ${
                  location.pathname === items.to ? "active" : ""
                }`}
                to={items.to}
              >
                {items.icon}
                {items.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="fixed-bottom">
        <h5 className="px-3">Profile & More</h5>
        <ul>
          <li>
            <Link
              className={`btn ${
                location.pathname == "/admin/profile" ? "active" : ""
              }`}
              to={"/admin/profile"}
            >
              <ImProfile />
              Profile
            </Link>
          </li>
          <li>
            <Link className="btn" onClick={logoutHandle}>
              <IoLogOut />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideNav;
