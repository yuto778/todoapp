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
          "w-full flex  items-center justify-center rounded-lg h-24 min-h-24 hover:scale-105 transition cursor-pointer shadow-lg hover:shadow-none relative",
          className
        )}
        onClick={modalopen}
      >
        <h2>{task.title}</h2>
        <h4 className="absolute bottom-3 right-5 text-gray-600/70">
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
