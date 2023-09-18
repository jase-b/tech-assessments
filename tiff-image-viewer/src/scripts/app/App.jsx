import React, { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Pagination from "./ui/Controls/Pagination";
import './App.css';

const App = () => {
  const [tiff, setTiff] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
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

  const viewPrevTiff = () => {
    if (currentPage > 1) {
      setPageNumber(currentPage - 1);
    }
  };

  const viewNextTiff = () => {
    if (currentPage < totalPages) {
      setPageNumber(currentPage + 1);
    }
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
                <div className='controls-wrapper'>
                  <i className="fa-solid fa-arrows-to-dot" onClick={() => resetTransform()}></i>
                  <div className='arrow-buttons'>
                    <Pagination
                      direction={'left'}
                      disabled={currentPage === 1}
                      onClick={() => {
                        viewPrevTiff();
                        resetTransform();
                      }}
                    />
                    <p className='page-tracker'>{currentPage} / {totalPages}</p>
                      <Pagination
                        direction={'right'}
                        disabled={currentPage === totalPages}
                        onClick={() => {
                          viewNextTiff();
                          resetTransform();
                        }}
                      />
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