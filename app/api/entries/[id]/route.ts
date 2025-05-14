import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// PUT handler
export async function PUT(
  request: NextRequest,
  context: { params: Record<string, string> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await request.json();
  const id = context.params.id;

  try {
    const updated = await prisma.entry.update({
      where: { id },
      data: {
        date: new Date(body.date),
        liters: body.liters,
        fat: parseFloat(body.fat),
        price: body.price,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE handler
export async function DELETE(
  request: NextRequest,
  context: { params: Record<string, string> }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const id = context.params.id;

  try {
    await prisma.entry.delete({
      where: { id },
    });

    return new NextResponse("Deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
