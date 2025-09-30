import React, { useState } from "react";
import { EpisodeManagerProvider } from "../assets/context/EpisodeManagerContext";
import LayoutOne from "../layout/LayoutOne";

const EmptyPage = ({ title }) => {
  const [log, setLog] = useState("");
  const sendTcp = async () => {
    try {
      const res = await window?.electronStore.sendTcp({
        host: "127.0.0.1",
        port: 12345,
        data: "Hello from renderer\n",
        timeout: 3000,
      });
      console.log("TCP Response:", res);
      setLog(JSON.stringify(res));
    } catch (err) {
      setLog("TCP error: " + (err?.message || String(err)));
    }
  };

  const sendUdp = async () => {
    try {
      const res = await window?.electronStore.sendUdp({
        host: "127.0.0.1",
        port: 12345,
        data: "UDP hello",
      });
      setLog(JSON.stringify(res));
    } catch (err) {
      setLog("UDP error: " + err?.message);
    }
  };

  const sendSerial = async () => {
    try {
      const res = await window?.electronStore.sendSerial({
        portPath: "COM3",
        baudRate: 9600,
        data: "Serial hello",
      });
      setLog(JSON.stringify(res));
    } catch (err) {
      setLog("Serial error: " + (err?.message || String(err)));
    }
  };

  return (
    <LayoutOne>
      <div className="w-full h-full text-white flex gap-[30px] flex-col lg:flex-row">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-4xl font-bold text-gray-700 mb-4">{title}</h1>

          <button onClick={sendTcp}>Send TCP</button>
          <button onClick={sendUdp} style={{ marginLeft: 10 }}>
            Send UDP
          </button>
          <button onClick={sendSerial} style={{ marginLeft: 10 }}>
            Send Serial (COM)
          </button>
          <pre style={{ marginTop: 20 }}>{log}</pre>

          <p className="text-lg text-gray-500">
            This page is under construction.
          </p>
        </div>
      </div>
    </LayoutOne>
  );
};

export default EmptyPage;
