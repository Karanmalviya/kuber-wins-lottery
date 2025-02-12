import React, { useState } from "react";

export default function Deposit() {
  const [currentPage1, setCurrentPage1] = useState(0);
  const [commissionDeposit, setCommissionDeposit] = useState([]);

  const itemsPerPage = 10;

  const offset1 = currentPage1 * itemsPerPage;

  const currentPageData1 = commissionDeposit?.slice(
    offset1,
    offset1 + itemsPerPage
  );
  const handlePageChange1 = (selectedPage) => {
    setCurrentPage1(selectedPage.selected);
  };
  return (
    <div
      className="tab-pane fade active show"
      id="pills-deposit-commission"
      role="tabpanel"
      aria-labelledby="pills-deposit-commission-tab"
    >
      <div className="card card-table p-0">
        <div className="card-header py-3 px-4">
          <h5 className="mb-0 fs-5">Deposit Commissions</h5>
        </div>
        <div className="card-body p-0 table-responsive">
          <table className="table table-bordered withdraw-table">
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Commision From</th>
                <th>Comission Level</th>
                <th>Amount</th>
                <th>Title</th>
                <th>Transaction</th>
              </tr>
            </thead>

            <tbody>
              {currentPageData1 && currentPageData1.length > 0 ? (
                currentPageData1.map((item, i) => (
                  <tr key={item.id} className="acc">
                    <td>{offset1 + i + 1}</td>
                    <td>{item?.referralName}</td>
                    <td>Level {item?.level}</td>
                    <td>Rs.{item?.amount}</td>
                    <td>Deposit Commission</td>
                    <td>{item?.randomNo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No Data Found</td>
                </tr>
              )}
            </tbody>
            <tfoot
              hidden={commissionDeposit.length > itemsPerPage ? false : true}
            >
              <ReactPaginate
                previousLabel={currentPage1 === 0 ? null : "Previous"}
                nextLabel={
                  currentPage1 ===
                  Math.ceil(commissionDeposit.length / itemsPerPage) - 1
                    ? null
                    : "Next"
                }
                breakLabel="..."
                breakClassName="break-me"
                pageCount={Math.ceil(commissionDeposit.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange1}
                containerClassName="pagination"
                activeClassName="active"
                previousClassName={currentPage1 === 0 ? "pagniation-none" : ""}
                nextClassName={
                  currentPage1 ===
                  Math.ceil(commissionDeposit.length / itemsPerPage) - 1
                    ? "pagniation-none"
                    : ""
                }
              />{" "}
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
