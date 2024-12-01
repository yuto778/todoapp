import LoginTop from "@/components/LoginTop";
import Signup from "@/components/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "新規登録",
  description: "SignUp",
};

const Page = () => {
  return (
    <div className="h-screen w-screen bg-yellow-200/40 flex flex-col ">
      <LoginTop />
      <Signup />
    </div>
  );
};

export default Page;
