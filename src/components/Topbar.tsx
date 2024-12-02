import Link from "next/link";
import Logout from "./Logout";
import { createClient } from "../../lib/server";

const Topbar = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data } = await supabase
    .from("Users")
    .select("UserName")
    .eq("id", user?.id)
    .single();
  return (
    <>
      <div className="w-full bg-gray-200 h-16  hidden  items-center  lg:flex px-10 ">
        <h2 className="font-bold text-2xl">Todo</h2>
        <span className="flex-1"></span>
        <div className="flex gap-10 items-center">
          <h2>{data?.UserName}</h2>
          <Link href={"/"}>ダッシュボード</Link>

          <Logout />
        </div>
      </div>
    </>
  );
};

export default Topbar;
