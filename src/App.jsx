import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import About from "./components/About";
import Service from "./components/Services";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Banner from "./components/Banner";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import About2 from "./admin/About";
import SideNav from "./admin/SideNav";
import AdminHero from "./admin/AdminHero";
import AdminService from "./admin/adminService";
import "./assets/css/admin.scss";
import "./assets/css/styles.scss";
import AdminHeader from "./admin/AdminHeader";
import AdminPortfolio from "./admin/AdminPortfolio";
import AdminTestimonial from "./admin/AdminTestimonial";
import AdminBanner from "./admin/AdminBanner";
import Loader from "./admin/Loader";
import AdminColors from "./admin/adminColors";
import axios from "axios";

const App = () => {
  // const [data, setData] = useState([]);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const colorAPI = "http://localhost:8000/api/getColors";

  const serverURL = "http://localhost:8000";

  useEffect(() => {
    axios
      .get(colorAPI)
      .then((res) => {
        const colors = res.data.data[0] || {};
        // setData(res.data.data[0]);

        document.documentElement.style.setProperty(
          "--primaryColor",
          colors.primaryColor || "#cfa02e"
        );

        document.documentElement.style.setProperty(
          "--secondaryColor",
          colors.secondaryColor || "#000000"
        );

        if (colors.heroBanner) {
          document.documentElement.style.setProperty(
            "--heroBanner",
            `url(${serverURL}${colors.heroBanner})`
          );
        }

        if (colors.secondaryBanner) {
          document.documentElement.style.setProperty(
            "--secondaryBanner",
            `url(${serverURL}${colors.secondaryBanner})`
          );
        }

        // console.log(colors);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {/* Routes */}
      {/* <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <HeroBanner />
                <About />
                <Service />
                <Portfolio />
                <Testimonials />
                <Banner />
                <Contact />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter> */}

      {/* Admin Routes */}
      {/* <BrowserRouter>
        <div className={`d-flex `} onClick={clickHandle}>
          <SideNav />
          <div className="main-container">
            <Routes>
              <Route path="/admin/header" element={<AdminHeader />} />
              <Route path="/admin/hero" element={<AdminHero />} />
              <Route path="/admin/about" element={<About2 />} />
              <Route path="/admin/service" element={<AdminService />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter> */}

      {isAdminRoute ? (
        <div className="d-flex">
          <SideNav />
          <div className="main-container">
            <Routes>
              <Route path="/admin/header" element={<AdminHeader />} />
              <Route path="/admin/hero" element={<AdminHero />} />
              <Route path="/admin/about" element={<About2 />} />
              <Route path="/admin/service" element={<AdminService />} />
              <Route path="/admin/portfolio" element={<AdminPortfolio />} />
              <Route
                path="/admin/testimonials"
                element={<AdminTestimonial />}
              />
              <Route path="/admin/banner" element={<AdminBanner />} />
              <Route path="/admin/loader" element={<Loader />} />
              <Route path="/admin/colors" element={<AdminColors />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <HeroBanner />
          <About />
          <Service />
          <Portfolio />
          <Testimonials />
          <Banner />
          <Contact />
          <Footer />
        </>
      )}
    </>
  );
};

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
