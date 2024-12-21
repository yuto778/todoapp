"use server";

import { createClient } from "../../lib/server";

export const getUserTasks = async (userId: string) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!data || error) {
      console.log("データの取得に失敗した", error);
    }

    return { success: true, message: "データの取得に成功したよ", data };
  } catch (error) {
    console.log("catchでエラーが発生したよ", error);
  }
};
