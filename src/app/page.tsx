import Bar from "@/components/Bar";
import Tasks from "@/components/Tasks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ダッシュボード",
  description: "タスク表示ページ",
};

export default async function Home() {
  return (
    <>
      <div className="h-screen w-screen bg-yellow-200/40 flex flex-row lg:flex-col ">
        <Bar />
        <Tasks />
      </div>
    </>
  );
}
