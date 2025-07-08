import React from "react";

function SelectWithLabel({ data, formValues, setFormValues }) {
  const handleChange = (e, name) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  return (
    <>
      {data.map((item, index) => {
        return (
          <div className="flex flex-col gap-1 mt-4" key={index}>
            <label>{item.label}</label>
            <select
              className="p-2 border rounded text-sm focus:outline-none"
              value={formValues[item.name] || ""}
              onChange={(e) => handleChange(e, item.name)}
            >
              <option value="">Select...</option>
              {item.list.map((listItem, idx) => (
                <option value={listItem} key={idx}>
                  {listItem}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </>
  );
}

export default SelectWithLabel;
