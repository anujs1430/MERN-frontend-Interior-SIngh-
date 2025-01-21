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
import Login from "./components/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./components/Register";
import AdminProfile from "./admin/AdminProfile";
import CustomerQuery from "./admin/CustomerQuery";
import AdminSectionOrder from "./admin/AdminSectionOrder";
import CreateSection from "./admin/CreateSection";
import CustomeSections from "./components/CustomeSections";
import Faq from "./components/Faq";
import AdminFaq from "./admin/AdminFaq";
import AdminFooter from "./admin/AdminFooter";

const App = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

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
      })
      .catch((error) => console.error(error));
  }, []);

  // Fetch sections and sort them by order (updated part)
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/sectionOrdering")
      .then((res) => {
        // Sort sections by the order field to render them in the correct order
        const sortedSections = res.data.sort((a, b) => a.order - b.order);
        setSections(sortedSections); // Set sorted sections in the state
        setLoading(false); // Stop the loading state once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching sections:", error);
      });
  }, []); // This effect runs once on component mount to fetch section data

  if (loading)
    return (
      <div>
        <Loader></Loader>
      </div>
    ); // Show loading message while sections are being fetched

  return (
    <>
      {isAdminRoute ? (
        <div className="d-flex">
          <SideNav />
          <div className="main-container">
            <Routes>
              <Route
                path="/admin/header"
                element={
                  <ProtectedRoutes>
                    <AdminHeader />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/hero"
                element={
                  <ProtectedRoutes>
                    <AdminHero />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/about"
                element={
                  <ProtectedRoutes>
                    <About2 />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/service"
                element={
                  <ProtectedRoutes>
                    <AdminService />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/portfolio"
                element={
                  <ProtectedRoutes>
                    <AdminPortfolio />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/testimonials"
                element={
                  <ProtectedRoutes>
                    <AdminTestimonial />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/banner"
                element={
                  <ProtectedRoutes>
                    <AdminBanner />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/loader"
                element={
                  <ProtectedRoutes>
                    <Loader />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/colors"
                element={
                  <ProtectedRoutes>
                    <AdminColors />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoutes>
                    <Login />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <ProtectedRoutes>
                    <AdminProfile />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/customer-query"
                element={
                  <ProtectedRoutes>
                    <CustomerQuery />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/sectionOrder"
                element={
                  <ProtectedRoutes>
                    <AdminSectionOrder />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/createSection"
                element={
                  <ProtectedRoutes>
                    <CreateSection />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/faq"
                element={
                  <ProtectedRoutes>
                    <AdminFaq />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/admin/footer"
                element={
                  <ProtectedRoutes>
                    <AdminFooter />
                  </ProtectedRoutes>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      ) : (
        <>
          <Header />
          {sections.map((section) => {
            switch (section.name) {
              case "HeroBanner":
                return <HeroBanner key={section._id} />;
              case "Service":
                return <Service key={section._id} />;
              case "About":
                return <About key={section._id} />;
              case "Portfolio":
                return <Portfolio key={section._id} />;
              case "Testimonials":
                return <Testimonials key={section._id} />;
              case "Banner":
                return <Banner key={section._id} />;
              case "Contact":
                return <Contact key={section._id} />;
              case "Faq":
                return <Faq key={section._id} />;
              case "CustomeSection":
                return <CustomeSections key={section._id} />;
              default:
                return null;
            }
          })}
          {/* <CustomeSections /> */}
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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}
