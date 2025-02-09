import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// page imports start
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
// page imports end
// React bootstrap start
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  InputGroup,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BsCurrencyDollar,
  BsWindowDock,
  BsFillWalletFill,
  BsArrowRepeat,
  BsInfoSquare,
  BsStack,
  BsStopCircle,
  BsEmojiSmile,
  BsFillCreditCardFill,
  BsPlus,
  BsDash,
  BsCardChecklist,
  BsBell,
  BsArrowRightSquare,
  BsFillXCircleFill,
} from "react-icons/bs";
// React bootstrap end
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";
const emptyObj = {
  fname: "",
  lname: "",
  mobileNo: "",
  email: "",
  address: "",
  country: "",
  state: "",
  city: "",
  zip: "",
  type: "",
  emailVerified: "",
  sms_verify: "",
  twofa_status: "",
  twofa_verification: "",
  withdrawalsStatus: "",
  remark: "",
};

export default function AllUserDetailPage(props) {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [openSidebar, setOpenSidebar] = useState(false);

  const {
    tickets,
    isSaved,
    updateUser,
    updateBalance,
    addUpdateBalance,
    fetchuserTransctionById,
    transactionById,
    fetchuserTransction,
    transaction,
    fetchuserReferal,
    referal,
    fetchUserDetails,
    userdetails,
  } = props;
  const [selected, setSelected] = useState(emptyObj);
  const [on, setOn] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const [addBalance, setAddBalance] = useState("");
  const [subBalance, setSubBalance] = useState("");
  const [description, setDescription] = useState("");

  const [ed, setEd] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchuserTransctionById(id);
    fetchuserTransction();
    fetchuserReferal(id);
    fetchUserDetails(id);
  }, []);

  useEffect(() => {
    const sel = tickets.filter((x) => x.id == id);
    if (sel.length > 0) {
      setSelected(sel[0]);
    }

    if (tickets.length === 0) {
      navigate("/all-users");
    }
  }, []);
  useEffect(() => {
    if (isSaved && on) {
      setEd("");
      // navigate("/all-users");
    }
  }, [isSaved]);

  const selectCountry = (val) => {
    setCountry(val);
  };
  const selectRegion = (val) => {
    setRegion(val);
  };
  console.log(transactionById);

  return (
    <>
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
                <h1>User Details</h1>
                <span>
                  {selected.fname
                    ? selected.fname.toUpperCase() +
                      " " +
                      selected.lname.toUpperCase()
                    : ""}
                </span>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">User Details</li>
                  </ol>
                </nav>
              </div>
              <section className="section dashboard">
                <Row className="row">
                  <Col lg={12} className="col-lg-12">
                    <Row className="row">
                      <Col lg={12} className="col-lg-12">
                        <Row className="row">
                          <Col
                            lg={4}
                            className="col-6 col-sm col-lg-4 col-md-4"
                          >
                            <Card className="card info-card sales-card">
                              <Card.Body className="card-body">
                                <h5 className="card-title">Balance</h5>
                                <div className="d-flex align-items-center">
                                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <BsCurrencyDollar />
                                  </div>
                                  <div className="ps-3">
                                    <h6>
                                      {selected.balance
                                        ? selected.balance.toLocaleString()
                                        : 0}
                                    </h6>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col
                            lg={4}
                            className="col-6 col-sm col-lg-4 col-md-4"
                          >
                            <Card className="card info-card sales-card">
                              <Link to={`/user/deposit/${selected.id}`}>
                                <Card.Body className="card-body">
                                  <h5 className="card-title">Deposits</h5>
                                  <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center iconOrangeBack">
                                      <BsWindowDock className="iconOrange" />
                                    </div>
                                    <div className="ps-3">
                                      <h6>
                                        ${" "}
                                        {transactionById?.deposit?.length
                                          ? transactionById.deposit
                                              .reduce(
                                                (acc, item) =>
                                                  acc + item.amount,
                                                0
                                              )
                                              ?.toLocaleString()
                                          : 0}
                                      </h6>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Link>
                            </Card>
                          </Col>
                          <Col
                            lg={4}
                            className="col-6 col-sm col-lg-4 col-md-4"
                          >
                            <Card className="card info-card sales-card">
                              <Link to={`/user/withdraw/${selected.id}`}>
                                <Card.Body className="card-body">
                                  <h5 className="card-title">Withdrawals</h5>
                                  <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center iconOrangeBack">
                                      <BsWindowDock className="iconOrange" />
                                    </div>
                                    <div className="ps-3">
                                      <h6>
                                        ${" "}
                                        {(
                                          userdetails?.data
                                            ?.total_transaction_withdraw ?? 0
                                        ).toLocaleString() ?? 0}
                                      </h6>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Link>
                            </Card>
                          </Col>
                          <Col
                            lg={4}
                            className="col-6 col-sm col-lg-4 col-md-4"
                          >
                            <Card className="card info-card sales-card">
                              <Link to={`/user/all/${selected.id}`}>
                                <Card.Body className="card-body">
                                  <h5 className="card-title">Transactions</h5>
                                  <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center iconGreenBack">
                                      <BsWindowDock className="iconGreen" />
                                    </div>
                                    <div className="ps-3">
                                      <h6>
                                        {(
                                          userdetails?.data
                                            ?.total_transaction ?? 0
                                        ).toLocaleString()}
                                      </h6>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Link>
                            </Card>
                          </Col>
                          <Col
                            lg={4}
                            className="col-6 col-sm col-lg-4 col-md-4"
                          >
                            <Card className="card info-card sales-card">
                              <Card.Body className="card-body">
                                <h5 className="card-title">Win Bonus</h5>
                                <div className="d-flex align-items-center">
                                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <BsFillWalletFill className="iconBlue" />
                                  </div>
                                  <div className="ps-3">
                                    <h6>
                                      {userdetails?.data?.totalWinCount ?? 0}
                                    </h6>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col
                            lg={4}
                            className="col-6 col-sm col-lg-4 col-md-4"
                          >
                            <Card className="card info-card sales-card">
                              <Card.Body className="card-body">
                                <h5 className="card-title">Total Buy Ticket</h5>
                                <div className="d-flex align-items-center">
                                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center iconOrangeBack">
                                    <BsFillWalletFill className="iconOrange" />
                                  </div>
                                  <div className="ps-3">
                                    <h6>
                                      {userdetails?.data?.total_buy_ticket ?? 0}
                                    </h6>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col
                            lg={4}
                            className="col-6 col-sm col-lg-4 col-md-4"
                          >
                            <Card className="card info-card sales-card">
                              <Card.Body className="card-body">
                                <h5 className="card-title">
                                  Total Buy Ticket in Amount
                                </h5>
                                <div className="d-flex align-items-center">
                                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center iconOrangeBack">
                                    <BsInfoSquare className="iconOrange" />
                                  </div>
                                  <div className="ps-3">
                                    <h6>
                                      {selected.totalTicketAmount
                                        ? selected.totalTicketAmount
                                        : 0}
                                    </h6>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col
                            lg={4}
                            className="col-6 col-sm col-lg-4 col-md-4"
                          >
                            <Card className="card info-card sales-card">
                              <Link to={`/winners/${selected.id}`}>
                                <Card.Body className="card-body">
                                  <h5 className="card-title">
                                    Total Win Ticket
                                  </h5>
                                  <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                      <BsStack />
                                    </div>
                                    <div className="ps-3">
                                      <h6>
                                        {userdetails?.data?.total_win_ticket ??
                                          0}
                                      </h6>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Link>
                            </Card>
                          </Col>
                          <Col
                            lg={4}
                            className="col-6 col-sm col-lg-4 col-md-4"
                          >
                            <Card className="card info-card sales-card">
                              <Link to={`/winners/${selected.id}`}>
                                <Card.Body className="card-body">
                                  <h5 className="card-title">
                                    Total Win Bonus
                                  </h5>
                                  <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center iconGreenBack">
                                      <BsStopCircle className="iconGreen" />
                                    </div>
                                    <div className="ps-3">
                                      <h6>
                                        {userdetails?.data?.totalWinAmount.toLocaleString() ??
                                          0}
                                      </h6>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Link>
                            </Card>
                          </Col>
                          {/* <Col lg={4} className="col-6 col-sm col-lg-4 col-md-4">
                            <Card className="card info-card revenue-card">
                              <Card.Body className="card-body">
                                <h5 className="card-title">Referred By</h5>
                                <div className="d-flex align-items-center">
                                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center iconGreenBack">
                                    <BsCurrencyDollar className="iconGreen" />
                                  </div>
                                  <div className="ps-3">
                                    <h6>N/A</h6>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col> */}
                          <Col
                            lg={4}
                            className="col-6 col-sm col-lg-4 col-md-4"
                          >
                            <Card className="card info-card revenue-card">
                              <Link to={"/user/referal/" + id}>
                                <Card.Body className="card-body">
                                  <h5 className="card-title">Total Referral</h5>
                                  <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center iconGreenBack">
                                      <BsEmojiSmile className="iconGreen" />
                                    </div>
                                    <div className="ps-3">
                                      <h6>
                                        {" "}
                                        {userdetails?.data?.referredUsers ?? 0}
                                      </h6>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Link>
                            </Card>
                          </Col>
                          <Col
                            lg={4}
                            className="col-6 col-sm col-lg-4 col-md-4"
                          >
                            <Card className="card info-card customers-card">
                              <Card.Body className="card-body">
                                <h5 className="card-title totalReferal">
                                  Total Referral Commissions
                                </h5>
                                <div className="d-flex align-items-center">
                                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                    <BsFillCreditCardFill />
                                  </div>
                                  <div className="ps-3">
                                    <h6>
                                      {selected?.commission_balance &&
                                        selected?.commission_balance.toFixed(2)}
                                    </h6>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </section>
              <section className="section">
                <Row className="row mb-4">
                  <Col
                    lg={12}
                    className="col-lg-12 d-flex justify-content-center align-items-center"
                  >
                    <a
                      className="btn btn-success me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#BalanceAdd"
                    >
                      <BsPlus /> Balance
                    </a>
                    <a
                      className="btn btn-primary me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#BalanceMinus"
                    >
                      <BsDash />
                      Balance
                    </a>
                    <Link
                      className="btn btn-info me-2"
                      to={`/login-logs/${selected.id}`}
                    >
                      <BsCardChecklist /> Logins
                    </Link>
                    <Link
                      className="btn btn-info me-2"
                      to={`/send-mail/${selected.id}`}
                    >
                      <BsBell />
                      <span style={{ marginLeft: "5px" }}>Notifications</span>
                    </Link>
                    {/* <a className="btn btn-warning me-2" href="all-users.html">
                      <BsArrowRightSquare />
                      <span style={{ marginLeft: "5px" }}>Login as User</span>

                    </a> */}
                    {/* <a className="btn btn-danger me-2" href="banned-users.html">
                      <BsFillXCircleFill />
                      <span style={{ marginLeft: "5px" }}>Ban User</span>

                    </a> */}
                  </Col>
                </Row>
                <Row className="row">
                  <Col lg={12} className="col-lg-12">
                    <Card className="card">
                      <Card.Body className="card-body pt-2">
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (id) {
                              updateUser(selected);
                              setOn(true);
                            }
                          }}
                        >
                          <Row className="row">
                            <Col lg={4} className="col-lg-4 col-md-4 mb-3">
                              <Form.Label
                                htmlFor="inputText"
                                className="col-form-label"
                              >
                                {" "}
                                First Name
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    fname: e.target.value,
                                  })
                                }
                                type="text"
                                value={
                                  selected.fname && selected.fname != undefined
                                    ? selected.fname
                                    : ""
                                }
                              ></Form.Control>
                            </Col>
                            <Col lg={4} className="col-lg-4 col-md-4 mb-3">
                              <Form.Label
                                htmlFor="inputText"
                                className="col-form-label"
                              >
                                Last Name
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    lname: e.target.value,
                                  })
                                }
                                value={
                                  selected.lname && selected.lname != undefined
                                    ? selected.lname
                                    : ""
                                }
                              ></Form.Control>
                            </Col>
                            <Col lg={4} className="col-lg-4 col-md-4 mb-3">
                              <Form.Label
                                htmlFor="inputText"
                                className="col-form-label"
                              >
                                Email
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    email: e.target.value,
                                  })
                                }
                                value={
                                  selected.email && selected.email != undefined
                                    ? selected.email
                                    : ""
                                }
                              ></Form.Control>
                            </Col>
                            <Col lg={4} className="col-lg-4 col-md-4 mb-3">
                              <Form.Label
                                htmlFor="inputText"
                                className="col-form-label"
                              >
                                Mobile Number
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    mobileNo: e.target.value,
                                  })
                                }
                                value={
                                  selected.mobileNo &&
                                  selected.mobileNo != undefined
                                    ? selected.mobileNo
                                    : ""
                                }
                              ></Form.Control>
                            </Col>
                            <Col lg={4} className="col-lg-4 col-md-4 mb-3">
                              <Form.Label
                                htmlFor="inputText"
                                className="col-form-label"
                              >
                                Address
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    address: e.target.value,
                                  })
                                }
                                value={
                                  selected.address &&
                                  selected.address != undefined
                                    ? selected.address
                                    : ""
                                }
                              ></Form.Control>
                            </Col>
                            <Col lg={4} className="col-lg-4 col-md-4 mb-3">
                              <Form.Label
                                htmlFor="inputText"
                                className="col-form-label"
                              >
                                Zip/Postal{" "}
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    zip: e.target.value,
                                  })
                                }
                                value={
                                  selected.zip && selected.zip != undefined
                                    ? selected.zip
                                    : ""
                                }
                              ></Form.Control>
                            </Col>
                          </Row>
                          <Row className="row">
                            <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                              <Form.Label
                                htmlFor="inputText"
                                className="col-form-label"
                              >
                                Country <span className="text-danger">*</span>
                              </Form.Label>
                              <CountryDropdown
                                className="form-control"
                                value={
                                  selected.country ? selected.country : country
                                }
                                onChange={(val, e) => (
                                  selectCountry(val),
                                  setSelected({
                                    ...selected,
                                    country: e.target.value,
                                  })
                                )}
                              />
                            </Col>
                            <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                              <Form.Label
                                htmlFor="inputText"
                                className="col-form-label"
                              >
                                State <span className="text-danger">*</span>
                              </Form.Label>

                              <RegionDropdown
                                className="form-control"
                                blankOptionLabel="Select State"
                                country={
                                  selected.country ? selected.country : country
                                }
                                value={selected.state ? selected.state : region}
                                onChange={(val, e) => (
                                  selectRegion(val),
                                  setSelected({
                                    ...selected,
                                    state: e.target.value,
                                  })
                                )}
                              />
                            </Col>

                            <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                              <Form.Label
                                htmlFor="inputText"
                                className="col-form-label"
                              >
                                City
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                type="text"
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    city: e.target.value,
                                  })
                                }
                                value={
                                  selected.city &&
                                  selected.city != undefined &&
                                  selected.city != null
                                    ? selected.city
                                    : ""
                                }
                              ></Form.Control>
                            </Col>
                          </Row>
                          <Row className="row">
                            <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                              <Form.Label
                                htmlFor="inputText"
                                className="col-form-label"
                              >
                                Email Verification{" "}
                              </Form.Label>
                              <Form.Check
                                type="switch"
                                disabled
                                id="flexSwitchCheckDefault"
                                checked={selected.emailVerified}
                                // onChange={(e) =>
                                //   setSelected({
                                //     ...selected,
                                //     emailVerified: e.target.checked ? 1 : 0,
                                //   })
                                // }
                              />
                            </Col>
                            <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                              <Form.Label
                                htmlFor="inputText"
                                className="col-form-label"
                              >
                                Mobile Verification
                              </Form.Label>
                              <Form.Check
                                type="switch"
                                id="flexSwitchCheckDefault"
                                checked={selected.sms_verify}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    sms_verify: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </Col>
                            {/* <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                              <Form.Label htmlFor="inputText" className="col-form-label">2FA Verification</Form.Label>
                              <Form.Check type="switch" id="flexSwitchCheckDefault" checked={selected.twofa_status} onChange={(e) =>
                                setSelected({
                                  ...selected,
                                  twofa_status: e.target.checked ? 1 : 0
                                })
                              } />
                            </Col> */}
                            <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                              <Form.Label
                                htmlFor="inputText"
                                className="col-form-label"
                              >
                                KYC
                              </Form.Label>
                              <Form.Check
                                type="switch"
                                id="flexSwitchCheckDefault"
                                checked={selected.twofa_verification}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    twofa_verification: e.target.checked
                                      ? 1
                                      : 0,
                                  })
                                }
                              />
                            </Col>
                            <Col lg={3} className="col-lg-3 col-md-3 mb-3">
                              <Form.Label
                                htmlFor="inputText"
                                className="col-form-label"
                              >
                                Withdrawals
                              </Form.Label>
                              <Form.Check
                                type="switch"
                                id="flexSwitchCheckDefault"
                                checked={selected.withdrawalsStatus}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    withdrawalsStatus: e.target.checked ? 1 : 0,
                                  })
                                }
                              />
                            </Col>
                          </Row>
                          <Row className="row">
                            <Col lg={12} className="col-lg-12">
                              <Button
                                variant="success"
                                type="submit"
                                className="btn btn-success btn-sm px-4"
                              >
                                Save
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>{" "}
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
              <div
                className="modal fade"
                id="BalanceAdd"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <Modal.Dialog className="modal-dialog">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (id) {
                        updateUser(selected);
                        setOn(true);
                      }
                    }}
                  >
                    <div className="modal-content">
                      <Modal.Header className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          <Modal.Title>Add Balance</Modal.Title>
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </Modal.Header>
                      <Modal.Body className="modal-body">
                        <div className="form-group">
                          <Form.Label>
                            Amount <sanp className="text-danger">*</sanp>
                          </Form.Label>
                          <div className="input-group">
                            <Form.Control
                              type="number"
                              step="any"
                              name="amount"
                              required="required"
                              placeholder="Please provide positive amount"
                              id="amount"
                              onChange={(e) => {
                                setAddBalance(e.target.value);
                              }}
                            />
                            <div className="input-group-text">USD</div>
                          </div>
                        </div>
                        <div className="form-group">
                          <Form.Label>
                            Remark <sanp className="text-danger">*</sanp>
                          </Form.Label>

                          <div className="input-group">
                            <textarea
                              className="form-control"
                              rows="4"
                              value={description}
                              cols="10"
                              placeholder="Remark"
                              onChange={(e) =>
                                // setSelected({
                                //   ...selected,
                                //   remark: e.target.value,
                                // })
                                setDescription(e.target.value)
                              }
                            ></textarea>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          // type="submit"
                          data-bs-dismiss="modal"
                          className="btn btn-primary w-100"
                          onClick={() => {
                            addUpdateBalance(
                              {
                                transactionType: "AdminDeposit",
                                amount: addBalance,
                                userId: selected.id,
                                sender: "Admin",
                                receiver: `${selected.fname} ${selected.lname}`,
                                description: "Added By Admin",
                              },
                              token
                            );
                          }}
                        >
                          Submit
                        </button>
                      </Modal.Footer>
                    </div>
                  </Form>
                </Modal.Dialog>
              </div>
              <div
                className="modal fade"
                id="BalanceMinus"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <Modal.Dialog className="modal-dialog">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (id) {
                        updateUser(selected);
                        setOn(true);
                      }
                    }}
                  >
                    <div className="modal-content">
                      <Modal.Header className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          <Modal.Title>Subtract Balance</Modal.Title>
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </Modal.Header>
                      <Modal.Body className="modal-body">
                        <div className="form-group">
                          <Form.Label>
                            Amount <sanp className="text-danger">*</sanp>
                          </Form.Label>
                          <div className="input-group">
                            <Form.Control
                              type="number"
                              step="any"
                              name="amount"
                              placeholder="Please provide positive amount"
                              required="required"
                              id="amount"
                              onChange={(e) => {
                                // setSelected({
                                //   ...selected,
                                //   type: "substract",
                                //   balance: e.target.value,
                                // });
                                setSubBalance(e.target.value);
                              }}
                            />
                            <div className="input-group-text">USD</div>
                          </div>
                        </div>
                        <div className="form-group">
                          <Form.Label>
                            Remark <sanp className="text-danger">*</sanp>
                          </Form.Label>

                          <div className="input-group">
                            <textarea
                              className="form-control"
                              rows="4"
                              cols="10"
                              value={description}
                              placeholder="Remark"
                              onChange={(e) =>
                                // setSelected({
                                //   ...selected,
                                //   remark: e.target.value,
                                // })
                                setDescription(e.target.value)
                              }
                            ></textarea>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          // type="submit"
                          data-bs-dismiss="modal"
                          className="btn btn-primary w-100"
                          onClick={() => {
                            updateBalance({
                              transactionType: "AdminWithdraw",
                              amount: subBalance,
                              userId: selected.id,
                              sender: `${selected.fname} ${selected.lname}`,
                              receiver: "User",
                              description: "Deducted By Admin",
                            });
                          }}
                        >
                          Submit
                        </button>
                      </Modal.Footer>
                    </div>
                  </Form>
                </Modal.Dialog>
              </div>
            </main>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
}
