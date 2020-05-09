import React, { CSSProperties } from "react";

import "./Mark.css";

interface MarkProps {
  width: number;
  height: number;
  offsetX: number;
  railHeight: number;
}

const makeStyle: (
  width: number,
  height: number,
  offsetY: number,
  railHeight: number
) => CSSProperties = (width, height, railHeight, offsetX) => {
  return {
    width,
    height,
    position: "relative",
    bottom: (height + railHeight) / 2,
    left: offsetX,
  };
};

const Mark: React.FC<MarkProps> = ({ width, height, railHeight, offsetX }) => {
  return (
    <div
      className="marker"
      style={makeStyle(width, height, railHeight, offsetX)}
    />
  );
};

export default Mark;
