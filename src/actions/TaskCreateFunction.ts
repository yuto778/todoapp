"use server";

import { TaskCreateFormSchemaType } from "@/components/TaskCreate";
import { createClient } from "../../lib/server";

export const TaskCreateFunction = async (
  values: TaskCreateFormSchemaType,
  userId: string
) => {
  const supabase = await createClient();

  const priorityMapping: { [key: string]: number } = {
    veryimportant: 1,
    important: 2,
    normal: 3, // Assuming '普通' is another priority level
  };

  const priorityNumber = priorityMapping[values.priority] || 3;

  try {
    const { data, error } = await supabase.from("todos").insert({
      title: values.title,
      due_date: values.due_date,
      priority: priorityNumber,
      user_id: userId,
      memo: values.memo,
    });

    if (!data || error) {
      console.log("エラーが発生しました", data, error);
      return { success: false, message: "失敗しました" };
    }

    console.log("タスクの登録に成功しました");
    return { success: true, message: "成功です" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "catchで失敗しました" };
  }
};
