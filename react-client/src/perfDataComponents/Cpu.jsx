import { useRef } from "react";
import drawCircle from "../utilities/canvasLoadAnimation";
import { useEffect } from "react";

const Cpu = ({ data }) => {
  const canvasEl = useRef();
  useEffect(() => {
    drawCircle(canvasEl.current, data.cpuLoad);
  }, [canvasEl, data.cpuLoad]);

  return (
    <div className="cpu col-3">
      <h3>CPU Load</h3>
      <div className="canvas-wrapper">
        <canvas ref={canvasEl} className="" width="200" height="200"></canvas>
        <div className="cpu-text">{data.cpuLoad}</div>
      </div>
    </div>
  );
};

export default Cpu;
