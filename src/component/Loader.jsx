function Loader() {
  return (
    <div
      className={`fixed h-modal h-full animated fadeInDown bg-[#000000bf]  overflow-auto z-50 inset-0 flex justify-center items-center`}
    >
      <span className="spinner flex justify-center items-center h-screen"></span>
    </div>
  );
}

export default Loader;
