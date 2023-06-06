import React from 'react';

import ReactPaginate from 'react-paginate';

import style from './Paginate.module.scss';

type PaginationProps = {
  setPage:(page:number) => void
}

const Paginate:React.FC<PaginationProps> =  function({ setPage }) {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => setPage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
    />
  );
}
export default Paginate;