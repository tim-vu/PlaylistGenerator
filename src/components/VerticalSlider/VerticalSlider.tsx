import React, { useLayoutEffect, useRef } from "react";

import "./VerticalSlider.css";
import Mark from "./Mark/Mark";
import { setTimeout } from "timers";

const THUMB_WIDTH = 12;
const MARK_HEIGHT = 14;
const RESET_TIMEOUT = 100;

interface SliderProps {
  id: string;
  min: number;
  max: number;
  value: number;
  step?: number;
  markValues: number[];
  onChange: (value: string) => void;
}

const Slider: React.FC<SliderProps> = ({
  id,
  min,
  max,
  step,
  value,
  markValues,
  onChange,
}) => {
  const [dimension, setDimension] = React.useState({
    width: 0,
    height: 0,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  let movementTimer: ReturnType<typeof setTimeout> | null = null;

  const updateDimensions = () => {
    if (!inputRef.current) return;

    setDimension({
      width: inputRef.current.clientWidth,
      height: inputRef.current.clientHeight,
    });
  };

  useLayoutEffect(updateDimensions, []);

  window.addEventListener("resize", () => {
    if (movementTimer) clearInterval(movementTimer);

    movementTimer = setTimeout(updateDimensions, RESET_TIMEOUT);
  });

  const renderMarks = () => {
    if (dimension === null) return [];
    const markWidth = dimension.width / (markValues.length - 1);

    return markValues.map((value, index) => {
      const ratio = (value - min) / (max - min);
      const currentHeight = markWidth * index;
      const offset =
        THUMB_WIDTH / 2 + ratio * dimension.width - ratio * THUMB_WIDTH;
      return (
        <Mark
          key={index}
          width={markWidth}
          height={MARK_HEIGHT}
          railHeight={dimension.height}
          offsetX={offset - currentHeight}
        />
      );
    });
  };

  return (
    <div className="slider">
      <input
        id={id}
        value={value}
        ref={inputRef}
        className="slider-input"
        type="range"
        // @ts-ignore
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
        step={step}
      />
      <div className="slider-tick-wrapper">{renderMarks()}</div>
    </div>
  );
};

export default Slider;
