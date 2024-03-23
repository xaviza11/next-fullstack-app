
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleAlert } from "../../store/actions";

interface CustomAlert {
  status: "success" | "warning" | "error";
  message: string;
}

const CustomAlert = ({ status, message }: CustomAlert) => {
  const dispatch = useDispatch();

  const backgroundColors = {
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  useEffect(() => {
    console.log(status)
    setTimeout(() => {
      dispatch(toggleAlert(false));
    }, 2000);
  });

  const textColor = "text-white";

  const alertClassNames = `${backgroundColors[status]} ${textColor} fixed top-1/4 left-1/2 h-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-lg p-4 rounded-md text-center text-sm font-bold shadow-lg`;

  return (
    <div id="alertComponent" className={alertClassNames} role="alert">
      <h3>{status}</h3>
      <h3>{message}</h3>
    </div>
  );
};

export default CustomAlert;
