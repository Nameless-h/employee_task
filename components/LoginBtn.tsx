"use client";
import { signIn, signOut } from "next-auth/react";
import UserCard from "./UserCard";
import { FC, useState } from "react";
import LoadingBtn from "./LoadingBtn";
import { sessionAuthProps } from "@/common/types";

const LoginBtn: FC<sessionAuthProps> = ({ sessionAuth }) => {
  const { session, status } = sessionAuth;
  const [isLoading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn();
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    setLoading(false);
  };

  if (status === "loading") {
    return (
      <>
        <LoadingBtn />
      </>
    );
  }

  if (session) {
    return (
      <div className="flex gap-4 items-center">
        <UserCard user={session.user} />
        <div
          onClick={handleSignOut}
          className="rounded-md px-2 py-1 text-base bg-mainBlue hover:bg-lightBlue hover:cursor-pointer"
        >
          <div className="text-white">Sign Out</div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={handleSignIn}
        className="rounded-md px-2 py-1 text-base bg-mainBlue hover:bg-lightBlue hover:cursor-pointer"
      >
        <div className="text-white">Sign In</div>
      </div>
    );
  }
};

export default LoginBtn;
