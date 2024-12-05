"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type BackPageProps = {
  className: string;
};

const BackPage: React.FC<BackPageProps> = ({ className }) => {
  const router = useRouter();

  const back = () => {
    router.back();
  };
  return (
    <>
      <div
        className={cn(
          "absolute p-2  rounded-full hover:scale-110 transition bg-gray-200 cursor-pointer",
          className
        )}
        onClick={back}
      >
        <ArrowLeft />
      </div>
    </>
  );
};

export default BackPage;
