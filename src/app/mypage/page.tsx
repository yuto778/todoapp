import Bar from "@/components/Bar";
import Mypage from "@/components/Mypage";
import { GetUser } from "@/data/GetUser";
import { GetUserInfo } from "@/data/GetUserInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "マイページ",
  description: "マイページで各種変更ができます",
};

const Page = async () => {
  const user = await GetUser();

  const data = await GetUserInfo(user!);
  return (
    <>
      <div className="h-screen w-screen bg-yellow-200/40 flex flex-row md:flex-col ">
        <Bar />
        <Mypage data={data!} />
      </div>
    </>
  );
};

export default Page;
