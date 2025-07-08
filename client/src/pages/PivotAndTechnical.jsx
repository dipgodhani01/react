import React from "react";
import Select from "../component/Select";

function PivotAndTechnical() {
  const select1 = ["NSE Cash", "NSE Future", "MCX"];
  const select2 = ["TATAMOTORS", "AXISBANK", "CIPLA", "LUPIN"];

  return (
    <div className="min-h-[calc(100vh-132px)] bg-[#F2F6F9] p-4">
      <div className="container mx-auto ">
        <h1 className="text-2xl font-semibold text-[#4A568B]">
          Pivot & Technical Levels
        </h1>
        <div className="flex sm:flex-row flex-col gap-5 bg-white mt-3 border-b p-2">
          <Select data={select1} />
          <Select data={select2} />
          <div>
            <button className=" btn-link-ext">+ Script</button>
          </div>
        </div>
        <div className="bg-white font-medium text-[#4A568B] p-4 text-center">
          No Alert Found
        </div>
      </div>
    </div>
  );
}

export default PivotAndTechnical;
