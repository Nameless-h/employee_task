"use client";
import Image from "next/image";
import LoginBtn from "./LoginBtn";
import { useSession } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="h-16 px-5 flex items-center justify-between bg-lightGray">
      <Link href="/" className="hover:cursor-pointer text-mainBlue">
        <Image
          src="/images/logo.svg"
          width={30}
          height={30}
          alt="logo"
          className="text-mainBlue"
        />
      </Link>

      <div className="flex justify-between items-center gap-4">
        {session ? (
          <>
            <Link
              className="rounded-md px-2 py-1 text-base bg-mainBlue hover:bg-lightBlue hover:cursor-pointer text-white"
              href="/create"
            >
              Create task
            </Link>
            <span className="w-[1px] h-10 bg-black"></span>
          </>
        ) : (
          ""
        )}
        <LoginBtn sessionAuth={{ session, status }} />
      </div>
    </div>
  );
};

export default NavBar;
