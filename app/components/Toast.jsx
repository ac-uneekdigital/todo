"use client";

import { useEffect, useState } from "react";

//icons
import { FaCheck } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

function Toast({ toast }) {
  const [isShown, setIsShown] = useState(true);
  const iconMap = {
    success: <FaCheck size={32} />,
    warning: <FaExclamationTriangle />,
    error: <FaExclamationCircle />,
  };

  const toastIcon = iconMap[toast.type] || null;

  const stylesMap = {
    success: "bg-teal-300 text-teal-800 rounded-lg",
    warning: "bg-yellow-300 text-yellow-800 rounded-lg",
    error: "bg-red-300 text-red-800 rounded-lg",
  };

  const toastStyle = stylesMap[toast.type] || null;

  return (
    <>
      {isShown && (
        <div className={`${toast.type}`}>
          <div className={toastStyle}>
            <div className="relative h-12 flex gap-3 items-center p-3">
              {toastIcon}
              <p>{toast.message}</p>
              {/* <FaX /> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Toast;
