import { NextRequest,NextResponse } from 'next/server';
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true
      }
    }); 

    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ message: "Error GET tasksForAll: " + error.message },{status: 500});
  }
}