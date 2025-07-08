import { FaEye } from "react-icons/fa";
import instance from "../BaseUrl/BaseUrl";
import { useEffect, useState } from "react";
import { maskEmail, maskMobile } from "../helper/helper";
import toast from "react-hot-toast";
import ConfirmModel from "../component/common/ConfirmModel";
import { userTableHeader } from "../data/admin";
import TableHeader from "../component/common/TableHeader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/Action";

function Users() {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const users = useSelector((state) => state.data.allUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBlockUnblockClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmBlockUnblock = async () => {
    try {
      const result = await instance.put(
        `/admin/update_status/${selectedUser._id}`
      );

      if (result?.status === 200 && result?.data?.status) {
        toast.success(result?.data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
    setShowModal(false);
    setSelectedUser(null);
  };

  const cancelBlockUnblock = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, selectedUser]);

  return (
    <>
      <div className="p-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1F2C52]">User List</h1>
        </div>
        <div className="py-4"></div>
        <div className="table-responsive overflow-x-auto rounded bg-white pb-2">
          <table className="min-w-[950px] w-full">
            <thead>
              <TableHeader data={userTableHeader} />
            </thead>
            <tbody>
              {users?.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-[#6a5acd] odd:bg-opacity-[0.1] text-sm"
                >
                  <td className="text-center border p-2">{index + 1}</td>
                  <td className="text-center border p-2">{item?.name}</td>
                  <td className="text-center border p-2">{item?.username}</td>
                  <td className="text-center border p-2">
                    {maskEmail(item?.email)}
                  </td>
                  <td className="text-center border p-2">
                    {item?.dialCode} {maskMobile(item?.mobile)}
                  </td>
                  <td className="text-center border p-2">
                    <div
                      className={`w-fit mx-auto font-medium text-base px-3 py-1 rounded-sm text-white ${
                        item?.isLogin === true
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      {item?.isLogin === true ? "Active" : "Inactive"}
                    </div>
                  </td>
                  <td className="text-center border p-2">
                    <div
                      className={`w-fit mx-auto font-medium text-base px-3 py-1 rounded-sm text-white ${
                        item?.emailVerified === true
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      {item?.emailVerified === true ? "Yes" : "No"}
                    </div>
                  </td>
                  <td className="text-center border p-2 ">19-05-2025</td>
                  <td className="text-center border p-2">
                    <div className="flex justify-start gap-2 text-white text-xs">
                      <button
                        className="flex items-center gap-1 py-1.5 px-2 rounded-sm bg-pink-500"
                        onClick={() => navigate(`/user_details/${item?._id}`)}
                      >
                        <FaEye />
                        View
                      </button>
                      <button
                        className={`flex items-center gap-1 py-1.5 px-3 rounded-sm  ${
                          item?.status === "active"
                            ? "bg-red-600"
                            : "bg-green-700"
                        }`}
                        onClick={() => handleBlockUnblockClick(item)}
                      >
                        {item?.status === "active" ? "Block" : "Unblock"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <ConfirmModel
          isOpen={showModal}
          title={`Are you sure you want to ${
            selectedUser?.status === "active" ? "block" : "unblock"
          } this user?`}
          onConfirm={confirmBlockUnblock}
          onCancel={cancelBlockUnblock}
        />
      )}
    </>
  );
}

export default Users;
