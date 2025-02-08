"use client";

import { SignUpFunction } from "@/actions/SignUpFunction";
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
import { delay } from "@/data/delay";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const SignupformSchema = z
  .object({
    username: z.string().min(2).max(50),
    Email: z.string().email(),
    FirstPassword: z.string().min(6).max(24),
    SecondPassword: z.string().min(6).max(24),
  })
  .superRefine((data, ctx) => {
    if (data.FirstPassword !== data.SecondPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "パスワードが一致しません",
        path: ["SecondPassword"],
      });
    }
  });

export type SignUpFormSchemaType = z.infer<typeof SignupformSchema>;

const Signup = () => {
  const router = useRouter();
  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  const showFirstpassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 既存のタイマーをクリア
    if (timerId) clearTimeout(timerId);
    setShowFirstPassword(true);
    // 新しいタイマーを設定
    const newTimerId = setTimeout(() => {
      setShowFirstPassword(false);
    }, 1500);
    setTimerId(newTimerId);
  };

  const showSecondpassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 既存のタイマーをクリア
    if (timerId) clearTimeout(timerId);
    setShowSecondPassword(true);
    // 新しいタイマーを設定
    const newTimerId = setTimeout(() => {
      setShowSecondPassword(false);
    }, 1500);
    setTimerId(newTimerId);
  };

  const SignUpform = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignupformSchema),
    defaultValues: {
      username: "",
      Email: "",
      FirstPassword: "",
      SecondPassword: "",
    },
  });

  const SignUponSubmit = async (values: SignUpFormSchemaType) => {
    if (values.FirstPassword !== values.SecondPassword) {
      SignUpform.resetField("FirstPassword", { defaultValue: "" });
      SignUpform.resetField("SecondPassword", { defaultValue: "" });
    } else {
      const signupId = toast.loading("新規登録中");

      try {
        const data = SignUpFunction(values);
        if (!data) {
          toast.error("新規登録失敗", { id: signupId });
        }
        toast.success("新規登録成功⚡️", { id: signupId });
        SignUpform.reset();
        await delay(500);
        router.push("/login");
      } catch (e) {
        toast.error("catchでエラー", { id: signupId });
        console.log(e);
      }
    }
  };
  return (
    <>
      <main className="flex-1 flex items-center justify-center ">
        <div className="flex flex-col w-3/4 md:w-1/2  rounded-lg bg-slate-400/50 space-y-5 px-10 py-10">
          <Form {...SignUpform}>
            <form
              onSubmit={SignUpform.handleSubmit(SignUponSubmit)}
              className="space-y-5 flex flex-col"
            >
              <h2 className="font-bold text-xl">新規登録</h2>
              <FormField
                control={SignUpform.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ユーザーネーム</FormLabel>
                    <FormControl>
                      <Input placeholder="トゥードゥーズ" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={SignUpform.control}
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
                control={SignUpform.control}
                name="FirstPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>パスワード</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Todos778"
                          {...field}
                          type={showFirstPassword ? "text" : "password"}
                          className="pr-10"
                        />
                        <Button
                          variant={"ghost"}
                          className="absolute right-0 top-0"
                          onClick={showFirstpassword}
                        >
                          <Eye size={24} />
                        </Button>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={SignUpform.control}
                name="SecondPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>確認用パスワード</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Todos778"
                          {...field}
                          type={showSecondPassword ? "text" : "password"}
                          className="pr-10"
                        />
                        <Button
                          variant={"ghost"}
                          className="absolute right-0 top-0"
                          onClick={showSecondpassword}
                        >
                          <Eye size={24} />
                        </Button>
                      </div>
                    </FormControl>
                    <div className="min-h-[20px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="self-center">
                登録🚀
              </Button>
            </form>
          </Form>
          <Link
            href={"/login"}
            className="self-center underline underline-offset-2 text-black/60"
          >
            ログインはこちら
          </Link>
        </div>
      </main>
    </>
  );
};

export default Signup;
