import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="fixed w-full h-full  z-50 bg-[#1A2238] top-0 left-0">
      <>
        <div className=" flex items-center p-5 lg:p-20 overflow-hidden h-full">
          <div className="flex-1 x rounded-3xl shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
            <>
              {/* component */}
              <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
                <div className="mb-5 text-3xl font-bold text-white">
                  Venting
                </div>
                <h1 className="text-9xl font-extrabold text-white tracking-widest">
                  404
                </h1>
                <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
                  Page Not Found
                </div>
                <button className="mt-5">
                  <div className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0" />
                    <span>
                      <Link
                        to="/"
                        className="relative block px-8 py-3 bg-[#1A2238] border border-current"
                      >
                        Go Home
                      </Link>
                    </span>
                  </div>
                </button>
              </main>
            </>
          </div>
        </div>
      </>
    </div>
  );
}

export default PageNotFound;
