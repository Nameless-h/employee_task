import { NextRequest,NextResponse } from 'next/server';
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        employee: {
          select: {
            email: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    }); 

    return NextResponse.json(tasks);
  } catch (error: any) {
    return NextResponse.json({ message: "Error GET tasksForAll: " + error.message },{status: 500});
  }
}