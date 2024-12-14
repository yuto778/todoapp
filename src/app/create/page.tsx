import TaakCreate from "@/components/TaskCreate";
import Topbar from "@/components/Topbar";
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
      <div className="h-screen w-screen bg-yellow-200/40 flex flex-row lg:flex-col ">
        <Topbar />
        <TaakCreate user={user} />
      </div>
    </>
  );
};

export default Page;
