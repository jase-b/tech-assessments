import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const App = () => {
  const [tiff, setTiff] = useState(null);
  const [currentPage, setCurrentPage] = useState((tiff?.currentDirectory() || 0) + 1);
  const [totalPages, setTotalPages] = useState(0);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      file.arrayBuffer().then(buffer => {
        const tiff = new Tiff({ buffer });

        setTiff(tiff);
        console.log(tiff?.currentDirectory())
        totalPages === 0 && setTotalPages(tiff.countDirectory());
      })
    }
  };

  const addTiffCanvastoPage = () => {
    const canvas = document.querySelector('.canvas');

    canvas.textContent = '';
    canvas.append(tiff.toCanvas());
  };

  const setPageNumber = (pageNum) => {
    tiff.setDirectory(pageNum - 1);
    setCurrentPage(pageNum);
    addTiffCanvastoPage();
  };

  useEffect(() => {
    if (tiff) {
      addTiffCanvastoPage();
    }
  }, [tiff]);

  return (
    <>
      <header></header>
      <main>
        {!tiff ? (
          <label className='drop-zone' htmlFor='file-input'>
            <p className='drop-zone__text'>Click to Upload</p>
            <input aria-label="file-input" id='file-input' onChange={handleFileInputChange} type='file' />
          </label>
        ) : <div className='canvas'></div>}
        <div className='buttons-wrapper'>
          <i className={["fa-solid", "fa-circle-arrow-left", currentPage === 1 ? 'disabled' : ''].join(" ")} onClick={() => currentPage > 1 && setPageNumber(currentPage - 1)}></i>
          <p className='page-tracker'>Page {currentPage} / {totalPages}</p>
          <i className={['fa-solid ', 'fa-circle-arrow-right', currentPage === totalPages ? 'disabled' : ''].join(" ")} onClick={() => currentPage < totalPages && setPageNumber(currentPage + 1)}></i>
        </div>
      </main>
    </>
  );
};

export default App;