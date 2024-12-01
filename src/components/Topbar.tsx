import Link from "next/link";
import { Button } from "./ui/button";

const Topbar = async () => {
  return (
    <>
      <div className="w-full bg-gray-200 h-16  hidden  items-center  lg:flex px-10 ">
        <h2 className="font-bold text-2xl">Todo</h2>
        <span className="flex-1"></span>
        <div className="flex gap-10 items-center">
          <Link href={"/"}>ダッシュボード</Link>

          <Button variant={"ghost"} className="relative">
            ログアウト
            <Link href={"/login"} className="absolute inset-0 "></Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Topbar;
