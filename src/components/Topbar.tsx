import Link from "next/link";
import Logout from "./Logout";
import { Button } from "./ui/button";

const Topbar = async () => {
  // const user = await GetUser();

  return (
    <>
      <div className="w-full bg-gray-200 h-16  hidden  items-center  lg:flex px-10 ">
        <Link href={"/"} className="font-bold text-2xl">
          Todos
        </Link>
        <span className="flex-1"></span>
        <div className="flex gap-10 items-center">
          {/* <h2>{data?.Email}</h2> */}

          <Button className="relative " variant={"outline"}>
            ダッシュボード
            <Link href={"/"} className="absolute inset-0"></Link>
          </Button>
          <Button className="relative" variant={"outline"}>
            マイページ
            <Link href={"/mypage"} className="absolute inset-0"></Link>
          </Button>
          <Logout />
        </div>
      </div>
    </>
  );
};

export default Topbar;
