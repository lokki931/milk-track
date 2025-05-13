import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { date, liters, fat, price } = await req.json();

  const entry = await prisma.entry.create({
    data: {
      date: new Date(date),
      liters,
      fat,
      price,
      userId: session.user.id,
    },
  });

  return NextResponse.json(entry);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const entries = await prisma.entry.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "asc" },
  });

  return NextResponse.json(entries);
}
