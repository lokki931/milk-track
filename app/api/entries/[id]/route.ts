import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = params;
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
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = params;

  try {
    await prisma.entry.delete({
      where: { id },
    });

    return new NextResponse("Deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Failed to delete entry:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
