import React from "react";
import { newsData } from "../data/dashboard";
import { MdDateRange } from "react-icons/md";

function MarketNews() {
  return (
    <div className="min-h-[calc(100vh-132px)] bg-[#F2F6F9] p-4">
      <div className="container mx-auto ">
        <h1 className="text-2xl font-semibold text-[#4A568B]">News</h1>
        <div className="font-medium text-[#424E79] py-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4">
          {newsData.map((data, index) => {
            return (
              <div key={index} className="bg-white p-2 rounded-md shadow">
                <img src={data.src} alt="news" />
                <div className="px-4">
                  <div className="flex justify-between text-sm mb-2 font-normal flex-wrap gap-2">
                    <span className="flex gap-1 items-center">
                      <MdDateRange size={16} />
                      {data.time}
                    </span>
                    <span>{data.channel}</span>
                  </div>
                  <p>{data.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MarketNews;
