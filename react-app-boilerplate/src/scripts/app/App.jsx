import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

const App = () => {
  const [tiffFile, setTiffFile] = useState(null);
  const [canvas, setCanvas] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setTiffFile(file);
  };

  useEffect(() => {
    if (tiffFile) {
      tiffFile.arrayBuffer().then(buffer => {
        const tiff = new Tiff({ buffer });

        // tiff.setDirectory(5);

        console.log('tiff', tiff);
        console.log('countDirectory()', tiff.countDirectory());
        console.log('currentDirectory()', tiff.currentDirectory());

        document.querySelector('.canvas').append(tiff.toCanvas());
      })
    }
  }, [tiffFile]);

  return (
    <>
      <header></header>
      <main>
        {!tiffFile ? (
          <label className='drop-zone' htmlFor='file-input'>
            <p className='drop-zone__text'>Click to Upload</p>
            <input aria-label="file-input" id='file-input' onChange={handleFileInputChange} type='file' />
          </label>
        ) : <div className='canvas'></div>}
        
      </main>
    </>
  );
};

export default App;