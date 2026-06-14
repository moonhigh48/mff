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

interface UserCharacterState { owned: boolean; activeUniform: string; }
type UserCharactersData = Record<string, UserCharacterState>;
type EolbaeLayoutData = Record<string, string[]>;

interface ABProps {
  userCharacters: UserCharactersData;
  abxLayout: EolbaeLayoutData;
  setAbxLayout: (layout: EolbaeLayoutData) => void;
  ablLayout: EolbaeLayoutData;
  setAblLayout: (layout: EolbaeLayoutData) => void;
  getDynamicPortrait: (char: any) => string;
  saveToServer: (updatedAbx: EolbaeLayoutData, updatedAbl: EolbaeLayoutData) => void;
}

export default function AB({ 
  userCharacters, 
  abxLayout, 
  setAbxLayout, 
  ablLayout, 
  setAblLayout, 
  getDynamicPortrait, 
  saveToServer 
}: ABProps) {
  const [abMode, setAbMode] = useState<'abx' | 'abl'>('abx');
  
  const [selectedSessionKey, setSelectedSessionKey] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('전체');
  const [filterRace, setFilterRace] = useState<string>('전체');
  const [filterGender, setFilterGender] = useState<string>('전체');
  const [filterFaction, setFilterFaction] = useState<string>('전체');
  const [filterElement, setFilterElement] = useState<string>('전체');
  const [filterAbility, setFilterAbility] = useState<string>('전체');

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
    return MFF_DATABASE_CHARACTERS.filter(char => {
      if (!userCharacters[char.id]?.owned) return false;
      
      const userState = userCharacters[char.id];
      const activeUni = char.uniforms.find(u => u.name === userState.activeUniform) || char.uniforms[char.uniforms.length - 1];
      
      // 튜플 구조 분해 매핑 적용
      const [baseType, race, gender, faction, element] = activeUni.type;

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

      // 2. 드롭다운 필터링
      if (filterType !== '전체' && baseType !== filterType) return false;
      if (filterRace !== '전체' && race !== filterRace) return false;
      if (filterGender !== '전체' && gender !== filterGender) return false;
      if (filterFaction !== '전체' && faction !== filterFaction) return false;
      if (filterElement !== '전체' && element !== filterElement) return false;
      if (filterAbility !== '전체' && !activeUni.ability.includes(filterAbility)) return false;

      return true;
    });
  }, [userCharacters, selectedSessionKey, filterType, filterRace, filterGender, filterFaction, filterElement, filterAbility]);

  return (
    <div>
      <div style={{ display: 'flex', background: '#13131e', padding: '4px', borderRadius: 8, marginBottom: 20, width: 'fit-content', border: '1px solid #2a2a40' }}>
        <button onClick={() => { setAbMode('abx'); setSelectedSessionKey(null); }} style={{ padding: '6px 16px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: abMode === 'abx' ? '#2a2a40' : 'transparent', color: abMode === 'abx' ? '#fff' : '#888' }}>
          극한
        </button>
        <button onClick={() => { setAbMode('abl'); setSelectedSessionKey(null); }} style={{ padding: '6px 16px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: abMode === 'abl' ? '#2a2a40' : 'transparent', color: abMode === 'abl' ? '#fff' : '#888' }}>
          레전드
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'flex-start' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '740px', overflowY: 'auto', paddingRight: 4 }}>
          {currentSessions.map((session, index) => {
            const currentKey = `${session}-${index}`;
            const isSelected = selectedSessionKey === currentKey;
            
            return (
              <div 
                key={currentKey}
                onClick={() => setSelectedSessionKey(isSelected ? null : currentKey)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropToSession(e, session)}
                style={{ 
                  background: '#13131e', 
                  border: isSelected ? '1px solid #5b8dee' : '1px solid #2a2a40', 
                  borderRadius: 10, 
                  padding: '14px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 8,
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 0 12px #5b8dee20' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: isSelected ? '#5b8dee' : '#e0e0f0' }}>
                    <span style={{ opacity: 0.4, marginRight: 6, fontSize: 11 }}>{index + 1}.</span>
                    {session}
                  </div>
                  {isSelected && <span style={{ fontSize: 10, background: '#5b8dee20', color: '#5b8dee', padding: '1px 5px', borderRadius: 4, fontWeight: 600 }}>필터링 적용됨</span>}
                </div>
                <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, minHeight: '44px', alignItems: 'center', background: '#0d0d1440', borderRadius: 6, padding: '6px' }}>
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
                  draggable
                  onDragStart={(e) => handleDragStart(e, char.id)}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${TYPE_COLOR[currentUni.type[0]]}88`, cursor: 'grab' }}
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
    </div>
  );
}