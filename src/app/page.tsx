import Bar from "@/components/Bar";
import Tasks from "@/components/Tasks";
import { GetUser } from "@/data/GetUser";
import { getUserTasks } from "@/data/getUserTasks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ダッシュボード",
  description: "タスク表示ページ",
};

export default async function Home() {
  const user = await GetUser();

  const todos = await getUserTasks(user!.id);

  console.log(user);

  return (
    <>
      <div className="h-screen w-screen bg-yellow-200/40 flex flex-row md:flex-col ">
        <Bar />
        <Tasks todosData={todos?.data} />
      </div>
    </>
  );
}
