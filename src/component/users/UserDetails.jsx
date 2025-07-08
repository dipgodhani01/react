import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../BaseUrl/BaseUrl";
import { maskEmail, maskMobile } from "../../helper/helper";

function UserDetails() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getUserDetails() {
      const result = await instance.get(`/admin/user/${id}`);
      if (result?.data?.status && result?.status === 200) {
        setUser(result?.data?.data);
      }
    }
    getUserDetails();
  }, [id]);

  return (
    <div className="p-4 ">
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-white rounded-2xl shadow-lg">
        <div className="flex items-center space-x-6 mb-6 mt-2">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1F2C52]">{user?.name}</h2>
            <p className="text-[#1F2C52] text-sm">@{user?.username}</p>
            <p
              className={`text-sm font-semibold mt-1 ${
                user?.isLogin === true ? "text-green-600" : "text-red-500"
              }`}
            >
              {user?.isLogin === true ? "ACTIVE" : "INACTIVE"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-600 text-sm">Email</label>
            <p className="text-gray-800">{maskEmail(user?.email)}</p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Mobile</label>
            <p className="text-gray-800">
              {user?.dialCode} {maskMobile(user?.mobile)}
            </p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Gender</label>
            <p className="text-gray-800 capitalize">{user?.gender}</p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Date of Birth</label>
            <p className="text-gray-800">
              {new Date(user?.dob).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Country</label>
            <p className="text-gray-800">{user?.country}</p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">State</label>
            <p className="text-gray-800">{user?.state}</p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">City</label>
            <p className="text-gray-800">{user?.city}</p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Zip Code</label>
            <p className="text-gray-800">{user?.zipcode}</p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Email Verified</label>
            <p
              className={`text-sm font-semibold ${
                user?.emailVerified ? "text-green-600" : "text-red-600"
              }`}
            >
              {user?.emailVerified ? "Verified" : "Not Verified"}
            </p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Role</label>
            <p className="text-gray-800 capitalize">{user?.role}</p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Created At</label>
            <p className="text-gray-800">
              {new Date(user?.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <label className="text-gray-600 text-sm">Status</label>
            <p
              className={`text-gray-800 text-sm w-fit py-1 px-3 rounded ${
                user?.status === "active" ? "bg-green-300" : "bg-red-300"
              }`}
            >
              {user?.status === "active" ? "Unblock" : "Block"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
