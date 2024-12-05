"use server";

import { cache } from "react";
import { createClient } from "../../lib/server";
import { redirect } from "next/navigation";

export const GetUser = cache(async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user && error) {
    console.log("userがないためloginへリダイレクトします");
    redirect("/login");
  }

  return user;
});
