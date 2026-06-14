import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase'; // 2단계에서 만든 파일 연결
import { doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 1. 1단계에서 만든 데이터 파일을 통째로 읽어옵니다.
    const filePath = path.join(process.cwd(), 'mongodb_data.json');
    let rawData = fs.readFileSync(filePath, 'utf8').trim();

    // 2. 파일이 'const ... = {' 형태로 시작하면 앞뒤 쓰레기 문법을 강제로 도려냅니다.
    const openBraceIndex = rawData.indexOf('{');
    const closeBraceIndex = rawData.lastIndexOf('}');
    
    if (openBraceIndex !== -1 && closeBraceIndex !== -1) {
      rawData = rawData.substring(openBraceIndex, closeBraceIndex + 1);
    }

    // 3. 도려낸 순수 텍스트를 진짜 데이터(JSON)로 변환합니다.
    const userData = JSON.parse(rawData);

    // 4. 유저 ID 지정 (데이터 안에 userId가 있으면 쓰고, 없으면 무조건 'admin'으로 지정)
    const userId = userData.userId || "admin"; 

    // 5. 파이어베이스가 거부하는 몽고DB 고유 문법 가공 및 청소
    const cleanData = {
      ...userData,
      // 날짜 에러 방지
      createdAt: userData.createdAt && userData.createdAt.$date ? userData.createdAt.$date : (userData.createdAt || new Date().toISOString())
    };
    
    // 몽고DB 전용 ID 객체는 파이어베이스에 필요 없으므로 제거
    delete cleanData._id; 

    // 6. 파이어베이스 'users' 폴더 안에 'admin'이라는 이름으로 최종 저장!
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, cleanData);

    return NextResponse.json({ 
      success: true, 
      message: `🎉 [${userId}] 유저의 캐릭터 보유 현황 및 모든 기록이 파이어베이스에 완벽히 올라갔습니다!` 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}