import React from "react";
import { signalTableBody, signalTableHeader } from "../data/table";
import Select from "../component/Select";

function Signals() {
  const data = [
    "NSE",
    "NSE Cash EOD",
    "NSE Fut",
    "NSE Fut EOD",
    "MCX",
    "MCX EOD",
  ];
  return (
    <div className="min-h-[calc(100vh-132px)] bg-[#F2F6F9] p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold text-[#4A568B]">
          Signals Scanner
        </h1>
        <div className="bg-white p-3 mt-3 border-b">
          <div className="flex sm:flex-row flex-col gap-5">
            <Select data={data} />
            <input
              type="search"
              placeholder="Search Symbol"
              className="border p-1.5 outline-none  rounded"
            />
          </div>
        </div>

        <div className="bg-white font-medium text-[#4A568B] p-4 text-center">
          <div className="p-2 table-responsive overflow-x-auto">
            <table className="w-full border min-w-[780px]">
              <thead className="bg-blue-700">
                <tr>
                  {signalTableHeader.map((title, index) => {
                    return (
                      <th key={index} className="text-white p-2">
                        {title}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {signalTableBody.map((data, index) => {
                  return (
                    <tr key={index} className="text-sm font-normal">
                      <td className="px-2 py-3 border-b">{data.symbol}</td>
                      <td className="px-2 py-3 border-b text-green-600">
                        {data.buyabove}
                      </td>
                      <td className="px-2 py-3 border-b text-red-600">
                        {data.sellabove}
                      </td>
                      <td className="px-2 py-3 border-b">{data.target1}</td>
                      <td className="px-2 py-3 border-b">{data.target2}</td>
                      <td className="px-2 py-3 border-b">{data.target3}</td>
                      <td className="px-2 py-3 border-b">{data.stoploss}</td>
                      <td className="px-2 py-3 border-b">{data.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signals;
