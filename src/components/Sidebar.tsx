import React from "react";
import { createClient } from "../../lib/client";

const Sidebar = async () => {
  const supabase = createClient();
  const { data } = await supabase.from("test").select("name").single();
  return (
    <div className="w-40 bg-gray-100 h-full flex flex-col items-center lg:hidden py-5 ">
      <h2 className="font-bold text-2xl">Sidebar</h2>
      <h2>{data?.name}</h2>
    </div>
  );
};

export default Sidebar;
