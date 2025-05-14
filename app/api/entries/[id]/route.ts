import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const PUT = async (
  req: Request,
  context: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await context.params;
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
  req: Request,
  context: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await context.params;

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
