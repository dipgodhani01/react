import { Link } from "react-router-dom";
import Avatar from "../assets/images/profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers } from "../redux/Action";

function Dashboard() {
  const users = useSelector((state) => state.data.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between gap-4 ">
        <Link
          to="/users"
          className="flex-grow basis-[260px] border border-[#E0E6F1] rounded shadow-md p-4 min-w-[260px] max-w-md bg-[#FFFFFF]"
        >
          <div className="flex justify-start">
            <img src={Avatar} alt="Avatar" className="w-14" />
          </div>
          <div className="flex justify-between items-center mt-2 border-b py-2 rounded-lg">
            <h1 className="text-xl font-medium text-[#1F2C52]">Total Users</h1>
            <h1 className="text-lg font-bold text-[#666]">{users?.length}</h1>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
