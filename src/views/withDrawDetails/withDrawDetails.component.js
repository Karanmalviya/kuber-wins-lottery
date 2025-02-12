import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

export default function WithdrawalsDetails(props) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const {
    withdrawal,
    fetchwithdrawal,
    isLoading,
    updateStatus,
    createWithDraw,
  } = props;
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);
  const withdrawal_id = location.state.withdrawId;
  const UserId = location.state.withdrawUserId;

  const [data, setData] = useState("");
  const [btndisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    fetchwithdrawal();
  }, [fetchwithdrawal]);

  useEffect(() => {
    const filteredData = withdrawal.filter((item) => {
      return item.id == withdrawal_id;
    });
    setData(filteredData);
  }, [withdrawal, withdrawal_id]);

  function generateTransactionId() {
    const random = Math.random().toString(36).substring(2, 16);
    const timestamp = Date.now().toString(36).substring(3, 16);
    const id = `${random}${timestamp}`.toUpperCase();
    return id;
  }

  const handleStatus = async (
    status,
    UserId,
    transactionId,
    amount,
    trx_id
  ) => {
    confirmAlert({
      title: "Confirm to submit",
      message:
        Number(status) === 1
          ? "Are you sure to approve."
          : "Are you sure to reject.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            Number(status) === 1
              ? handleApproved(status, UserId, transactionId, amount, trx_id)
              : handleReject(status, UserId, transactionId, amount, trx_id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleApproved = async (
    status,
    UserId,
    transactionId,
    amount,
    trx_id
  ) => {
    if (data[0]?.User.balance >= data[0]?.Amount) {
      const res = await createWithDraw({
        transactionType: "Withdraw",
        amount: amount,
        tansactionId: transactionId,
        userId: UserId,
        withdrawalId: trx_id,
      })
        .then((response) => {
          if (response) {
            updateStatus(
              {
                status: status,
                ...(admin.role === "sub-admin" ? { roleId: admin.id } : {}),
              },
              withdrawal_id
            );
            setBtnDisabled(true);
            setTimeout(() => {
              navigate("/all-withdrawals");
            }, 2000);
          }
        })
        .catch((error) => {});
    } else {
      alert("User has Insufficient Balance");
    }
  };
  const handleReject = async (status) => {
    updateStatus(
      {
        status: status,
        ...(admin.role === "sub-admin" ? { roleId: admin.id } : {}),
      },
      withdrawal_id
    );
    setBtnDisabled(true);
    setTimeout(() => {
      navigate("/all-withdrawals");
    }, 2000);
  };

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
                <h1>WithDrawals</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">WithDrawals</li>
                  </ol>
                </nav>
              </div>

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title">WithDrawal Details</h5>

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
                                <td>{data[0]?.Account_Holder_Name}</td>
                              </tr>
                              <tr>
                                <td>Account Number : </td>
                                <td>{data[0]?.Account_Number}</td>
                              </tr>
                              <tr>
                                <td>IFSC Code :</td>
                                <td>{data[0]?.IFSC_Number}</td>
                              </tr>
                              <tr>
                                <td>Amount :</td>
                                <td>Rs.{data[0]?.Amount?.toLocaleString()}</td>
                              </tr>
                              <tr>
                                <td>Total Wallet Amount :</td>
                                <td>
                                  Rs.{data[0]?.User?.balance?.toLocaleString()}
                                </td>
                              </tr>
                              <tr>
                                <td>Email :</td>
                                <td>{data[0]?.Email}</td>
                              </tr>
                              <tr>
                                <td>Pan Card Number :</td>
                                <td>{data[0]?.PanCard_No}</td>
                              </tr>
                              <tr>
                                <td>Transaction Id :</td>
                                <td>
                                  {data[0]?.status
                                    ? data[0]?.status === 2
                                      ? "Withdrawal Rejected"
                                      : data[0]?.status === 0
                                      ? "Pending"
                                      : data[0]?.tansactionId
                                    : "Pending"}
                                </td>
                              </tr>
                              <tr>
                                <td>Status :</td>
                                <td
                                  hidden={
                                    data &&
                                    data[0] &&
                                    data.length > 0 &&
                                    data[0]?.status == 1
                                      ? true
                                      : false || data[0]?.status == 2
                                      ? true
                                      : false
                                  }
                                >
                                  {" "}
                                  <button
                                    disabled={btndisabled ? true : false}
                                    className="btn btn-outline-success mx-1 rounded-pill btn-sm"
                                    onClick={() =>
                                      handleStatus(
                                        "1",
                                        Number(UserId),
                                        generateTransactionId(),
                                        data[0]?.Amount,
                                        data[0]?.id
                                      )
                                    }
                                  >
                                    Approve
                                  </button>
                                  <button
                                    disabled={btndisabled ? true : false}
                                    className="btn btn-outline-danger mx-1 rounded-pill btn-sm"
                                    onClick={() => handleStatus("2")}
                                  >
                                    Reject
                                  </button>
                                </td>
                                <td
                                  hidden={
                                    data &&
                                    data[0] &&
                                    data.length > 0 &&
                                    data[0].status == 1
                                      ? false
                                      : true
                                  }
                                >
                                  <span className="badge rounded-pill bg-success">
                                    Approved
                                  </span>
                                </td>
                                <td
                                  hidden={
                                    data &&
                                    data[0] &&
                                    data.length > 0 &&
                                    data[0].status == 2
                                      ? false
                                      : true
                                  }
                                >
                                  <span className="badge rounded-pill bg-danger">
                                    Rejected
                                  </span>
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
