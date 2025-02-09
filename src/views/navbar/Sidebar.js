import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ props }) {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="col-lg-3 d-none d-lg-block bg-white dash-left-side py-4 pe-0 ps-5">
        <h4 className="dash-heading">Dashboard</h4>
        <div className="card">
          <div
            className="card-header collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#collapseFinance"
            aria-expanded={
              props === "deposit" ||
              props === "transactions" ||
              props === "withdrawal"
                ? "true"
                : "false"
            }
            aria-controls="collapseFinance"
          >
            <h6>
              <i className="fa fa-pie-chart"></i> Finance
            </h6>
          </div>
          <div
            className={
              props === "deposit" ||
              props === "transactions" ||
              props === "withdrawal"
                ? "card-body py-0 collapse show"
                : "card-body py-0 collapse hide"
            }
            id="collapseFinance"
          >
            <ul className="list-unstyled ps-4">
              <li>
                <Link
                  className={
                    props === "deposit" ? "nav-link active" : "nav-link"
                  }
                  to={"/deposit"}
                >
                  · Deposits
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props === "withdrawal" ? "nav-link active" : "nav-link"
                  }
                  to={"/withdrawal"}
                >
                  · Withdrawal
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props === "transactions" ? "nav-link active" : "nav-link"
                  }
                  to={"/transactions"}
                >
                  · Transactions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="card">
          <div
            className="card-header"
            data-bs-toggle="collapse"
            data-bs-target="#collapseAccount"
            aria-expanded={
              props === "profile" ||
              props === "changepassword" ||
              props === "totalwins" ||
              props === "ticketlist" ||
              props === "authentication" ||
              props === "scratch-list" ||
              props === "kyc" ||
              props === "self-exclusion"
                ? "true"
                : "false"
            }
            aria-controls="collapseAccount"
          >
            <h6>
              <i className="fa fa-user"></i> Account
            </h6>
          </div>
          <div
            className={
              props === "profile" ||
              props === "changepassword" ||
              props === "totalwins" ||
              props === "ticketlist" ||
              props === "scratch-list" ||
              props === "authentication" ||
              props === "kyc" ||
              props === "self-exclusion"
                ? "card-body py-0 collapse show"
                : "card-body py-0 collapse hide"
            }
            id="collapseAccount"
          >
            <ul className="list-unstyled ps-4">
              <li>
                <Link
                  className={
                    props === "profile" ? "nav-link active" : "nav-link"
                  }
                  to={"/profile"}
                >
                  · Profile
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props === "changepassword" ? "nav-link active" : "nav-link"
                  }
                  to={"/changepassword"}
                >
                  · Change Password
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props === "totalwins" ? "nav-link active" : "nav-link"
                  }
                  to={"/total-wins"}
                >
                  · Total Wins
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props === "ticketlist" ? "nav-link active" : "nav-link"
                  }
                  to={"/ticketlist"}
                >
                  · Ticket List
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props === "scratch-list" ? "nav-link active" : "nav-link"
                  }
                  to={"/scratch-list"}
                >
                  · Scratch Card List
                </Link>
              </li>
              <li>
                <Link
                  className={props === "kyc" ? "nav-link active" : "nav-link"}
                  to={"/kyc"}
                >
                  · KYC
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props === "authentication" ? "nav-link active" : "nav-link"
                  }
                  to={"/authentication"}
                >
                  · 2FA Authentication
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props === "self-exclusion" ? "nav-link active" : "nav-link"
                  }
                  to={"/self-exclusion"}
                >
                  · Self Exclusion
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="card">
          <div
            className="card-header"
            data-bs-toggle="collapse"
            data-bs-target="#collapseRefferal"
            aria-expanded={
              props === "commission" || props === "referredusers"
                ? "true"
                : "false"
            }
            aria-controls="collapseRefferal"
          >
            <h6>
              <i className="fa fa-link"></i> Refferal
            </h6>
          </div>
          <div
            className={
              props === "commission" || props === "referredusers"
                ? "card-body py-0 collapse show"
                : "card-body py-0 collapse hide"
            }
            id="collapseRefferal"
          >
            <ul className="list-unstyled ps-4">
              <li>
                <Link
                  className={
                    props === "commission" ? "nav-link active" : "nav-link"
                  }
                  to={"/commission"}
                >
                  · Commission
                </Link>
              </li>
              <li>
                <Link
                  className={
                    props === "referredusers" ? "nav-link active" : "nav-link"
                  }
                  to={"/referred-users"}
                >
                  · Referred Users
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="card">
          <div
            className="card-header"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSupport"
            aria-expanded={props === "supportticket" ? "true" : "false"}
            aria-controls="collapseSupport"
          >
            <h6>
              <i className="fa fa-question"></i> Support
            </h6>
          </div>
          <div
            className={
              props === "supportticket" || props === "newsupportticket"
                ? "card-body py-0 collapse show"
                : "card-body py-0 collapse hide"
            }
            id="collapseSupport"
          >
            <ul className="list-unstyled ps-4">
              <li>
                <Link
                  className={
                    props === "supportticket" ? "nav-link active" : "nav-link"
                  }
                  to={"/support-ticket"}
                >
                  · Customer Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>{" "}
      {/* card row start here */}
      <div className="row d-block d-lg-none d-md-none ">
        <span
          className="oprnNav"
          onClick={() => setToggle(true)}
          style={{ cursor: "pointer" }}
        >
          ☰
        </span>
        <div className="col-lg-12">
          <div
            id="mySidenav"
            className="sidenav"
            style={{
              width: toggle ? "250px" : "",
              left: toggle ? "0px" : "-250px",
            }}
          >
            <div className="row">
              <div className="col-lg-12 bg-white dash-left-side py-4 ms-3 pe-0 ps-2">
                <h4 className="dash-heading">
                  dashbaord{" "}
                  <a
                    className="closebtn float-end m-0"
                    onClick={() => setToggle(false)}
                    style={{ cursor: "pointer" }}
                  >
                    ×
                  </a>
                </h4>
                <div className="card">
                  <div
                    className="card-header collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFinance"
                    aria-expanded={
                      props === "deposit" ||
                      props === "transactions" ||
                      props === "withdrawal"
                        ? "true"
                        : "false"
                    }
                    aria-controls="collapseFinance"
                  >
                    <h6>
                      <i className="fa fa-pie-chart"></i> Finance
                    </h6>
                  </div>
                  <div
                    className={
                      props === "deposit" ||
                      props === "transactions" ||
                      props === "withdrawal"
                        ? "card-body py-0 collapse show"
                        : "card-body py-0 collapse hide"
                    }
                    id="collapseFinance"
                  >
                    <ul className="list-unstyled ps-4">
                      <li>
                        <Link
                          className={
                            props === "deposit" ? "nav-link active" : "nav-link"
                          }
                          to={"/deposit"}
                        >
                          · Deposits
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            props === "withdrawal"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to={"/withdrawal"}
                        >
                          · Withdrawal
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            props === "transactions"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to={"/transactions"}
                        >
                          · Transactions
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card">
                  <div
                    className="card-header "
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseAccount"
                    aria-expanded={
                      props === "profile" ||
                      props === "changepassword" ||
                      props === "totalwins" ||
                      props === "ticketlist" ||
                      props === "authentication" ||
                      props === "scratch-list" ||
                      props === "kyc" ||
                      props === "self-exclusion"
                        ? "true"
                        : "false"
                    }
                    aria-controls="collapseAccount"
                  >
                    <h6>
                      <i className="fa fa-user"></i> Account
                    </h6>
                  </div>
                  <div
                    className={
                      props === "profile" ||
                      props === "changepassword" ||
                      props === "totalwins" ||
                      props === "ticketlist" ||
                      props === "scratch-list" ||
                      props === "authentication" ||
                      props === "kyc" ||
                      props === "self-exclusion"
                        ? "card-body py-0 collapse show"
                        : "card-body py-0 collapse hide"
                    }
                    id="collapseAccount"
                  >
                    <ul className="list-unstyled ps-4">
                      <li>
                        <Link
                          className={
                            props === "profile" ? "nav-link active" : "nav-link"
                          }
                          to={"/profile"}
                        >
                          · Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            props === "changepassword"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to={"/changepassword"}
                        >
                          · Change Password
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            props === "totalwins"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to={"/total-wins"}
                        >
                          · Total Wins
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            props === "ticketlist"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to={"/ticketlist"}
                        >
                          · Ticket List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            props === "scratch-list"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to={"/scratch-list"}
                        >
                          · Scratch Card List
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            props === "kyc" ? "nav-link active" : "nav-link"
                          }
                          to={"/kyc"}
                        >
                          · KYC
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            props === "authentication"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to={"/authentication"}
                        >
                          · 2FA Authentication
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            props === "self-exclusion"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to={"/self-exclusion"}
                        >
                          · Self Exclusion
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card">
                  <div
                    className="card-header"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseRefferal"
                    aria-expanded={
                      props === "commission" || props === "referredusers"
                        ? "true"
                        : "false"
                    }
                    aria-controls="collapseRefferal"
                  >
                    <h6>
                      <i className="fa fa-link"></i> Refferal
                    </h6>
                  </div>
                  <div
                    className={
                      props === "commission" || props === "referredusers"
                        ? "card-body py-0 collapse show"
                        : "card-body py-0 collapse hide"
                    }
                    id="collapseRefferal"
                  >
                    <ul className="list-unstyled ps-4">
                      <li>
                        <Link
                          className={
                            props === "commission"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to={"/commission"}
                        >
                          · Commission
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            props === "referredusers"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to={"/referred-users"}
                        >
                          · Referred Users
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card">
                  <div
                    className="card-header"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseSupport"
                    aria-expanded={props === "supportticket" ? "true" : "false"}
                    aria-controls="collapseSupport"
                  >
                    <h6>
                      <i className="fa fa-question"></i> Support
                    </h6>
                  </div>
                  <div
                    className={
                      props === "supportticket" || props === "newsupportticket"
                        ? "card-body py-0 collapse show"
                        : "card-body py-0 collapse hide"
                    }
                    id="collapseSupport"
                  >
                    <ul className="list-unstyled ps-4">
                      <li>
                        <Link
                          className={
                            props === "supportticket"
                              ? "nav-link active"
                              : "nav-link"
                          }
                          to={"/support-ticket"}
                        >
                          · Customer Support
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
