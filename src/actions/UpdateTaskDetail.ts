"use server";

import { DetailModalFormSchemaType } from "@/components/DetailModal";
import { createClient } from "../../lib/server";

export const UpdateTaskDetail = async (
  values: DetailModalFormSchemaType,
  task_id: number
) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("todos")
      .update({
        title: values.title,
        due_date: values.due_date,
        memo: values.memo,
      })
      .eq("id", task_id)
      .select();

    if (!data || error) {
      console.log("エラーが発生したよ");
      return { success: false, message: "失敗です" };
    }
    console.log(data);

    return { success: true, message: "成功です" };
  } catch (error) {
    console.log("catchでエラーが発生したよ", error);
    return { success: false, message: "失敗です" };
  }
};
