const os = require("os");
const io = require("socket.io-client");
const options = {
  auth: {
    token: "node-client-token",
  },
};
const socket = io("http://127.0.0.1:3000", options);
socket.on("connect", () => {
  const nI = os.networkInterfaces();
  let macA;
  for (let key in nI) {
    const isInternetFacing = !nI[key][0].internal;
    if (isInternetFacing) {
      macA = nI[key][0].mac;
      break;
    }
  }
  const perfDataInterval = setInterval(async () => {
    const perfData = await perfomanceLoadData();
    perfData.macA = macA;
    socket.emit("perfData", perfData);
  }, 1000);

  socket.on("disconnect", () => clearInterval(perfDataInterval));
});
/*
CPU LOAD
MEMORY USAGE -- FREE AND TOTAL
OS type
Uptime

Type of PRocessor
Number of cores
Clock speed
*/

//Because the times property on cpus is time since boot, we will get now times, and 100ms from "now" times. Comparte thenm that will give us the current load
function getCpuLoad() {
  return new Promise((res, rej) => {
    const start = cpuAverage(); // "now" value of load
    setTimeout(() => {
      const end = cpuAverage(); // "end" value of load
      const idleDiff = end.idle - start.idle;
      const totalDiff = end.total - start.total;
      const percentOfCpu = 100 - Math.floor((100 * idleDiff) / totalDiff);
      res(percentOfCpu);
    }, 100);
  });
}

function cpuAverage() {
  //cpus is an array of all cores. We need the average of all the cores wihch will give us the cpu average
  let cpus = os.cpus();
  let idleMs = 0;
  let totalMs = 0;
  cpus.forEach((aCore) => {
    for (let mode in aCore.times) {
      totalMs += aCore.times[mode];
    }
    idleMs += aCore.times.idle;
  });
  return { idle: idleMs / cpus.length, total: totalMs / cpus.length };
}

const perfomanceLoadData = () =>
  new Promise(async (res, rej) => {
    const cpus = os.cpus();
    const osType = os.type() === "Darwin" ? "Mac OS" : os.type();
    const upTime = os.uptime();
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;

    const cpuType = cpus[0].model;
    const numCores = cpus.length;
    const cpuSpeed = cpus[0].speed;

    const cpuLoad = await getCpuLoad();
    res({
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
    });
  });

// const run = async () => {
//   const data = await perfomanceLoadData();
//   console.log(data);
// };

// run();
