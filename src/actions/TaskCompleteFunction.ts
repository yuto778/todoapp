"use server";

import { createClient } from "../../lib/server";

export const TaskCompleteFunction = async (taskId: number) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("todos")
      .update({ completed: true })
      .eq("id", taskId)
      .select();

    if (!data || error) {
      console.log("エラーが発生しました", error);
    }

    console.log(data);

    return { success: true, message: "成功したよ" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "catchで失敗しました" };
  }
};
