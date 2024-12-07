"use client";

import { X } from "lucide-react";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import { UpdateEmailFunction } from "@/actions/UpdateEmailFunction";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface EmailChangeModalProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  Email: string;
  Id: string;
}

const UpdateEmailformSchema = z.object({
  email: z.string().email(),
});

export type UpdateEmailFormSchemaType = z.infer<typeof UpdateEmailformSchema>;

const EmailChangeModal: React.FC<EmailChangeModalProps> = ({
  close,
  Email,
  Id,
}) => {
  const router = useRouter();

  const UpdateEmailform = useForm<UpdateEmailFormSchemaType>({
    resolver: zodResolver(UpdateEmailformSchema),
    defaultValues: {
      email: Email,
    },
  });

  const updateemail = async (values: UpdateEmailFormSchemaType) => {
    const UpdateId = toast.loading("更新中...");

    try {
      await UpdateEmailFunction(values, Id);
      toast.success("更新に成功したよ🚀", { id: UpdateId });
      close(false);
      router.push("/mypage");
    } catch (e) {
      toast.error("エラーが発生したよ");
      console.log(e);
    }
  };

  return (
    <>
      <Toaster />
      <div
        className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
        onClick={() => close(false)}
      >
        <div
          className="bg-white p-10 rounded-lg w-3/4 md:w-1/2  overflow-auto relative flex flex-col space-y-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="absolute p-2 rounded-full right-5 top-5 bg-slate-400/70 hover:scale-110 transition cursor-pointer"
            onClick={() => close(false)}
          >
            <X />
          </div>
          <Form {...UpdateEmailform}>
            <form
              onSubmit={UpdateEmailform.handleSubmit(updateemail)}
              className="space-y-5 flex flex-col"
            >
              <h2 className="font-bold text-xl">新規登録</h2>
              <FormField
                control={UpdateEmailform.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ユーザーネーム</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="self-center">
                更新🚀
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EmailChangeModal;
