"use client";

import React, { useState } from "react";
import BackPage from "./BackPage";
import UserNameChangeModal from "./UserNameChangeModal";
import EmailChangeModal from "./EmailChangeModal";

interface MypageProps {
  data: {
    id: string;
    UserName: string;
    Email: string;
  } | null;
}

const Mypage: React.FC<MypageProps> = ({ data }) => {
  const [UserNameModal, setUserNameModal] = useState<boolean>(false);
  const [EmailModal, setEmailModal] = useState<boolean>(false);
  return (
    <>
      <div className="p-10 w-full flex-1 flex items-center  flex-col relative ">
        <BackPage className="top-10 left-10" />
        <div className="h-full w-1/2 flex flex-col  bg-red-300 shadow-lg rounded-lg  p-10 space-y-10">
          <h2 className="text-xl font-bold underline underline-offset-4">
            マイページ
          </h2>
          <div className="flex flex-col gap-2">
            <h2>ユーザーネーム</h2>
            <div
              className=" p-3  w-full bg-white rounded-xl  shadow-lg cursor-pointer"
              onClick={() => setUserNameModal(true)}
            >
              <h2 className="pl-2 text-xl font-normal">{data?.UserName}</h2>
            </div>
            {UserNameModal && (
              <UserNameChangeModal
                close={setUserNameModal}
                Username={data!.UserName}
                Id={data!.id}
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h2>メールアドレス</h2>
            <div
              className=" p-3  w-full bg-white rounded-xl  shadow-lg cursor-pointer"
              onClick={() => setEmailModal(true)}
            >
              <h2 className="pl-2 text-xl font-normal">{data?.Email}</h2>
            </div>
            <h3 className="self-center">メールアドレスは変更できません！</h3>
            {/* {EmailModal && (
              <EmailChangeModal
                close={setEmailModal}
                Email={data!.Email}
                Id={data!.id}
              />
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
