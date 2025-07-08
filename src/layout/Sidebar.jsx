import { Link, useLocation } from "react-router-dom";
import { sidebardata } from "../data/admin";

function Sidebar({ isSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div
      className={`fixed h-[calc(100vh-60px)] top-[60px] w-[260px] transition-all duration-300 ease-in-out z-[1000] overflow-hidden bg-[#1F2C52]`}
      style={{ width: isSidebarOpen ? "260px" : "0px" }}
    >
      <ul className="p-2 flex flex-col gap-1">
        {sidebardata.map((data, index) => (
          <Link
            to={data.path}
            key={index}
            className={`${
              data.path === pathname
                ? "bg-[#2F3D6B] text-white"
                : "text-neutral-300"
            } flex items-center gap-2 px-3 py-2 hover:bg-[#2F3D6B] hover:no-underline active:bg-[#2F3D6B] rounded-sm text-base hover:text-white transition duration-300`}
          >
            <li to={data.path} className="flex gap-3 items-center">
              <div className="text-lg">{data.img}</div>
              <span className="text-md">{data.pageName}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
