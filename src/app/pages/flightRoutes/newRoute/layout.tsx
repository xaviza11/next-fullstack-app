import Navbar from "@/components/Navbar";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Navbar />
      {children}
    </div>
  );
};

export default LoginLayout;
