import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  onChangePage: (page: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      containerClassName={styles.root}
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      forcePage={currentPage}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
