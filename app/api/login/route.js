import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // 1. 상단에 Firebase 설정 로드 추가
import { doc, getDoc } from "firebase/firestore"; // Firestore 조회 메서드 추가
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { userId, password } = await request.json();

    // 2. Firestore에서 userId를 키로 가지는 유저 문서(Doc) 참조 및 가져오기
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    // 문서가 존재하지 않으면 아이디가 없는 것
    if (!userDocSnap.exists()) {
      return NextResponse.json({ message: "존재하지 않는 아이디입니다." }, { status: 401 });
    }

    // 문서 안의 데이터(.data()) 추출
    const user = userDocSnap.data();

    // 3. 비밀번호 검증 (기존 로직 유지)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "비밀번호가 일치하지 않습니다." }, { status: 401 });
    }

    // 4. 확장된 데이터 레이아웃 리턴 (보내주신 완벽한 구조 적용!)
    return NextResponse.json({
      message: "로그인 성공",
      userId: user.userId,
      characters: user.characters || {},
      tierList: user.tierList || { S: [], A: [], B: [], C: [], D: [], E: [] },
      slLayout: user.slLayout || {},
      abxLayout: user.abxLayout || {},
      ablLayout: user.ablLayout || {}
    }, { status: 200 });
  } catch (error) {
    console.error("로그인 에러:", error);
    return NextResponse.json({ message: "로그인 중 오류가 발생했습니다." }, { status: 500 });
  }
}