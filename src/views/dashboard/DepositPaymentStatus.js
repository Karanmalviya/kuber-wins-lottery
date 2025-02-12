import React from "react";

export default function DepositesPaymentStatus({ getAccountDetailsByIdData }) {
  const depositData = getAccountDetailsByIdData?.admin_account;

  return (
    <div className="card card-table p-0">
      <div className="card-header py-3 px-4">
        <h5 className="mb-0 fs-5">Deposites Details</h5>
      </div>
      <div className="row px-4 pt-4 pb-2">
        <div className="col-12 border-end">
          <div className="d-flex">
            <div className="fw-bold">Payment Mode</div>&nbsp;:{" "}
            {getAccountDetailsByIdData?.payment_method?.toUpperCase()} Transfer
          </div>
          <div className="mt-2 d-flex">
            <div className="fw-bold">UPI/Bank details</div>&nbsp;:{" "}
            {getAccountDetailsByIdData?.payment_method === "upi" &&
              depositData?.upi_id}
            {getAccountDetailsByIdData?.payment_method === "bank" && (
              <ul>
                <li>
                  Account Holder Name : {depositData?.account_holder_name}
                </li>
                <li>Bank Name : {depositData?.bank_name}</li>
                <li>Account Type : {depositData?.account_type}</li>
                <li>Account Number : {depositData?.account_number}</li>
                <li>IFSC Code : {depositData?.ifsc_code}</li>
              </ul>
            )}
          </div>
          <div className="mt-2 d-flex">
            <div className="fw-bold">Amount</div>&nbsp;: Rs.
            {getAccountDetailsByIdData?.amount?.toLocaleString()}
          </div>
          <div className="mt-2 d-flex">
            <div className="fw-bold">Payment Status</div>&nbsp;:{" "}
            {getAccountDetailsByIdData?.status === 1
              ? "Request Generated"
              : getAccountDetailsByIdData?.status === 2
              ? "Approved"
              : "Rejected"}
          </div>
          <div className="mt-2 d-flex">
            <div className="fw-bold">Status Updated</div>&nbsp;:{" "}
            {getAccountDetailsByIdData?.updatedAt}
          </div>
          <div className="mt-2 d-flex">
            <div className="fw-bold">Date & Time</div>&nbsp;:{" "}
            {depositData?.updatedAt}
          </div>
          <div className="mt-2 d-flex">
            <div className="fw-bold">Screenshot</div>&nbsp;:{" "}
            <a target="_blank" href={getAccountDetailsByIdData?.image}>
              [View]
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
