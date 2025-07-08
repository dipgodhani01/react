import React from "react";

function ConfirmModel({ isOpen, title, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[10000000000] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md max-w-sm">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-1 rounded-sm text-sm bg-green-600 hover:bg-green-700 text-white transition-all duration-300"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-1 rounded-sm text-sm bg-red-500 hover:bg-red-600 text-white transition-all duration-300"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModel;
