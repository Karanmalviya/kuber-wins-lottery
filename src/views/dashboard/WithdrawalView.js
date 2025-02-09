import React, {useState, useEffect} from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import "../../styles/paymentModal.css";
import {decrypt} from "../../utils/encryptdecrypt";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserWithDrawal} from "../../features/apiSlice";
import MiniLoader from "../components/MiniLoader";

export default function WithdrawalView() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const userId = localStorage.getItem("userId");
  const [withdrawal, setWithdrawal] = useState([]);
  let loc_id;
  const users = useSelector((state) => state.api.user);
  const UserWithDrawal = useSelector((state) => state.api.withdrawal);
  const UserWithDrawalLoading = useSelector(
    (state) => state.api.withdrawalLoading
  );

  try {
    loc_id = decrypt(id);
  } catch (error) {}

  useEffect(() => {
    dispatch(fetchUserWithDrawal(userId));
  }, [dispatch]);

  useEffect(() => {
    if (UserWithDrawal.length) {
      setWithdrawal(UserWithDrawal);
    }
  }, [UserWithDrawal]);

  return (
    <>
      <title>Deposites - Kuber Wins</title>
      <Navbar props={{mainPage: "dashboard", subPage: "view"}} />
      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"deposit"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-table p-0">
                    <div className="card-header py-3 px-4">
                      <h5 className="mb-0 fs-5">Withdrawal Details</h5>
                    </div>
                    <div className="card-body p-0 table-responsive">
                      <table className="table table-bordered withdraw-table">
                        <thead></thead>
                        {withdrawal.map(
                          (item, index) =>
                            item?.id == loc_id && (
                              <tbody key={index}>
                                <tr>
                                  <td>
                                    <div
                                      style={{
                                        float: "left",
                                        marginLeft: "30px",
                                      }}
                                    >
                                      Account Holder Name :
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{float: "left"}}>
                                      {item?.Account_Holder_Name}
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      style={{
                                        float: "left",
                                        marginLeft: "30px",
                                      }}
                                    >
                                      Account Number :
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{float: "left"}}>
                                      {item?.Account_Number}
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      style={{
                                        float: "left",
                                        marginLeft: "30px",
                                      }}
                                    >
                                      IFSC Code :
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{float: "left"}}>
                                      {item?.IFSC_Number}
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      style={{
                                        float: "left",
                                        marginLeft: "30px",
                                      }}
                                    >
                                      Pan Card :
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{float: "left"}}>
                                      {item?.PanCard_No}
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      style={{
                                        float: "left",
                                        marginLeft: "30px",
                                      }}
                                    >
                                      Type of Account :
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{float: "left"}}>
                                      {item?.Type_of_account}
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    {" "}
                                    <div
                                      style={{
                                        float: "left",
                                        marginLeft: "30px",
                                      }}
                                    >
                                      Amount :
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{float: "left"}}>
                                      ${(+item?.Amount).toLocaleString()}
                                    </div>
                                  </td>
                                </tr>{" "}
                                <tr>
                                  <td>
                                    {" "}
                                    <div
                                      style={{
                                        float: "left",
                                        marginLeft: "30px",
                                      }}
                                    >
                                      Wallet Amount :
                                    </div>
                                  </td>
                                  <td>
                                    {" "}
                                    <div style={{float: "left"}}>
                                      ${users?.balance?.toLocaleString()}
                                    </div>
                                  </td>
                                </tr>{" "}
                                <tr>
                                  <td>
                                    <div
                                      style={{
                                        float: "left",
                                        marginLeft: "30px",
                                      }}
                                    >
                                      Withdrawal Request Date :
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{float: "left"}}>
                                      {new Date(
                                        item?.createdAt
                                      ).toLocaleString()}
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      style={{
                                        float: "left",
                                        marginLeft: "30px",
                                      }}
                                    >
                                      Transaction ID :
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{float: "left"}}>
                                      {item?.status
                                        ? item?.status === 2
                                          ? "Withdrawal Rejected"
                                          : item?.status === 0
                                          ? "Pending"
                                          : item?.tansactionId
                                        : "Pending"}{" "}
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      style={{
                                        float: "left",
                                        marginLeft: "30px",
                                      }}
                                    >
                                      Status :
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{float: "left"}}>
                                      {item.status == 0 ? (
                                        <span className="badge rounded-pill bg-primary ">
                                          Pending
                                        </span>
                                      ) : item.status == 1 ? (
                                        <span className="badge rounded-pill bg-success ">
                                          Approved
                                        </span>
                                      ) : (
                                        <span className="badge rounded-pill bg-danger">
                                          Rejected
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            )
                        )}
                      </table>
                      <div className="py-3">
                        {UserWithDrawalLoading && <MiniLoader />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer props={""} />
    </>
  );
}
