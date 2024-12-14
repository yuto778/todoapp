"use client";

import { z } from "zod";
import BackPage from "./BackPage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { TaskCreateFunction } from "@/actions/TaskCreateFunction";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface TaskCreateProps {
  user: User | null;
}

const TaskCreateformSchema = z.object({
  title: z.string().min(2).max(50),
  due_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  priority: z.string(),
  memo: z.string(),
});

export type TaskCreateFormSchemaType = z.infer<typeof TaskCreateformSchema>;

const TaakCreate: React.FC<TaskCreateProps> = ({ user }) => {
  const router = useRouter();
  const TaskCreateform = useForm<TaskCreateFormSchemaType>({
    resolver: zodResolver(TaskCreateformSchema),
    defaultValues: {
      title: "",
      due_date: "",
      priority: "",
      memo: "",
    },
  });

  const TaskCreateonSubmit = async (values: TaskCreateFormSchemaType) => {
    const task = await TaskCreateFunction(values, user!.id);

    const loadingId = toast.loading("登録中");
    if (task.success === false) {
      toast.error("エラーが発生しました", { id: loadingId });
    }

    toast.success("成功しました", { id: loadingId });
    TaskCreateform.reset();
    router.prefetch("/");
  };
  return (
    <>
      <main className="p-10 w-full flex-1 flex items-center  flex-col relative ">
        <BackPage className={"top-10 left-10 "} />
        <div className="h-full w-1/2 flex flex-col  bg-slate-400/50 shadow-lg rounded-lg  p-10 space-y-10 animate-opacity">
          <Form {...TaskCreateform}>
            <form
              onSubmit={TaskCreateform.handleSubmit(TaskCreateonSubmit)}
              className="space-y-10 flex flex-col"
            >
              <h2 className="font-bold text-xl">新規登録</h2>
              <FormField
                control={TaskCreateform.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col ">
                    <FormLabel className="text-xl ">タスク名</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center gap-5">
                <FormField
                  control={TaskCreateform.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem className="w-1/2 ">
                      <FormLabel className="text-xl">期日</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="shadcn"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={TaskCreateform.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-1/2">
                      <FormLabel className="text-xl">重要度</FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger className="">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent className="text-xl">
                            <SelectGroup>
                              <SelectItem value="normal">普通</SelectItem>
                              <SelectItem value="important">重要</SelectItem>
                              <SelectItem value="veryimportant">
                                最重要
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={TaskCreateform.control}
                name="memo"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-xl">メモ</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="self-center">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  );
};

export default TaakCreate;
