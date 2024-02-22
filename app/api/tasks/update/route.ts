import { NextRequest,NextResponse } from 'next/server';
import prisma from '@/lib/prisma'

export async function PUT(req: Request) {
  try {
    if (req.body === null) {
        throw new Error("Request body is null");
    }
    const requestBody = await req.json();
    const { title,content, userId,taskId } = requestBody;
    
    const newTask = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
            title: title,
            content: content,
            employee: { connect: { id: userId } },
        }
    });
    return NextResponse.json({newTask},{status: 200});
  } catch (error: any) {
    console.log({ message: "Error POST createTask: " + error.message });
    return NextResponse.json({ message: "Error POST createTask: " + error.message },{status: 500});
  }
}

export async function POST(req: Request) {
  try {
    if (req.body === null) {
      throw new Error("Request body is null");
    }
    const requestBody = await req.json();
    const { taskId } = requestBody;
    
    const newTask = await prisma.task.update({
        where: {
            id: taskId
        },
        data: {
          isDone: true
        }
    });
    return NextResponse.json({newTask},{status: 200});

  } catch (error: any) {
    console.log({ message: "Error POST: " + error.message });
    return NextResponse.json({ message: "Error POST: " + error.message }, { status: 500 });
  }
}