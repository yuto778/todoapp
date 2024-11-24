import { Button } from "./ui/button";

const Sidebar = async () => {
  return (
    <div className="w-40 bg-gray-200 h-full flex flex-col items-center lg:hidden py-5 ">
      <h2 className="font-bold text-2xl">Sidebar</h2>
      <h2>yuto778</h2>
      <span className="flex-1"></span>
      <Button variant={"ghost"}>ログアウト</Button>
    </div>
  );
};

export default Sidebar;
