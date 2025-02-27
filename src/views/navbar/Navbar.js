import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import { useSelector } from "react-redux";
import { BsPerson, BsGear, BsBoxArrowRight } from "react-icons/bs";
import AbbrNumber from "../components/AbbrNumber";

export default function Navbar({ props }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userDetail = useSelector((state) => state.api.user);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light py-0 bg-light ">
        <div className="container-fluid px-lg-4 ps-4">
          <div className="position-relative py-2 px-4 overflow-hidden">
            <div className="logo-container "></div>
            <Link
              className="navbar-brand py-0 ps-1 position-relative"
              to={"/"}
              style={{ zIndex: 1 }}
            >
              <img
                src={process.env.REACT_APP_LOGO}
                className="img-fluid px-2"
                style={{ width: 145 }}
                alt=""
              />
            </Link>
          </div>

          {user?.isLoggedIn && (
            <h5
              className="text-light mt-1 d-flex align-items-center d-lg-none d-md-none d-sm-block"
              onClick={() => navigate("/deposit")}
            >
              <img
                src={
                  "/assets/images/material-symbols_account-balance-wallet-old.png"
                }
                className="img-fluid"
                style={{ filter: "brightness(0) invert(1)" }}
                alt=""
              />
              Rs.
              <AbbrNumber
                props={{
                  number: userDetail?.balance ?? 0,
                  decPlaces: 2,
                }}
              />
            </h5>
          )}
          <button
            className="navbar-toggler border-0 text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars"></i>
          </button>
          <div
            className="collapse navbar-collapse ms-4"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={
                    props.mainPage === "home" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    props.mainPage === "lotteries"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to={"/lotteries"}
                >
                  Lotteries
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    props.mainPage === "scratchcard"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to={"/scratch-cards"}
                >
                  Scratchers
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    props.mainPage === "winners"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to={"/winners"}
                >
                  Winners
                </Link>
              </li>
              {user?.isLoggedIn ? (
                <li className="nav-item">
                  <Link
                    className={
                      props.mainPage === "dashboard" ||
                      props.mainPage === "deposit" ||
                      props.mainPage === "transactions" ||
                      props.mainPage === "ticketlist"
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to={"/dashboard"}
                  >
                    Dashboard
                  </Link>
                </li>
              ) : (
                ""
              )}
              {/* <li className="nav-item">
              <Link
                className={
                  props.mainPage === "faq" ? "nav-link active" : "nav-link"
                }
                to={"/faqs"}
              >
                FAQ
              </Link>
            </li> */}
              {/* <li className="nav-item">
              <Link
                className={
                  props.mainPage === "about" ? "nav-link active" : "nav-link"
                }
                to={"/about-us"}
              >
                About
              </Link>
            </li> */}
              {/* <li className="nav-item">
                <a
                  className={
                    props.mainPage === "about" ? "nav-link active" : "nav-link"
                  }
                  href="https://docs.kuberwins.com/"
                >
                  Docs
                </a>
              </li> */}
            </ul>

            <div>
              {!user?.isLoggedIn ? (
                <>
                  <Link
                    to={"/registration"}
                    className="btn btn-outline-light"
                    type="submit"
                  >
                    Register
                  </Link>
                  <Link
                    to={"/login"}
                    className="btn btn-danger ms-2"
                    type="submit"
                  >
                    Log in
                  </Link>
                </>
              ) : (
                <div className="d-flex ">
                  <h5
                    className="text-light mt-1 d-flex align-items-center"
                    onClick={() => navigate("/deposit")}
                  >
                    <img
                      src={
                        "/assets/images/material-symbols_account-balance-wallet-old.png"
                      }
                      className="img-fluid"
                      style={{ filter: "brightness(0) invert(1)" }}
                      alt=""
                    />
                    Rs.
                    <AbbrNumber
                      props={{
                        number: userDetail?.balance ?? 0,
                        decPlaces: 2,
                      }}
                    />
                  </h5>
                  <div className="dropdown me-1">
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                      }}
                      className="dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userDetail?.image === "null" ||
                      userDetail?.image === null ? (
                        <i
                          className="fa-regular fa-user"
                          style={{
                            color: "#fff",
                            border: "1px #fff solid",
                            padding: "7px 8px",
                            borderRadius: "100%",
                            marginRight: 5,
                          }}
                        ></i>
                      ) : (
                        <img
                          width={"40px"}
                          height={"40px"}
                          src={userDetail?.image}
                          className="rounded-circle me-2"
                          style={{ border: "2px solid #fff" }}
                        />
                      )}
                      {userDetail?.fname}
                    </button>
                    <ul
                      className="dropdown-menu p-0 dropdown-menu-arrow"
                      style={{ left: "-23px" }}
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li
                        className="dropdown-header py-3"
                        style={{ padding: "9px 8px" }}
                      >
                        <h6
                          className="text-center mb-0"
                          style={{
                            fontWeight: "600",
                            color: "#444444",
                            fontSize: "16px",
                          }}
                        >
                          {userDetail?.fname + " " + userDetail?.lname}
                        </h6>
                        <span
                          className="text-wrap"
                          style={{
                            fontSize: "12px",
                            overflowWrap: "break-word",
                          }}
                        >
                          {userDetail?.email}
                        </span>
                      </li>
                      <li>
                        <hr className="dropdown-divider p-0 m-0" />
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className="dropdown-item py-2"
                          style={{ color: "#616467", cursor: "pointer" }}
                        >
                          <BsPerson className="profileIcons me-2" />
                          <span style={{ fontSize: "15px" }}>Profile</span>
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider p-0 m-0" />
                      </li>
                      <li>
                        <Link
                          to="/changepassword"
                          className="dropdown-item py-2"
                          style={{ color: "#616467", cursor: "pointer" }}
                        >
                          <BsGear className="profileIcons me-2" />
                          <span style={{ fontSize: "15px" }}>
                            Change Password
                          </span>
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider p-0 m-0" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item py-2"
                          style={{ color: "#616467", cursor: "pointer" }}
                          onClick={() => logout()}
                        >
                          <BsBoxArrowRight className="profileIcons me-2" />
                          <span style={{ fontSize: "15px" }}>Sign Out </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
