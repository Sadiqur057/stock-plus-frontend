"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.2 });

export default function NProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start(); 

    const handleStop = () => {
      NProgress.done(); 
    };

    const timeout = setTimeout(handleStop, 500);

    return () => {
      clearTimeout(timeout);
      NProgress.done(); 
    };
  }, [pathname, searchParams]); 

  return null;
}
