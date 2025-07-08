import React from "react";
import { scannerData } from "../data/table";
import Select from "../component/Select";

function Market() {
  const select1 = [
    "NSE",
    "NSE Cash EOD",
    "NSE Fut",
    "NSE Fut EOD",
    "MCX",
    "MCX EOD",
  ];
  const select2 = ["5 Minutes", "15 Minutes", "1 Hours"];
  const select3 = [
    "Short MA(15) Bullish",
    "Short MA(15) Bearish",
    "Mid MA(45) Bullish",
    "Mid MA(45) Bearish",
    "Long MA(100) Bullish",
    "Long MA(100) Bearish",
    "MACD Bullish",
    "MACD Bearish",
  ];

  return (
    <div className="min-h-[calc(100vh-132px)] bg-[#F2F6F9] p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold text-[#4A568B]">
          Signals Scanner
        </h1>
        <div className="bg-white p-3 mt-3 border-b">
          <div className="flex sm:flex-row flex-col gap-5">
            <Select data={select1} />
            <Select data={select2} />
            <Select data={select3} />
          </div>
        </div>

        <div className="bg-white font-medium text-[#4A568B] p-4 text-center">
          <div className="p-2 table-responsive overflow-x-auto overflow-y-auto">
            <div className="w-full space-y-4 min-w-[550px] h-[550px]">
              {scannerData.map((data, index) => {
                return (
                  <ul
                    key={index}
                    className="text-sm flex gap-4 w-full justify-between md:px-2 py-4 shadow-md bg-gray-50"
                  >
                    <li>{data.title}</li>
                    <li>
                      LTP : <span>{data.ltp}</span>
                    </li>
                    <li>
                      Overall Market Trend : <span>{data.trend}</span>
                    </li>
                    <li>{data.time}</li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Market;
