import Bar from "@/components/Bar";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ダッシュボード",
  description: "タスク表示ページ",
};

export default async function Home() {
  return (
    <>
      <div className="h-screen w-screen bg-yellow-200/40 flex flex-row lg:flex-col ">
        <Bar />
        <main className="p-10 w-full flex items-center flex-col gap-10 relative">
          <h2 className="font-bold text-xl ">Tasks</h2>
          {/* 検索窓フィルターにしたい */}
          <Input className="w-1/2" placeholder="検索できます" />
          <div className="absolute right-10 top-15  ">
            <div className="relative bg-gray-200/60 p-2 rounded-full ">
              <PlusCircleIcon />
              <Link href={"/test"} className="inset-0 absolute"></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-10">
            <div className="w-full flex items-center justify-center bg-red-300 rounded-lg h-24">
              hogehoge
            </div>
            <div className="w-full flex items-center justify-center bg-red-300 rounded-lg h-24">
              hogehoge
            </div>
            <div className="w-full flex items-center justify-center bg-red-300 rounded-lg h-24">
              hogehoge
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
