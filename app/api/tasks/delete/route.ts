import { NextRequest,NextResponse } from 'next/server';
import prisma from '@/lib/prisma'

export async function DELETE(req: Request) {
  try {
    if (req.body === null) {
        throw new Error("Request body is null");
    }
    const requestBody = await req.json();
    const { taskId } = requestBody;
    
    const newTask = await prisma.task.delete({
        where: {
            id: taskId
        }
    });
    return NextResponse.json({newTask},{status: 200});
  } catch (error: any) {
    console.log({ message: "Error POST createTask: " + error.message });
    return NextResponse.json({ message: "Error POST createTask: " + error.message },{status: 500});
  }
}