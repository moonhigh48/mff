import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { userId, password } = await request.json();

    const client = await clientPromise;
    const db = client.db("mff_database");

    const user = await db.collection("users").findOne({ userId });
    if (!user) {
      return NextResponse.json({ message: "존재하지 않는 아이디입니다." }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "비밀번호가 일치하지 않습니다." }, { status: 401 });
    }

    return NextResponse.json({
      message: "로그인 성공",
      userId: user.userId,
      characters: user.characters || {}
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "로그인 중 오류가 발생했습니다." }, { status: 500 });
  }
}