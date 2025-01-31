import Loader from "@/components/ui/Loader";
import React from "react";

const ScreenLoader = () => {
  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center w-full justify-center">
      <Loader />
    </div>
  );
};

export default ScreenLoader;
