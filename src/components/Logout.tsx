"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { createClient } from "../../lib/client";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

const Logout = () => {
  const router = useRouter();

  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.refresh();
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative hidden md:block"
        onClick={handleLogout}
      >
        ログアウト
        <Link href={"/login"} className="absolute inset-0 "></Link>
      </Button>
      <Button
        variant="outline"
        className="relative block md:hidden"
        onClick={handleLogout}
      >
        <LogOutIcon />
        <Link href={"/login"} className="absolute inset-0 "></Link>
      </Button>
    </>
  );
};

export default Logout;
