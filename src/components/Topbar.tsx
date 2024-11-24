import React from "react";
import { createClient } from "../../lib/client";

const Topbar = async () => {
  const supabase = createClient();

  const { data } = await supabase.from("test").select("name").single();
  return (
    <>
      <div className="w-full bg-gray-200 h-16  hidden  items-center  lg:flex px-10 ">
        <h2 className="font-bold text-2xl">Todo</h2>
        <span className="flex-1"></span>
        <h2 className="font-thin text-xl">{data?.name}</h2>
      </div>
    </>
  );
};

export default Topbar;
