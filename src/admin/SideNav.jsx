import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoDesktopSharp } from "react-icons/io5";
import { BiSolidDetail } from "react-icons/bi";
import { MdWorkspacePremium } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { IoColorPalette } from "react-icons/io5";
import { RiCustomerServiceFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import axios from "axios";
import toast from "react-hot-toast";

const SideNav = () => {
  const [response, setResponse] = useState([]);
  const location = useLocation();

  // console.log(location.pathname);

  const API = "http://localhost:8000/api/getHeader";
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
  ];

  const logoutHandle = () => {
    localStorage.clear("authToken");
    toast.success("Logout Successfully");
  };

  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        setResponse(res.data.data);

        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <aside>
      {/* <ul>
        <li>
          <Link className="btn" to={"/admin/header"}>
            Header Section
          </Link>
        </li>
        <li>
          <Link className="btn" to={"/admin/hero"}>
            Hero banner Section
          </Link>
        </li>
        <li>
          <Link className="btn" to={"/admin/about"}>
            About Section
          </Link>
        </li>
        <li>
          <Link className="btn" to={"/admin/service"}>
            Our services Section
          </Link>
        </li>
        <li>
          <Link className="btn" to={"/admin/portfolio"}>
            Our Portfolio Section
          </Link>
        </li>
        <li>
          <Link className="btn" to={"/admin/testimonials"}>
            Our Testimonials Section
          </Link>
        </li>
        <li>
          <Link className="btn" to={"/admin/banner"}>
            Our Banner Section
          </Link>
        </li>
      </ul> */}
      <div className="fixed-top">
        {response.map((items, i) => (
          <img key={i} src={`${server}${items.brandLogo}`} alt="" />
        ))}
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
