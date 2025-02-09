import React, { useState } from "react";

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const getCurrentPageData = () => {
    const offset = currentPage * itemsPerPage;
    const currentPageData = data.slice(offset, offset + itemsPerPage);
    return { currentPageData, offset };
  };

  const pageCount = Math.ceil(data.length / itemsPerPage);

  return {
    currentPage,
    handlePageChange,
    getCurrentPageData,
    pageCount,
  };
};

export default usePagination;
