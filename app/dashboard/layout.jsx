"use client";

import React, { createContext, useState } from "react";
import Header from "./_components/Header";
import logo from "../../public/logo.svg";

export const WebCamContext = createContext({
  webCamEnabled: false,
  setWebCamEnabled: () => {},
  stream: null,
  setStream: () => {},
  proctorReady: false,
  setProctorReady: () => {},
});

const DashboardLayout = ({ children }) => {
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  // NEW: Camera stream for reuse by RecordAnswer + Proctoring
  const [stream, setStream] = useState(null);

  // NEW: Indicates stream is available for proctor hook
  const [proctorReady, setProctorReady] = useState(false);

  return (
    <div>
      <Header logo={logo} />
      <div className="mx-5 md:mx-20 lg:mx-36">
        <WebCamContext.Provider
          value={{
            webCamEnabled,
            setWebCamEnabled,
            stream,
            setStream,
            proctorReady,
            setProctorReady,
          }}
        >
          {children}
        </WebCamContext.Provider>
      </div>
    </div>
  );
};

export default DashboardLayout;
