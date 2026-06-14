// app/api/get-data/route.js
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json({ error: '토큰이 없습니다.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('mff_database');

    const user = await db.collection('users').findOne({ token: token });
    if (!user) {
      return NextResponse.json({ error: '존재하지 않는 토큰입니다.' }, { status: 404 });
    }

    // 유저가 존재하면 저장된 캐릭터 정보를 반환합니다.
    return NextResponse.json({ characters: user.characters || {} });
  } catch (error) {
    return NextResponse.json({ error: '데이터를 불러오는 중 서버 오류가 발생했습니다.' }, { status: 500 });
  }
}