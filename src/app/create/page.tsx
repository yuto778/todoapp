import TaakCreate from "@/components/TaakCreate";
import Topbar from "@/components/Topbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "タスク追加",
  description: "タスク追加",
};

const Page = () => {
  return (
    <>
      <div className="h-screen w-screen bg-yellow-200/40 flex flex-row lg:flex-col ">
        <Topbar />
        <TaakCreate />
      </div>
    </>
  );
};

export default Page;
