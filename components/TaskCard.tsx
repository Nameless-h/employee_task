"use client";
import { Task } from "@/common/types";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const dateCreated = new Date(task.createdAt).toLocaleString("vi-VI");

  return (
    <div className="w-full h-auto border-2 border-lightGray rounded-lg p-4 group hover:shadow-xl">
      <div className="flex gap-3 mb-4">
        <span>Task for: </span>
        <span className="inline-flex items-center rounded-md bg-lightGray group-hover:text-mainBlue px-2 py-1 text-xs font-bold ring-1 ring-inset ring-mainBlue/10">
          {task.isDone ? (
            <span className="w-2 h-2 rounded-full bg-green mr-2"></span>
          ) : (
            <span className="w-2 h-2 rounded-full bg-black mr-2"></span>
          )}
          {task.employeeId === userId ? "You" : task.employee.email}
        </span>
      </div>
      <div className="font-bold group-hover:text-mainBlue mb-1 truncate ...">
        {task.title}
      </div>
      <p className="truncate ...">{task.content}</p>
      <div className="flex items-center justify-between mt-4">
        <div>
          Created:{" "}
          <span className="font-bold group-hover:text-mainBlue">
            {dateCreated}
          </span>
        </div>
        <Link
          className="px-2 py-1 rounded-md font-bold border-[1px] border-lightGray hover:bg-lightGray no-underline"
          href={`/detail/${task.id}`}
        >
          Detail
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
