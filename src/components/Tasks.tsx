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
        <div className="absolute right-10 top-15  ">
          <div className="relative bg-gray-200 p-2 rounded-full ">
            <PlusCircleIcon />
            <Link href={"/create"} className="inset-0 absolute"></Link>
          </div>
        </div>

        <div className="flex-1 flex w-full pt-5 pb-10 gap-10 overflow-hidden">
          <div className="bg-red-200 rounded-md w-1/3 flex flex-col pt-5 px-10">
            <h2 className="text-lg font-bold">最重要</h2>
            <div className="flex-1  flex flex-col gap-8 pt-5 pb-10 px-5    overflow-auto">
              {veryimportant.length === 0 ? (
                <h2 className="self-center pt-10">まだタスクがありません</h2>
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
          <div className="bg-orange-200 rounded-md w-1/3 flex flex-col px-10 pt-5 shadow-xl overflow-hidden">
            <h2 className="text-lg font-bold">重要</h2>
            <div className="flex-1  flex flex-col gap-8 pt-5 pb-10 px-5   overflow-auto">
              {important.length === 0 ? (
                <h2 className="self-center pt-10">まだタスクがありません</h2>
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
          <div className="bg-blue-200 w-1/3 rounded-md h-full  flex flex-col px-10 pt-5 shadow-xl  overflow-hidden     ">
            <h2 className="text-lg font-bold">普通</h2>
            <div className="flex-1  flex flex-col gap-8 pt-5 pb-10  px-5  overflow-auto">
              {normal.length === 0 ? (
                <h2 className="self-center pt-10">まだタスクがありません</h2>
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
