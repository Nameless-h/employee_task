"use client";
import { deleteTask, getTasksWithId, updateStatusTask } from "@/app/actions";
import { Task, TaskDetailPageProps } from "@/common/types";
import Loading from "@/components/Loading";
// import { useRouter } from "next/router";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

const TaskDetailPage: FC<TaskDetailPageProps> = ({ params }) => {
  const router = useRouter();
  const [task, setTask] = useState<Task>();
  const [isLoading, setLoading] = useState(true);

  const [statusTask, setStatusTask] = useState(false);

  const handleCompleted = async () => {
    try {
      const data = { taskId: params.id };
      const response = await updateStatusTask(data);
      if (response) {
        setLoading(true);
        setStatusTask(response.newTask.isDone);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTasksWithId(params.id);
        setTask(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [statusTask]);

  const handleDelete = async () => {
    try {
      const data = { taskId: params.id };
      const confirmation = confirm("Do you really want to delete this task?");

      if (!confirmation) return;

      const response = await deleteTask(data);
      if (response) {
        router.push(`/`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-8 text-base">
      <Link
        className="py-1 w-10 ml-[-6px] font-bold text-center text-xl rounded-full hover:text-mainBlue"
        href="/"
      >
        {"<--"}
      </Link>
      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <span className="font-bold text-lg">{task?.title}</span>
          <div className="flex justify-between items-center">
            <div className="rounded-md bg-lightGray  px-2 py-1 text-base font-bold ring-1 ring-inset ring-lightGray/70">
              <span>To</span>{" "}
              <span className="underline text-mainBlue">
                {task?.employee.email}
              </span>
            </div>
            {task?.isDone ? (
              <span className="inline-flex items-center rounded-md bg-green text-white px-2 py-1 text-base font-bold ring-1 ring-inset ring-green/70">
                Done
              </span>
            ) : (
              <span className="inline-flex items-center rounded-md bg-lightGray  px-2 py-1 text-base font-bold ring-1 ring-inset ring-lightGray">
                In progress
              </span>
            )}
          </div>
          <div className="border-2 rounded-md p-3 h-full min-h-11">
            <p>{task?.content}</p>
          </div>
          <div className="flex gap-3 mt-2 justify-end">
            <Link
              className=" bg-mainBlue hover:bg-lightBlue hover:cursor-pointer text-white font-medium rounded-lg py-2 px-3 text-center"
              href={`/update/${params.id}`}
            >
              Update
            </Link>
            <button
              onClick={handleDelete}
              className="text-white w-auto outline-none bg-red hover:bg-lightRed font-medium rounded-lg py-2 px-3 text-center"
            >
              Delete
            </button>
            {task?.isDone ? (
              <></>
            ) : (
              <button
                onClick={handleCompleted}
                className="text-white w-auto outline-none bg-gray hover:bg-mediumGray font-medium rounded-lg py-2 px-3 text-center"
              >
                Completed
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetailPage;
