import React, { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Pagination, ResetView } from "./ui/Controls";
import DropZone from "./ui/DropZone";
import './App.css';

const App = () => {
  const [tiff, setTiff] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const dropZonehandler = (e) => {
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
        <header className='viewer-header'>
          <h1>TIFF Viewer</h1>
          {tiff && (
            <div className='controls-wrapper'>
              <ResetView />
              <div className='arrow-buttons'>
                <Pagination
                  direction={'left'}
                  disabled={currentPage === 1}
                  clickHandler={viewPrevTiff}
                />
                <p className='page-tracker'>{currentPage} / {totalPages}</p>
                  <Pagination
                    direction={'right'}
                    disabled={currentPage === totalPages}
                    clickHandler={viewNextTiff}
                  />
              </div>
            </div>
          )}
        </header>
        {tiff && (
          <i className="fa-solid fa-circle-xmark" onClick={resetViewer}></i>
        )}
        {!tiff && <DropZone dropZonehandler={dropZonehandler}/>}
        <TransformComponent wrapperClass='transform-wrapper'>
          {tiff && <div className='canvas'></div>}
        </TransformComponent>
      </TransformWrapper>


    </main>
  );
};

export default App;