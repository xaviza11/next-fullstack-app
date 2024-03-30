import Navbar from "@/components/Navbar";
import React from "react";
import background from "../../assets/img/double-decker-2795557_1920.jpg";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Navbar />
      <Image
        src={background}
        alt="background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      {children}
    </div>
  );
};

export default LoginLayout;
