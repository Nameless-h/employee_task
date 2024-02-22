"use client";
import { useSession } from "next-auth/react";
// import { FormData } from "@/common/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, FormEvent, useEffect, useState } from "react";
import {
  createTask,
  getAllUser,
  getTasksWithId,
  updateTask,
} from "../../actions";
import Loading from "@/components/Loading";
import { Task, TaskDetailPageProps, userSelectProps } from "@/common/types";

const page: FC<TaskDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState<userSelectProps[]>([]);
  const [task, setTask] = useState<Task>();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUser();
        const dataTask = await getTasksWithId(params.id);

        setUsers(data);
        setTask(dataTask);
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
      const data = { title, content, userId, taskId: params.id };

      const response = await updateTask(data);
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
      <button
        className="py-1 w-10  font-bold text-center text-xl rounded-full hover:text-mainBlue"
        onClick={() => router.back()}
      >
        {"<--"}
      </button>
      <div className="w-full md:w-3/4 xl:w-1/3 mx-auto">
        <h3 className="text-lg mb-2 font-bold text-center">Update Task</h3>
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
                defaultValue={task?.employeeId}
              >
                {users?.map((user) =>
                  user.id === task?.employeeId ? (
                    <option key={user.id} value={user.id}>
                      {user.email}
                    </option>
                  ) : (
                    <option key={user.id} value={user.id}>
                      {user.email}
                    </option>
                  )
                )}
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
              defaultValue={task?.title || ""}
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
              value={task?.content}
              required={true}
            />
          </div>
          <button
            type="submit"
            className="col-span-2  text-white  bg-mainBlue hover:bg-lightBlue focus:ring-4 focus:outline-none focus:ring-lightBlue font-medium rounded-lg text-sm mt-2  w-full py-2 text-center"
          >
            Update task
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
