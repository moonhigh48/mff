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
  onTierChange: (charId: string, updatedState: any) => void; 
}

export default function Chr({
  userCharacters,
  toggleOwned,
  setSelectedCharId,
  getDynamicPortrait,
  setUserCharacters,
  onTierChange }: ChrProps) {
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
              {/* 상단: 캐릭터 초상화 및 일체형 상태/티어 드롭다운 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                {/* 왼쪽: 초상화 구역 */}
                <div 
                  onClick={() => userCharacters[char.id]?.owned && setSelectedCharId(char.id)}
                  style={{ position: 'relative', flexShrink: 0, cursor: userCharacters[char.id]?.owned ? 'pointer' : 'default' }}
                >
                  <div style={{ width: '64px', height: '64px', borderRadius: '6px', overflow: 'hidden', border: `2px solid ${userCharacters[char.id]?.owned ? TYPE_COLOR[mainType] + 'aa' : '#2a2a40'}`, background: '#0d0d14', boxShadow: userCharacters[char.id]?.owned ? `0 0 8px ${TYPE_COLOR[mainType]}44` : 'none' }}>
                    <img src={dynamicPortrait} alt={char.name} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '24px', height: '24px', borderRadius: '50%', background: '#0d0d14', border: `1px solid ${TYPE_COLOR[mainType]}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', zIndex: 2 }}>
                    <img src={TYPE_ICON[mainType]} alt={mainType} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                  </div>
                </div>

                {/* 오른쪽: [변경] 보유 버튼이 있던 자리에 상태 통합 드롭다운 배치 */}
                <select
                  value={(() => {
                    const userState = userCharacters[char.id];
                    if (userState?.owned === false) return 'NOT_OWNED';

                    const currentT = userState?.tier;
                    if (currentT === 4) return 'T4';
                    if (currentT === 3) return char.tier.includes('AW') ? 'AW' : 'T3';
                    if (currentT === 2) return 'T2';
                    if (currentT === 1) return 'T1';

                    return char.tier && char.tier.length > 0 ? char.tier[0] : 'NOT_OWNED';
                  })()}
                  
                  // 🌟 디자인, 고정 크기, 완벽한 정중앙 밸런스를 적용한 스타일
                  style={{
                    width: '92px',                  // "잠재력 초월"이 가려지지 않는 완벽한 고정 너비
                    padding: '6px 0',                // 🌟 좌우 패딩을 0으로 제거하여 가운데 정렬 기준점을 완벽하게 대칭으로 확보
                    fontSize: '12px',
                    fontWeight: 600,
                    background: owned ? TYPE_COLOR[mainType] + 'cc' : '#2a2a40', 
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    outline: 'none',
                    appearance: 'none',
                    textAlign: 'center',
                    textAlignLast: 'center',
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' fill='%23ffffff' viewBox='0 0 16 16'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'calc(100% - 10px) center', // 화살표를 우측 끝으로 바짝 정렬
                    transition: 'all 0.2s',
                  }}
                  
                  onChange={async (e) => {
                    const targetCode = e.target.value;
                    const existingState: UserCharacterState = userCharacters[char.id] || {
                      owned: false,
                      activeUniform: '모던',
                      tier: 1
                    };

                    let updatedState: UserCharacterState = { ...existingState };

                    if (targetCode === 'NOT_OWNED') {
                      updatedState = { ...existingState, owned: false, tier: 1 };
                    } else {
                      let tValue = 1;
                      if (targetCode === 'T2') tValue = 2;
                      if (targetCode === 'T3' || targetCode === 'AW') tValue = 3;
                      if (targetCode === 'T4') tValue = 4;

                      if (!existingState.owned && char.tier && char.tier.length > 0) {
                        const defaultTierCode = char.tier[0];
                        if (defaultTierCode === 'T2') tValue = 2;
                        if (defaultTierCode === 'T3' || defaultTierCode === 'AW') tValue = 3;
                        if (defaultTierCode === 'T4') tValue = 4;
                      }
                      updatedState = { ...existingState, owned: true, tier: tValue };
                    }

                    const nextUserCharacters = { ...userCharacters, [char.id]: updatedState };
                    setUserCharacters(nextUserCharacters);
                    onTierChange(nextUserCharacters);
                  }}
                >
                  {/* 🌟 드롭다운을 열었을 때 리스트 백그라운드 색상 고정 및 시각적 중앙 배치 트릭 */}
                  <option value="NOT_OWNED" style={{ background: '#1c1c28', color: '#fff' }}>
                    &nbsp;&nbsp;미보유&nbsp;&nbsp;
                  </option>
                  {char.tier?.map((tCode) => (
                    <option key={tCode} value={tCode} style={{ background: '#1c1c28', color: '#fff' }}>
                      {tCode === 'T1' && '\u00A0\u00A0티어 1\u00A0\u00A0'}
                      {tCode === 'T2' && '\u00A0\u00A0티어 2\u00A0\u00A0'}
                      {tCode === 'T3' && '\u00A0\u00A0티어 3\u00A0\u00A0'}
                      {tCode === 'AW' && '잠재력 초월'}
                      {tCode === 'T4' && '\u00A0\u00A0티어 4\u00A0\u00A0'}
                    </option>
                  ))}
                </select>
              </div>

              {/* 중간: 영웅 이름 및 유니폼 정보 */}
              <div style={{ fontWeight: 700, fontSize: 14, color: '#fff', marginBottom: 2 }}>{char.name}</div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>{currentUni.name}</div>

              {/* 하단: 기존 유니폼 세부 속성 태그 출력 구역 (상시 노출) */}
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