"use client";

import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import TaskDetail from "./TaskDetail";

const Tasks = () => {
  return (
    <>
      <main className="p-10 w-full h-full  flex items-center flex-col gap-10 relative overflow-hidden ">
        <h2 className="font-bold text-xl ">Tasks</h2>
        {/* 検索窓フィルターにしたい */}
        <Input className="w-1/2" placeholder="検索できます" />
        <div className="absolute right-10 top-15  ">
          <div className="relative bg-gray-200 p-2 rounded-full ">
            <PlusCircleIcon />
            <Link href={"/create"} className="inset-0 absolute"></Link>
          </div>
        </div>

        <div className="flex-1 flex w-full p-10 gap-10 overflow-hidden">
          <div className="bg-red-200 w-1/3 flex flex-col pt-5 px-10">
            <h2 className="text-lg font-bold">重要</h2>
            <div className="flex-1 border flex flex-col gap-5 pt-5 pb-10 px-2    overflow-auto">
              {[...Array(1)].map((_, i) => (
                <TaskDetail id={i} key={i} />
              ))}
            </div>
          </div>
          <div className="bg-orange-200 w-1/3 flex flex-col px-10 pt-5 overflow-hidden">
            <h2 className="text-lg font-bold"> 中</h2>
            <div className="flex-1 border flex flex-col gap-5 pt-5 pb-10 px-2    overflow-auto">
              {[...Array(6)].map((_, i) => (
                <TaskDetail id={i} key={i} />
              ))}
            </div>
          </div>
          <div className="bg-yellow-100 w-1/3 h-full  flex flex-col px-10 pt-5 overflow-hidden     ">
            <h2 className="text-lg font-bold">低い</h2>
            <div className="flex-1 border flex flex-col gap-5 pt-5 pb-10  px-2  overflow-auto">
              {[...Array(30)].map((_, i) => (
                <TaskDetail id={i} key={i} />
              ))}
            </div>
          </div>
        </div>
        {/* <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-10 overflow-auto p-5
          "
        >
          {[...Array(5)].map((_, index) => (
            <TaskDetail id={index} key={index} />
          ))}
        </div> */}
      </main>
    </>
  );
};

export default Tasks;
