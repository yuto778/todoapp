"use client";
import React, { useState } from "react";
import DetailModal from "./DetailModal";
import { cn } from "@/lib/utils";

type taskdetailprops = {
  id: number;
  className?: string;
};

const TaskDetail: React.FC<taskdetailprops> = ({ id, className }) => {
  const [DetailModalopen, setDetailModalopen] = useState<boolean>(false);

  const modalopen = () => {
    setDetailModalopen(true);
  };

  return (
    <>
      <div
        key={id}
        className={cn(
          "w-full flex items-center justify-center rounded-lg h-24 min-h-24 hover:scale-105 transition cursor-pointer shadow-lg hover:shadow-none",
          className
        )}
        onClick={modalopen}
      >
        hogehoge
      </div>
      {DetailModalopen && (
        <DetailModal close={setDetailModalopen} phrase={"hogehoge"} />
      )}
    </>
  );
};

export default TaskDetail;
