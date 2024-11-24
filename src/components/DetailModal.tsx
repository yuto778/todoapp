"use client";

import React from "react";
import { Button } from "./ui/button";
import { Trash2Icon, X } from "lucide-react";

type DetailProps = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  phrase: string;
};

const DetailModal: React.FC<DetailProps> = ({ close, phrase }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
        onClick={() => close(false)}
      >
        <div
          className="bg-white p-10 rounded-lg w-3/4 md:w-1/2  overflow-auto relative flex flex-col space-y-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute p-2 rounded-full right-5 top-5 bg-slate-400/70 hover:scale-110 transition cursor-pointer"
            onClick={() => close(false)}
          >
            <X />
          </div>
          <h2 className="text-xl font-bold">タスク名 : {phrase}</h2>
          <h2 className="text-xl font-bold">期日 : </h2>
          <h2 className="text-xl font-bold">重要度</h2>
          <h2 className="text-xl font-bold">メモ :</h2>
          <div className="relative flex justify-center">
            <Button className="self-center">完了！</Button>
            <div className="absolute p-2 rounded-full right-0 bg-red-600/70 hover:scale-110 transition cursor-pointer ">
              <Trash2Icon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailModal;
