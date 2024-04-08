import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleAlert } from "../../store/actions";
import Image from "next/image";
import warning from "../app/assets/img/exclamation_warning_15590.png";
import error from "../app/assets/img/delete_icon-icons.com_74434.png"
import success from "../app/assets/img/accept_icon-icons.com_74428.png"

interface CustomAlert {
  status: "success" | "warning" | "error";
  message: string;
}

const CustomAlert = ({ status, message }: CustomAlert) => {
  const dispatch = useDispatch();

  const borderColor = {
    success: "border-4 border-green-500",
    warning: "border-4 border-yellow-500",
    error: "border-4 border-red-500",
  };

  const image = {
    success: success,
    error: error,
    warning: warning
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(toggleAlert(false));
    }, 2000);
  });

  const textColor = "text-white";

  const alertClassNames = `${borderColor[status]} ${textColor} z-50 rounded-md text-center text-sm font-bold shadow-lg bg-white flex items-center justify-center flex-col w-[55vh] h-[60vh]`;

  return (
    <div className="fixed z-50 bg-white flex items-center justify-center flex-col w-full h-full bg-opacity-75">
      <div id="alertComponent" className={alertClassNames} role="alert">
        <Image src={image[status]} alt="warning" className="z-0" />
        <h3 className="text-black mt-4">{message}</h3>
      </div>
    </div>
  );
};

export default CustomAlert;
