"use client";
import React, { useState } from "react";
import DetailModal from "./DetailModal";
import { cn } from "@/lib/utils";

type taskdetailprops = {
  id: number;
  className?: string;
  task: {
    completed: boolean;
    created_at: string;
    due_date: string;
    id: number;
    memo: string | null;
    priority: number;
    title: string;
    user_id: string;
  };
};

const TaskDetail: React.FC<taskdetailprops> = ({ id, className, task }) => {
  const [DetailModalopen, setDetailModalopen] = useState<boolean>(false);

  const modalopen = () => {
    setDetailModalopen(true);
  };

  return (
    <>
      <div
        key={id}
        className={cn(
          " flex  items-center justify-center rounded-lg min-h-24  min-w-40 md:w-full  hover:scale-105 transition cursor-pointer shadow-lg hover:shadow-none relative animate-slide-in-left",
          className
        )}
        onClick={modalopen}
      >
        <h2 className="text-sm lg:text-base md:text-sm truncate">
          {task.title}
        </h2>
        <h4 className="absolute md:bottom-3 md:right-5 bottom-2 right-2 md:text-base text-xs text-gray-600/70">
          {task.due_date}
        </h4>
      </div>
      {DetailModalopen && (
        <DetailModal
          close={setDetailModalopen}
          phrase={"hogehoge"}
          task={task}
        />
      )}
    </>
  );
};

export default TaskDetail;
