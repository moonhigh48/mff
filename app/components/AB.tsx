'use client';

import { useState, useMemo } from 'react';
import { MFF_DATABASE_CHARACTERS } from '../data/Characters';

const TYPE_COLOR: Record<string, string> = { '컴뱃': '#e53e3e', '블래스트': '#319795', '스피드': '#38a169', '유니버셜': '#805ad5' };

const ABX_SESSIONS = [
  '스피드/여성/영웅', '자유', '컴뱃/여성', '스피드/빌런', '유니버셜/빌런', 
  '뮤턴트/남성', '컴뱃/영웅', '자유', '컴뱃/영웅/인간', '유니버셜/영웅/남성', 
  '블래스트/남성', '빌런/뮤턴트', '유니버셜/빌런', '자유', '블래스트/빌런', 
  '유니버셜/영웅', '외계인/여성', '블래스트/인간/여성', '스피드/인간/남성', 
  '자유', '영웅/외계인/남성', '컴뱃/빌런', '유니버셜/인간', '빌런/여성'
];

const ABL_SESSIONS = [
  '유니버셜/남성', '자유', '빌런/인간', '블래스트/영웅', '컴뱃/빌런/남성', 
  '빌런/외계인', '유니버셜/인간', '자유', '빌런/남성', '영웅/인간/여성', 
  '뮤턴트/여성', '스피드/영웅/남성', '스피드/빌런', '자유', '스피드/여성', 
  '컴뱃/외계인', '블래스트/영웅/남성', '인휴먼', '유니버셜/영웅/남성', 
  '자유', '유니버셜/여성', '영웅/외계인', '뮤턴트/남성', '컴뱃/영웅/인간'
];

interface UserCharacterState {
  owned: boolean;
  activeUniform: string;
  ownedUniforms?: Record<string, boolean>;
  tier?: number;
  // 💡 각 속성(조건)별 점수를 저장할 수 있는 공간 추가
  scores?: Record<string, number>;
}
type UserCharactersData = Record<string, UserCharacterState>;
type EolbaeLayoutData = Record<string, string[]>;

interface ABProps {
  userCharacters: UserCharactersData;
  setUserCharacters: React.Dispatch<React.SetStateAction<UserCharactersData>>; // 점수 저장을 위해 추가
  abxLayout: EolbaeLayoutData;
  setAbxLayout: (layout: EolbaeLayoutData) => void;
  ablLayout: EolbaeLayoutData;
  setAblLayout: (layout: EolbaeLayoutData) => void;
  getDynamicPortrait: (char: any) => string;
  saveToServer: (updatedAbx: EolbaeLayoutData, updatedAbl: EolbaeLayoutData) => void;
  placementMode: 'drag' | 'click';
  activeSession: string | null;
  setActiveSession: (session: string | null) => void;
}

export default function AB({
  userCharacters,
  setUserCharacters,
  abxLayout,
  setAbxLayout,
  ablLayout,
  setAblLayout,
  getDynamicPortrait,
  saveToServer,
  placementMode,
  activeSession,
  setActiveSession
}: ABProps) {

  const [abMode, setAbMode] = useState<'abx' | 'abl'>('abx');
  const [activeTab, setActiveTab] = useState<'edit' | 'view'>('edit');
  const [selectedSessionKey, setSelectedSessionKey] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('전체');
  const [filterRace, setFilterRace] = useState<string>('전체');
  const [filterGender, setFilterGender] = useState<string>('전체');
  const [filterFaction, setFilterFaction] = useState<string>('전체');
  const [filterElement, setFilterElement] = useState<string>('전체');
  const [filterAbility, setFilterAbility] = useState<string>('전체');
  const [sessionScores, setSessionScores] = useState<Record<string, number>>({});
  
  const todaySessionInfo = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

    // 1. 일요일 예외 처리
    if (dayOfWeek === 0) {
      return { isSunday: true, sessionIndex: -1 };
    }

    // 2. 2026년 6월 24일(수요일)을 기준점으로 잡고 날짜 차이 계산
    const baseDate = new Date(2026, 5, 24); // 6월은 인덱스 5
    // 시/분/초 초기화
    today.setHours(0,0,0,0);
    baseDate.setHours(0,0,0,0);

    const msDiff = today.getTime() - baseDate.getTime();
    const totalDaysDiff = Math.floor(msDiff / (1000 * 60 * 60 * 24));

    // 기준일(6월 24일)의 회차 번호는 11 (배열 인덱스로는 10)
    let currentSessionNum = 11; 

    // 기준일부터 오늘까지 하루씩 전진/후진하며 일요일을 제외하고 회차 카운트
    if (totalDaysDiff > 0) {
      for (let i = 1; i <= totalDaysDiff; i++) {
        const checkDate = new Date(baseDate.getTime() + (i * 1000 * 60 * 60 * 24));
        if (checkDate.getDay() !== 0) { // 일요일이 아닐 때만 증가
          currentSessionNum++;
          if (currentSessionNum > 24) currentSessionNum = 1;
        }
      }
    } else if (totalDaysDiff < 0) {
      for (let i = -1; i >= totalDaysDiff; i--) {
        const checkDate = new Date(baseDate.getTime() + (i * 1000 * 60 * 60 * 24));
        if (checkDate.getDay() !== 0) { // 일요일이 아닐 때만 감소
          currentSessionNum--;
          if (currentSessionNum < 1) currentSessionNum = 24;
        }
      }
    }

    return {
      isSunday: false,
      sessionIndex: currentSessionNum - 1 // 배열 조회를 위해 0~23 인덱스로 변환
    };
  }, []);

  const handleDragStart = (e: React.DragEvent, charId: string) => {
    e.dataTransfer.setData('text/plain', charId);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const handleDropToSession = (e: React.DragEvent, session: string) => {
    e.preventDefault();
    const charId = e.dataTransfer.getData('text/plain');
    if (!charId) return;

    if (abMode === 'abx') {
      const currentLayout = abxLayout[session] || [];
      if (currentLayout.includes(charId)) return;
      const nextLayout = { ...abxLayout, [session]: [...currentLayout, charId] };
      setAbxLayout(nextLayout);
      saveToServer(nextLayout, ablLayout);
    } else {
      const currentLayout = ablLayout[session] || [];
      if (currentLayout.includes(charId)) return;
      const nextLayout = { ...ablLayout, [session]: [...currentLayout, charId] };
      setAblLayout(nextLayout);
      saveToServer(abxLayout, nextLayout);
    }
  };

  const removeCharFromSession = (session: string, charId: string) => {
    if (abMode === 'abx') {
      const nextLayout = { ...abxLayout, [session]: (abxLayout[session] || []).filter(id => id !== charId) };
      setAbxLayout(nextLayout);
      saveToServer(nextLayout, ablLayout);
    } else {
      const nextLayout = { ...ablLayout, [session]: (ablLayout[session] || []).filter(id => id !== charId) };
      setAblLayout(nextLayout);
      saveToServer(abxLayout, nextLayout);
    }
  };

  const currentSessions = abMode === 'abx' ? ABX_SESSIONS : ABL_SESSIONS;
  const currentLayoutData = abMode === 'abx' ? abxLayout : ablLayout;

  const allAbilities = useMemo(() => {
    const set = new Set<string>();
    MFF_DATABASE_CHARACTERS.forEach(c => {
      c.uniforms.forEach(u => u.ability.forEach(a => set.add(a)));
    });
    return Array.from(set).sort();
  }, []);

  const filteredCharacters = useMemo(() => {
    const oppositeLayoutData = abMode === 'abx' ? ablLayout : abxLayout;
    return MFF_DATABASE_CHARACTERS.filter(char => {
      if (!userCharacters[char.id]?.owned) return false;
      
      const userState = userCharacters[char.id];
      const activeUni = char.uniforms.find(u => u.name === userState.activeUniform) || char.uniforms[char.uniforms.length - 1];
      
      // 튜플 구조 분해 매핑 적용
      const [baseType, race, gender, faction, element] = activeUni.type;
      
      // ----------------------------------------------------------------
      // [조건 1] 극한 ↔ 레전드 교차 중복 배제 로직
      // ----------------------------------------------------------------
      // 현재 회차의 인덱스를 찾아서, 상대 모드의 '동일한 순서 회차'에 이 캐릭터가 있는지 확인합니다.
      let currentSessionIndex = -1;
      let targetSessionName = '';

      if (selectedSessionKey) {
        // 필터링이 켜져있을 때 (예: "스피드/여성/영웅-0")
        const [sessionName, idxStr] = selectedSessionKey.split('-');
        currentSessionIndex = parseInt(idxStr, 10);
        targetSessionName = sessionName;
      } else if (placementMode === 'click' && activeSession) {
        // 클릭 배치 모드로 세션을 찍어두었을 때
        currentSessionIndex = currentSessions.indexOf(activeSession);
        targetSessionName = activeSession;
      }

      // 동일한 순서(index)의 상대 세션 이름을 찾아 그곳에 배치되었는지 검사
      if (currentSessionIndex !== -1) {
        const oppositeSessions = abMode === 'abx' ? ABL_SESSIONS : ABX_SESSIONS;
        const oppositeSessionName = oppositeSessions[currentSessionIndex];
        const oppositeAllocatedIds = oppositeLayoutData[oppositeSessionName] || [];
        
        // 상대 모드 동일 회차에 이미 쓰였다면 대기열에서 제외
        if (oppositeAllocatedIds.includes(char.id)) return false;
      }

      // ----------------------------------------------------------------
      // 🔥 [조건 2] 현재 선택된 회차(세션) 내 중복 배제 로직
      // ----------------------------------------------------------------
      if (targetSessionName) {
        const currentAllocatedIds = currentLayoutData[targetSessionName] || [];
        // 현재 보고 있는 회차에 이미 들어가 있는 캐릭터라면 대기열에서 제외
        if (currentAllocatedIds.includes(char.id)) return false;
      }

      // 1. 회차 카드 선택 필터링 (카드 조건 텍스트 파싱 매칭)
      if (selectedSessionKey) {
        const sessionName = selectedSessionKey.split('-')[0];
        if (sessionName !== '자유') {
          const requiredTags = sessionName.split('/');
          // 슈퍼 빌런 조건 처리를 위해 '빌런' 요청 시 '슈퍼 빌런'도 허용되도록 예외 처리 포함
          const matchAll = requiredTags.every(req => {
            if (req === '빌런') return faction === '슈퍼 빌런' || activeUni.type.includes('빌런' as any);
            return activeUni.type.includes(req as any);
          });
          if (!matchAll) return false;
        }
      }

      // 드롭다운 필터링
      if (filterType !== '전체' && baseType !== filterType) return false;
      if (filterRace !== '전체' && race !== filterRace) return false;
      if (filterGender !== '전체' && gender !== filterGender) return false;
      if (filterFaction !== '전체' && faction !== filterFaction) return false;
      if (filterElement !== '전체' && element !== filterElement) return false;
      if (filterAbility !== '전체' && !activeUni.ability.includes(filterAbility)) return false;

      return true;
    }).sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  }, [userCharacters, selectedSessionKey, filterType, filterRace, filterGender, filterFaction, filterElement, filterAbility, abMode, abxLayout, ablLayout, placementMode, activeSession, currentSessions]);

  return (
    <div>
      {/* 상단 컨트롤 바: 왼쪽(극한/레전드 모드) | 오른쪽(편집/보기 탭) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 16 }}>
        
        {/* [왼쪽] 기존 극한 / 레전드 선택 바 */}
        <div style={{ display: 'flex', background: '#13131e', padding: '4px', borderRadius: 8, width: 'fit-content', border: '1px solid #2a2a40' }}>
          <button 
            onClick={() => { setAbMode('abx'); setSelectedSessionKey(null); }} 
            style={{ padding: '6px 16px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: abMode === 'abx' ? '#2a2a40' : 'transparent', color: abMode === 'abx' ? '#fff' : '#888' }}
          >극한</button>
          <button 
            onClick={() => { setAbMode('abl'); setSelectedSessionKey(null); }} 
            style={{ padding: '6px 16px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: abMode === 'abl' ? '#2a2a40' : 'transparent', color: abMode === 'abl' ? '#fff' : '#888' }}
          >레전드</button>
        </div>

        {/* [오른쪽] 새로 추가되는 편집 탭 / 보기 탭 전환 바 */}
        <div style={{ display: 'flex', background: '#13131e', padding: '4px', borderRadius: 8, width: 'fit-content', border: '1px solid #2a2a40' }}>
          <button 
            onClick={() => setActiveTab('edit')} 
            style={{ padding: '6px 16px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: activeTab === 'edit' ? '#5b8dee' : 'transparent', color: activeTab === 'edit' ? '#fff' : '#888', transition: 'all 0.2s' }}
          >편집</button>
          <button 
            onClick={() => setActiveTab('view')} 
            style={{ padding: '6px 16px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: activeTab === 'view' ? '#0ea5e9' : 'transparent', color: activeTab === 'view' ? '#fff' : '#888', transition: 'all 0.2s' }}
          >보기</button>
        </div>
      </div>

      {/* 편집 탭*/}
      {activeTab === 'edit' && (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'flex-start' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '740px', overflowY: 'auto', paddingRight: 4 }}>
          {currentSessions.map((session, index) => {
            const currentKey = `${session}-${index}`;
            const isSelected = selectedSessionKey === currentKey;
            const isClickTarget = placementMode === 'click' && activeSession === session;

            return (
              <div 
                key={currentKey}
                onClick={() => {
                  setSelectedSessionKey(isSelected ? null : currentKey);
                  if (placementMode === 'click') {
                    setActiveSession(activeSession === session ? null : session);
                  }
                }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropToSession(e, session)}
                style={{ 
                  background: isClickTarget ? '#1e1e2d' : '#13131e', 
                  border: isClickTarget ? '2px solid #0ea5e9' : (isSelected ? '1px solid #5b8dee' : '1px solid #2a2a40'), 
                  borderRadius: 10, 
                  padding: '14px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 8,
                  cursor: 'pointer',
                  boxShadow: isClickTarget ? '0 0 14px #0ea5e930' : (isSelected ? '0 0 12px #5b8dee20' : 'none'),
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: isSelected ? '#5b8dee' : '#e0e0f0' }}>
                    <span style={{ opacity: 0.4, marginRight: 6, fontSize: 11 }}>{index + 1}.</span>
                    {session}
                  </div>
                  {isSelected && <span style={{ fontSize: 10, background: '#5b8dee20', color: '#5b8dee', padding: '1px 5px', borderRadius: 4, fontWeight: 600 }}>필터링 적용됨</span>}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                  <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1, minHeight: '44px', alignItems: 'center', background: '#0d0d1440', borderRadius: 6, padding: '6px' }}>
                    {(currentLayoutData[session] || []).map(id => {
                      const char = MFF_DATABASE_CHARACTERS.find(c => c.id === id);
                      if (!char) return null;
                      const userState = userCharacters[char.id] || { activeUniform: '' };
                      const currentUni = char.uniforms.find(u => u.name === userState.activeUniform) || char.uniforms[char.uniforms.length - 1];

                    return (
                      <div 
                        key={id}
                        onClick={() => removeCharFromSession(session, id)}
                        style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${TYPE_COLOR[currentUni.type[0]]}aa`, cursor: 'pointer' }}
                        title="클릭 시 팀에서 제외"
                      >
                        <img src={getDynamicPortrait(char)} alt={char.name} style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                      </div>
                    );
                  })}
                  {(currentLayoutData[session] || []).length === 0 && <span style={{ color: '#444', fontSize: 11 }}>캐릭터를 드래그하여 배치하세요.</span>}
                </div>
                
                <div onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                  <input 
                    type="number"
                    placeholder="0"
                    value={sessionScores[currentKey] || ''}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10) || 0;
                      setSessionScores(prev => ({ ...prev, [currentKey]: val }));
                    }}
                    style={{ width: '75px', padding: '6px 8px', fontSize: '12px', background: '#0d0d14', border: '1px solid #2a2a40', borderRadius: 6, color: '#fff', textAlign: 'right', outline: 'none' }}
                  />
                  <span style={{ fontSize: 11, color: '#666', fontWeight: 600 }}>점</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

        <div style={{ background: '#13131e', border: '1px solid #2a2a40', borderRadius: 12, padding: '1rem', position: 'sticky', top: 70 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#aaa', marginBottom: 12 }}>📥 얼배 대기 캐릭터 목록 ({abMode === 'abx' ? '극한' : '레전드'})</div>
          
          {/* 변경된 세부 분할 속성 필터 패널 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px', marginBottom: 14, background: '#0d0d1460', padding: 10, borderRadius: 8, border: '1px solid #ffffff05' }}>
            <div>
              <label style={{ fontSize: 10, color: '#666', display: 'block', marginBottom: 3 }}>타입</label>
              <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ width: '100%', background: '#1e1e2e', border: '1px solid #2a2a40', color: '#fff', fontSize: 11, padding: '4px', borderRadius: 4, outline: 'none' }}>
                {['전체', '컴뱃', '블래스트', '스피드', '유니버셜'].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 10, color: '#666', display: 'block', marginBottom: 3 }}>종족</label>
              <select value={filterRace} onChange={e => setFilterRace(e.target.value)} style={{ width: '100%', background: '#1e1e2e', border: '1px solid #2a2a40', color: '#fff', fontSize: 11, padding: '4px', borderRadius: 4, outline: 'none' }}>
                {['전체', '인간', '뮤턴트', '인휴먼', '외계인', '창조물', '불명'].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 10, color: '#666', display: 'block', marginBottom: 3 }}>성별</label>
              <select value={filterGender} onChange={e => setFilterGender(e.target.value)} style={{ width: '100%', background: '#1e1e2e', border: '1px solid #2a2a40', color: '#fff', fontSize: 11, padding: '4px', borderRadius: 4, outline: 'none' }}>
                {['전체', '남성', '여성', '성별 없음'].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 10, color: '#666', display: 'block', marginBottom: 3 }}>진영</label>
              <select value={filterFaction} onChange={e => setFilterFaction(e.target.value)} style={{ width: '100%', background: '#1e1e2e', border: '1px solid #2a2a40', color: '#fff', fontSize: 11, padding: '4px', borderRadius: 4, outline: 'none' }}>
                {['전체', '영웅', '슈퍼 빌런', '중립'].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 10, color: '#666', display: 'block', marginBottom: 3 }}>천성</label>
              <select value={filterElement} onChange={e => setFilterElement(e.target.value)} style={{ width: '100%', background: '#1e1e2e', border: '1px solid #2a2a40', color: '#fff', fontSize: 11, padding: '4px', borderRadius: 4, outline: 'none' }}>
                {['전체', '파멸', '냉혹', '질서', '정의'].map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 10, color: '#666', display: 'block', marginBottom: 3 }}>능력 (Ability)</label>
              <select value={filterAbility} onChange={e => setFilterAbility(e.target.value)} style={{ width: '100%', background: '#1e1e2e', border: '1px solid #2a2a40', color: '#fff', fontSize: 11, padding: '4px', borderRadius: 4, outline: 'none' }}>
                <option value="전체">전체</option>
                {allAbilities.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, maxHeight: '380px', overflowY: 'auto' }}>
            {filteredCharacters.map(char => {
              const userState = userCharacters[char.id] || { activeUniform: '' };
              const currentUni = char.uniforms.find(u => u.name === userState.activeUniform) || char.uniforms[char.uniforms.length - 1];

              return (
                <div 
                  key={char.id}
                  // [수정] 배치 설정 모드에 따라 드래그 지원 여부를 가변 제어
                  draggable={placementMode === 'drag'} 
                  onDragStart={(e) => handleDragStart(e, char.id)}
                  // [추가 클릭 배치 인터랙션] 요일 칸이 선택된 채 클릭 시 즉각 강제 드롭 연동
                  onClick={() => {
                    if (placementMode === 'click' && activeSession) {
                      const mockEvent = {
                        dataTransfer: { getData: () => char.id },
                        preventDefault: () => {}
                      } as any;
                      handleDropToSession(mockEvent, activeSession); 
                    }
                  }}
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '50%', 
                    overflow: 'hidden', 
                    border: `2px solid ${TYPE_COLOR[currentUni.type[0]]}88`, 
                    // [수정] 클릭 상태 유무에 따른 동적 마우스 모양 피드백 및 시각 효과 조절
                    cursor: placementMode === 'click' ? (activeSession ? 'pointer' : 'not-allowed') : 'grab',
                    opacity: placementMode === 'click' && !activeSession ? 0.35 : 1,
                    transition: 'opacity 0.2s'
                  }}
                  title={char.name}
                >
                  <img src={getDynamicPortrait(char)} alt={char.name} style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                </div>
              );
            })}
            {filteredCharacters.length === 0 && <div style={{ color: '#444', fontSize: 12, padding: 10 }}>조건에 일치하는 캐릭터가 없습니다.</div>}
          </div>
        </div>
      </div>
    )}

    {/* ----------------------------------------------------------------- */}
    {/* [CASE 2] 보기 탭 활성화 UI (오늘의 극한/레전드 대형 대시보드)          */}
    {/* ----------------------------------------------------------------- */}
    {activeTab === 'view' && (
      let xSessionName = '';
      let lSessionName = '';
      let xScoreKey = '';
      let lScoreKey = '';
      if (todaySessionInfo.isSunday) {
          // 일요일일 경우: '자유' 세션 강제 지정 (주기 인덱스 없음)
          xSessionName = '자유';
          lSessionName = '자유';
          // 기존 편집 탭에서 대략 '자유'가 들어간 인덱스나 고정 키로 점수를 매핑
          // 여기서는 첫 번째 자유 세션이 찍히도록 예시 처리
          xScoreKey = '자유-1'; 
          lScoreKey = '자유-1';
        } else {
          // 평일일 경우: 자동 계산된 로테이션 인덱스 세션 매핑
          const idx = todaySessionInfo.sessionIndex;
          xSessionName = ABX_SESSIONS[idx];[cite: 1]
          lSessionName = ABL_SESSIONS[idx];[cite: 1]
          xScoreKey = `${xSessionName}-${idx}`;
          lScoreKey = `${lSessionName}-${idx}`;
        }

        return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '10px' }}>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#0ea5e9', borderLeft: '4px solid #0ea5e9', paddingLeft: 10 }}>
            <span>📊 오늘의 얼라이언스 배틀 현황판</span>
              <span style={{ fontSize: '12px', color: '#888', fontWeight: 500 }}>
                {todaySessionInfo.isSunday ? '일요일' : `${todaySessionInfo.sessionIndex + 1}회차`}
              </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Left: 극한 배틀 요약 거대 카드 */}
            <div style={{ background: '#13131e', border: '1px solid #ff3e3e44', borderRadius: 16, padding: '24px', boxShadow: '0 8px 24px rgba(229,62,62,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ color: '#e53e3e', fontSize: 11, fontWeight: 800, letterSpacing: '1px' }}>EXTREME MODE</span>
                <span style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>{xSessionName}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: '#0d0d1450', padding: 16, borderRadius: 12 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {(abxLayout[xSessionName] || []).map(id => {
                      const char = MFF_DATABASE_CHARACTERS.find(c => c.id === id);
                      return char ? (
                        <div key={id} style={{ width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #e53e3e' }}>
                          <img src={getDynamicPortrait(char)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ) : null;
                    })}
                    {(abxLayout[xSessionName] || []).length === 0 && <div style={{ color: '#444', fontSize: 13 }}>배치된 영웅 없음</div>}
                  </div>
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: '#666' }}>최고 기록</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#fff' }}>
                      {(sessionScores[xScoreKey] || 0).toLocaleString()} <span style={{ fontSize: 13, color: '#aaa' }}>점</span>
                    </div>
                  </div>
                </div>
              </div>

            {/* Right: 레전드 배틀 요약 거대 카드 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: '#0d0d1450', padding: 16, borderRadius: 12 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  {(ablLayout[lSessionName] || []).map(id => {
                    const char = MFF_DATABASE_CHARACTERS.find(c => c.id === id);
                    return char ? (
                      <div key={id} style={{ width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #00f0ff' }}>
                        <img src={getDynamicPortrait(char)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      ) : null;
                   })}
                  {(ablLayout[lSessionName] || []).length === 0 && <div style={{ color: '#444', fontSize: 13 }}>배치된 영웅 없음</div>}
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: '#666' }}>최고 기록</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#fff' }}>
                    {(sessionScores[lScoreKey] || 0).toLocaleString()} <span style={{ fontSize: 13, color: '#aaa' }}>점</span>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      )}
    </div>
  );
}