import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

// import React bootstrap icons start
import {
  BsGrid,
  BsLayoutTextWindowReverse,
  BsMenuButtonWide,
  // BsChevronDown,
  BsCircle,
  BsJournalText,
  // BsPerson,
  // BsQuestionCircle,
  // BsEnvelope,
  // BsCardList,
  // BsBoxArrowRight,
  // BsDashCircle,
  // BsFileEarmark,
} from "react-icons/bs";
// import React bootstrap icons end
const emptyData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  AdminId: "",
  manage_lottery: {
    lottery: false,
    lottery_phase: false,
  },
  manage_scratchCard: {
    scratchCard: false,
    add_scratchCard: false,
  },
  manage_reports: {
    game_report: false,
    transaction_log: false,
    commission_log: false,
    login_history: false,
    email_history: false,
    lottery_winners: false,
    scratchCard_winners: false,
    sold_lottery: false,
    sold_scratchCard: false,
  },
  manage_referrals: false,
  manage_users: false,
  manage_deposits: false,
  manage_withdrawals: false,
  manage_supportTickets: false,
  manage_subscribers: false,
};
export default function SidebarPage(props) {
  const {
    activeaccount,
    totalCount,
    inactiveaccount,
    emailverifycount,
    smscount,
    kycpendingcount,
    kycunverifycount,
    balancecount,
    openSidebar,
    fetchSubAdminById,
    subAdminById,
  } = props;

  const location = useLocation();
  const menu = location.pathname;
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);
  const [selected, setSelected] = useState(emptyData);

  useEffect(() => {
    totalCount();
    fetchSubAdminById(admin.id);
  }, [admin.id]);

  useEffect(() => {
    if (admin.role === "sub-admin" && Object.keys(subAdminById).length) {
      setSelected(subAdminById);
    }
  }, [subAdminById, admin.role]);

  return (
    <>
      <aside
        id="sidebar"
        className="sidebar "
        // style={openSidebar ? { left: 0, width: "0px" } : {}}
      >
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link
              to="/"
              className={
                menu == "/"
                  ? " nav-link collapsed active"
                  : "nav-link collapsed"
              }
            >
              <BsGrid className="sidebarLeftIcons" />
              <span>Dashboard</span>
            </Link>
          </li>

          {/* {/ <!-- End Dashboard Nav --> /} */}
          {/* 
          <li
            className="nav-item"
            hidden={
              selected.role === "sub-admin" && selected.manage_referrals
                ? false
                : admin.role === "admin"
                ? false
                : true
            }
          >
            <Link
              to="/referal"
              className={
                menu == "/referal"
                  ? " nav-link collapsed active"
                  : "nav-link collapsed"
              }
            >
              <BsLayoutTextWindowReverse className="sidebarLeftIcons" />

              <span>Manage Referrals</span>
            </Link>
          </li> */}

          <li
            className="nav-item"
            hidden={admin.role === "admin" ? false : true}
          >
            <a
              className={
                "nav-link collapsed" +
                (menu === "/referal" || menu === "/referal" ? "active" : "")
              }
              data-bs-target="#Referal-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsMenuButtonWide className="sidebarLeftIcons" />
              <span>Manage Referrals</span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>
            <ul
              id="Referal-nav"
              data-bs-parent="#sidebar-nav"
              className={
                "nav-content collapse " +
                (menu === "/referal" || menu === "/lottery-rewards"
                  ? "show"
                  : "hidden")
              }
            >
              <li>
                <Link
                  to="/referal"
                  className={menu === "/referal" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Referrals Commissions</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/lottery-rewards"
                  className={menu == "/lottery-rewards" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Referrals Lottery Rewards</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* {/ <!-- End Dashboard Nav --> /} */}

          <li
            className="nav-item"
            hidden={
              selected.role === "sub-admin" &&
              Object.values(selected.manage_scratchCard).some(
                (value) => value === true
              )
                ? false
                : admin.role === "admin"
                ? false
                : true
            }
          >
            <a
              // className="nav-link collapsed "

              className={
                "nav-link collapsed" +
                (menu === "/scratch-list" || menu === "/add-scratch"
                  ? "active"
                  : "")
              }
              data-bs-target="#Scratch-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsMenuButtonWide className="sidebarLeftIcons" />
              <span>Manage Scratch Cards</span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>
            <ul
              id="Scratch-nav"
              data-bs-parent="#sidebar-nav"
              className={
                "nav-content collapse " +
                (menu === "/scratch-list" || menu === "/add-scratch"
                  ? "show"
                  : "hidden")
              }
            >
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_scratchCard.scratchCard
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to="/scratch-list"
                  className={menu === "/scratch-list" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Scratch List</span>
                </Link>
              </li>
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_scratchCard.add_scratchCard
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to="/add-scratch"
                  className={menu == "/add-scratch" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Add Scratch</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* {/ <!-- End Manage Scratch Cards --> /} */}

          <li
            className="nav-item"
            hidden={
              selected.role === "sub-admin" &&
              Object.values(selected.manage_lottery).some(
                (value) => value === true
              )
                ? false
                : admin.role === "admin"
                ? false
                : true
            }
          >
            <a
              className={
                "nav-link collapsed" +
                (menu == "/lotteries" ||
                  (menu == "/lottery-phases" ? "active" : ""))
              }
              data-bs-target="#Lottery-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsMenuButtonWide className="sidebarLeftIcons" />
              <span>Manage Lottery</span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>
            <ul
              id="Lottery-nav"
              data-bs-parent="#sidebar-nav"
              className={
                "nav-content collapse " +
                (menu == "/lotteries" || menu == "/lottery-phases"
                  ? "show"
                  : "hidden")
              }
            >
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_lottery.lottery
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to="/lotteries"
                  className={menu === "/lotteries" ? "active" : ""}
                >
                  {/* {/ <a> /} */}
                  <BsCircle className="smallCircle" />
                  <span>Lotteries</span>
                  {/* {/ </a> /} */}
                </Link>
              </li>
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_lottery.lottery_phase
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to="/lottery-phases"
                  className={menu == "/lottery-phases" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Lottery Phases</span>
                </Link>
              </li>
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_lottery.lottery_phase
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to="/manual-draw"
                  className={menu == "/manual-draw" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Manual Draw</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* {/ <!-- End Manage Lottery --> /} */}

          <li
            className="nav-item"
            hidden={
              selected.role === "sub-admin" && selected.manage_users
                ? false
                : admin.role === "admin"
                ? false
                : true
            }
          >
            <a
              // className="nav-link collapsed"
              className={
                "nav-link collapsed" +
                (menu == "/active-users" ||
                menu == "/inactive-users" ||
                menu == "/banned-users" ||
                menu == "/email-unverified" ||
                menu == "/mobile-unverified" ||
                menu == "/kyc-unverified" ||
                menu == "/kyc-pending" ||
                menu == "/with-balance" ||
                menu == "/all-users" ||
                menu == "/notification-to-all"
                  ? "active"
                  : "")
              }
              data-bs-target="#Users-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsJournalText className="sidebarLeftIcons" />
              <span>Manage Users</span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>
            <ul
              id="Users-nav"
              data-bs-parent="#sidebar-nav"
              className={
                "nav-content collapse " +
                (menu == "/active-users" ||
                menu == "/inactive-users" ||
                menu == "/banned-users" ||
                menu == "/email-unverified" ||
                menu == "/mobile-unverified" ||
                menu == "/kyc-unverified" ||
                menu == "/kyc-pending" ||
                menu == "/with-balance" ||
                menu == "/all-users" ||
                menu == "/notification-to-all"
                  ? "show"
                  : "hidden")
              }
            >
              <li>
                <Link
                  to="/active-users"
                  className={menu == "/active-users" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>
                    Active Users
                    {/* {activeaccount ? `(${activeaccount})` : ""} */}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/inactive-users"
                  className={menu == "/inactive-users" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>
                    Inactive Users{" "}
                    {/* {inactiveaccount ? `(${inactiveaccount})` : ""} */}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/email-unverified"
                  className={menu == "/email-unverified" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>
                    Email Unverified
                    {/* {emailverifycount ? `(${emailverifycount})` : ""} */}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/mobile-unverified"
                  className={menu == "/mobile-unverified" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>
                    Mobile Unverified
                    {/* {smscount ? `(${smscount})` : ""} */}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/kyc-unverified"
                  className={menu == "/kyc-unverified" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>
                    KYC Unverified
                    {/* {kycunverifycount ? `(${kycunverifycount})` : ""} */}
                  </span>
                </Link>
              </li>
              {/* <li>
                <Link to="/kyc-pending" className={menu == "kyc-pending" ? 'active' : ''}>
                  <BsCircle className="smallCircle" />
                  <span>KYC Pending{kycpendingcount}</span>
                </Link>
              </li> */}
              <li>
                <Link
                  to="/with-balance"
                  className={menu == "/with-balance" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>
                    With Balance
                    {/* {balancecount ? `(${balancecount})` : ""} */}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/all-users"
                  className={menu == "/all-users" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>All Users</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/notification-to-all"
                  className={menu == "/notification-to-all" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Notification to All</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* {/ <!-- End Manage Users --> /} */}

          {/* <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#Masters-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsMenuButtonWide className="sidebarLeftIcons" />
              <span>Manage Masters</span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>
            <ul
              id="Masters-nav"
              data-bs-parent="#sidebar-nav"
              className={
                "nav-content collapse " +
                (menu == "currencies" || menu == "timezones"
                  ? "show"
                  : "hidden")
              }
            >
              <li>
                <Link
                  to="/currencies"
                  className={menu == "currencies" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Currency</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/timezones"
                  className={menu == "timezones" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Time Zone</span>
                </Link>
              </li>
            </ul>
          </li> */}
          {/* {/ <!-- End Manage Masters --> /} */}

          {/* <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#Payment-Gateways-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsLayoutTextWindowReverse className="sidebarLeftIcons" />
              <span>Payment Gateways</span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>
            <ul
              id="Payment-Gateways-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <a href="#">
                  <BsCircle className="smallCircle" />
                  <span>-</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <BsCircle className="smallCircle" />
                  <span>-</span>
                </a>
              </li>
            </ul>
          </li> */}
          {/* {/ <!-- End Payment Gateways --> /} */}

          {/* Role Management Start */}
          <li
            className="nav-item"
            hidden={admin.role === "admin" ? false : true}
          >
            <a
              className={
                "nav-link collapsed" +
                (menu == "/staffs" || (menu == "/add-staff" ? "active" : ""))
              }
              data-bs-target="#Role-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsMenuButtonWide className="sidebarLeftIcons" />
              <span>Manage Staff</span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>
            <ul
              id="Role-nav"
              data-bs-parent="#sidebar-nav"
              className={
                "nav-content collapse " +
                (menu == "/staffs" || menu == "/add-staff" ? "show" : "hidden")
              }
            >
              <li>
                <Link
                  to="/staffs"
                  className={menu === "/staffs" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Staffs </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/add-staff"
                  className={menu == "/add-staff" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Add Staff</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* Role Management End */}

          <li
            className="nav-item"
            hidden={admin.role === "admin" ? false : true}
          >
            <a
              className={
                "nav-link collapsed" +
                (menu == "/add-bank-account" || menu == "/add-staff"
                  ? "active"
                  : "")
              }
              data-bs-target="#Bank-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsMenuButtonWide className="sidebarLeftIcons" />
              <span>Manage Bank Accounts</span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>
            <ul
              id="Bank-nav"
              data-bs-parent="#sidebar-nav"
              className={
                "nav-content collapse " +
                (menu == "/add-bank-account" || menu == "/bank-accounts"
                  ? "show"
                  : "hidden")
              }
            >
              <li>
                <Link
                  to="/add-bank-account"
                  className={menu === "/add-bank-account" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Add New</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/bank-accounts"
                  className={menu == "/bank-accounts" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Bank Accounts</span>
                </Link>
              </li>
            </ul>
          </li>
          <li
            className="nav-item"
            hidden={
              selected.role === "sub-admin" && selected.manage_deposits
                ? false
                : admin.role === "admin"
                ? false
                : true
            }
          >
            <a
              // className="nav-link collapsed"

              className={
                "nav-link collapsed" +
                (menu === "/deposit-list" ? "active" : "")
              }
              data-bs-target="#Deposits-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsLayoutTextWindowReverse className="sidebarLeftIcons" />
              <span>Deposits</span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>
            <ul
              id="Deposits-nav"
              // className="nav-content collapse "
              className={
                "nav-content collapse " +
                (menu == "/deposit-list" ? "show" : "hidden")
              }
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link
                  to="/deposit-list"
                  className={menu == "/deposit-list" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Deposit List</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* {/ <!-- End Deposits --> /} */}

          <li
            className="nav-item"
            hidden={
              selected.role === "sub-admin" && selected.manage_withdrawals
                ? false
                : admin.role === "admin"
                ? false
                : true
            }
          >
            <a
              className={
                "nav-link collapsed" +
                (menu === "/all-withdrawals" ? "active" : "")
              }
              data-bs-target="#Withdrawals-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsLayoutTextWindowReverse className="sidebarLeftIcons" />
              <span>Withdrawals </span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>
            <ul
              id="Withdrawals-nav"
              // className="nav-content collapse "
              className={
                "nav-content collapse " +
                (menu == "/all-withdrawals" ? "show" : "hidden")
              }
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link
                  to={"/all-withdrawals"}
                  className={menu == "/all-withdrawals" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>All Withdrawals</span>
                </Link>
              </li>
            </ul>
          </li>
          {/* {/ <!-- End Withdrawals --> /} */}

          <li
            className="nav-item"
            hidden={
              selected.role === "sub-admin" && selected.manage_supportTickets
                ? false
                : admin.role === "admin"
                ? false
                : true
            }
          >
            <a
              className={
                "nav-link collapsed" + (menu === "/all-tickets" ? "active" : "")
              }
              data-bs-target="#Support-Ticket-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsLayoutTextWindowReverse className="sidebarLeftIcons" />
              <span>Support Ticket </span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>
            <ul
              id="Support-Ticket-nav"
              // className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
              className={
                "nav-content collapse " +
                (menu == "/all-tickets" ? "show" : "hidden")
              }
            >
              <li>
                <Link to="/all-tickets">
                  <BsCircle className="smallCircle" />
                  <span>All Ticket</span>
                </Link>
              </li>
              {/* <li>
                <Link to="/pending-tickets">
                  <BsCircle className="smallCircle" />
                  <span>Pending Ticket</span>
                </Link>
              </li>
              <li>
                <Link to="/closed-tickets">
                  <BsCircle className="smallCircle" />
                  <span>Closed Ticket</span>
                </Link>
              </li>
              <li>
                <Link to="/answer-tickets">
                  <BsCircle className="smallCircle" />
                  <span>Answer Ticket</span>
                </Link>
              </li> */}
            </ul>
          </li>
          {/* {/ <!-- End Support Ticket --> /} */}

          <li
            className="nav-item"
            hidden={
              selected.role === "sub-admin" &&
              Object.values(selected.manage_reports).some(
                (value) => value === true
              )
                ? false
                : admin.role === "admin"
                ? false
                : true
            }
          >
            <a
              className={
                "nav-link collapsed" +
                (menu == "/transaction-log" ||
                menu == "/Win-commission" ||
                menu == "/buy-commission" ||
                menu == "/deposit-commission" ||
                menu == "/login-logs" ||
                menu == "/email-history" ||
                menu == "/winner-history" ||
                menu == "/scratch-cards-winner" ||
                menu == "/sold-tickets" ||
                menu == "/game-report" ||
                menu == "/sold-scratch-cards"
                  ? "active"
                  : "")
              }
              data-bs-target="#Report-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsLayoutTextWindowReverse className="sidebarLeftIcons" />
              <span>Report </span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>

            <ul
              id="Report-nav"
              data-bs-parent="#sidebar-nav"
              className={
                "nav-content collapse " +
                (menu == "/transaction-log" ||
                menu == "/Win-commission" ||
                menu == "/buy-commission" ||
                menu == "/deposit-commission" ||
                menu == "/login-logs" ||
                menu == "/email-history" ||
                menu == "/winner-history" ||
                menu == "/scratch-cards-winner" ||
                menu == "/sold-tickets" ||
                menu == "/game-report" ||
                menu == "/sold-scratch-cards"
                  ? "show"
                  : "hidden")
              }
            >
              {" "}
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_reports.game_report &&
                  (Object.values(selected.manage_scratchCard).some(
                    (value) => value === true
                  ) ||
                    Object.values(selected.manage_lottery).some(
                      (value) => value === true
                    ))
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to={"/game-report"}
                  className={menu == "/game-report" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Game Report</span>
                </Link>
              </li>
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_reports.transaction_log
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to={"/transaction-log"}
                  className={menu == "/transaction-log" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Transaction Log</span>
                </Link>
              </li>
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_reports.commission_log
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to={"/Win-commission"}
                  className={
                    menu == "/Win-commission" ||
                    menu == "/buy-commission" ||
                    menu == "/deposit-commission"
                      ? "active"
                      : ""
                  }
                >
                  <BsCircle className="smallCircle" />
                  <span>Commission Log</span>
                </Link>
              </li>
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_reports.login_history
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to={"/login-logs"}
                  className={menu == "/login-logs" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Login History</span>
                </Link>
              </li>
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_reports.email_history
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to={"/email-history"}
                  className={menu == "/email-history" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Email History</span>
                </Link>
              </li>
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_reports.lottery_winners
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to={"/winner-history"}
                  className={menu == "/winner-history" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Lottery Winners</span>
                </Link>
              </li>
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_reports.scratchCard_winners
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to={"/scratch-cards-winner"}
                  className={menu == "/scratch-cards-winner" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>ScratchCard Winners</span>
                </Link>
              </li>
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_reports.sold_lottery
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to={"/sold-tickets"}
                  className={menu == "/sold-tickets" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Sold Tickets</span>
                </Link>
              </li>
              <li
                hidden={
                  selected.role === "sub-admin" &&
                  selected.manage_reports.sold_scratchCard
                    ? false
                    : admin.role === "admin"
                    ? false
                    : true
                }
              >
                <Link
                  to={"/sold-scratch-cards"}
                  className={menu == "/sold-scratch-cards" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Sold Scratchers</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* {/ <!-- End Report --> /} */}

          {/* <li className="nav-item ">
            <a
              className="nav-link collapsed "
              data-bs-target="#Subscriber-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsMenuButtonWide className="sidebarLeftIcons" />
              <span>Subscribers</span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>
            <ul
              id="Subscriber-nav"
              data-bs-parent="#sidebar-nav"
              className={
                "nav-content collapse " +
                (menu == "subscriber-list" ? "show" : "hidden")
              }
            >
              <li>
                <Link
                  to="/subscriber-list"
                  className={menu == "subscriber-list" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Subscriber List</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/subscriber-details"
                  className={menu == "subscriber-details" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>All Subscribers</span>
                </Link>
              </li>
            </ul>
          </li> */}

          <li
            hidden={
              selected.role === "sub-admin" && selected.manage_subscribers
                ? false
                : admin.role === "admin"
                ? false
                : true
            }
            className={
              "nav-item " +
              (menu === "/subscriber-list" || menu === "/subscriber-details"
                ? "active"
                : "")
            }
          >
            <a
              className={
                "nav-link collapsed" +
                (menu === "/subscriber-list" || menu === "/subscriber-details"
                  ? "active"
                  : "")
              }
              data-bs-target="#Subscriber-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <BsMenuButtonWide className="sidebarLeftIcons" />
              <span>Subscribers</span>
              <i className="bi bi-chevron-down ms-auto " />
            </a>
            <ul
              id="Subscriber-nav"
              data-bs-parent="#sidebar-nav"
              className={
                "nav-content collapse " +
                (menu === "/subscriber-list" || menu === "/subscriber-details"
                  ? "show"
                  : "hidden")
              }
            >
              <li>
                <Link
                  to="/subscriber-list"
                  className={menu === "/subscriber-list" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>Subscriber List</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/subscriber-details"
                  className={menu === "/subscriber-details" ? "active" : ""}
                >
                  <BsCircle className="smallCircle" />
                  <span>All Subscribers</span>
                </Link>
              </li>
            </ul>
          </li>

          {/* {/ <!-- End Subscribers  --> /} */}

          {/* <li className="nav-heading">SETTINGS</li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="users-profile.html">
              <BsPerson className="sidebarLeftIcons" />
              <span>General Setting</span>
            </a>
          </li> */}
          {/* {/ <!-- General Setting --> /} */}

          {/* <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <BsQuestionCircle className="sidebarLeftIcons" />
              <span>System Configuration</span>
            </a>
          </li> */}
          {/* {/ <!-- End System Configuration --> /} */}

          {/* <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <BsEnvelope className="sidebarLeftIcons" />
              <span>Logo & Favicon</span>
            </a>
          </li> */}
          {/* {/ <!-- End Logo & Favicon --> /} */}

          {/* <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <BsCardList className="sidebarLeftIcons" />
              <span>Extensions</span>
            </a>
          </li> */}
          {/* {/ <!-- End Extensions --> /} */}

          {/* <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <BsBoxArrowRight className="sidebarLeftIcons" />
              <span>Language</span>
            </a>
          </li> */}
          {/* {/ <!-- End Language --> /} */}

          {/* <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <BsDashCircle className="sidebarLeftIcons" />
              <span>SEO Manager</span>
            </a>
          </li> */}
          {/* {/ <!-- End SEO --> /} */}

          {/* <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <BsFileEarmark className="sidebarLeftIcons" />
              <span>KYC Setting</span>
            </a>
          </li> */}
          {/* {/ <!-- End KYC --> /} */}

          {/* <li className="nav-item">
            <a className="nav-link collapsed" href="#">
              <BsFileEarmark className="sidebarLeftIcons" />
              <span>Notification Setting</span>
            </a>
          </li> */}
          {/* {/ <!-- End Notification Setting --> /} */}
        </ul>
      </aside>
    </>
  );
}
