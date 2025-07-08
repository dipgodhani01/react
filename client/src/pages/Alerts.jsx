import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import SelectWithLabel from "../component/SelectWithLabel";

function Alerts() {
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [alertsList, setAlertsList] = useState([]);

  function handleModal() {
    setIsOpen(!isOpen);
  }

  const data = [
    {
      label: "Select Segment",
      name: "selectSegment",
      list: ["NSE Cash", "NSE Fut Signals", "MCX Signals"],
    },
    {
      label: "Select Symbol",
      name: "selectSymbol",
      list: ["NSE Cash", "NSE Fut Signals", "MCX Signals"],
    },
    {
      label: "Select Alert Type",
      name: "selectAlertType",
      list: ["Buy Sell"],
    },
    {
      label: "Select Time Frame",
      name: "selectTimeFrame",
      list: ["5 Minutes"],
    },
  ];

  const alertTableHeader = ["Alert", "Time", "Action"];

  const handleSave = () => {
    setAlertsList((prev) => [...prev, { ...formValues }]);
    setFormValues({});
    setIsOpen(false);
  };

  const handleDelete = (index) => {
    const updatedAlerts = alertsList.filter((_, i) => i !== index);
    setAlertsList(updatedAlerts);
  };

  return (
    <>
      <div className="min-h-[calc(100vh-132px)] bg-[#F2F6F9] p-4">
        <div className="container mx-auto ">
          <h1 className="text-2xl font-semibold">Recent Alerts</h1>
          <div className="bg-white p-2 mt-3 border-b">
            <div className="flex items-center p-2 gap-6">
              <ul className="flex items-center gap-4 font-medium text-[#4A568B]">
                <li>Active</li>
                <li>Triggered</li>
              </ul>
              <button className="btn-link-ext" onClick={handleModal}>
                + Create Alerts
              </button>
            </div>
          </div>
          {alertsList.length > 0 ? (
            <div className="bg-white font-medium text-[#4A568B] p-4 text-center">
              <div className="p-2 table-responsive overflow-x-auto">
                <table className="w-full border ">
                  <thead className="bg-blue-700">
                    <tr>
                      {alertTableHeader.map((title, index) => {
                        return (
                          <th key={index} className="text-white p-2">
                            {title}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {alertsList.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td className="p-2 border-b">
                            {data.selectSegment}{" "}
                            <small className="text-gray-500">
                              {data.selectSymbol}
                            </small>
                          </td>
                          <td className="p-2 border-b">
                            {data.selectTimeFrame}{" "}
                            <small className="text-gray-500">
                              {data.selectAlertType}
                            </small>
                          </td>
                          <td className="p-2 border-b">
                            <button
                              onClick={() => handleDelete(index)}
                              className="text-red-500"
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white font-medium text-[#4A568B] p-4 text-center">
              No Alert Found
            </div>
          )}
        </div>
      </div>

      <div
        className={`absolute top-0 bottom-0 w-full h-[100vh] bg-black/30 p-4 ${
          isOpen ? "flex" : "hidden"
        } justify-center`}
      >
        <div className=" bg-white rounded-lg min-w-[280px] w-[400px] h-fit">
          <div className="text-[#4A568B] flex justify-between items-center border-b p-4">
            <p className="text-xl font-medium">Add Alert</p>
            <button onClick={handleModal}>
              <IoMdCloseCircle size={28} />
            </button>
          </div>
          <div className="px-4 pb-6 border-b text-[#4A568B]">
            <SelectWithLabel
              data={data}
              formValues={formValues}
              setFormValues={setFormValues}
            />
          </div>

          <div className="p-4 flex justify-end gap-4">
            <button
              className="p-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded"
              onClick={handleModal}
            >
              Close
            </button>
            <button
              className="p-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Alerts;
