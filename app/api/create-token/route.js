import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const { token } = await request.json();
    if (!token) return NextResponse.json({ error: '토큰이 없습니다.' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db('mff_database');

    const existingUser = await db.collection('users').findOne({ token });
    if (existingUser) return NextResponse.json({ error: '이미 존재하는 토큰입니다.' }, { status: 400 });

    await db.collection('users').insertOne({
      token,
      characters: {}, // 유저별 보유 캐릭터 정보 상태창
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}