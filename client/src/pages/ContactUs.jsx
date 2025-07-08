import React from "react";
import { Link } from "react-router-dom";

function ContactUs() {
  const contactData = [
    {
      section: "Support",
      items: [
        {
          icon: "https://rgtssoftware.com/assets/front/img/operator.png",
          text: "7069343300",
        },
        {
          icon: "https://rgtssoftware.com/assets/front/img/email.png",
          text: "info@rightguide.in",
        },
      ],
    },
    {
      section: "Complaint",
      items: [
        {
          icon: "https://rgtssoftware.com/assets/front/img/telephone.png",
          text: "7096993300",
        },
        {
          icon: "https://rgtssoftware.com/assets/front/img/at.png",
          text: "mahesh@rightguide.in",
        },
      ],
    },
    {
      section: "Social Media",
      items: [
        {
          icon: "https://rgtssoftware.com/assets/front/img/facebook.png",
          text: "Facebook",
          href: "https://www.facebook.com/422031147847067",
        },
        {
          icon: "https://rgtssoftware.com/assets/front/img/youtube.png",
          text: "Youtube",
          href: "https://www.youtube.com/channel/UCjZ231OuU0pXfMEKIvqbSHg",
        },
      ],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-132px)] bg-[#F2F6F9] text-[#4A568B] flex items-center p-4">
      <div className="container mx-auto p-5 bg-white rounded-3xl md:w-[50%] w-full">
        <div className="p-2">
          <h6 className="font-semibold text-2xl text-center">Contact Us</h6>
        </div>
        <div className="p-4 ">
          <h2 className="text-center text-sky-600 text-2xl font-semibold mb-2">
            Say hello to us!
          </h2>
          <p className="mb-4 text-center">
            RGTS tries to bring together information and content that our users
            can to improve their trading &amp; investment decisions and can be
            abl to make as much profit as they can from the market.
          </p>
          <div className="px-4">
            {contactData.map((data, index) => {
              return (
                <div key={index} className="mt-4">
                  <label className="text-xl font-semibold">
                    {data.section}:
                  </label>
                  <ul className="mt-2 flex flex-col gap-3">
                    {data.items.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link
                            to={item.href && item.href}
                            className={`${
                              item.href ? "cursor-pointer" : "cursor-default"
                            } flex items-center gap-2`}
                          >
                            <img
                              src={item.icon}
                              alt="section"
                              height="20"
                              width="30"
                            />
                            <p>{item.text}</p>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
