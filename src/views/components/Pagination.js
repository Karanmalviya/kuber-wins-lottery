import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "../../hooks/usePagination";
import { Link } from "react-router-dom";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
      <ul
        className={classnames("pagination justify-content-center", {
          [className]: className,
        })}
      >
        <li
          className={classnames("page-item", {
            disabled: currentPage === 1,
          })}
          onClick={currentPage !== 1 ? onPrevious : ""}
        >
          <Link className="page-link" to={"#"}>&laquo;</Link>
        </li>
        {paginationRange.map((pageNumber, i) => {
          if (pageNumber === DOTS) {
            return <li className="page-item dots"><Link className="page-link" to={"#"}>&#8230;</Link></li>;
          }

          return (
            <li
              key={i}
              className={classnames("page-item", {
                active: pageNumber === currentPage,
              })}
              onClick={() => onPageChange(pageNumber)}
            >
              <Link className="page-link" to={"#"}>{pageNumber}</Link>
            </li>
          );
        })}
        <li
          className={classnames("page-item", {
            disabled: currentPage === lastPage,
          })}
          onClick={currentPage !== lastPage ? onNext : ""}
        >
          <Link className="page-link" to={"#"}>&raquo;</Link>
        </li>
      </ul>
  );
};

export default Pagination;
