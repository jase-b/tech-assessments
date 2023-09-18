import React from 'react';
import { useControls } from "react-zoom-pan-pinch";
import "./ResetView.css";

const ResetView = () => {
  const { resetTransform } = useControls();

  return (
    <i
      className="fa-solid fa-arrows-to-dot"
      onClick={() => resetTransform()}
    ></i>
  );
};

export default ResetView;