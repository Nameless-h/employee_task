"use client";
import { useSession } from "next-auth/react";
// import { FormData } from "@/common/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, FormEvent, useEffect, useState } from "react";
import { createTask, getAllUser } from "../actions";
import Loading from "@/components/Loading";
import { userSelectProps } from "@/common/types";

const page = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState<userSelectProps[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUser();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      const title = formData.get("title")?.toString();
      const content = formData.get("content")?.toString();
      const userId = formData.get("userEmail")?.toString();

      if (!userId) {
        alert("Please select user email");
        return;
      }
      const data = { title, content, userId };

      const response = await createTask(data);
      if (response) {
        router.push(`/detail/${response.newTask.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "loading") {
    return null;
  }

  if (!session) {
    router.push("/api/auth/signin");
    return null;
  }

  return (
    <div>
      <Link
        className="py-1 w-10  font-bold text-center mb-5 text-xl rounded-full hover:text-mainBlue"
        href="/"
      >
        {"<--"}
      </Link>
      <div className="w-full md:w-3/4 xl:w-1/3 mx-auto">
        <h3 className="text-lg mb-2 font-bold text-center">Create New Task</h3>
        <form className="grid gap-4 mb-4 grid-cols-2" onSubmit={handleSubmit}>
          <div className="col-span-2 ">
            <label htmlFor="category" className="block mb-2  font-medium  ">
              Task for
            </label>
            {isLoading ? (
              <div className="flex justify-center">
                <Loading />
              </div>
            ) : (
              <select
                id="userEmail"
                name="userEmail"
                className="border border-mainBlue  text-sm rounded-lg focus:ring-lightBlue focus:border-lightBlue block w-full p-2.5 "
                defaultValue={"DEFAULT"}
              >
                <option disabled value="DEFAULT">
                  Select user
                </option>
                {users?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="col-span-2">
            <label htmlFor="name" className="block mb-2  font-medium ">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="name"
              className="border border-mainBlue text-sm rounded-lg focus:ring-lightBlue focus:border-lightBlue block w-full p-2.5"
              placeholder="Type title"
              required={true}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="name" className="block mb-2  font-medium ">
              Content
            </label>
            <textarea
              name="content"
              id="name"
              className="border border-mainBlue text-sm rounded-lg focus:ring-lightBlue focus:border-lightBlue block w-full p-2.5"
              placeholder="Type content"
              required={true}
            />
          </div>
          <button
            type="submit"
            className="col-span-2  text-white  bg-mainBlue hover:bg-lightBlue focus:ring-4 focus:outline-none focus:ring-lightBlue font-medium rounded-lg text-sm mt-2  w-full py-2 text-center"
          >
            Add new task
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
