import { useEffect } from "react";
import socket from "./utilities/socketConnection";
import { useState } from "react";
import Widget from "./perfDataComponents/Widget";
function App() {
  const [performanceData, setPerformanceData] = useState({});
  useEffect(() => {
    socket.on("perfData", (data) => {
      const copyPerfData = { ...performanceData };
      copyPerfData[data.macA] = data;
      setPerformanceData(copyPerfData);
    });
  }, [performanceData]);
  const widgets = Object.values(performanceData).map((d) => (
    <Widget data={d} key={d.macA} />
  ));
  return <div className="container">{widgets}</div>;
}

export default App;
