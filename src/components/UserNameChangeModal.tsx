"use client";

import { UpdateUserNameFunction } from "@/actions/UpdateUserNameFunction";
import { delay } from "@/data/delay";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface UserNameChangeModalProps {
  close: React.Dispatch<React.SetStateAction<boolean>>;
  Username: string;
  Id: string;
}

const UpdateUserNameformSchema = z.object({
  username: z.string().min(2).max(50),
});

export type UpdateUserNameFormSchemaType = z.infer<
  typeof UpdateUserNameformSchema
>;

const UserNameChangeModal: React.FC<UserNameChangeModalProps> = ({
  close,
  Username,
  Id,
}) => {
  const router = useRouter();

  const UpdateUserNameform = useForm<UpdateUserNameFormSchemaType>({
    resolver: zodResolver(UpdateUserNameformSchema),
    defaultValues: {
      username: Username,
    },
  });

  const updatename = async (values: UpdateUserNameFormSchemaType) => {
    const UpdateId = toast.loading("更新中...");
    try {
      await UpdateUserNameFunction(values, Id);
      toast.success("ユーザーネームの更新に成功", { id: UpdateId });
      await delay(1000);
      close(false);
      router.push("/mypage");
    } catch (error) {
      toast.error("エラーが発生したようだよ", { id: UpdateId });
      console.log(error);
    }
  };
  return (
    <>
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
          <Form {...UpdateUserNameform}>
            <form
              onSubmit={UpdateUserNameform.handleSubmit(updatename)}
              className="space-y-5 flex flex-col"
            >
              <h2 className="font-bold text-xl">新規登録</h2>
              <FormField
                control={UpdateUserNameform.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ユーザーネーム</FormLabel>
                    <FormControl>
                      <Input placeholder="yuto778" {...field} />
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

export default UserNameChangeModal;
