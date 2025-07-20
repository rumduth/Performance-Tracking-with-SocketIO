const socketMain = (io) => {
  io.on("connection", (socket) => {
    let machineMacA;
    const auth = socket.handshake.auth;
    if (auth.token === "node-client-token") {
      socket.join("nodeClient");
    } else if (auth.token === "react-client-token") {
      socket.join("reactClient");
    } else {
      socket.disconnect();
    }

    socket.on("perfData", (data) => {
      if (!machineMacA) machineMacA = data.macA;
      io.to("reactClient").emit("perfData", data);
      io.to("reactClient").emit("connectedOrNot", {
        machineMacA,
        isAlive: true,
      });
    });

    socket.on("disconnect", (reason) => {
      io.to("reactClient").emit("connectedOrNot", {
        machineMacA,
        isAlive: false,
      });
    });
  });
};

module.exports = socketMain;
