import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import './App.css';

const App = () => {
  const [tiff, setTiff] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    file?.arrayBuffer().then(buffer => {
      const tiff = new Tiff({ buffer });

      setTiff(tiff);
      if (totalPages === 0) {
        setCurrentPage(1);
        setTotalPages(tiff.countDirectory());
      }
    })
  };

  const addTiffCanvastoViewer = () => {
    const canvas = document.querySelector('.canvas');

    canvas.textContent = '';
    canvas.append(tiff.toCanvas());
  };

  const resetViewer = () => {
    setTiff(null);
    setCurrentPage(1);
    setTotalPages(0);
  };

  const setPageNumber = (pageNum) => {
    tiff.setDirectory(pageNum - 1);
    addTiffCanvastoViewer();
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    if (tiff) {
      addTiffCanvastoViewer();
    }
  }, [tiff]);

  return (
    <main>
      <TransformWrapper>
        {({ resetTransform }) => (
          <>
            <header className='viewer-header'>
              <h1>TIFF Viewer</h1>
              {tiff && (
                <div className='buttons-wrapper'>
                  <i className="fa-solid fa-arrows-to-dot" onClick={() => resetTransform()}></i>
                  <div className='arrow-buttons'>
                    <i className={["fa-solid", "fa-circle-arrow-left", currentPage === 1 ? 'disabled' : ''].join(" ")} onClick={() => currentPage > 1 && setPageNumber(currentPage - 1)}></i>
                    <p className='page-tracker'>{currentPage} / {totalPages}</p>
                    <i className={['fa-solid ', 'fa-circle-arrow-right', currentPage === totalPages ? 'disabled' : ''].join(" ")} onClick={() => currentPage < totalPages && setPageNumber(currentPage + 1)}></i>
                  </div>
                </div>
              )}
            </header>
            {tiff && <i className="fa-solid fa-circle-xmark" onClick={resetViewer}></i>}
            {!tiff && (
              <label className='drop-zone' htmlFor='file-input'>
                <div className='drop-zone__content-wrapper'>
                  <p className='drop-zone__text'>Click to Upload</p>
                  <i className="fa-solid fa-upload"></i>
                </div>
                <input aria-label="file-input" id='file-input' onChange={handleFileInputChange} type='file' />
              </label>
            )}
            <TransformComponent wrapperClass='transform-wrapper'>
              {tiff && <div className='canvas'></div>}
            </TransformComponent>
          </>
        )}
      </TransformWrapper>


    </main>
  );
};

export default App;