import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LifetimeLottoLOGO from "./../../assets/img/LifetimeLottoLOGO.png";
import { RiAdminFill, RiUserFill } from "react-icons/ri";
import {
  BsList,
  BsSearch,
  BsBell,
  BsChatLeftText,
  BsExclamationCircle,
  BsXCircle,
  BsCheckCircle,
  BsInfoCircle,
  BsPerson,
  BsGear,
  BsQuestionCircle,
  BsBoxArrowRight,
} from "react-icons/bs";
import { useEffect } from "react";

export default function HeaderPage(props) {
  const {
    userLogout,
    fetchsupportticket,
    supportTicket,
    updateStatus,
    fetchuser,
    user,
    setOpenSidebar,
    withdrawal,
    fetchwithdrawal,
    subAdminById,
    fetchSubAdminById,
  } = props;
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);
  const [open, setOpen] = useState(false);
  const handleButtonClick = () => {
    setOpenSidebar((prevState) => !prevState);
    setOpen((prevState) => !prevState);
    sessionStorage.setItem("siderbar", open);
  };

  const SignOutuser = () => {
    userLogout();
    navigate("/login");
    localStorage.clear();
  };
  useEffect(() => {
    fetchuser();
    fetchsupportticket();
    fetchwithdrawal();
    fetchSubAdminById(admin.id);
  }, []);

  useEffect(() => {
    if (supportTicket.length > 0) {
      setMessage(supportTicket);
    }
  }, [supportTicket]);

  function timeDifference(dateTime) {
    if (dateTime) {
      const currentDate = new Date();
      const inputDate = new Date(dateTime);
      const diff = currentDate.getTime() - inputDate.getTime();

      const second = 1000;
      const minute = 60 * second;
      const hour = 60 * minute;
      const day = 24 * hour;
      const month = 30 * day;
      const year = 365 * day;

      if (diff < minute) {
        return Math.floor(diff / 1000) + " seconds ago";
      } else if (diff < hour) {
        return Math.floor(diff / minute) + " minutes ago";
      } else if (diff < day) {
        return Math.floor(diff / hour) + " hours ago";
      } else if (diff < month) {
        return Math.floor(diff / day) + " days ago";
      } else if (diff < year) {
        return Math.floor(diff / month) + " months ago";
      } else {
        return Math.floor(diff / year) + " years ago";
      }
    }
  }
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a
          href="/"
          className="logo d-flex align-items-center justify-content-center"
        >
          <img src={LifetimeLottoLOGO} alt="" />
        </a>
        <BsList
          className={`listIcons  ${
            open ? `toggle-sidebar-btn-active ` : `toggle-sidebar-btn`
          }`}
          onClick={handleButtonClick}
        />
      </div>
      {/* <!-- End Logo --> */}

      {/* <!-- End Search Bar --> */}

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item d-block d-lg-none">
            <a className="nav-link nav-icon search-bar-toggle " href="#">
              <BsSearch />
            </a>
          </li>
          {/* <!-- End Search Icon--> */}

          <li className="nav-item dropdown">
            <a
              className="nav-link nav-icon"
              href="#"
              data-bs-toggle="dropdown"
              hidden={
                admin.role === "sub-admin"
                  ? !subAdminById?.manage_withdrawals
                  : false
              }
            >
              <BsBell />
              {withdrawal.filter((item) => item.status === 0).length ? (
                <span className="badge bg-primary badge-number">
                  {withdrawal.filter((item) => item.status === 0).length}
                </span>
              ) : null}
            </a>
            {/* <!-- End Notification Icon --> */}

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
              <li className="dropdown-header">
                You have {withdrawal.filter((item) => item.status === 0).length}{" "}
                new notifications
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              {withdrawal.length > 0 &&
                withdrawal.map(
                  (item, index) =>
                    item.status === 0 && (
                      <div
                        style={{ maxHeight: "300px", overflowY: "scroll" }}
                        key={index}
                      >
                        <li className="notification-item">
                          <BsExclamationCircle className="text-warning dropIcons" />
                          <div>
                            <h4>{item?.Account_Holder_Name}</h4>
                            <p className="text-truncate">
                              Withdrawal request for the amount of $
                              {item?.Amount}
                            </p>
                            <p>{timeDifference(item?.createdAt)}</p>
                          </div>
                        </li>{" "}
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                      </div>
                    )
                )}

              <li className="dropdown-footer">
                <a href="#">Show all notifications</a>
              </li>
            </ul>
            {/* <!-- End Notification Dropdown Items --> */}
          </li>
          {/* <!-- End Notification Nav --> */}

          <li className="nav-item dropdown">
            <a
              className="nav-link nav-icon"
              href="#"
              data-bs-toggle="dropdown"
              hidden={
                admin.role === "sub-admin"
                  ? !subAdminById?.manage_supportTickets
                  : false
              }
            >
              <BsChatLeftText />
              {message.filter((item) => item.status == 0).length ? (
                <span className="badge bg-success badge-number">
                  {message.filter((item) => item.status == 0).length}
                </span>
              ) : null}
            </a>
            {/* <!-- End Messages Icon --> */}

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
              <li className="dropdown-header">
                You have {message.filter((item) => item.status == 0).length} new
                messages
                <Link to={"/all-tickets"}>
                  <span className="badge rounded-pill bg-primary p-2 ms-2">
                    View all
                  </span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
                {message
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                  // .slice(0, 3)
                  .map((item, i) => {
                    return (
                      item.status == 0 && (
                        <Link
                          to={"/all-ticket-page-reply/" + item.UserId}
                          state={{
                            setid: item.id,
                            supportticketsub: `[Ticket#${item.randomNo}]${item.subject}`,
                          }}
                          key={i}
                        >
                          <li
                            className="message-item"
                            key={i}
                            onClick={() => {
                              if (item.status == 3) {
                                updateStatus({ status: 3 }, item.id);
                              } else {
                                updateStatus({ status: 1 }, item.id);
                              }
                            }}
                          >
                            <a>
                              {user.map(
                                (item1, idx) =>
                                  item1.id === item.UserId && (
                                    <img
                                      key={idx}
                                      src={item1.image}
                                      className="img-fluid lotteriesImg"
                                    />
                                  )
                              )}

                              {user.map(
                                (item2, idx) =>
                                  item2.id === item.UserId &&
                                  item2.image === null && (
                                    <RiUserFill
                                      key={idx}
                                      className="rounded-circle me-3"
                                      style={{
                                        width: "35px",
                                        height: "35px",
                                        color: "#5263ef",
                                      }}
                                    />
                                  )
                              )}

                              <div>
                                <h4>{item?.name}</h4>
                                <p
                                  classname="d-inline-block text-truncate"
                                  style={{
                                    maxWidth: 200,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item?.SupportTicketMessages.filter(
                                    (item) => {
                                      return item.AdminId === 0;
                                    }
                                  ).slice(0, 1).length > 0
                                    ? item?.SupportTicketMessages.filter(
                                        (item) => {
                                          return item.AdminId === 0;
                                        }
                                      )
                                        .sort(
                                          (a, b) =>
                                            new Date(b.createdAt) -
                                            new Date(a.createdAt)
                                        )
                                        .slice(0, 1)?.[0]?.message
                                    : item?.message}
                                </p>
                                <p>
                                  {timeDifference(
                                    item?.SupportTicketMessages.filter(
                                      (item) => {
                                        return item.AdminId === 0;
                                      }
                                    ).slice(0, 1).length > 0
                                      ? item?.SupportTicketMessages.filter(
                                          (item) => {
                                            return item.AdminId === 0;
                                          }
                                        )
                                          .sort(
                                            (a, b) =>
                                              new Date(b.createdAt) -
                                              new Date(a.createdAt)
                                          )
                                          .slice(0, 1)?.[0]?.createdAt
                                      : item?.createdAt
                                  )}
                                </p>
                              </div>
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                        </Link>
                      )
                    );
                  })}
              </div>

              <li className="dropdown-footer">
                <Link to={"/all-tickets"}>Show all messages</Link>
              </li>
            </ul>
            {/* <!-- End Messages Dropdown Items --> */}
          </li>
          {/* <!-- End Messages Nav --> */}

          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              {/* <img src={profileImg} alt="Profile" className="rounded-circle" /> */}
              <RiAdminFill
                className="rounded-circle"
                style={{ height: "30px", width: "30px" }}
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">
                {admin?.firstName} {admin?.lastName}
              </span>
            </a>
            {/* <!-- End Profile Iamge Icon --> */}

            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>
                  {" "}
                  {admin?.firstName} {admin?.lastName}
                </h6>
                <span>
                  {admin.role === "admin" ? "Super Admin" : "Staff Member"}
                </span>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li
                // hidden={admin.role === "admin" ? true : false}
                onClick={() => {
                  localStorage.removeItem("isVerifiedPassword");
                  navigate("/change-password");
                }}
                style={{ cursor: "pointer" }}
              >
                <a className="dropdown-item d-flex align-items-center">
                  <BsPerson className="profileIcons" />
                  <span>Change Password</span>
                </a>
              </li>{" "}
              <li hidden={admin.role === "admin" ? false : true}>
                <hr className="dropdown-divider" />
              </li>
              <li
                hidden={admin.role === "admin" ? false : true}
                onClick={() => navigate("/profile")}
                style={{ cursor: "pointer" }}
              >
                <a className="dropdown-item d-flex align-items-center">
                  <BsPerson className="profileIcons" />
                  <span>Profile Setting</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center signOUT"
                  onClick={() => SignOutuser()}
                >
                  <BsBoxArrowRight className="profileIcons" />
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
            {/* <!-- End Profile Dropdown Items --> */}
          </li>
          {/* <!-- End Profile Nav --> */}
        </ul>
      </nav>
      {/* End Icons Navigation */}
    </header>
  );
}
