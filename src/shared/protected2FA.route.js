import React from "react";
import { connect } from "react-redux";
import Error from "../views/404";

const Protected2FAPage = ({ children, permission }) => {
  return permission ? children : <Error />;
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.userPage.isLoggedIn,
});

export const Protected2FARoute = connect(mapStateToProps, {})(Protected2FAPage);
