import React, { useEffect } from "react";
// import React, { Fragment, useEffect } from "react";
import "./App.css";
import RoutePath from "./../routes";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthProvider } from "../utils/auth";
import NetworkDetector from "../Hoc/NetworkDetector";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/apiSlice";

function App() {
  const userId = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.api.user);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId]);

  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      easing: "ease-out-back",
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    const checkLogout = () => {
      const expiresAt = localStorage.getItem("expiresAt");
      const currentTime = new Date().toISOString();

      if ((expiresAt && expiresAt < currentTime) || user?.status === 0) {
        localStorage.clear("isLogged");
        localStorage.clear("accessToken");
        localStorage.clear("userId");
        navigate("/login");
      }
    };

    const intervalId = setInterval(checkLogout, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [user]);

  return (
    <AuthProvider>
      {/* <Fragment> */}

      <RoutePath />
      {/* </Fragment> */}
    </AuthProvider>
  );
}
export default NetworkDetector(App);
