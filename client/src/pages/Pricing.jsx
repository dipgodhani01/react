import React from "react";
import { pricePlanData } from "../data/dashboard";

function Pricing() {
  return (
    <div className="min-h-[calc(100vh-132px)] bg-[#F2F6F9] p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold text-[#4A568B]">Pricing</h1>
        <div className="bg-white mt-3 border-b rounded-md overflow-hidden shadow-lg">
          <div className="p-4 bg-green-600 text-white text-xl font-medium">
            Plan Active
          </div>
          <div className="p-4 bg-white text-[#4A568B] flex flex-col gap-2">
            <span>
              Active Plan - <b>Free Trial</b>
            </span>
            <span>
              Expire on - <b>2025-04-30</b>
            </span>
          </div>
        </div>

        <div className="mt-6 p-1 grid lg:grid-cols-3 md:grid-cols-2 gap-5">
          {pricePlanData.map((data, index) => {
            return (
              <div
                key={index}
                className="w-full bg-white h-fit rounded-lg overflow-hidden shadow"
              >
                <div
                  className={`px-4 md:py-6 py-4 ${data.bg} text-white text-center text-3xl font-semibold`}
                >
                  {data.duration}
                </div>
                <div className="text-center py-10 text-[#424E79]">
                  <span className="text-3xl font-bold">₹{data.price}</span>
                  <span className="text-xl ml-2 font-medium">
                    {data.duration}
                  </span>
                </div>
                <ul className="list-disc border-b p-4 text-[#424E79]">
                  {data.planDetails.map((list, index) => {
                    return (
                      <li key={index} className="ml-6 italic">
                        {list}
                      </li>
                    );
                  })}
                </ul>
                <div className="p-3">
                  <button className="w-full py-3 px-6 bg-blue-800 text-white rounded">
                    Pay Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
