"use server";

import { UpdateEmailFormSchemaType } from "@/components/EmailChangeModal";
import { createClient } from "../../lib/server";

export const UpdateEmailFunction = async (
  values: UpdateEmailFormSchemaType,
  Id: string
) => {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.updateUser({
      email: values.email,
    });

    console.log(user);

    if (error && !user) {
      console.log("エラーが発生したよ", error);
    } else {
      console.log("ユーザーの情報だよ", user);
      const { data: Userdata, error: UserError } = await supabase
        .from("Users")
        .update({ Email: values.email })
        .eq("id", Id)
        .select();

      if (UserError && !Userdata) {
        console.log("更新に失敗したよ");
      }

      if (Userdata) {
        console.log("更新に成功したよ", Userdata);
      }
    }
  } catch (error) {
    console.log("catchで失敗したよ", error);
  }
};
