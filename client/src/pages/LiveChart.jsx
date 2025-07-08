import React from "react";
import chart from "../assets/images/download.png";
import Select from "../component/Select";

function LiveChart() {
  const select1 = [
    "NSE Cash EOD Signals",
    "NSE Fut EOD Signals",
    "MCX EOD Signals",
  ];
  const select2 = [
    "AARTIIND",
    "TATAMOTORS",
    "AXISBANK",
    "CIPLA",
    "LUPIN",
    "MARUTI",
  ];
  return (
    <div className="min-h-[calc(100vh-132px)] bg-[#F2F6F9]">
      <div className="container mx-auto p-2">
        <h1 className="text-2xl font-semibold text-[#4A568B]">
          EOD Live Chart
        </h1>
        <div className="bg-white mt-4 rounded-lg">
          <div className="text-xl font-semibold text-[#4A568B] p-3 border-b">
            <div className="flex sm:flex-row flex-col gap-5">
              <Select data={select1} />
              <Select data={select2} />
            </div>
          </div>
          <div className="text-center p-4">
            <img src={chart} alt="tools" className="mx-auto cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveChart;
