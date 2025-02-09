import React from "react";
import "./spinner.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingSpinner() {
  return (
    <>
      {/* <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div> */}
      {/* <div id="preloader">
        <div id="loader"></div>
      </div> */}

      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
}
