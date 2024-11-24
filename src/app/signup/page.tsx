import LoginTop from "@/components/LoginTop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "新規登録",
  description: "SignUp",
};

const Page = () => {
  return (
    <div className="h-screen w-screen bg-yellow-200/40 flex flex-row lg:flex-col ">
      <LoginTop />
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="flex flex-col   w-1/2 rounded-lg bg-slate-400/50 space-y-10 px-5 py-10">
          <Input placeholder="ユーザー名" />
          <Input placeholder="メールアドレス" />
          <Input placeholder="パスワード" />
          <Input placeholder="パスワード確認用" />
          <Button variant={"outline"} className="self-center">
            ログイン
          </Button>
          <Link
            href={"/login"}
            className="self-center underline underline-offset-2 text-black/60"
          >
            ログインはこちら
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Page;
