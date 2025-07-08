import { toast } from "react-hot-toast";

// Common error handling function
export const handleErrors = (err) => {
  try {
    const errorMessages = err?.response?.data;
    if (errorMessages?.status === false && err?.response?.status === 401) {
      // Call isUserLoggedOut function or perform logout logic here
    } else {
      if (errorMessages?.message) {
        toast.error(errorMessages?.message);
      } else {
        toast.error("An error occurred, Please retry again later");
      }
    }
  } catch (error) {
    // Handle any additional errors during error handling
    console.error("Error handling the error:", error);
  }
};

export const formatDate = (dateString) => {
  if(dateString != null){
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are 0-based
    const day = date.getDate();
    // Define options for date formatting
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    // Get formatted date and time
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    // Return formatted date
    return `${year}-${month}-${day} ${formattedTime}`;
  }

};

export function shortname(file) {
  const filename = file;
  const shortname =
    filename?.length > 14
      ? filename?.substr(0, 8) + "..." + filename?.substr(-9)
      : filename;
  return <>{shortname}</>;
}

// Utility function to truncate a string and append ellipsis if needed
export const truncateString = (str, maxLength) => {
  return str.length > maxLength ? str.substring(0, maxLength) + "...." : str;
};

// Utility function to get Tailwind CSS class based on status
export const getStatusColorClass = (status) => {
  switch (status) {
    case "activate":
      return "px-2 py-1 text-[#52C41A] bg-[#F6FFED]"; // Green color for "Activate"
    case "deactivate":
      return "px-2 py-1 text-[#FAAD14] bg-[#FFF2E8]"; // Yellow color for "Deactivate"
    case "deleted":
      return "px-2 py-1 text-[#F5222D] bg-[#FFF1F0]"; // Red color for "Deleted"
    default:
      return "px-2 py-1 text-white bg-gray-500"; // Default color (you can set this to another color if needed)
  }
};

export function DateTimeDisplay(dateTime) {
  const formattedDateTime = new Date(dateTime).toISOString().slice(0, 16);

  return formattedDateTime;
}


export const getFileExtension = (fileName) => {
  return fileName.split('.').pop().toLowerCase();
};