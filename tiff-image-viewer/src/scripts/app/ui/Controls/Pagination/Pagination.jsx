import React from 'react';
import PropTypes from 'prop-types';
import "./Pagination.css";

const Pagination = ({ direction, disabled, onClick }) => {
  const fa = "fa-solid fa-circle-arrow-";
  const cssClasses = `${fa}${direction} ${disabled ? 'disabled' : ''}`;

  return (
    <i
      className={cssClasses}
      onClick={onClick}
    ></i>
  );
};

Pagination.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Pagination;