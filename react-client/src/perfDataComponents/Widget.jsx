import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";
import "./widget.css";
import socket from "../utilities/socketConnection";
import { useEffect, useState } from "react";

export default function Widget({ data }) {
  const [isAlive, setIsAlive] = useState(true);
  const {
    freeMem,
    totalMem,
    usedMem,
    memUsage,
    osType,
    upTime,
    cpuType,
    numCores,
    cpuSpeed,
    cpuLoad,
    macA,
  } = data;
  const cpuData = { cpuType, cpuLoad };
  const memData = { freeMem, totalMem, usedMem, memUsage };
  const infoData = { macA, osType, upTime, cpuSpeed, cpuLoad, numCores };

  useEffect(() => {
    socket.on("connectedOrNot", ({ isAlive, machineMacA }) => {
      if (machineMacA === macA) {
        setIsAlive(isAlive);
      }
    });
  }, [macA]);

  const notAliveDiv = isAlive ? (
    <></>
  ) : (
    <div className="not-active">Offline</div>
  );

  return (
    <div className="widget row justify-content-evenly">
      {notAliveDiv}
      <Cpu data={cpuData} />
      <Mem data={memData} />
      <Info data={infoData} />
    </div>
  );
}
