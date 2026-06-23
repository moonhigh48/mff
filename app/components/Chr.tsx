'use client';

import { useState } from 'react';
import { MFF_DATABASE_CHARACTERS } from '../data/Characters';

const TYPE_COLOR: Record<string, string> = {
  '컴뱃': '#e53e3e',
  '블래스트': '#319795',
  '스피드': '#38a169',
  '유니버셜': '#805ad5',
  '전체': '#5b8dee'
};

const TYPE_BG: Record<string, string> = {
  '컴뱃': '#2d1a1a',
  '블래스트': '#142929',
  '스피드': '#162e21',
  '유니버셜': '#231934'
};

const TYPE_ICON: Record<string, string> = {
  '컴뱃': '/images/Combat.png',
  '블래스트': '/images/Blast.webp',
  '스피드': '/images/Speed.webp',
  '유니버셜': '/images/Universal.webp'
};

interface UserCharacterState {
  owned: boolean;
  activeUniform: string;
  ownedUniforms?: Record<string, boolean>;
  tier?: number;
}

type UserCharactersData = Record<string, UserCharacterState>;

interface ChrProps {
  userCharacters: UserCharactersData;
  toggleOwned: (charId: string) => void;
  setSelectedCharId: (charId: string | null) => void;
  getDynamicPortrait: (char: any) => string;
  setUserCharacters: (data: UserCharactersData) => void;
}

export default function Chr({ userCharacters, toggleOwned, setSelectedCharId, getDynamicPortrait, setUserCharacters }: ChrProps) {
  const [charFilter, setCharFilter] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>(''); // 💡 검색어 상태 추가

  return (
    <div>
      {/* 상단 컨트롤러 (필터 버튼 + 검색창) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        
        {/* 왼쪽: 타입 필터 버튼 */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['전체', '컴뱃', '블래스트', '스피드', '유니버셜'].map(f => (
            <button
              key={f}
              onClick={() => setCharFilter(f)}
              style={{
                padding: '6px 14px',
                borderRadius: 20,
                border: `1px solid ${f === '전체' ? '#5b8dee' : TYPE_COLOR[f]}44`,
                background: charFilter === f ? (TYPE_COLOR[f] || '#5b8dee') : 'transparent',
                color: charFilter === f ? '#fff' : '#aaa',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                transition: 'all 0.15s'
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* 우측: 캐릭터 검색창 */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <input
            type="text"
            placeholder="캐릭터 이름 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 36px 8px 12px',
              borderRadius: 8,
              border: '1px solid #2a2a40',
              background: '#13131e',
              color: '#fff',
              fontSize: 13,
              outline: 'none',
              transition: 'border-color 0.15s'
            }}
            onFocus={(e) => (e.target.style.borderColor = '#5b8dee')}
            onBlur={(e) => (e.target.style.borderColor = '#2a2a40')}
          />
          {/* 검색어 있을 때 지우기(X) 버튼 표기 */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#666',
                cursor: 'pointer',
                fontSize: 14,
                padding: 0
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 카드 그리드 배치 구조 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
        {MFF_DATABASE_CHARACTERS.filter(char => {
          // 1. 타입 필터링
          const userState = userCharacters[char.id] || { activeUniform: '' };
          const currentUni = char.uniforms.find(u => u.name === userState.activeUniform) || char.uniforms[0];
          const matchesType = charFilter === '전체' || currentUni.type[0] === charFilter;

          // 2. 검색어 필터링 (공백 제거 후 대소문자 구분 없이 비교)
          const cleanQuery = searchQuery.trim().toLowerCase();
          const matchesSearch = char.name.toLowerCase().includes(cleanQuery);

          return matchesType && matchesSearch;
        })
        .sort((a, b) => {
          const aOwned = userCharacters[a.id]?.owned ? 1 : 0;
          const bOwned = userCharacters[b.id]?.owned ? 1 : 0;
          if (bOwned !== aOwned) {
            return bOwned - aOwned;
          }
          return a.name.localeCompare(b.name, 'ko');
        })
        .map(char => {
          const userState = userCharacters[char.id] || { owned: false, activeUniform: '' };
          const currentUni = char.uniforms.find(u => u.name === userState.activeUniform) || char.uniforms[0];
          const mainType = currentUni.type[0]; 
          const owned = userState.owned;
          const dynamicPortrait = getDynamicPortrait(char);

          return (
            <div
              key={char.id}
              style={{
                background: owned ? TYPE_BG[mainType] : '#13131e',
                border: `1px solid ${owned ? TYPE_COLOR[mainType] + '55' : '#2a2a40'}`,
                borderRadius: 14,
                padding: '1.2rem',
                opacity: owned ? 1 : 0.55,
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
{/* 초상화 우측: 타이틀 및 통합 상태 설정 드롭다운 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>{char.name}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>{currentUni.name}</div>
                </div>

                {/* 💡 보유 버튼 자리에 상태 통합 드롭다운 배치 */}
                <select
                  value={(() => {
                    if (!userCharacters[char.id]?.owned) return 'NOT_OWNED';
                    
                    const currentT = userCharacters[char.id]?.tier || 1;
                    if (currentT === 3) return char.tier.includes('AW') ? 'AW' : 'T3';
                    if (currentT === 4) return 'T4';
                    if (currentT === 2) return 'T2';
                    return 'T1';
                  })()}
                  onChange={async (e) => {
                    const targetCode = e.target.value;
                    
                    // 💡 [핵심 해결책] 기존 데이터가 없을 때를 대비해 기본 UserCharacterState 구조를 명확히 선언해 줍니다.
                    const existingState: UserCharacterState = userCharacters[char.id] || {
                      owned: false,
                      activeUniform: '모던',
                      tier: 1
                    };

                    let updatedState: UserCharacterState = { ...existingState };

                    if (targetCode === 'NOT_OWNED') {
                      updatedState = {
                        ...existingState,
                        owned: false,
                        tier: 1
                      };
                    } else {
                      let tValue = 1;
                      if (targetCode === 'T2') tValue = 2;
                      if (targetCode === 'T3' || targetCode === 'AW') tValue = 3;
                      if (targetCode === 'T4') tValue = 4;

                      updatedState = {
                        ...existingState,
                        owned: true,
                        tier: tValue
                      };
                    }

                    // 💡 TypeScript가 형변환(Type Assertion)을 완벽히 인지하도록 as UserCharactersData를 명시해 줍니다.
                    const updated: UserCharactersData = {
                      ...userCharacters,
                      [char.id]: updatedState
                    } as UserCharactersData;
                    
                    setUserCharacters(updated);

                    try {
                      const token = localStorage.getItem('token');
                      if (!token) return;
                      await fetch('/api/import-data', {
                        method: 'POST',
                        headers: { 
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ userCharacters: updated })
                      });
                    } catch (err) {
                      console.error('상태 저장 연동 에러:', err);
                    }
                  }}
                  style={{
                    padding: '4px 24px 4px 8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    borderRadius: '6px',
                    background: userCharacters[char.id]?.owned ? TYPE_COLOR[mainType] : '#2a2a40',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='white' viewBox='0 0 24 24'><path d='M7 10l5 5 5-5z'/></svg>")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 6px center'
                  }}
                >
                  <option value="NOT_OWNED" style={{ background: '#13131e', color: '#fff' }}>미보유</option>
                  
                  {char.tier?.map((tCode) => (
                    <option key={tCode} value={tCode} style={{ background: '#13131e', color: '#fff' }}>
                      {tCode === 'T1' && '티어 1'}
                      {tCode === 'T2' && '티어 2'}
                      {tCode === 'T3' && '티어 3'}
                      {tCode === 'AW' && '잠재력 초월'}
                      {tCode === 'T4' && '티어 4'}
                    </option>
                  ))}
                </select>
              </div>

              {/* 하단: 기존 유니폼 세부 속성 태그 출력 구역 */}
              <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {currentUni.type
                  .filter(t => !['컴뱃', '블래스트', '스피드', '유니버셜'].includes(t))
                  .map(t => (
                    <span key={t} style={{ background: '#1e1e2e', color: '#aaa', fontSize: 10, padding: '2px 6px', borderRadius: 4 }}>
                      {t}
                    </span>
                  ))}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}