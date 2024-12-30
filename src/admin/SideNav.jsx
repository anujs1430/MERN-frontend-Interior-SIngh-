import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideNav = () => {
  const location = useLocation();

  // console.log(location.pathname);

  const navLinks = [
    { label: "Header Section", to: "/admin/header" },
    { label: "Hero banner Section", to: "/admin/hero" },
    { label: "About Section", to: "/admin/about" },
    { label: "Our services Section", to: "/admin/service" },
    { label: "Our Portfolio Section", to: "/admin/portfolio" },
    { label: "Our Testimonials Section", to: "/admin/testimonials" },
    { label: "Our Banner Section", to: "/admin/banner" },
    { label: "Our Theme Colors", to: "/admin/colors" },
  ];

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
      <ul>
        {navLinks.map((items, i) => (
          <li key={items.label}>
            <Link
              className={`btn ${
                location.pathname === items.to ? "active" : ""
              }`}
              to={items.to}
            >
              {items.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideNav;
