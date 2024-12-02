import Bar from "@/components/Bar";
import Tasks from "@/components/Tasks";
import { Metadata } from "next";
import { createClient } from "../../lib/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ダッシュボード",
  description: "タスク表示ページ",
};

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await (await supabase).auth.getUser();

  if (!user || error) {
    console.log("userがないためloginへリダイレクトします");

    return redirect("/login");
  }

  console.log(user);

  return (
    <>
      <div className="h-screen w-screen bg-yellow-200/40 flex flex-row lg:flex-col ">
        <Bar />
        <Tasks />
      </div>
    </>
  );
}
