import { useSelector } from "react-redux";

function UserProfile({ avatar }) {
  const admin = useSelector((state) => state.data.user);

  return (
    <>
      <div className="md:h-11 md:w-11 h-10 w-10 rounded-full">
        <img src={avatar} alt="avatar" className="rounded-full" />
      </div>
      <div className="hidden md:flex flex-col justify-center ml-1">
        <p className="text-md font-semibold capitalize">{admin?.role}</p>
        <span className="text-sm text-gray-400">{admin?.username}</span>
      </div>
    </>
  );
}

export default UserProfile;
