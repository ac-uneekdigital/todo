"use client";

import { useState } from "react";

//icons
import { FaCheck } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

function Toast({ toast }) {
  const iconMap = {
    success: <FaCheck />,
    warning: <FaExclamationTriangle />,
    error: <FaExclamationCircle />,
  };

  const toastIcon = iconMap[toast.type] || null;

  const [toastStyles, setToastStyles] = useState({
    background: "bg-gray-300",
  });

  const stylesMap = {
    success: "bg-green-300 text-green-800",
    warning: "bg-yellow-300 text-yellow-800",
    error: "bg-red-300 text-red-800",
  };

  const toastStyle = stylesMap[toast.type] || null;

  return (
    <div className={`${toast.type}`}>
      <div className={toastStyle}>
        {toastIcon}
        <p>{toast.message}</p>
        <FaX />
      </div>
    </div>
  );
}
export default Toast;
