'use client';

import { useState, useEffect } from "react";
import MainDashboard from "./components/MainDashboard";

export default function Home() {
  const [isLoginView, setIsLoginView] = useState(true); // 로그인/회원가입 전환 토글
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // 통합 유저 데이터 구조 정의
  const [initialData, setInitialData] = useState<any>({
    characters: {},
    abxLayout: {},
    ablLayout: {},
    slLayout: {},
    tierList: { S: [], A: [], B: [], C: [], D: [], E: [] }
  });

  // =================================================================
  // [추가] 브라우저 새로고침 및 핫 리로드 시 기존 세션/데이터 자동 복구
  // =================================================================
  useEffect(() => {
    const savedUser = localStorage.getItem("mff_logged_in_user");
    const savedData = localStorage.getItem("mff_initial_data");
    
    if (savedUser && savedData) {
      setLoggedInUser(savedUser);
      setInitialData(JSON.parse(savedData));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const endpoint = isLoginView ? "/api/login" : "/api/signup";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      const data = await res.json();
      console.log("서버에서 받아온 전체 데이터:", data);

      if (!res.ok) {
        setMessage(data.message || "오류가 발생했습니다.");
        return;
      }

      if (isLoginView) {
        // 로그인 성공 시
        setLoggedInUser(data.userId);
        
        // [핵심 수정] 서버에서 받아온 데이터를 MainDashboard 규격에 맞게 조합
        const userPayload = {
          characters: data.characters || {},
          abxLayout: data.abxLayout || {},
          ablLayout: data.ablLayout || {},
          slLayout: data.slLayout || {},
          tierList: data.tierList || { S: [], A: [], B: [], C: [], D: [], E: [] }
        };

        setInitialData(userPayload);

        // 로컬 스토리지에 백업 저장 (새로고침 방어용)
        localStorage.setItem("mff_logged_in_user", data.userId);
        localStorage.setItem("mff_initial_data", JSON.stringify(userPayload));
      } else {
        // 회원가입 성공 시 로그인 뷰로 전환
        setMessage("회원가입 성공! 로그인해 주세요.");
        setIsLoginView(true);
        setPassword("");
      }
    } catch (err) {
      setMessage("서버와 통신에 실패했습니다.");
    }
  };

  // 로그아웃 처리 시 브라우저 백업 캐시도 함께 삭제하도록 수정
  const handleLogout = () => {
    setLoggedInUser(null);
    setInitialData({
      characters: {},
      abxLayout: {},
      ablLayout: {},
      slLayout: {},
      tierList: { S: [], A: [], B: [], C: [], D: [], E: [] }
    });
    localStorage.removeItem("mff_logged_in_user");
    localStorage.removeItem("mff_initial_data");
  };

  if (loggedInUser) {
    const DashboardComponent = MainDashboard as any; // 타입 검사를 느슨하게 우회 처리
    return (
      <DashboardComponent 
        userId={loggedInUser} 
        initialData={initialData} // 묶여있는 객체 데이터가 MainDashboard 상태 초깃값으로 자동 주입됨
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0d0d14", alignItems: "center", justifyContent: "center", fontFamily: "'Pretendard', sans-serif" }}>
      <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 700, marginBottom: "1.5rem", textAlign: "center" }}>
         MARVEL FUTUREFIGHT
      </h2>
      <div style={{ background: "#13131e", border: "1px solid #2a2a40", borderRadius: 16, padding: "2.5rem 2rem", width: "100%", maxWidth: 400, boxSizing: "border-box" }}>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e as any)}
            style={{ width: "100%", background: "#0d0d14", border: "1px solid #2a2a40", borderRadius: 8, color: "#fff", padding: "12px", fontSize: 14, boxSizing: "border-box", outline: "none" }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e as any)}
            style={{ width: "100%", background: "#0d0d14", border: "1px solid #2a2a40", borderRadius: 8, color: "#fff", padding: "12px", fontSize: 14, boxSizing: "border-box", outline: "none" }}
          />
          <button type="submit" style={{ width: "100%", background: "#5b8dee", color: "#fff", border: "none", borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>
            {isLoginView ? "로그인" : "회원가입"}
          </button>
        </form>

        {message && <p style={{ color: message.includes("성공") ? "#4ade80" : "#ef4444", fontSize: 13, textAlign: "center", marginTop: 12, marginBottom: 0 }}>{message}</p>}

        <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#666" }}>
          {isLoginView ? "계정이 없으신가요?" : "이미 계정이 있으신가요?"}{" "}
          <span 
            onClick={() => { setIsLoginView(!isLoginView); setMessage(""); }} 
            style={{ color: "#5b8dee", cursor: "pointer", marginLeft: 4, fontWeight: 600 }}
          >
            {isLoginView ? "회원가입" : "로그인"}
          </span>
        </div>
      </div>
    </div>
  );
}