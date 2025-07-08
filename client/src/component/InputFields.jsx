import React from "react";

const InputFields = React.memo(function InputFields({
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <>
      {type === "select" ? (
        <div className="flex items-center mb-4 border px-3  rounded">
          <div className="mr-2 text-gray-500">{icon}</div>
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full outline-none bg-transparent text-sm text-gray-700 py-2"
          >
            <option value="">Select {placeholder}</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      ) : (
        <div className="flex items-center mb-4 border px-3 py-2 rounded">
          <div className="mr-2 text-gray-500">{icon}</div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full outline-none bg-transparent text-sm text-gray-700"
          />
        </div>
      )}
    </>
  );
});

export default InputFields;
