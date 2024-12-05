import { GetUser } from "@/data/GetUser";
import { GetUserInfo } from "@/data/GetUserInfo";
import Link from "next/link";
import Logout from "./Logout";

const Topbar = async () => {
  const user = await GetUser();

  const data = await GetUserInfo(user!);

  // const { data } = await supabase
  //   .from("Users")
  //   .select("UserName")
  //   .eq("id", user?.id)
  //   .single();
  return (
    <>
      <div className="w-full bg-gray-200 h-16  hidden  items-center  lg:flex px-10 ">
        <h2 className="font-bold text-2xl">Todo</h2>
        <span className="flex-1"></span>
        <h2>{data?.Email}</h2>
        <div className="flex gap-10 items-center">
          <Link href={"/mypage"}>{data?.UserName}</Link>

          <Link href={"/"}>ダッシュボード</Link>

          <Logout />
        </div>
      </div>
    </>
  );
};

export default Topbar;
