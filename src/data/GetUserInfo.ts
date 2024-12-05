"use server";

import { cache } from "react";
import { createClient } from "../../lib/server";
import { User } from "@supabase/supabase-js";

export const GetUserInfo = cache(async (user: User) => {
  const supabase = await createClient();

  const { data } = await supabase
    .from("Users")
    .select("id,UserName,Email")
    .eq("id", user?.id)
    .single();

  return data;
});
