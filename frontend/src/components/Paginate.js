import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ numberOfPages, page, keyword = '', sort = '' }) => {
  if (numberOfPages <= 1) return null;
  return (
    <Pagination className='justify-content-center my-3'>
      {console.log("paginate")}
      {console.log(sort)}
      {[...Array(numberOfPages).keys()].map((p) => (
        <LinkContainer key={p} to={
          keyword && sort
            ? `/search/${keyword}/page/${p + 1}/sort/${sort}`
            : keyword ? `/search/${keyword}/page/${p + 1}` : sort ? `/sort/${sort}/page/${p + 1}`
              : `/page/${p + 1}`
        }>
          <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
        </LinkContainer>

      ))}
    </Pagination>

  );
}

export default Paginate