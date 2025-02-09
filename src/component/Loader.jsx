import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Spinner from "react-bootstrap/Spinner";

export default function Loader(props) {
  const { loading } = props;

  return (
    <div
      style={{
        display: loading ? "flex" : "none",
        position: "fixed",
        zIndex: 1000000,
        background: "#7a7a7a",
        opacity: 0.5,
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
