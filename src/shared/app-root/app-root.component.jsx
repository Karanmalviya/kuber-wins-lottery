import React, { Fragment, useState } from "react";
import { RoutePath } from "./../../routes";
import "./../../index.css";
import { useEffect } from "react";
import { fetchSubAdminById } from "../../api/staff/stafftAction";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AppRoot() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);
  const subAdminById = useSelector((state) => state.staffPage.subAdminById);
  const isLoggedIn = useSelector((state) => state.userPage.isLoggedIn);

  useEffect(() => {
    const checkLogout = () => {
      if (isLoggedIn && admin.role === "sub-admin") {
        fetchSubAdminById(admin.id);
      }
    };
    const intervalId = setInterval(checkLogout, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [admin, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && admin.role === "sub-admin") {
      const checkLogout = () => {
        if (subAdminById.status === 0) {
          // setShow(true);
          localStorage.clear("user");
          localStorage.clear("token");
          localStorage.clear();
          window.location.reload();
          navigate("/login");
        }
      };
      const intervalId = setInterval(checkLogout, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [subAdminById, isLoggedIn]);

  // const handleLogout = () => {
  //   localStorage.clear("user");
  //   localStorage.clear("token");
  //   window.location.reload();
  //   navigate("/login");
  // };

  return (
    <Fragment>
      <div>
        {/* {open ? <TopPageContainer /> : null} */}
        <RoutePath />
        {/* <Modal
          show={show}
          onHide={() => setShow(false)}
          centered
          onBackdropClick={handleLogout}
        >
          <Modal.Header closeButton className="OTP-modal">
            <Modal.Title>Account Deactivated</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Your account has been deactivated by Super Admin
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-start">
            <div className="d-flex justify-content-start">
              <button
                className={"btn btn-primary px-3 btn-sm"}
                onClick={handleLogout}
              >
                Ok
              </button>
            </div>
          </Modal.Footer>
        </Modal> */}
      </div>
    </Fragment>
  );
}

// <>
//   <Top />
//   <Container fluid>
//     <Row>
//       <Col sm={12} md={1} lg={1}>
//         <Sidenav />
//       </Col>
//       <Col sm={12} md={11} lg={11}>
//         <div className="back">
//           <Navs />
//           <RoutePath />
//         </div>
//       </Col>
//     </Row>
//   </Container>
//   <Footer />
// </>
