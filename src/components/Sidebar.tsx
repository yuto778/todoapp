import { HomeIcon, User2 } from "lucide-react";
import Link from "next/link";
import Logout from "./Logout";
import { Button } from "./ui/button";

const Sidebar = async () => {
  return (
    <div className="w-24 bg-gray-200 h-full flex flex-col items-center md:hidden py-5 ">
      <Link href={"/"} className="font-bold text-2xl">
        Todos
      </Link>
      <h2>yuto778</h2>

      <div className="flex flex-col gap-3 pt-10 ">
        {/* <h2>{data?.Email}</h2> */}

        <Button className="relative self-start" variant="ghost">
          <HomeIcon className="size-10" />
          <Link href={"/"} className="absolute inset-0"></Link>
        </Button>
        <Button className="relative  self-start" variant="ghost">
          <User2 className="size-10" />
          <Link href={"/mypage"} className="absolute inset-0"></Link>
        </Button>
      </div>

      <span className="flex-1"></span>
      <Logout />
    </div>
  );
};

export default Sidebar;
