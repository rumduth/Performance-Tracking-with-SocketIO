# Performance Monitor

A real-time system performance monitoring application built with Node.js, Socket.IO, and React. This distributed system allows you to monitor multiple machines' performance metrics through a centralized web dashboard with live updates.

## 🏗️ Architecture

The application consists of three main components:

- **Server** - A clustered Socket.IO server that handles real-time communication between clients
- **Node Client** - A system monitoring agent that collects and transmits performance data
- **React Client** - A responsive web dashboard that displays real-time performance metrics

```
┌─────────────────┐    WebSocket    ┌──────────────────┐    WebSocket    ┌─────────────────┐
│   Node Client   │ ──────────────► │   Socket.IO      │ ──────────────► │  React Client   │
│ (Data Collector)│                 │     Server       │                 │ (Web Dashboard) │
└─────────────────┘                 └──────────────────┘                 └─────────────────┘
```

## ✨ Features

- **Real-time Monitoring**: Live performance data updates every second
- **Multi-machine Support**: Monitor multiple systems simultaneously
- **Comprehensive Metrics**: CPU usage, memory consumption, system information
- **Connection Status**: Live tracking of client connection status
- **Scalable Architecture**: Clustered server design for high availability
- **Responsive Dashboard**: Clean, widget-based interface
- **Secure Authentication**: Token-based client authentication

## 📊 Monitored Metrics

- **CPU Information**: Processor type, cores, clock speed, and real-time load percentage
- **Memory Usage**: Total, used, and free memory with usage percentage
- **System Information**: OS type, uptime, and machine identification
- **Connection Status**: Live/offline status for each monitored machine

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Performance\ Monitor
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Node Client Dependencies

```bash
cd ../nodeClient
npm install
```

### 4. Install React Client Dependencies

```bash
cd ../react-client
npm install
```

## 🏃‍♂️ Running the Application

### Step 1: Start the Server

```bash
cd server
node servers.js
```

The server will start on port 3000 with clustering enabled for optimal performance.

### Step 2: Start the React Dashboard

```bash
cd react-client
npm run dev
```

The web dashboard will be available at `http://localhost:5173`

### Step 3: Start Node Client(s)

```bash
cd nodeClient
node index.js
```

Run this on each machine you want to monitor. Each client will automatically connect to the server and start transmitting performance data.

## 📁 Project Structure

```
Performance Monitor/
├── server/                     # Socket.IO server
│   ├── servers.js             # Main server with clustering
│   ├── socketMain.js          # Socket event handlers
│   └── package.json           # Server dependencies
├── nodeClient/                # System monitoring client
│   ├── index.js              # Performance data collector
│   └── package.json          # Client dependencies
└── react-client/             # Web dashboard
    ├── src/
    │   ├── App.jsx           # Main application component
    │   ├── perfDataComponents/
    │   │   ├── Widget.jsx    # Individual machine widget
    │   │   ├── Cpu.jsx       # CPU metrics display
    │   │   ├── Mem.jsx       # Memory metrics display
    │   │   ├── Info.jsx      # System info display
    │   │   └── widget.css    # Widget styling
    │   └── utilities/
    │       └── socketConnection.js  # Socket.IO client setup
    └── package.json          # React app dependencies
```

## 🔧 Technical Details

### Server Architecture

- **Clustering**: Utilizes all CPU cores for optimal performance
- **Sticky Sessions**: Ensures consistent client-server connections
- **Load Balancing**: Least-connection method for worker distribution
- **CORS Configuration**: Configured for React client on port 5173

### Authentication

- **Node Client**: Uses `node-client-token` for authentication
- **React Client**: Uses `react-client-token` for authentication
- Unauthorized connections are automatically disconnected

### Data Collection

- **Sampling Rate**: Performance data collected every 1000ms
- **CPU Load Calculation**: Uses 100ms sampling window for accurate load percentage
- **Machine Identification**: Uses MAC address of the primary network interface
- **Memory Metrics**: Calculates used memory and usage percentage

### Real-time Communication

- **Socket.IO Rooms**: Separate rooms for node clients and react clients
- **Event Types**:
  - `perfData`: Performance metrics transmission
  - `connectedOrNot`: Connection status updates

## 🎯 Usage

1. **Start the server** to enable communication between components
2. **Launch the React dashboard** to view the monitoring interface
3. **Run node clients** on machines you want to monitor
4. **Monitor in real-time** as widgets appear for each connected machine
5. **Track connection status** with live/offline indicators

## 🔍 Monitoring Dashboard

Each monitored machine appears as a widget containing:

- **CPU Widget**: Processor information and real-time load percentage
- **Memory Widget**: Memory usage statistics and availability
- **Info Widget**: System details including OS, uptime, and hardware specs
- **Status Indicator**: Shows online/offline status for each machine

## 🛡️ Security Considerations

- Token-based authentication prevents unauthorized connections
- CORS configuration restricts client origins
- Machine identification uses MAC addresses for unique identification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### Common Issues

**Server won't start:**

- Ensure port 3000 is available
- Check Node.js version compatibility

**Client can't connect:**

- Verify server is running
- Check firewall settings
- Confirm correct server URL in client configuration

**Dashboard not updating:**

- Ensure React client is connected to the correct server port
- Check browser console for WebSocket errors
- Verify CORS configuration

**Performance data not showing:**

- Confirm node client is running with proper authentication
- Check server logs for connection issues
- Verify network connectivity between components

---

Built with ❤️ using Node.js, Socket.IO, and React
