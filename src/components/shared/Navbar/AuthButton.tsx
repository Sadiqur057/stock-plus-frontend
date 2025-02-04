import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

const AuthButton = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("stock_plus");
  return (
    <>
      {token ? (
        <li>
          <Link href={"/dashboard"}>
            <Button>Dashboard</Button>
          </Link>
        </li>
      ) : (
        <>
          <li className="flex gap-4">
            <Link href={"/login"}>
              <Button size="lg" variant="outline">Login</Button>
            </Link>

            <Link href={"/Register"}>
              <Button size="lg">Register</Button>
            </Link>
          </li>{" "}
        </>
      )}
    </>
  );
};

export default AuthButton;
