import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default async function Home() {
  return (
    <>
      <div className="h-screen w-screen bg-yellow-200/40 flex flex-col ">
        <Topbar />
        <Sidebar />
      </div>
    </>
  );
}
