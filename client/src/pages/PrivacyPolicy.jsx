import React from "react";
import { privacyPolicy } from "../data/privacy_policy";

function PrivacyPolicy() {
  return (
    <div className="bg-[#F2F6F9] text-[#424E79]">
      <div className="p-4 md:py-12 py-6 container mx-auto">
        <h1 className="text-3xl font-semibold  text-center">
          Terms and Conditions
        </h1>
        <div className="space-y-6">
          {privacyPolicy.map((item, index) => {
            return (
              <div className="shadow-xl mt-4" key={index}>
                <div className="bg-[#F4F5FB] p-4">
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                </div>
                <div className="bg-white p-4">
                  {item.desc1 && <p className="mb-2">{item.desc1}</p>}
                  {item.desc2 && <p className="mt-6">{item.desc2}</p>}
                  {item.descList &&
                    item.descList.map((list, index) => {
                      return (
                        <ul key={index} className="mt-2 pl-8 list-disc">
                          <li>{list}</li>
                        </ul>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
