import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { userId, characters } = await request.json();

    if (!userId) {
      return NextResponse.json({ message: "유저 정보가 없습니다." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("mff_database");

    await db.collection("users").updateOne(
      { userId },
      { $set: { characters } }
    );

    return NextResponse.json({ message: "저장 완료" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "저장 실패" }, { status: 500 });
  }
}