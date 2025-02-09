import React, {useState, useEffect} from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";

import LoadingSpinner from "../components/LoadingSpinner";

export default function KYC({props}) {
  const [loading, setLoading] = useState(false);

  const [accountDetails, setAccountDetails] = useState({
    Account_Holder_Name: "",
    Account_Number: "",
    Type_of_account: "",
    IFSC_Number: "",
    PanCard_No: "",
    Amount: "",
  });
  const contactChange = (e) => {
    const {name, value} = e.target;
    setAccountDetails({
      ...accountDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <title>Withdrawal - Kuber Wins</title>

      <Navbar props={{mainPage: "dashboard", subPage: ""}} />

      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"kyc"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <section className="sec-second pb-4">
                  <div className="container">
                    <h2 className="mt-4 mb-4 sec-heading text-center">KYC</h2>
                    {/* <div className="row d-flex justify-content-center align-items-center">
                      <form className="col-lg-12" onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                autofocus
                                id="txtFirstName"
                                placeholder=" "
                                name="Account_Holder_Name"
                                pattern="[a-zA-Z]+([\s][a-zA-Z]+)*"
                                onChange={contactChange}
                                value={contactChange.Account_Holder_Name}
                              />
                              <label for="txtFirstName">
                                Account Holder's Name
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                min={0}
                                className="form-control"
                                id="txtLastName"
                                placeholder=" "
                                name="Account_Number"
                                onChange={contactChange}
                                pattern="[0-9]*"
                                title="Please enter numbers only"
                                value={contactChange.Account_Number}
                              />
                              <label for="txtLastName">Account Number</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                autofocus
                                id="txtFirstName"
                                placeholder=" "
                                name="IFSC_Number"
                                onChange={contactChange}
                                value={accountDetails.IFSC_Number}
                              />
                              <label for="txtFirstName">IFSC Code</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="txtLastName"
                                placeholder=" "
                                name="PanCard_No"
                                onChange={contactChange}
                                value={accountDetails.PanCard_No}
                              />
                              <label for="txtLastName">Pan Card Number</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-floating mb-3">
                              <select
                                className="form-control form-select form-select-md mb-3"
                                autofocus
                                id="txtEmail"
                                placeholder=" "
                                name="Type_of_account"
                                aria-label="form-select-sm example"
                                onChange={contactChange}
                                value={accountDetails.Type_of_account}
                              >
                                <option selected></option>
                                <option value="Saving">Saving</option>
                                <option value="Current">Current</option>
                                <option value="Fixed">Fixed</option>
                              </select>
                              <label for="txtEmail">Type of Account</label>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                autofocus
                                min={1}
                                id="txtEmail"
                                placeholder=" "
                                name="Amount"
                                onChange={contactChange}
                              />
                              <label for="txtEmail">Amount</label>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <button
                              className="btn btn-info rounded-0 w-100 text-white border-0 py-2"
                              onClick={() => handleSubmit}
                            >
                              SUBMIT
                            </button>
                          </div>
                        </div>
                      </form>
                    </div> */}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer props={""} />
    </>
  );
}
