"use client";

import { TaskCompleteFunction } from "@/actions/TaskCompleteFunction";
import { delay } from "@/data/delay";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine, PenOffIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "./ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { UpdateTaskDetail } from "@/actions/UpdateTaskDetail";

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

const DetailModalformSchema = z.object({
  title: z.string().min(2).max(50),
  due_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  memo: z.string(),
});

export type DetailModalFormSchemaType = z.infer<typeof DetailModalformSchema>;

const DetailModal: React.FC<DetailProps> = ({ close, task }) => {
  const [Fixedtodo, setFixedtodo] = useState<boolean>(false);
  const router = useRouter();

  const DetailModalform = useForm<DetailModalFormSchemaType>({
    resolver: zodResolver(DetailModalformSchema),
    defaultValues: {
      title: task.title,
      due_date: task.due_date,
      memo: task.memo!,
    },
  });

  const completehandle = async () => {
    const loadingId = toast.loading("更新中...");

    try {
      const completeCheck = await TaskCompleteFunction(task.id);

      if (completeCheck.success === false) {
        toast.error("エラーが発生しました", { id: loadingId });
      }

      toast.success("成功したよ", { id: loadingId });

      await delay(1500);

      close(false);
      router.refresh();
    } catch (error) {
      toast.error("エラーが発生しました", { id: loadingId });
      console.log(error);
    }
  };

  const UpdateTask = async (values: DetailModalFormSchemaType) => {
    const loadingId = toast.loading("更新中");
    const result = await UpdateTaskDetail(values, task.id);
    if (result.success) {
      toast.success("更新に成功しました", { id: loadingId });
      setFixedtodo(!Fixedtodo);
      router.refresh();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 animate-opacity"
        onClick={() => close(false)}
      >
        <div
          className="bg-white p-8 rounded-lg w-3/4 md:w-1/2  overflow-auto relative flex flex-col space-y-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute  top-5 right-5 flex gap-5">
            <div
              className={cn(
                " p-2 rounded-full  bg-slate-400/70 hover:scale-110 transition cursor-pointer",
                Fixedtodo && "bg-yellow-400/70"
              )}
              onClick={() => setFixedtodo(!Fixedtodo)}
            >
              {Fixedtodo ? <PenOffIcon /> : <PenLine />}
            </div>
            <div
              className=" p-2 rounded-full  bg-slate-400/70 hover:scale-110 transition cursor-pointer"
              onClick={() => close(false)}
            >
              <X />
            </div>
          </div>

          <Form {...DetailModalform}>
            <form
              onSubmit={DetailModalform.handleSubmit(UpdateTask)}
              className="space-y-10 flex flex-col"
            >
              <h2 className="font-bold text-xl">詳細</h2>
              <FormField
                control={DetailModalform.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel className="text-xl ">タスク名</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="部屋の掃除"
                        {...field}
                        disabled={Fixedtodo ? false : true}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center gap-5">
                <FormField
                  control={DetailModalform.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem className="w-1/2 ">
                      <FormLabel className="text-xl">期日</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="2025年1月10日
                          "
                          value={field.value || ""}
                          disabled={Fixedtodo ? false : true}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={DetailModalform.control}
                name="memo"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-xl">メモ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="隅々まで"
                        {...field}
                        disabled={Fixedtodo ? false : true}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {Fixedtodo ? (
                <Button type="submit" className="self-center">
                  編集
                </Button>
              ) : (
                <Button
                  type="button"
                  className="self-center bg-red-600 hover:bg-red-800
                  "
                  onClick={completehandle}
                >
                  完了！
                </Button>
              )}
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default DetailModal;
