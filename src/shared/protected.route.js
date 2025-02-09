import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Error from "../views/404";

const ProtectedPage = ({ children, isLoggedIn, permission }) => {
  //   return !isLoggedIn ? <Navigate to="/login" /> : children;
  return !isLoggedIn ? (
    <Navigate to="/login" />
  ) : permission ? (
    children
  ) : (
    <Error />
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.userPage.isLoggedIn,
});

export const ProtectedRoute = connect(mapStateToProps, {})(ProtectedPage);
