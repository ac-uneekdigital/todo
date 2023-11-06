"use client";

import { useState } from "react";

function Toast({ toast }) {
  const [toastStyles, setToastStyles] = useState({
    background: "bg-gray-300",
  });

  console.log(toast);

  //   if ((toast.title = "add")) {
  //     setToastStyles({ background: "bg-teal-500" });
  //   }

  return <div className={toastStyles.background}>something</div>;
}
export default Toast;
