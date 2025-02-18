import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// page imports start
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
// page imports end

// React bootstrap start
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowDownUp } from "react-icons/bs";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
// React bootstrap end
import Loader from "../../component/Loader";
import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
import "../../style/reactConfirm.css";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";

export default function DepositDetailsPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    fetchwithdrawal,
    isLoading,
    fetchDepositsById,
    depositsById,
    updateDeposit,
    isSaved,
  } = props;

  useEffect(() => {
    fetchDepositsById(id);
  }, [fetchwithdrawal]);

  const handleUpdateStatus = async (status, userId) => {
    confirmAlert({
      title: "Confirm to submit",
      message:
        status === "Approved"
          ? "Are you sure to approve."
          : "Are you sure to reject.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            status === "Approved"
              ? updateDeposit({ status: "Approved", userId })
              : updateDeposit({ status: "Rejected", userId }),
        },
        {
          label: "No",
        },
      ],
    });
  };

  useEffect(() => {
    if (isSaved) {
      navigate("/deposit-list");
    }
  }, [isSaved]);

  console.log(depositsById);

  return (
    <>
      <ToastContainer />
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
                <h1>Deposits</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Deposits</li>
                  </ol>
                </nav>
              </div>

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title">Deposits Details</h5>

                        <div className="table-responsive">
                          <Table
                            id="basic-6"
                            className="display tbl-ltr lotteriesTable"
                          >
                            <thead className="lotteriesTableHead">
                              <tr className="tableTd">
                                <th>
                                  Account{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>Details</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Account Holder Name : </td>
                                <td>
                                  {
                                    depositsById?.admin_account
                                      ?.account_holder_name
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Account Number : </td>
                                <td>
                                  {depositsById?.admin_account?.account_number}
                                </td>
                              </tr>
                              <tr>
                                <td>IFSC Code :</td>
                                <td>
                                  {depositsById?.admin_account?.ifsc_code}
                                </td>
                              </tr>
                              <tr>
                                <td>Amount :</td>
                                <td>Rs. {depositsById?.amount}</td>
                              </tr>
                              <tr>
                                <td>Name :</td>
                                <td>
                                  {depositsById?.User?.fname}{" "}
                                  {depositsById?.User?.lname} (
                                  {depositsById?.User?.userName})
                                </td>
                              </tr>
                              <tr>
                                <td>Email :</td>
                                <td>{depositsById?.User?.email}</td>
                              </tr>
                              <tr>
                                <td>Payment Method :</td>
                                <td>
                                  {depositsById?.payment_method
                                    ? depositsById?.payment_method + " Transfer"
                                    : "Payment is pending"}
                                </td>
                              </tr>

                              <tr>
                                <td>Status :</td>
                                {depositsById?.status === 0 && (
                                  <td>
                                    <span className="badge rounded-pill bg-primary">
                                      Payment is pending from user side
                                    </span>
                                  </td>
                                )}
                                {depositsById?.status === 1 && (
                                  <td>
                                    <button
                                      className="btn btn-outline-success mx-1 rounded-pill btn-sm"
                                      onClick={() =>
                                        handleUpdateStatus(
                                          "Approved",
                                          depositsById?.UserId
                                        )
                                      }
                                    >
                                      Approve
                                    </button>
                                    <button
                                      className="btn btn-outline-danger mx-1 rounded-pill btn-sm"
                                      onClick={() =>
                                        handleUpdateStatus(
                                          "Rejected",
                                          depositsById?.UserId
                                        )
                                      }
                                    >
                                      Reject
                                    </button>
                                  </td>
                                )}
                                {depositsById?.status === 2 && (
                                  <td>
                                    <span className="badge rounded-pill bg-success">
                                      Approved
                                    </span>
                                  </td>
                                )}
                                {depositsById?.status === 3 && (
                                  <td>
                                    <span className="badge rounded-pill bg-danger">
                                      Rejected
                                    </span>
                                  </td>
                                )}
                              </tr>
                              <tr>
                                <td>Screenshot :</td>
                                <td>
                                  {depositsById?.image ? (
                                    <a
                                      href={depositsById?.image}
                                      target="_blank"
                                    >
                                      <img
                                        src={depositsById?.image}
                                        className="img-fluid"
                                        style={{
                                          borderRadius: "0px",
                                          width: "auto",
                                          height: "400px",
                                        }}
                                      />
                                    </a>
                                  ) : (
                                    "Not Uploaded"
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>
            </main>
            <FooterPageContainer />{" "}
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
    </>
  );
}
