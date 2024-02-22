import { NextRequest,NextResponse } from 'next/server';
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    if (req.body === null) {
        throw new Error("Request body is null");
    }
    const requestBody = await req.json();

    const task = await prisma.task.findUnique({
      include: {
        employee: {
          select: {
            email: true
          }
        }
      },
      where: {
        id: requestBody.id,
      },
    });

    return NextResponse.json(task);
  } catch (error: any) {
    return NextResponse.json({ message: "Error GET tasksWithID: " + error.message },{status: 500});
  }
}