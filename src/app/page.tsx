import { redirect } from "next/navigation";
import { createClient } from "../../lib/client";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.from("test").select("*").single();

  if (error) {
    redirect("/");
  }
  return (
    <>
      <div className="h-screen w-screen bg-yellow-200/40 flex flex-col ">
        <Topbar />
        <Sidebar />
      </div>
    </>
  );
}
