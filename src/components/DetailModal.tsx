"use client";

import React from "react";
import { Button } from "./ui/button";
import { Trash2Icon, X } from "lucide-react";
import { TaskCompleteFunction } from "@/actions/TaskCompleteFunction";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type DetailProps = {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  phrase: string;
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

const DetailModal: React.FC<DetailProps> = ({ close, task }) => {
  const router = useRouter();

  const completehandle = async () => {
    const loadingId = toast.loading("更新中...");

    try {
      const completeCheck = await TaskCompleteFunction(task.id);

      if (completeCheck.success === true) {
        toast.error("エラーが発生しました", { id: loadingId });
      }

      toast.success("成功したよ", { id: loadingId });

      close(false);
      router.refresh();
    } catch (error) {
      toast.error("エラーが発生しました", { id: loadingId });
      console.log(error);
    }
  };
  return (
    <>
      <Toaster />
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
          <h2 className="text-xl font-bold">タスク名 : {task.title}</h2>
          <h2 className="text-xl font-bold">期日 : {task.due_date}</h2>
          <h2 className="text-xl font-bold">メモ : {task.memo}</h2>
          <div className="relative flex justify-center">
            <Button className="self-center" onClick={completehandle}>
              完了！
            </Button>
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
