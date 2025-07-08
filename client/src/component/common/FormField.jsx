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
  extraComponent,
  options,
  label,
}) {
  return (
    <div className="md:w-full">
      <label className="form-label text-sm text-gray-600">
        {label ? label : placeholder}
      </label>
      <div
        className={`relative flex items-center border px-2 text-base rounded-sm overflow-hidden ${
          error && "border border-red-400"
        }`}
      >
        <span className="text-gray-600">{img}</span>
        {type === "select" ? (
          <select
            className={`outline-none border-none w-full text-sm px-1 py-1.5 cursor-pointer`}
            name="notifyFor"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            <option value="" disabled>
              Select an option
            </option>
            {options?.map((opt, index) => (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : type === "file" ? (
          <input
            className={`px-2 py-1.5 ${
              error && "border border-red-400"
            } cursor-pointer `}
            type="file"
            name={field}
            accept={"image/*"}
            onChange={onChange}
          />
        ) : (
          <input
            className={`outline-none border-none text-sm bg-transparent w-full px-2 py-1.5`}
            type={type}
            name={field}
            placeholder={placeholder}
            accept="image/*"
            value={value}
            onChange={onChange}
            onKeyPress={onKeyPress}
            onBlur={onBlur}
            autoComplete={value}
          />
        )}
        {extraComponent}
      </div>
      {field === "password" && value.length < 8 && value.length > 0 && (
        <p className="text-sm text-orange-400">
          Password must be at least 8 characters long and include at least one
          lowercase letter and one number.
        </p>
      )}
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  );
}

export default FormField;
