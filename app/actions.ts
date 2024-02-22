"use server"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// check email and password login
export async function checkUser(email: string, password: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (user && user.password === password) 
            return user;
        return null;
    } catch (error: any) {
        console.log({actionErr_checkUser: error.message});
    }

}

// get all user
export async function getAllUser() {
    try {
        const res = await fetch(process.env.NEXTAUTH_URL + "/api/user",{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        // console.log({ result: data });
        return data;
    } catch (error: any) {
        console.log({actionErr_getAllTasks: error.message});
    }
}

// get all tasks
export async function getAllTasks() {
    try {
        const res = await fetch(process.env.NEXTAUTH_URL + "/api/tasks",{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        // console.log({ result: data });
        return data;
    } catch (error: any) {
        console.log({actionErr_getAllTasks: error.message});
    }
}

export async function getTasksWithId(id: string) {
    try {
        const res = await fetch(process.env.NEXTAUTH_URL + "/api/tasks/" + id,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id })
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        // console.log({ result: data });
        return data;
    } catch (error: any) {
        console.log({actionErr_getTasksWithId: error.message});
    }
}
//create task
export async function createTask(task: {title:string | undefined,content: string | undefined ,userId:string}) {
    try {
        const res = await fetch(process.env.NEXTAUTH_URL + "/api/tasks/create",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.statusText} `);
        }
        const data = await res.json();
        // console.log({ result: data });
        return data;
    } catch (error: any) {
        console.log({actionErr_createTask: error.message});
    }
}

// update task
export async function updateTask(task: {title:string | undefined,content: string | undefined ,userId:string,taskId:string}) {
    try {
        const res = await fetch(process.env.NEXTAUTH_URL + "/api/tasks/update",{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.statusText} `);
        }
        const data = await res.json();
        // console.log({ result: data });
        return data;
    } catch (error: any) {
        console.log({actionErr_updateTask: error.message});
    }
}

// update task status
export async function updateStatusTask(task: {taskId:string}) {
    try {
        const res = await fetch(process.env.NEXTAUTH_URL + "/api/tasks/update",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.statusText} `);
        }
        const data = await res.json();
        return data;
    } catch (error: any) {
        console.log({actionErr_updateTask: error.message});
    }
}

// delete task
export async function deleteTask(task: {taskId:string}) {
    try {
        const res = await fetch(process.env.NEXTAUTH_URL + "/api/tasks/delete",{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.statusText} `);
        }
        const data = await res.json();
        // console.log({ result: data });
        return data;
    } catch (error: any) {
        console.log({actionErr_updateTask: error.message});
    }
}

export async function main() {
    try {
        const allUsers = await prisma.user.findMany()
    } catch (error: any) {
        console.log({actionErr_main: error.message});
    }
}

