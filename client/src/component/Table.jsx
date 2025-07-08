import React from "react";

function Table({ tableHeader, tableBody }) {
  return (
    <table className="w-full border ">
      <thead className="bg-blue-700">
        <tr>
          {tableHeader.map((title, index) => {
            return (
              <th key={index} className="text-white p-2">
                {title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableBody.map((data, index) => {
          return (
            <tr key={index} className="text-center text-[#4A568B] font-medium">
              <td className="p-2 border-b">
                <small>{data.ticker}</small>
              </td>
              <td className="p-2 border-b">
                <small>{data.time}</small>
              </td>
              <td className="p-2 border-b">
                <small>{data.close}</small>
              </td>
              <td className="p-2 border-b">
                <small>{data.volume}</small>
              </td>
              <td className="bg-gray-200 p-2 border-b border-gray-300">
                <small>{data.bband}</small>
              </td>
              <td className="bg-red-600 text-white p-2 border-b">
                <small>{data.shortMA}</small>
              </td>
              <td className="bg-red-600 text-white p-2 border-b">
                <small>{data.midMA}</small>
              </td>
              <td className="bg-green-600 text-white p-2 border-b">
                <small>{data.longMA100}</small>
              </td>
              <td className="bg-red-600 text-white p-2 border-b">
                <small>{data.macd}</small>
              </td>
              <td className="bg-red-600 text-white p-2 border-b">
                <small>{data.arron}</small>
              </td>
              <td className="bg-red-600 text-white p-2 border-b">
                <small>{data.stochastic}</small>
              </td>
              <td className="bg-green-600 text-white p-2 border-b">
                <small>{data.rsi}</small>
              </td>
              <td className="bg-green-600 text-white p-2 border-b">
                <small>{data.mfi}</small>
              </td>
              <td className="p-2 border-b">
                <small>{data.score}</small>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
