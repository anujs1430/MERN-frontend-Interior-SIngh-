// import axios from "axios";
// import * as jwt_decode from "jwt-decode";

// const instance = axios.create({
//   baseURL: "http://localhost:8000/api/user/updateUser", // Replace with your backend API URL
// });

// // Utility function to check token expiry
// const isTokenExpired = (token) => {
//   try {
//     const { exp } = jwt_decode(token);
//     return Date.now() >= exp * 1000; // Compare current time with token expiry
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return true; // If there's an error decoding, assume the token is invalid
//   }
// };

// // Interceptor for responses
// instance.interceptors.response.use(
//   (response) => response, // For successful responses, return the response
//   (error) => {
//     if (
//       error.response?.status === 403 &&
//       error.response?.data?.message === "Invalid token"
//     ) {
//       console.warn("Token expired or invalid. Logging out...");
//       localStorage.removeItem("token"); // Clear the token
//       window.location.href = "/login"; // Redirect to the login page
//     }
//     return Promise.reject(error); // Pass the error to the calling code
//   }
// );

// // Periodic token expiry check
// setInterval(() => {
//   const token = localStorage.getItem("token");
//   if (token && isTokenExpired(token)) {
//     console.warn("Token expired. Logging out...");
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   }
// }, 10000); // Check every 1 second

// export default instance;
