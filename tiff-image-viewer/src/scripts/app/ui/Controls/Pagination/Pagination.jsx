import React from 'react';
import PropTypes from 'prop-types';
import { useControls } from "react-zoom-pan-pinch";
import "./Pagination.css";

const Pagination = (props) => {
  const { resetTransform } = useControls();
  const fa = "fa-solid fa-circle-arrow-";
  const cssClasses = `${fa}${props.direction} ${props.disabled ? 'disabled' : ''}`;

  return (
    <i
      className={cssClasses}
      onClick={() => {
        props.clickHandler();
        resetTransform();
      }}
    ></i>
  );
};

Pagination.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  disabled: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired
};

export default Pagination;