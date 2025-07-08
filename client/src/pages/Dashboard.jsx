import React from "react";
import { stockData } from "../data/dashboard";
import {
  goldenCrossBody,
  goldenCrossHeader,
  openHighLowBody,
  openHighLowHeader,
  trendScannerBody,
  trendScannerHeader,
} from "../data/table";
import { IoArrowUpOutline } from "react-icons/io5";
import download from "../assets/images/download.png";
import bullish from "../assets/images/bullish.png";
import Select from "../component/Select";
import Table from "../component/Table";

function Dashboard() {
  const select1 = ["NSE Signals", "NSE Fut Signals", "MCX Signals"];
  const select2 = ["AARTIIND", "ACC", "BPCL", "CGPOWER", "ICICIBANK", "IDEA"];
  const select3 = ["NSE Cash", "NSE Future", "MCX"];

  return (
    <div className="min-h-[calc(100vh-132px)] bg-[#F2F6F9] p-4">
      <marquee className="flex container mx-auto overflow-hidden px-4 w-full">
        <ul className="flex gap-6 p-2">
          {stockData.map((data, index) => {
            return (
              <li
                key={index}
                className="bg-white px-4 py-3 shadow-md rounded-md flex gap-2 items-center"
              >
                <span className="text-sm text-[#4A568B] font-medium">
                  {data.title}
                </span>
                <span className="text-green-500 text-sm flex items-center gap-x-0.5">
                  <IoArrowUpOutline size={15} />
                  {data.per}
                </span>
              </li>
            );
          })}
        </ul>
      </marquee>
      <br />

      <div className="container mx-auto md:p-4 p-1 flex gap-4 lg:flex-row flex-col">
        <div className="lg:w-[25%] w-full bg-white rounded-md">
          <div className="text-[#4A568B] font-semibold p-4 border-b">
            Recent Alerts
          </div>
          <div className="text-[#4A568B] text-sm text-center p-4">
            No alert found
          </div>
        </div>
        <div className="lg:w-[75%] w-full">
          <div className=" bg-white rounded-md">
            <div className="text-[#4A568B] font-semibold p-2 border-b flex flex-wrap gap-5 items-center">
              <Select data={select1} />
              <Select data={select2} />
            </div>
            <div className="p-2">
              <img src={`${download}`} alt="download" />
            </div>
          </div>

          <div className="px-4 pt-4">
            <p className="text-center text-[#4A568B] font-medium mb-4">
              Technical Ratings of ADANIPORTS
            </p>
            <div className="flex justify-between gap-6 md:flex-row flex-col">
              <div className="p-3 rounded-lg bg-white w-full flex justify-between sm:flex-row flex-col sm:gap-4">
                <div className="flex flex-col gap-1 justify-center">
                  <span className="font-semibold text-[#4A568B]">EMA</span>
                  <span className="sm:text-2xl text-xl font-semibold text-green-600">
                    Strong Bullish
                  </span>
                </div>
                <div>
                  <img src={`${bullish}`} alt="bullish" />
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white w-full flex justify-between sm:flex-row flex-col sm:gap-4">
                <div className="flex flex-col gap-1 justify-center">
                  <span className="font-semibold text-[#4A568B]">Trend</span>
                  <span className="sm:text-2xl text-xl font-semibold text-green-600">
                    Bullish
                  </span>
                </div>
                <div>
                  <img src={`${bullish}`} alt="bullish" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table 1 */}
      <div className="container mx-auto md:p-4 p-2 mt-2">
        <div className="bg-white rounded-md">
          <div className="text-[#4A568B] text-2xl font-semibold p-4 border-b">
            Trend Scanner
          </div>
          <div className="p-2">
            <Select data={select3} />
          </div>
          <div className="p-2 table-responsive overflow-x-auto">
            <Table
              tableHeader={trendScannerHeader}
              tableBody={trendScannerBody}
            />
          </div>
        </div>
      </div>

      {/* Table 2 */}
      <div className="container mx-auto md:p-4 p-2 mt-2">
        <div className="bg-white rounded-md">
          <div className="text-[#4A568B] text-2xl font-semibold p-4 border-b">
            Golden Cross Over
          </div>
          <div className="p-2">
            <Select data={select3} />
          </div>
          <div className="p-2 table-responsive overflow-x-auto">
            <table className="w-full border ">
              <thead className="bg-blue-700">
                <tr>
                  {goldenCrossHeader.map((title, index) => {
                    return (
                      <th key={index} className="text-white p-2">
                        {title}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {goldenCrossBody.map((data, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-center text-[#4A568B] font-medium"
                    >
                      <td className="p-2 border-b">
                        <small>{data.ticker}</small>
                      </td>
                      <td className="p-2 border-b">
                        <small>{data.time}</small>
                      </td>
                      <td className="p-2 border-b">
                        <small>{data.ema20_50}</small>
                      </td>
                      <td className="p-2 border-b">
                        <small>{data.ema20_200}</small>
                      </td>
                      <td className="bg-gray-200 p-2 border-b border-gray-00">
                        <small>{data.ema50_200}</small>
                      </td>
                      <td className="bg-red-600 text-white p-2 border-b">
                        <small>{data.ema}</small>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Table 3 */}
      <div className="container mx-auto md:p-4 p-2 mt-2">
        <div className="bg-white rounded-md">
          <div className="text-[#4A568B] text-2xl font-semibold p-4 border-b">
            Open High Low
          </div>
          <div className="p-2">
            <Select data={select3} />
          </div>
          <div className="p-2 table-responsive overflow-x-auto">
            <table className="w-full border ">
              <thead className="bg-blue-700">
                <tr>
                  {openHighLowHeader.map((title, index) => {
                    return (
                      <th key={index} className="text-white p-2">
                        {title}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {openHighLowBody.map((data, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-center text-[#4A568B] font-medium"
                    >
                      <td className="p-2 border-b">
                        <small>{data.ticker}</small>
                      </td>
                      <td className="p-2 border-b">
                        <small>{data.time}</small>
                      </td>
                      <td className="p-2 border-b">
                        <small>{data.high}</small>
                      </td>
                      <td className="p-2 border-b">
                        <small>{data.low}</small>
                      </td>
                      <td className="p-2 border-b">
                        <small>{data.openLow ? data.openLow : "-"}</small>
                      </td>
                      <td className="bg-red-600 text-white p-2 border-b">
                        <small>{data.openHigh}</small>
                      </td>
                      <td className="bg-red-600 text-white p-2 border-b">
                        <small>{data.signal}</small>
                      </td>
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

export default Dashboard;
