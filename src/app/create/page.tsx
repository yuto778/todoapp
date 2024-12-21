import Bar from "@/components/Bar";
import TaakCreate from "@/components/TaskCreate";
import { GetUser } from "@/data/GetUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "タスク追加",
  description: "タスク追加",
};

const Page = async () => {
  const user = await GetUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <div className="h-screen w-screen bg-yellow-200/40 flex flex-row md:flex-col ">
        <Bar />
        <TaakCreate user={user} />
      </div>
    </>
  );
};

export default Page;
