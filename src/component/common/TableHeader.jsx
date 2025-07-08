import React from "react";

function TableHeader({ data }) {
  return (
    <tr className="bg-gray-100">
      {data?.map((h, index) => {
        return (
          <th scope="col" className="border p-2" key={index}>
            {h}
          </th>
        );
      })}
    </tr>
  );
}

export default TableHeader;
