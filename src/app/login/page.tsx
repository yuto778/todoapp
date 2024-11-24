import Login from "@/components/Login";
import LoginTop from "@/components/LoginTop";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン",
  description: "LogIn",
};

const Page = () => {
  return (
    <div className="h-screen w-screen bg-yellow-200/40 flex flex-col ">
      <LoginTop />

      <Login />
    </div>
  );
};

export default Page;
