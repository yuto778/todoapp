"use client";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import BackPage from "./BackPage";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TaakCreate = () => {
  return (
    <>
      <main className="p-10 w-full flex-1 flex items-center  flex-col relative ">
        <BackPage className={"top-10 left-10 "} />
        <div className="h-full w-1/2 flex flex-col  bg-red-300 shadow-lg rounded-lg  p-10 space-y-10">
          <h2 className="self-start text-xl font-bold underline underline-offset-4">
            タスク追加
          </h2>
          <div className="flex flex-col gap-3">
            <h2> タスク名 : </h2>
            <Input />
          </div>
          <div className="w-full flex gap-5">
            <div className="w-1/2 gap-2 flex flex-col">
              <h2>期日 :</h2>
              <Input />
            </div>
            <div className="w-1/2 gap-2 flex flex-col">
              <h2>重要度</h2>
              <Select>
                <SelectTrigger className="">
                  <SelectValue placeholder="重要度" />
                </SelectTrigger>
                <SelectContent className="text-xl">
                  <SelectGroup>
                    <SelectItem value="apple">低</SelectItem>
                    <SelectItem value="banana">中</SelectItem>
                    <SelectItem value="blueberry">高</SelectItem>
                    <SelectItem value="grapes">最高</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h2>メモ </h2>
            <textarea name="" id="" className="rounded-md p-2"></textarea>
          </div>
          <Button variant={"outline"} className="self-center ">
            登録⚡️
          </Button>
        </div>
      </main>
    </>
  );
};

export default TaakCreate;
