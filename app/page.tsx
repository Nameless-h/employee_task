"use client";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/common/types";
import { useEffect, useState } from "react";
import { getAllTasks } from "./actions";
import Loading from "@/components/Loading";

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllTasks();
        // console.log(data);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="flex justify-center">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-5 w-full h-auto">
          {tasks
            ? tasks.map((task) => <TaskCard key={task.id} task={task} />)
            : "Can't fetching data!"}
        </div>
      )}
    </main>
  );
}
