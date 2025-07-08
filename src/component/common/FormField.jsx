function FormField({
  type,
  field,
  placeholder,
  value,
  error,
  onChange,
  onBlur,
  onKeyPress,
  img,
  options,
}) {
  return (
    <div className="mb-4 md:w-full">
      <div
        className={`relative flex items-center text-base rounded-sm overflow-hidden border border-[#2b3250] bg-[#262e48] text-white px-2 ${
          error && "border border-red-400"
        }`}
      >
        <span className="text-gray-500">{img}</span>
        {type === "select" ? (
          <select
            className={`input-bg outline-none border-none w-full`}
            name="notifyFor"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            <option value="" disabled>
              Select an option
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : type === "file" ? (
          <input
            className={`px-2 py-1.5 ${error && "border border-red-400 "}  `}
            type="file"
            name={field}
            accept={"image/*"}
            onChange={onChange}
          />
        ) : (
          <input
            className={`outline-none border-none w-full p-2 bg-transparent`}
            type={type}
            name={field}
            placeholder={placeholder}
            accept="image/*"
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            onBlur={onBlur}
          />
        )}
      </div>
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  );
}

export default FormField;
