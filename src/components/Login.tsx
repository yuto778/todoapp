"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { LogInFunction } from "@/actions/LogInFunction";

const LoginformSchema = z.object({
  Email: z.string().email(),
  Password: z.string().min(6).max(24),
});

export type LogInFormSchemaType = z.infer<typeof LoginformSchema>;

const Login = () => {
  const router = useRouter();

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
      await LogInFunction(values);
      toast.success("ログイン成功だよ", { id: LoginId });
      router.push("/");
    } catch (e) {
      toast.error("catchでログイン失敗だよ", { id: LoginId });
      console.log(e);
    }
  };

  return (
    <>
      <Toaster />
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="flex flex-col   w-1/2 rounded-lg bg-slate-400/50 space-y-10 px-5 py-10">
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
                      <Input placeholder="shadcn" {...field} type="email" />
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
                    <FormControl>
                      <Input placeholder="shadcn" {...field} type="password" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="self-center">
                Submit
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
