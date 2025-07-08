import React from "react";
import chart from "../assets/images/org-chart.png";
import graph from "../assets/images/graph.png";
import noice from "../assets/images/noise.png";
import creditCard from "../assets/images/credit-card.png";
import { Link, useNavigate } from "react-router-dom";
import {
  FaInfoCircle,
  FaPhoneAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const tradingTools = [
    { lable: "EOD Chart", src: chart, link: "/home/live_chart" },
    {
      lable: "Pivot & Technical Levels",
      src: graph,
      link: "/home/pivot_technical",
    },
    { lable: "Market News", src: noice, link: "/home/market_news" },
    { lable: "Plan & Pricing", src: creditCard, link: "/home/plan_pricing" },
  ];
  const aboutApp = [
    { lable: "How to use", icon: <FaYoutube size={22} /> },
    { lable: "WhatsApp Us", icon: <FaWhatsapp size={22} /> },
    {
      lable: "Contact Us",
      icon: <FaPhoneAlt size={20} />,
      link: "/contact_us",
    },
    {
      lable: "Terms & Conditions",
      icon: <FaInfoCircle size={22} />,
      link: "/privacy_policy",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-132px)] bg-[#F2F6F9]">
      <div className="container mx-auto p-2">
        <h1 className="text-2xl font-semibold text-[#4A568B]">Home</h1>
        <div className="bg-white mt-4 rounded-lg">
          <div className="text-xl font-semibold text-[#4A568B] p-3 border-b">
            Trading Tools
          </div>
          <div className="px-4 flex gap-6 justify-evenly py-8 flex-wrap">
            {tradingTools.map((item, index) => {
              return (
                <div key={index} className="text-center">
                  <img
                    src={item.src}
                    alt="tools"
                    height={40}
                    width={40}
                    className="mx-auto cursor-pointer"
                    onClick={() => navigate(item.link)}
                  />
                  <span>{item.lable}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white mt-4 rounded-lg">
          <div className="text-xl font-semibold text-[#4A568B] p-3 border-b">
            About App
          </div>
          <div className="p-4 flex-wrap">
            <ul className="space-y-3">
              {aboutApp.map((list, index) => {
                return (
                  <li key={index} className="text-[#4A568B]">
                    <Link
                      to={list.link && list.link}
                      className="flex gap-2 items-center"
                    >
                      <span>{list.icon}</span>
                      <span>{list.lable}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
