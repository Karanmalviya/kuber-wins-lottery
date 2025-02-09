import React from "react";
import { Pagination } from "@mui/material";

export default function MuiPagination({
  setPageSize,
  handlePage,
  totalPages,
  page,
}) {
  return (
    <div className="row mb-2">
      <div className="col-lg-6 col-md-6">
        <div className="d-flex ms-4">
          <label>Rows per page:</label>
          <select
            className="form-select form-select-sm w-25 ms-3"
            onChange={(e) => setPageSize(e.target.value)}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6 col-md-6">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePage}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
}
