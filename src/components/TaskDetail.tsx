"use client";
import React, { useState } from "react";
import DetailModal from "./DetailModal";

type taskdetailprops = {
  id: number;
};

const TaskDetail: React.FC<taskdetailprops> = ({ id }) => {
  const [DetailModalopen, setDetailModalopen] = useState<boolean>(false);

  const modalopen = () => {
    setDetailModalopen(true);
  };

  return (
    <>
      <div
        key={id}
        className="w-full flex items-center justify-center bg-red-300 rounded-lg h-24 hover:scale-105 transition cursor-pointer shadow-2xl hover:shadow-none"
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
