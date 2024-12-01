"use server";

import { SignUpFormSchemaType } from "@/components/Signup";
import { createClient } from "../../lib/server";

export const SignUpFunction = async (values: SignUpFormSchemaType) => {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: values.Email,
      password: values.FirstPassword,
    });

    if (error) {
      console.log("authでのエラー", error);
    }

    const { data: Userdata, error: usererror } = await supabase
      .from("Users")
      .insert({ id: user?.id, Email: values.Email, UserName: values.username });

    if (usererror) {
      console.log("Usersに登録時のエラー", usererror);
    } else {
      console.log("登録に成功したよ", Userdata);
    }

    return { success: true, data: Userdata };
  } catch (error) {
    console.log("catchでエラーになったよ", error);
  }
};
