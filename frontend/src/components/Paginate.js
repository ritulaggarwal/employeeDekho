import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ numberOfPages, page, keyword = '' }) => {
  if (numberOfPages <= 1) return null;
  return (
    <Pagination className='justify-content-center my-3'>
      {[...Array(numberOfPages).keys()].map((p) => (
        <LinkContainer key={p} to={
          keyword
            ? `/search/${keyword}/page/${p + 1}`
            : `/page/${p + 1}`
        }>
          <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
        </LinkContainer>

      ))}
    </Pagination>

  );
}

export default Paginate