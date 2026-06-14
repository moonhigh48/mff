import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 💡 아까 파이어베이스 사이트 첫 화면(웹 </> 아이콘)에서 발급받았던 
// 질문자님 프로젝트만의 고유 firebaseConfig 설정값으로 내용을 채워넣어야 합니다!
const firebaseConfig = {
  apiKey: "AIzaSyB6xCnHI72tvoGFk0q-P3VjPxlUTQ-BbI0",
  authDomain: "mff1-a16da.firebaseapp.com",
  projectId: "mff1-a16da",
  storageBucket: "mff1-a16da.firebasestorage.app",
  messagingSenderId: "821818640723",
  appId: "1:821818640723:web:7f5f88b3991cbdd9eb39a6"
};

// Next.js 서버에서 중복으로 초기화되어 터지는 것을 방지하는 코드입니다.
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 최종적으로 내 웹사이트가 사용할 데이터베이스(Firestore)를 내보냅니다.
export const db = getFirestore(app);