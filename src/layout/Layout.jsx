import React, { useState } from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { pathname } = location;
  const shouldRenderNavbar = ["/login", "/update_password"].includes(pathname);
  return (
    <div>
      {!shouldRenderNavbar && (
        <Header
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
      )}
      {!shouldRenderNavbar ? (
        <div
          className={`min-h-[calc(100vh-60px)] mt-[60px] bg-[#F6F8FC] ${
            isSidebarOpen ? "ml-0 lg:ml-[260px]" : "ml-0"
          }`}
        >
          <Outlet />
        </div>
      ) : (
        <Outlet />
      )}
      {!shouldRenderNavbar && <Sidebar isSidebarOpen={isSidebarOpen} />}
    </div>
  );
}

export default Layout;
