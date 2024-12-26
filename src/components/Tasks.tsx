"use client";

import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import TaskDetail from "./TaskDetail";

interface Tasks {
  todosData:
    | {
        completed: boolean;
        created_at: string;
        due_date: string;
        id: number;
        memo: string | null;
        priority: number;
        title: string;
        user_id: string;
      }[]
    | null
    | undefined;
}

const Tasks: React.FC<Tasks> = ({ todosData }) => {
  const veryimportant: typeof todosData = [];
  const important: typeof todosData = [];
  const normal: typeof todosData = [];

  todosData?.forEach((task) => {
    if (task.priority === 1 && task.completed === false) {
      veryimportant.push(task);
    } else if (task.priority === 2 && task.completed === false) {
      important.push(task);
    } else if (task.priority === 3 && task.completed === false) {
      normal.push(task);
    }
  });

  return (
    <>
      <main className="pt-10 px-10 pb-0 w-full h-full  flex items-center flex-col gap-10 relative overflow-hidden ">
        <h2 className="font-bold text-2xl ">Tasks</h2>
        {/* 検索窓フィルターにしたい */}
        {/* <Input className="w-1/2" placeholder="検索できます" /> */}
        <div className="absolute right-10 top-15 animate-opacity hover:scale-110 transition  ">
          <div className="relative bg-gray-200 p-2 rounded-full ">
            <PlusCircleIcon />
            <Link href={"/create"} className="inset-0 absolute"></Link>
          </div>
        </div>

        <div className="flex-1 flex-col flex md:flex-row w-full pt-5 pb-10 md:gap-10 space-y-16 md:space-y-0  overflow-hidden ">
          <div className="bg-red-200 rounded-md md:w-1/3 w-full flex flex-col pt-5 md:px-6 lg:px-10  px-3 animate-opacity">
            <h2 className="text-lg font-bold">最重要 {veryimportant.length}</h2>
            <div className="flex-1  flex md:flex-col flex-row  md:gap-8 gap-3 md:pt-5 px-2 pt-4 pb-5   lg:px-5 md:px-0 overflow-x-auto">
              {veryimportant.length === 0 ? (
                <h2 className="self-center px-6 md:px-0 md:pt-10 pt-2 md:text-lg text-sm">
                  まだタスクがありません
                </h2>
              ) : (
                veryimportant.map((task, i) => (
                  <TaskDetail
                    id={i}
                    key={i}
                    className={"bg-red-500/60"}
                    task={task}
                  />
                ))
              )}
            </div>
          </div>
          <div className="bg-orange-200 rounded-md md:w-1/3 w-full flex flex-col pt-5 md:px-10 px-3 animate-opacity">
            <h2 className="text-lg font-bold">重要 {important.length}</h2>
            <div
              className="flex-1  flex md:flex-col flex-row  md:gap-8 gap-3 md:pt-5 pt-3 pb-10 md:px-5 px-2    overflow-auto
            "
            >
              {important.length === 0 ? (
                <h2 className="self-center px-6 md:px-0 md:pt-10 pt-2 md:text-lg text-sm ">
                  まだタスクがありません
                </h2>
              ) : (
                important.map((task, i) => (
                  <TaskDetail
                    id={i}
                    key={i}
                    className="bg-orange-500/60"
                    task={task}
                  />
                ))
              )}
            </div>
          </div>
          <div className="bg-blue-200 rounded-md md:w-1/3 w-full flex flex-col pt-5 md:px-10 px-3 animate-opacity">
            <h2 className="text-lg font-bold">普通 {normal.length}</h2>
            <div className="flex-1  flex md:flex-col flex-row  md:gap-8 gap-3 md:pt-5 pt-3 pb-10 md:px-5 px-2    overflow-auto">
              {normal.length === 0 ? (
                <h2 className="self-center px-6 md:px-0 md:pt-10 pt-2 md:text-lg text-sm">
                  まだタスクがありません
                </h2>
              ) : (
                normal.map((task, i) => (
                  <TaskDetail
                    id={i}
                    key={i}
                    className="bg-blue-500/60"
                    task={task}
                  />
                ))
              )}
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
