import React from "react";
import profileImg from "../assets/images/profile.jpg";
import { useSelector } from "react-redux";
import { maskEmail, maskMobile } from "../helper/helper";
import { Link } from "react-router-dom";

function Profile() {
  const user = useSelector((state) => state.data.user);

  return (
    <div className="min-h-[calc(100vh-132px)] bg-[#F2F6F9] p-4">
      <div className="container mx-auto md:px-6 w-fit">
        <div className="bg-white mt-4 shadow-lg rounded-lg p-4 flex justify-between flex-col">
          <div className="flex gap-4 p-4 flex-wrap">
            <div>
              <img src={profileImg} alt="profile" />
            </div>
            <div className="text-[#4A568B]">
              <ul className="text-sm font-medium space-y-1">
                <li className="flex items-center gap-1">
                  Name :<span>{user?.name}</span>
                </li>
                <li className="flex items-center gap-1">
                  Email ID : <span>{maskEmail(user?.email)}</span>
                </li>
                <li className="flex items-center gap-1">
                  Contact :{" "}
                  <span>
                    {user?.dialCode} {maskMobile(user?.mobile)}
                  </span>
                </li>
                <li className="flex items-center gap-1">
                  Username :<span>{user?.username}</span>
                </li>
                <li className="flex items-center gap-1">
                  City :<span>{user?.city}</span>
                </li>
                <li className="flex items-center gap-1">
                  State :<span>{user?.state}</span>
                </li>
                <li className="flex items-center gap-1">
                  Country :<span>{user?.country}</span>
                </li>
                <li className="flex items-center gap-1">
                  Pincode :<span>{user?.zipcode}</span>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="flex gap-6 items-center flex-wrap px-4 text-sm">
              <div className="flex flex-col gap-1">
                <span>Subscription</span>
                <span className="font-medium text-[#4A568B]">Free Trial</span>
              </div>
              <div className="flex flex-col gap-1">
                <span>Expiry date</span>
                <span className="font-medium text-[#4A568B]">2025-04-30</span>
              </div>
              <div className="flex flex-col gap-1">
                <span>Registered date</span>
                <span className="font-medium text-[#4A568B]">
                  2025-02-06 10:18:49
                </span>
              </div>
            </div>
            <br />
            <div className="flex gap-2 flex-wrap px-4 text-sm">
              <button className="px-2 py-1.5 bg-[#FF5B51] hover:bg-[#F95045] text-white rounded transition duration-300">
                Delete Account
              </button>
              <Link
                to={"/forgot_password"}
                className="px-2 py-1.5 bg-[#4454C3] hover:bg-[#3D4BB7] text-white rounded transition duration-300"
              >
                Change Password
              </Link>
              <button className="px-2 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded transition duration-300">
                Payment History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
