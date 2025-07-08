import React from "react";

function Select({ data }) {
  return (
    <select className="p-2 border rounded text-sm focus:outline-none sm:w-52 w-full">
      {data.map((data, index) => {
        return <option key={index}>{data}</option>;
      })}
    </select>
  );
}

export default Select;
