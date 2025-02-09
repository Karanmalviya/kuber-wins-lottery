import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
import { ToastContainer } from "react-toastify";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowUpShort } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Loader from "../../component/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "react-scroll-to-top";

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

export default function AddStaffPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const {
    createSubAdmin,
    fetchSubAdmin,
    updateSubAdmin,
    subAdmin,
    isSaved,
    isLoading,
  } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(emptyData);
  const [on, setOn] = useState(false);
  const [ed, setEd] = useState("");
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);
  useEffect(() => {
    if (id) {
      const sel = subAdmin.filter((x) => x.id == id);
      if (sel.length > 0) {
        setSelected(sel[0]);
      }
      if (subAdmin.length === 0) {
        navigate("/staffs");
      }
    }
  }, [id]);

  useEffect(() => {
    if (isSaved && on) {
      setEd("");
      navigate("/staffs");
    }
  }, [isSaved]);

  const handleButtonClick = (toggle) => {
    const updatedData = { ...selected };
    for (const category in updatedData) {
      if (category.startsWith("manage")) {
        if (typeof updatedData[category] === "object") {
          for (const subCategory in updatedData[category]) {
            updatedData[category][subCategory] = toggle;
          }
        } else {
          updatedData[category] = toggle;
        }
      }
    }
    setSelected(updatedData);
  };

  const allManageFieldsAreTrue = () => {
    for (const category in selected) {
      if (category.startsWith("manage")) {
        if (typeof selected[category] === "object") {
          for (const subCategory in selected[category]) {
            if (selected[category][subCategory] !== true) {
              return false;
            }
          }
        } else {
          if (selected[category] !== true) {
            return false;
          }
        }
      }
    }
    return true;
  };

  return (
    <>
      <Loader loading={isLoading} />
      <Container fluid className="containerFluMainDiv">
        <Row className="containerFluMainDivRow">
          <Col lg={12}>
            <HeaderPageContainer setOpenSidebar={setOpenSidebar} />
          </Col>
        </Row>
      </Container>
      <Container
        fluid
        className={`containerFluMainDiv ${openSidebar && `mdbody`}`}
      >
        <Row className="containerFluMainDivRow">
          <Col lg={3} md={3} className="sibebarWidth">
            <SidebarPageContainer openSidebar={openSidebar} />
          </Col>
          <Col lg={9} md={9} sm={12} className="mainContantWidth">
            <main id="main" className="main">
              <div className="pagetitle">
                <h1>Add Staff</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      {/* <a href="index.html">Home</a> */}
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Add Staff</li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Row className="row">
                  <Col lg={12} className="col-lg-12">
                    <Card className="card">
                      <Card.Body className="card-body pt-2">
                        {/* <!-- General Form Elements --> */}
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (id) {
                              updateSubAdmin({
                                ...selected,
                                AdminId: admin.id,
                              });
                            } else {
                              createSubAdmin({
                                ...selected,
                                AdminId: admin.id,
                              });
                            }
                            setOn(true);
                          }}
                        >
                          <Row className="row">
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                First Name
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                value={selected.firstName}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    firstName: e.target.value,
                                  })
                                }
                                type="text"
                                className="form-control formWidth"
                              />
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Last Name
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                value={selected.lastName}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    lastName: e.target.value,
                                  })
                                }
                                type="text"
                                className="form-control formWidth"
                              />
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Email Id
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                value={selected.email}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    email: e.target.value,
                                  })
                                }
                                className="form-control formWidth"
                              />
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Password
                                <span className="text-danger">
                                  {!id && "*"}
                                </span>
                              </Form.Label>
                              <Form.Control
                                required={!id && true}
                                type="text"
                                value={selected.password}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    password: e.target.value,
                                  })
                                }
                                className="form-control "
                              />
                            </Col>
                          </Row>
                          <Row className="row">
                            <Col
                              lg={6}
                              md={6}
                              className="col-lg-6 col-md-6 mb-3"
                            >
                              {" "}
                              <Form.Label
                                for="inputText"
                                className="col-form-label mb-3"
                              >
                                Select Modules
                              </Form.Label>
                            </Col>
                            <Col
                              lg={6}
                              md={6}
                              className="col-lg-6 col-md-6 mb-3"
                            >
                              <div className="d-flex justify-content-end">
                                <Form.Check
                                  type="switch"
                                  // id="custom-switch"
                                  label="All Modules"
                                  checked={allManageFieldsAreTrue()}
                                  onClick={(e) =>
                                    handleButtonClick(e.target.checked)
                                  }
                                />
                              </div>
                            </Col>
                          </Row>

                          <ul>
                            <li>
                              <Row className="row">
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Manage Lottery"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_lottery: {
                                          ...selected.manage_lottery,
                                          lottery: e.target.checked,
                                          lottery_phase: e.target.checked,
                                        },
                                        manage_reports: {
                                          ...selected.manage_reports,
                                          // game_report: e.target.checked,
                                          game_report: true,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_lottery.lottery &&
                                      selected.manage_lottery.lottery_phase
                                    }
                                  />
                                </Col>
                              </Row>
                              <Row className="row">
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    // id="custom-switch"
                                    label="Lottery"
                                    checked={selected.manage_lottery.lottery}
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_lottery: {
                                          ...selected.manage_lottery,
                                          lottery: e.target.checked,
                                        },
                                        manage_reports: {
                                          ...selected.manage_reports,
                                          game_report: true,
                                        },
                                      });
                                    }}
                                  />
                                </Col>

                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    // id="custom-switch"
                                    label="Lottery Phase"
                                    checked={
                                      selected.manage_lottery.lottery_phase
                                    }
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_lottery: {
                                          ...selected.manage_lottery,
                                          lottery_phase: e.target.checked,
                                        },
                                        manage_reports: {
                                          ...selected.manage_reports,
                                          game_report: true,
                                        },
                                      });
                                    }}
                                  />
                                </Col>
                              </Row>
                            </li>
                            <li className="mt-3">
                              <Row className="row">
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    label="Manage Scratch Card"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_scratchCard: {
                                          ...selected.manage_scratchCard,
                                          add_scratchCard: e.target.checked,
                                          scratchCard: e.target.checked,
                                        },
                                        manage_reports: {
                                          ...selected.manage_reports,
                                          game_report: true,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_scratchCard.scratchCard &&
                                      selected.manage_scratchCard
                                        .add_scratchCard
                                    }
                                  />
                                </Col>
                              </Row>
                              <Row className="row">
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    label="Add Scratch Card"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_scratchCard: {
                                          ...selected.manage_scratchCard,
                                          add_scratchCard: e.target.checked,
                                        },
                                        manage_reports: {
                                          ...selected.manage_reports,
                                          game_report: true,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_scratchCard
                                        .add_scratchCard
                                    }
                                  />
                                </Col>

                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    label="Scratch Card List"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_scratchCard: {
                                          ...selected.manage_scratchCard,
                                          scratchCard: e.target.checked,
                                        },
                                        manage_reports: {
                                          ...selected.manage_reports,
                                          game_report: true,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_scratchCard.scratchCard
                                    }
                                  />
                                </Col>
                              </Row>
                            </li>
                            <li className="mt-3">
                              <Row className="row">
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Manage Reports"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_reports: {
                                          ...selected.manage_reports,
                                          game_report: e.target.checked,
                                          transaction_log: e.target.checked,
                                          commission_log: e.target.checked,
                                          login_history: e.target.checked,
                                          email_history: e.target.checked,
                                          lottery_winners: e.target.checked,
                                          scratchCard_winners: e.target.checked,
                                          sold_lottery: e.target.checked,
                                          sold_scratchCard: e.target.checked,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_reports.game_report &&
                                      selected.manage_reports.transaction_log &&
                                      selected.manage_reports.commission_log &&
                                      selected.manage_reports.login_history &&
                                      selected.manage_reports.email_history &&
                                      selected.manage_reports.lottery_winners &&
                                      selected.manage_reports
                                        .scratchCard_winners &&
                                      selected.manage_reports.sold_lottery &&
                                      selected.manage_reports.sold_scratchCard
                                    }
                                  />
                                </Col>
                              </Row>
                              <Row className="row">
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    label="Game Report"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_reports: {
                                          ...selected.manage_reports,
                                          game_report: e.target.checked,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_reports.game_report
                                    }
                                  />
                                </Col>

                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    label="Transaction Logs"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_reports: {
                                          ...selected.manage_reports,

                                          transaction_log: e.target.checked,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_reports.transaction_log
                                    }
                                  />
                                </Col>
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    label="Commission Logs"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_reports: {
                                          ...selected.manage_reports,

                                          commission_log: e.target.checked,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_reports.commission_log
                                    }
                                  />
                                </Col>
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    label="Login History"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_reports: {
                                          ...selected.manage_reports,
                                          login_history: e.target.checked,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_reports.login_history
                                    }
                                  />
                                </Col>
                              </Row>
                              <Row className="row">
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    // id="custom-switch"
                                    label="Email History"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_reports: {
                                          ...selected.manage_reports,

                                          email_history: e.target.checked,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_reports.email_history
                                    }
                                  />
                                </Col>
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    // id="custom-switch"
                                    label="Lottery Winners"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_reports: {
                                          ...selected.manage_reports,

                                          lottery_winners: e.target.checked,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_reports.lottery_winners
                                    }
                                  />
                                </Col>
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    // id="custom-switch"
                                    label="Sold Tickets"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_reports: {
                                          ...selected.manage_reports,

                                          sold_lottery: e.target.checked,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_reports.sold_lottery
                                    }
                                  />
                                </Col>
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    // id="custom-switch"
                                    label="Sold Scratchers"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_reports: {
                                          ...selected.manage_reports,

                                          sold_scratchCard: e.target.checked,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_reports.sold_scratchCard
                                    }
                                  />
                                </Col>{" "}
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    // id="custom-switch"
                                    label="ScratchCard Winners"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_reports: {
                                          ...selected.manage_reports,

                                          scratchCard_winners: e.target.checked,
                                        },
                                      });
                                    }}
                                    checked={
                                      selected.manage_reports
                                        .scratchCard_winners
                                    }
                                  />
                                </Col>
                              </Row>
                            </li>
                            <li className="mt-3">
                              <Row className="row">
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    label="Manage Referrals"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_referrals: e.target.checked,
                                      });
                                    }}
                                    checked={selected.manage_referrals}
                                  />
                                </Col>
                              </Row>
                            </li>
                            <li className="mt-3">
                              <Row className="row">
                                <Col
                                  lg={3}
                                  md={3}
                                  className="col-lg-3 col-md-3 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    label="Manage Users"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_users: e.target.checked,
                                      });
                                    }}
                                    checked={selected.manage_users}
                                  />
                                </Col>
                              </Row>
                            </li>
                            <li className="mt-3">
                              <Row className="row">
                                <Col
                                  lg={6}
                                  md={6}
                                  className="col-lg-6 col-md-6 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    label="Manage Deposits"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_deposits: e.target.checked,
                                      });
                                    }}
                                    checked={selected.manage_deposits}
                                  />
                                </Col>
                              </Row>
                            </li>
                            <li className="mt-3">
                              <Row className="row">
                                <Col
                                  lg={6}
                                  md={6}
                                  className="col-lg-6 col-md-6 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    label="Manage Withdrawals"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_withdrawals: e.target.checked,
                                      });
                                    }}
                                    checked={selected.manage_withdrawals}
                                  />
                                </Col>
                              </Row>
                            </li>
                            <li className="mt-3">
                              <Row className="row">
                                <Col
                                  lg={6}
                                  md={6}
                                  className="col-lg-6 col-md-6 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    label="Manage Support Tickets"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_supportTickets: e.target.checked,
                                      });
                                    }}
                                    checked={selected.manage_supportTickets}
                                  />
                                </Col>
                              </Row>
                            </li>
                            <li className="mt-3">
                              <Row className="row">
                                <Col
                                  lg={6}
                                  md={6}
                                  className="col-lg-6 col-md-6 mb-3"
                                >
                                  <Form.Check
                                    type="switch"
                                    label="Manage Subscribers"
                                    onChange={(e) => {
                                      setSelected({
                                        ...selected,
                                        manage_subscribers: e.target.checked,
                                      });
                                    }}
                                    checked={selected.manage_subscribers}
                                  />
                                </Col>
                              </Row>
                            </li>
                          </ul>
                          <Row className="row">
                            <Col lg={12} className="col-lg-12">
                              <Button
                                variant="success"
                                type="submit"
                                className="btn btn-sm px-4"
                              >
                                Save
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                        {/* <!-- End General Form Elements --> */}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>
            </main>
            {/* <!-- End #main --> */}
            <FooterPageContainer />
            <ScrollToTop
              smooth
              className="back-to-top"
              component={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-arrow-up "
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                  />
                </svg>
              }
            />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}
