"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const success = () => {
    router.push("/");
  };
  return (
    <>
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="flex flex-col   w-1/2 rounded-lg bg-slate-400/50 space-y-10 px-5 py-10">
          <Input placeholder="メールアドレス" />
          <Input placeholder="パスワード" />
          <Button variant={"outline"} className="self-center" onClick={success}>
            ログイン
          </Button>
          <Link
            href={"/signup"}
            className="self-center underline underline-offset-2 text-black/60"
          >
            新規登録はこちら
          </Link>
        </div>
      </main>
    </>
  );
};

export default Login;
