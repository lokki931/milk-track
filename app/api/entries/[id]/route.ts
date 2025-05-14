import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const PUT = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = context.params;
  const body = await req.json();

  try {
    const updatedEntry = await prisma.entry.update({
      where: { id },
      data: {
        date: new Date(body.date),
        liters: body.liters,
        fat: parseFloat(body.fat),
        price: body.price,
      },
    });

    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error("Failed to update:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = context.params;

  try {
    await prisma.entry.delete({
      where: { id },
    });

    return new NextResponse("Deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Failed to delete entry:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
