"use server";

import { LogInFormSchemaType } from "@/components/Login";
import { createClient } from "../../lib/server";

export const LogInFunction = async (values: LogInFormSchemaType) => {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: LoginError,
    } = await supabase.auth.signInWithPassword({
      email: values.Email,
      password: values.Password,
    });

    if (LoginError) throw LoginError;

    console.log(user);

    return { data: user };
  } catch (error) {
    console.log(error);
  }
};
