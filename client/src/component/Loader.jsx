import React from "react";

function Loader() {
  return (
    <svg
      className="animate-spin h-6 w-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-40"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      ></circle>
      <path fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
  );
}

export default Loader;
