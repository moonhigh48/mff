import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // Firebase 설정 로드
import { doc, getDoc, setDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { userId, password } = await request.json();

    if (!userId || !password) {
      return NextResponse.json({ message: "아이디와 비밀번호를 모두 입력해주세요." }, { status: 400 });
    }

    const userDocRef = doc(db, "users", userId);
    
    // 중복 아이디 검사
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      return NextResponse.json({ message: "이미 존재하는 아이디입니다." }, { status: 400 });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새 사용자 도큐먼트 생성 (모든 레이아웃 초깃값 포함)
    await setDoc(userDocRef, {
      userId,
      password: hashedPassword,
      characters: {},
      tierList: { S: [], A: [], B: [], C: [], D: [], E: [] },
      slLayout: {},
      abxLayout: {},
      ablLayout: {},
      createdAt: new Date().toISOString()
    });

    return NextResponse.json({ message: "회원가입이 완료되었습니다." }, { status: 201 });
  } catch (error) {
    console.error("회원가입 에러:", error);
    return NextResponse.json({ message: "회원가입 중 오류가 발생했습니다." }, { status: 500 });
  }
}