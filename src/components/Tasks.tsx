"use client";

import React from "react";
import { Input } from "./ui/input";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import TaskDetail from "./TaskDetail";

const Tasks = () => {
  return (
    <>
      <main className="p-10 w-full flex items-center flex-col gap-10 relative overflow-hidden ">
        <h2 className="font-bold text-xl ">Tasks</h2>
        {/* 検索窓フィルターにしたい */}
        <Input className="w-1/2" placeholder="検索できます" />
        <div className="absolute right-10 top-15  ">
          <div className="relative bg-gray-200 p-2 rounded-full ">
            <PlusCircleIcon />
            <Link href={"/create"} className="inset-0 absolute"></Link>
          </div>
        </div>
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-10 overflow-auto p-5
          "
        >
          {[...Array(100)].map((_, index) => (
            <TaskDetail id={index} key={index} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Tasks;
