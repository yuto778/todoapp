"use server";

import { UpdateUserNameFormSchemaType } from "@/components/UserNameChangeModal";
import { createClient } from "../../lib/server";

export const UpdateUserNameFunction = async (
  values: UpdateUserNameFormSchemaType,
  Id: string
) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("Users")
      .update({ UserName: values.username })
      .eq("id", Id)
      .select();

    console.log(values.username, Id);

    if (error) {
      console.log("ユーザーネームの更新に失敗しました", error);
    }

    if (data) {
      console.log(data, "成功したよ");
    }
  } catch (error) {
    console.log("catchでのエラー", error);
  }
};
