import React from 'react';
import PropTypes from 'prop-types';
import "./DropZone.css";

const DropZone = (props) => (
  <label className='drop-zone' htmlFor='file-input'>
    <div className='drop-zone__content-wrapper'>
      <p className='drop-zone__text'>Click to Upload</p>
      <i className="fa-solid fa-upload"></i>
    </div>
    <input
      accept="image/tiff"
      aria-label="file-input"
      id='file-input'
      onChange={props.dropZonehandler}
      type='file'
    />
  </label>
);

DropZone.propTypes = {
  dropZonehandler: PropTypes.func.isRequired
};

export default DropZone;