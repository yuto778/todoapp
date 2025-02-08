"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { LogInFunction } from "@/actions/LogInFunction";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { delay } from "@/data/delay";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const LoginformSchema = z.object({
  Email: z.string().email(),
  Password: z.string().min(6).max(24),
});

export type LogInFormSchemaType = z.infer<typeof LoginformSchema>;

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  const LogInUpform = useForm<LogInFormSchemaType>({
    resolver: zodResolver(LoginformSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const LogInonSubmit = async (values: LogInFormSchemaType) => {
    const LoginId = toast.loading("ログイン中");

    try {
      const result = await LogInFunction(values);
      if (result?.success === false) {
        toast.error("メールアドレスまたはパスワードが間違っています", {
          id: LoginId,
        });
        return;
      } else {
        toast.success("ログイン成功だよ", { id: LoginId });

        await delay(1500);
        router.push("/");
      }
    } catch (e) {
      toast.error("catchでログイン失敗だよ", { id: LoginId });
      console.log(e);
    }
  };

  const showpassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (timerId) clearTimeout(timerId);
    setShowPassword(true);

    const newTimerId = setTimeout(() => {
      setShowPassword(false);
    }, 3000);
    setTimerId(newTimerId);
  };

  return (
    <>
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="flex flex-col  w-3/4  md:w-1/2 rounded-lg bg-slate-400/50 space-y-10 px-5 py-10">
          <Form {...LogInUpform}>
            <form
              onSubmit={LogInUpform.handleSubmit(LogInonSubmit)}
              className="space-y-5 flex flex-col"
            >
              <h2 className="font-bold text-xl">ログイン</h2>
              <FormField
                control={LogInUpform.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>メールアドレス</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="todos@gmail.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={LogInUpform.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>パスワード</FormLabel>
                    <FormControl className="">
                      <div className="relative">
                        <Input
                          placeholder="Todos778"
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="pr-10"
                        />
                        <Button
                          className="absolute right-0 top-0 "
                          onClick={showpassword}
                          variant={"ghost"}
                        >
                          <Eye size={24} />
                        </Button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="self-center">
                ログイン
              </Button>
            </form>
          </Form>
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
