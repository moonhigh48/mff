'use client';

import { useState, useMemo } from 'react';
import { MFF_DATABASE_CHARACTERS } from '../data/Characters';
import { useEffect } from 'react';

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
  scores?: Record<string, number>;
}
type UserCharactersData = Record<string, UserCharacterState>;
interface SessionCharObject {
  id: string;
  abrole: string[];
}
type EolbaeLayoutData = Record<string, (string | SessionCharObject)[]>;

interface ABProps {
  userCharacters: UserCharactersData;
  setUserCharacters: React.Dispatch<React.SetStateAction<UserCharactersData>>;
  abxLayout: EolbaeLayoutData;
  setAbxLayout: (layout: EolbaeLayoutData) => void;
  ablLayout: EolbaeLayoutData;
  setAblLayout: (layout: EolbaeLayoutData) => void;
  getDynamicPortrait: (char: any) => string;
  saveToServer: (updatedAbx: EolbaeLayoutData, updatedAbl: EolbaeLayoutData, updatedScores?: Record<string, number>) => Promise<void>;
  placementMode: 'drag' | 'click';
  activeSession: string | null;
  setActiveSession: (session: string | null) => void;
  sessionScores: Record<string, number>;
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
  setActiveSession,
  sessionScores
}: ABProps) {

  const [abMode, setAbMode] = useState<'abx' | 'abl'>('abx');
  const [activeTab, setActiveTab] = useState<'edit' | 'view'>('view');
  const [selectedSessionKey, setSelectedSessionKey] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('전체');
  const [filterRace, setFilterRace] = useState<string>('전체');
  const [filterGender, setFilterGender] = useState<string>('전체');
  const [filterFaction, setFilterFaction] = useState<string>('전체');
  const [filterRole, setfilterRole] = useState<string>('전체');
  const [filterAbility, setFilterAbility] = useState<string>('전체');
  const [localScores, setLocalScores] = useState<Record<string, number>>(sessionScores);
  const [isDealerMode, setIsDealerMode] = useState<boolean>(false);

  const todaySessionInfo = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    if (dayOfWeek === 0) {
      return { isSunday: true, sessionIndex: 1 };
    }

    const baseDate = new Date(2026, 5, 24);
    today.setHours(0,0,0,0);
    baseDate.setHours(0,0,0,0);

    const msDiff = today.getTime() - baseDate.getTime();
    const totalDaysDiff = Math.floor(msDiff / (1000 * 60 * 60 * 24));

    let currentSessionNum = 11; 

    if (totalDaysDiff > 0) {
      for (let i = 1; i <= totalDaysDiff; i++) {
        const checkDate = new Date(baseDate.getTime() + (i * 1000 * 60 * 60 * 24));
        if (checkDate.getDay() !== 0) {
          currentSessionNum++;
          if (currentSessionNum > 24) currentSessionNum = 1;
        }
      }
    } else if (totalDaysDiff < 0) {
      for (let i = -1; i >= totalDaysDiff; i--) {
        const checkDate = new Date(baseDate.getTime() + (i * 1000 * 60 * 60 * 24));
        if (checkDate.getDay() !== 0) {
          currentSessionNum--;
          if (currentSessionNum < 1) currentSessionNum = 24;
        }
      }
    }

    return {
      isSunday: false,
      sessionIndex: currentSessionNum - 1
    };
  }, []);

  const handleScoreChange = async (key: string, value: number) => {
    // 현재 부모에게 받은 sessionScores 복사 후 새 점수 대입
    const nextScores = { ...sessionScores, [key]: value };
    // 부모의 saveToServer를 호출하여 리액트 상태 갱신 + 파이어베이스 저장을 동시에 처리!
    await saveToServer(abxLayout, ablLayout, nextScores);
  };

  useEffect(() => {
    setLocalScores(sessionScores);
  }, [sessionScores]);

  const parseLayout = (rawList: (string | SessionCharObject)[]): SessionCharObject[] => {
    return (rawList || []).map((item, idx) => {
      if (typeof item === 'string') {
        const defaultRole = idx === 0 ? ['리더'] : idx === 1 ? ['딜러'] : ['서포터'];
        return { id: item, abrole: defaultRole };
      }
      return item;
    });
  };

  // 💡 순서가 변경되었을 때 인덱스에 따라 기본 역할을 재계산해주는 함수 (원치 않으시면 역할 고정으로 로직 수정 가능)
  const reassignDefaultRoles = (list: SessionCharObject[]): SessionCharObject[] => {
    return list.map((char, idx) => {
      const defaultRole = idx === 0 ? '리더' : idx === 1 ? '딜러' : '서포터';
      // 기존 커스텀 지정했던 역할들 중 기본군(리더/딜러/서포터) 성격은 밀어버리고 순서 우선 부여하되, 다중역할 꼬임 방지
      // 여기서는 심플하게 '넣는 순서' 기준의 역할 초기화 방식을 타거나, 기존 abrole을 유지할 수 있습니다.
      // 요구사항인 "넣는 순서에 따라 기본 지정"을 위해 새로 정렬된 인덱스로 기본 역할을 재배정합니다.
      let nextRoles = [...char.abrole];
      if (idx === 0 && !nextRoles.includes('리더')) nextRoles = ['리더', ...nextRoles.filter(r => r !== '딜러' && r !== '서포터')];
      else if (idx === 1 && !nextRoles.includes('딜러')) nextRoles = ['딜러', ...nextRoles.filter(r => r !== '리더' && r !== '서포터')];
      else if (idx > 1 && !nextRoles.includes('서포터') && !nextRoles.includes('딜러')) nextRoles = ['서포터']; 
      
      return { ...char, abrole: nextRoles };
    });
  };

  const handleDragStart = (e: React.DragEvent, charId: string, fromSession?: string) => {
    e.dataTransfer.setData('text/plain', charId);
    if (fromSession) {
      e.dataTransfer.setData('fromSession', fromSession);
    }
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const handleDropToSession = (e: React.DragEvent, session: string, targetCharId?: string) => {
    e.preventDefault();
    const charId = e.dataTransfer.getData('text/plain');
    const fromSession = e.dataTransfer.getData('fromSession');
    if (!charId) return;

    const currentLayoutData = abMode === 'abx' ? abxLayout : ablLayout;
    const setLayout = abMode === 'abx' ? setAbxLayout : setAblLayout;
    
    let currentLayout = parseLayout(currentLayoutData[session] || []);
    const existingIds = currentLayout.map(c => c.id);

    if (fromSession === session) {
      const fromIndex = existingIds.indexOf(charId);
      if (fromIndex === -1) return;
      
      const [movedChar] = currentLayout.splice(fromIndex, 1);

      if (targetCharId) {
        const toIndex = currentLayout.map(c => c.id).indexOf(targetCharId);
        currentLayout.splice(toIndex, 0, movedChar);
      } else {
        currentLayout.push(movedChar);
      }

      currentLayout = reassignDefaultRoles(currentLayout);
      
      const nextLayout = { ...currentLayoutData, [session]: currentLayout };
      setLayout(nextLayout);
      if (abMode === 'abx') saveToServer(nextLayout, ablLayout);
      else saveToServer(abxLayout, nextLayout);
      return;
    }

    if (existingIds.includes(charId)) return;
    
    const insertIdx = targetCharId ? currentLayout.map(c => c.id).indexOf(targetCharId) : currentLayout.length;
    const defaultRole = insertIdx === 0 ? ['리더'] : insertIdx === 1 ? ['딜러'] : ['서포터'];
    const newCharObj = { id: charId, abrole: defaultRole };

    if (targetCharId) {
      currentLayout.splice(insertIdx, 0, newCharObj);
    } else {
      currentLayout.push(newCharObj);
    }

    currentLayout = reassignDefaultRoles(currentLayout);

    const nextLayout = { ...currentLayoutData, [session]: currentLayout };
    setLayout(nextLayout);
    if (abMode === 'abx') saveToServer(nextLayout, ablLayout);
    else saveToServer(abxLayout, nextLayout);
  };

  const removeCharFromSession = (session: string, charId: string) => {
    const currentLayoutData = abMode === 'abx' ? abxLayout : ablLayout;
    const setLayout = abMode === 'abx' ? setAbxLayout : setAblLayout;

    let filtered = parseLayout(currentLayoutData[session] || []).filter(c => c.id !== charId);
    filtered = reassignDefaultRoles(filtered);

    const nextLayout = { ...currentLayoutData, [session]: filtered };
    setLayout(nextLayout);
    if (abMode === 'abx') saveToServer(nextLayout, ablLayout);
    else saveToServer(abxLayout, nextLayout);
  };
  
  const handleToggleDealerRole = (session: string, charId: string) => {
    const currentLayoutData = abMode === 'abx' ? abxLayout : ablLayout;
    const setLayout = abMode === 'abx' ? setAbxLayout : setAblLayout;

    const updated = parseLayout(currentLayoutData[session] || []).map(char => {
      if (char.id === charId) {
        const hasDealer = char.abrole.includes('딜러');
        return {
          ...char,
          abrole: hasDealer 
            ? char.abrole.filter(r => r !== '딜러') 
            : [...char.abrole, '딜러'] // 순서대로 뒤에 오버레이가 붙도록 push
        };
      }
      return char;
    });

    const nextLayout = { ...currentLayoutData, [session]: updated };
    setLayout(nextLayout);
    if (abMode === 'abx') saveToServer(nextLayout, ablLayout);
    else saveToServer(abxLayout, nextLayout);
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
      
      const [baseType, race, gender, faction] = activeUni.type;
      
      let currentSessionIndex = -1;
      let targetSessionName = '';

      if (selectedSessionKey) {
        const [sessionName, idxStr] = selectedSessionKey.split('-');
        currentSessionIndex = parseInt(idxStr, 10);
        targetSessionName = sessionName;
      } else if (placementMode === 'click' && activeSession) {
        currentSessionIndex = currentSessions.indexOf(activeSession);
        targetSessionName = activeSession;
      }

      if (currentSessionIndex !== -1) {
        const oppositeSessions = abMode === 'abx' ? ABL_SESSIONS : ABX_SESSIONS;
        const oppositeSessionName = oppositeSessions[currentSessionIndex];
        const oppositeAllocatedIds = oppositeLayoutData[oppositeSessionName] || [];
        
        if (oppositeAllocatedIds.includes(char.id)) return false;
      }

      if (targetSessionName) {
        const currentAllocatedIds = currentLayoutData[targetSessionName] || [];
        if (currentAllocatedIds.includes(char.id)) return false;
      }

      if (selectedSessionKey) {
        const sessionName = selectedSessionKey.split('-')[0];
        if (sessionName !== '자유') {
          const requiredTags = sessionName.split('/');
          const matchAll = requiredTags.every(req => {
            if (req === '빌런') return faction === '슈퍼 빌런' || activeUni.type.includes('빌런' as any);
            return activeUni.type.includes(req as any);
          });
          if (!matchAll) return false;
        }
      }
      if (filterType !== '전체' && baseType !== filterType) return false;
      if (filterRace !== '전체' && race !== filterRace) return false;
      if (filterGender !== '전체' && gender !== filterGender) return false;
      if (filterFaction !== '전체' && faction !== filterFaction) return false;
      if (filterRole !== '전체' && !activeUni.role.includes(filterRole)) return false;
      if (filterAbility !== '전체' && !activeUni.ability.includes(filterAbility)) return false;
      return true;
    }).sort((a, b) => a.name.localeCompare(b.name, 'ko'));
  }, [userCharacters, selectedSessionKey, filterType, filterRace, filterGender, filterFaction, filterRole, filterAbility, abMode, abxLayout, ablLayout, placementMode, activeSession, currentSessions]);

  const todayViewInfo = useMemo(() => {
    const abxName = todaySessionInfo.isSunday ? '자유' : ABX_SESSIONS[todaySessionInfo.sessionIndex];
    const ablName = todaySessionInfo.isSunday ? '자유' : ABL_SESSIONS[todaySessionInfo.sessionIndex];
    const idx = todaySessionInfo.isSunday ? 1 : todaySessionInfo.sessionIndex;
    return {
      abxName,
      ablName,
      abxScoreKey: `${abxName}-${idx}`,
      ablScoreKey: `${ablName}-${idx}`
    };
  }, [todaySessionInfo]);

  const ROLE_ICONS: Record<string, string> = {
    '리더': '👑',    // 예: '/images/leader.png'
    '딜러': 'public/dps.png',
    '서포터': '🛡️'   // 예: '/images/supporter.png'
  };

  return (
    <div>
      <style>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 16 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {/* 1-1. 편집 / 보기 탭 */}
          <div style={{ display: 'flex', background: '#13131e', padding: '4px', borderRadius: 8, width: 'fit-content', border: '1px solid #2a2a40' }}>
            <button 
              onClick={() => { setActiveTab('view'); setIsDealerMode(false); }} 
              style={{ padding: '6px 16px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: activeTab === 'view' ? '#0ea5e9' : 'transparent', color: activeTab === 'view' ? '#fff' : '#888', transition: 'all 0.2s' }}
            >보기</button>
            <button 
              onClick={() => setActiveTab('edit')} 
              style={{ padding: '6px 16px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: activeTab === 'edit' ? '#5b8dee' : 'transparent', color: activeTab === 'edit' ? '#fff' : '#888', transition: 'all 0.2s' }}
            >편집</button>
          </div>

          {/* 💡 딜러 설정 버튼 (편집 모드에서만 노출) */}
          {activeTab === 'edit' && (
            <button
              onClick={() => setIsDealerMode(!isDealerMode)}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                border: 'none',
                background: isDealerMode ? '#e53e3e' : '#2a2a40',
                color: '#fff',
                transition: 'all 0.15s',
                boxShadow: isDealerMode ? '0 0 10px #e53e3e50' : 'none'
              }}
            >
              {isDealerMode ? '📢 초상화 클릭 시 딜러 지정 해제 가능' : '⚔️ 딜러 설정 모드'}
            </button>
          )}
        </div>

        {/* 1-2. 극한 / 레전드 탭 */}
        {activeTab === 'edit' && (
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
        )}
      </div>

      {activeTab === 'edit' && (
        <div style={{ display: 'grid', gridTemplateColumns: '6fr 4fr', gap: 20, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '740px', overflowY: 'auto', paddingRight: 4}}>
            {currentSessions.map((session, index) => {
              const currentKey = `${session}-${index}`;
              const isSelected = selectedSessionKey === currentKey;
              const isClickTarget = placementMode === 'click' && activeSession === session;
              const structuredLayout = parseLayout(currentLayoutData[session] || []);

              return (
                <div 
                  key={currentKey}
                  onClick={() => {
                    // 딜러 수정 모드가 아닐 때만 세션 선택 핸들링 수행
                    if (!isDealerMode) {
                      setSelectedSessionKey(isSelected ? null : currentKey);
                      if (placementMode === 'click') {
                        setActiveSession(activeSession === session ? null : session);
                      }
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
                    cursor: isDealerMode ? 'default' : 'pointer',
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
                    <div onClick={e => e.stopPropagation()}
                    style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: 1, minHeight: '44px', alignItems: 'center', background: '#0d0d1440', borderRadius: 6, padding: '6px'}}>
                      {structuredLayout.map(charObj => {
                        const char = MFF_DATABASE_CHARACTERS.find(c => c.id === charObj.id);
                        if (!char) return null;
                        const userState = userCharacters[char.id] || { activeUniform: '' };
                        const currentUni = char.uniforms.find(u => u.name === userState.activeUniform) || char.uniforms[char.uniforms.length - 1];

                        return (
                          <div 
                            key={charObj.id}
                            draggable={!isDealerMode}
                            onDragStart={(e) => handleDragStart(e, charObj.id, session)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => {
                              e.stopPropagation();
                              handleDropToSession(e, session, charObj.id);
                            }}
                            onClick={() => {
                              if (isDealerMode) {
                                handleToggleDealerRole(session, charObj.id);
                              } else {
                                removeCharFromSession(session, charObj.id);
                              }
                            }}
                            style={{ 
                              position: 'relative', // 💡 역할군 오버레이 아이콘을 띄우기 위한 기준점 마련
                              width: '44px', 
                              height: '44px', 
                              borderRadius: '10px', 
                              border: isDealerMode ? '2px dashed #e53e3e' : `2px solid ${TYPE_COLOR[currentUni.type[0]]}aa`, 
                              cursor: isDealerMode ? 'pointer' : 'move' 
                            }}
                            title={isDealerMode ? "클릭: '딜러' 추가 설정/해제" : "드래그: 순서 변경 / 클릭: 팀에서 제외"}
                          >
                            <img src={getDynamicPortrait(char)} alt={char.name} style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                            
                            {/* 💡 🌟 좌측 상단 오버레이 영역 순서대로 가로 정렬 */}
                            <div style={{
                              position: 'absolute',
                              top: '-4px',
                              left: '-4px',
                              display: 'flex',
                              gap: '2px',
                              flexDirection: 'row',
                              pointerEvents: 'none'
                            }}>
                              {charObj.abrole.map((role, rIdx) => (
                                <div
                                  key={rIdx}
                                  style={{
                                    width: '15px',
                                    height: '15px',
                                    background: '#13131e',
                                    border: `1px solid ${role === '딜러' ? '#e53e3e' : role === '리더' ? '#d69e2e' : '#3182ce'}`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '9px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.6)'
                                  }}
                                  title={role}
                                >
                                  {ROLE_ICONS[role]}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                      {structuredLayout.length === 0 && <span style={{ color: '#444', fontSize: 11 }}>캐릭터를 배치하세요.</span>}
                    </div>
                    
                    <div onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                      <input 
                        type="number"
                        placeholder="0"
                        value={localScores[currentKey] ?? ''}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10) || 0;
                          setLocalScores(prev => ({ ...prev, [currentKey]: val }));
                        }}
                        onBlur={async () => {
                          await handleScoreChange(currentKey, localScores[currentKey] || 0);
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

          {/* 대기 캐릭터 목록 생략 (동일) */}
          <div style={{ background: '#13131e', border: '1px solid #2a2a40', borderRadius: 12, padding: '1rem', position: 'sticky', top: 70 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#aaa', marginBottom: 12 }}>📥 얼배 대기 캐릭터 목록 ({abMode === 'abx' ? '극한' : '레전드'})</div>
            
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
                <label style={{ fontSize: 10, color: '#666', display: 'block', marginBottom: 3 }}>역할</label>
                <select value={filterRole} onChange={e => setfilterRole(e.target.value)} style={{ width: '100%', background: '#1e1e2e', border: '1px solid #2a2a40', color: '#fff', fontSize: 11, padding: '4px', borderRadius: 4, outline: 'none' }}>
                  {['전체', '리더', '딜러', '서포터'].map(v => <option key={v} value={v}>{v}</option>)}
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
                    draggable={placementMode === 'drag' && !isDealerMode} 
                    onDragStart={(e) => handleDragStart(e, char.id)}
                    onClick={() => {
                      if (placementMode === 'click' && activeSession && !isDealerMode) {
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
                      borderRadius: '10px', 
                      overflow: 'hidden', 
                      border: `2px solid ${TYPE_COLOR[currentUni.type[0]]}88`, 
                      cursor: isDealerMode ? 'not-allowed' : (placementMode === 'click' ? (activeSession ? 'pointer' : 'not-allowed') : 'grab'),
                      opacity: (placementMode === 'click' && !activeSession) || isDealerMode ? 0.35 : 1,
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

      {activeTab === 'view' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '10px' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0ea5e9', textAlign: 'center', width: '100%', margin: '10px 0 6px 0' }}>
            <span>
              {todaySessionInfo.isSunday 
                ? '📅 인피니티 배틀 (일요일)' 
                : `📅 ${todaySessionInfo.sessionIndex + 1}회차 얼라이언스 배틀`}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* EXTREME MODE */}
            <div style={{ background: '#13131e', border: '1px solid #00f0ff44', borderRadius: 16, padding: '24px', boxShadow: '0 8px 24px rgba(229,62,62,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ color: '#03aab6', fontSize: 11, fontWeight: 800, letterSpacing: '1px' }}>EXTREME MODE</span>
                <span style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>{todayViewInfo.abxName}</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: '#0d0d1450', padding: 16, borderRadius: 12 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {parseLayout(abxLayout[todayViewInfo.abxName] || []).map(charObj => {
                    const char = MFF_DATABASE_CHARACTERS.find(c => c.id === charObj.id);
                    return char ? (
                      <div key={charObj.id} style={{ position: 'relative', width: '54px', height: '54px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #03aab6' }}>
                        <img src={getDynamicPortrait(char)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: '2px', left: '2px', display: 'flex', gap: '1px' }}>
                          {charObj.abrole.map((r, idx) => (
                            <span key={idx} style={{ fontSize: '9px', background: '#13131ea0', borderRadius: '50%', padding: '1px' }}>{ROLE_ICONS[r]}</span>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })}
                  {parseLayout(abxLayout[todayViewInfo.abxName] || []).length === 0 && (
                    <div style={{ color: '#444', fontSize: 13, padding: '16px 0' }}>배치된 영웅 없음</div>
                  )}
                </div>
                <div style={{ borderTop: '1px solid #2a2a40', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>오늘의 점수</span>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>
                    {(sessionScores[todayViewInfo.abxScoreKey] || 0).toLocaleString()} <span style={{ fontSize: 13, color: '#03aab6', fontWeight: 700 }}>점</span>
                  </div>
                </div>
              </div>
            </div>

            {/* LEGEND MODE */}
            <div style={{ background: '#13131e', border: '1px solid #ff3e3e44', borderRadius: 16, padding: '24px', boxShadow: '0 8px 24px rgba(0,240,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ color: '#d52626', fontSize: 11, fontWeight: 800, letterSpacing: '1px' }}>LEGEND MODE</span>
                <span style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>{todayViewInfo.ablName}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: '#0d0d1450', padding: 16, borderRadius: 12 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {parseLayout(ablLayout[todayViewInfo.ablName] || []).map(charObj => {
                    const char = MFF_DATABASE_CHARACTERS.find(c => c.id === charObj.id);
                    return char ? (
                      <div key={charObj.id} style={{ position: 'relative', width: '54px', height: '54px', borderRadius: '10px', overflow: 'hidden', border: '2px solid #d52626' }}>
                        <img src={getDynamicPortrait(char)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: '2px', left: '2px', display: 'flex', gap: '1px' }}>
                          {charObj.abrole.map((r, idx) => (
                            <span key={idx} style={{ fontSize: '9px', background: '#13131ea0', borderRadius: '50%', padding: '1px' }}>{ROLE_ICONS[r]}</span>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })}
                  {parseLayout(ablLayout[todayViewInfo.ablName] || []).length === 0 && (
                    <div style={{ color: '#444', fontSize: 13, padding: '16px 0' }}>배치된 영웅 없음</div>
                  )}
                </div>
                <div style={{ borderTop: '1px solid #2a2a40', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#888', fontWeight: 600 }}>오늘의 점수</span>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>
                    {(sessionScores[todayViewInfo.ablScoreKey] || 0).toLocaleString()} <span style={{ fontSize: 13, color: '#d52626', fontWeight: 700 }}>점</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}