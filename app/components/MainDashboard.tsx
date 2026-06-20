'use client';

import { useState } from 'react';
import { MFF_DATABASE_CHARACTERS } from '../data/Characters';
import Chr from './Chr';
import AB from './AB';
import SL from './SL';

const TYPE_COLOR: Record<string, string> = { '컴뱃': '#e53e3e', '블래스트': '#319795', '스피드': '#38a169', '유니버셜': '#805ad5' };
const TYPE_BG: Record<string, string> = { '컴뱃': '#2d1a1a', '블래스트': '#142929', '스피드': '#162e21', '유니버셜': '#231934' };
const TYPE_ICON: Record<string, string> = { '컴뱃': '/images/Combat.png', '블래스트': '/images/Blast.webp', '스피드': '/images/Speed.webp', '유니버셜': '/images/Universal.webp' };

interface UserCharacterState { owned: boolean; activeUniform: string; ownedUniforms?: Record<string, boolean>; }
type UserCharactersData = Record<string, UserCharacterState>;
type TierListData = Record<string, string[]>;
type ShadowlandLayoutData = Record<number, string[]>;
type EolbaeLayoutData = Record<string, string[]>;

interface MainDashboardProps { 
  userId: string; 
  initialData: {
    characters: UserCharactersData;
    tierList?: TierListData;
    slLayout?: ShadowlandLayoutData;
    abxLayout?: EolbaeLayoutData;
    ablLayout?: EolbaeLayoutData;
  };
  onLogout: () => void; 
}

export default function MainDashboard({ 
  userId, 
  initialData, 
  onLogout 
}: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('characters');
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);

  // =================================================================
  // [핵심 변경] page.tsx 통합 패키지 데이터 구조에 맞춘 자동 초깃값 맵핑 연동
  // =================================================================
  const [userCharacters, setUserCharacters] = useState<UserCharactersData>(initialData?.characters || {});
  const [tierList, setTierList] = useState<TierListData>(initialData?.tierList || { S: [], A: [], B: [], C: [], D: [], E: [] });
  const [slLayout, setSlLayout] = useState<ShadowlandLayoutData>(initialData?.slLayout || {});
  const [abxLayout, setAbxLayout] = useState<EolbaeLayoutData>(initialData?.abxLayout || {});
  const [ablLayout, setAblLayout] = useState<EolbaeLayoutData>(initialData?.ablLayout || {});

  const saveAllToServer = async (
    updatedChars: UserCharactersData, 
    updatedTier: TierListData, 
    updatedSl: ShadowlandLayoutData,
    updatedAbx: EolbaeLayoutData,
    updatedAbl: EolbaeLayoutData
  ) => {
    const updatedPayload = {
      characters: updatedChars,
      tierList: updatedTier,
      slLayout: updatedSl,
      abxLayout: updatedAbx,
      ablLayout: updatedAbl
    };

    // [핵심] 서버 저장과 동시에 로컬 스토리지 캐시도 실시간으로 업데이트 (새로고침 방어)
    if (typeof window !== 'undefined') {
      localStorage.setItem("mff_initial_data", JSON.stringify(updatedPayload));
    }
    
    try {
      await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId, 
          characters: updatedChars, 
          tierList: updatedTier, 
          slLayout: updatedSl, 
          abxLayout: updatedAbx,
          ablLayout: updatedAbl
        }),
      });
    } catch (e) { 
      console.error('서버 데이터 동기화 실패'); 
    }
  };

  const updateStateWithScrollLock = (nextState: UserCharactersData) => {
    const currentScrollY = window.scrollY;
    setUserCharacters(nextState);
    requestAnimationFrame(() => { window.scrollTo(0, currentScrollY); });
  };

  const toggleOwned = (charId: string) => {
    const currentState = userCharacters[charId] || { owned: false, activeUniform: '', ownedUniforms: {} };
    const targetChar = MFF_DATABASE_CHARACTERS.find(c => c.id === charId);
    const defaultUni = targetChar?.uniforms[0]?.name || '기본 형태';
    const initialOwnedUniforms = currentState.ownedUniforms || { [defaultUni]: true };

    const nextState: UserCharactersData = {
      ...userCharacters,
      [charId]: { owned: !currentState.owned, activeUniform: currentState.activeUniform || defaultUni, ownedUniforms: initialOwnedUniforms }
    };
    updateStateWithScrollLock(nextState);
    saveAllToServer(nextState, tierList, slLayout, abxLayout, ablLayout);
  };

  const handleUniformChange = (charId: string, uniformName: string) => {
    const currentState = userCharacters[charId] || { owned: true, activeUniform: '', ownedUniforms: {} };
    const nextState: UserCharactersData = { ...userCharacters, [charId]: { ...currentState, activeUniform: uniformName } };
    setUserCharacters(nextState);
    saveAllToServer(nextState, tierList, slLayout, abxLayout, ablLayout);
  };

  const toggleUniformOwned = (charId: string, uniformName: string) => {
    const currentState = userCharacters[charId] || { owned: true, activeUniform: '', ownedUniforms: {} };
    const currentOwnedUniforms = currentState.ownedUniforms || {};
    const nextState: UserCharactersData = {
      ...userCharacters,
      [charId]: { ...currentState, ownedUniforms: { ...currentOwnedUniforms, [uniformName]: !currentOwnedUniforms[uniformName] } }
    };
    setUserCharacters(nextState);
    saveAllToServer(nextState, tierList, slLayout, abxLayout, ablLayout);
  };

  const getDynamicPortrait = (char: typeof MFF_DATABASE_CHARACTERS[0]) => {
    const userState = userCharacters[char.id] || { activeUniform: '' };
    const activeUniIndex = char.uniforms.findIndex(u => u.name === userState.activeUniform);
    const safeCharId = char.id.toLowerCase().replace(/ /g, '');
    return (activeUniIndex === -1 || activeUniIndex === 0) ? char.portrait : `/images/${safeCharId}${activeUniIndex}.png`;
  };

  const overlayCharacter = MFF_DATABASE_CHARACTERS.find(c => c.id === selectedCharId);

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d14', color: '#e0e0f0', fontFamily: "'Pretendard', sans-serif" }}>
      <div style={{ background: '#13131e', borderBottom: '1px solid #2a2a40', padding: '0 1.5rem', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ fontSize: 20, marginRight: 12 }}>⚡</div>
        {[{ id: 'characters', label: '캐릭터' }, { id: 'eolbae', label: '얼배' }, { id: 'shadowland', label: '섀도우랜드' }].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '14px 16px', background: 'none', border: 'none', borderBottom: activeTab === t.id ? '2px solid #5b8dee' : '2px solid transparent', color: activeTab === t.id ? '#5b8dee' : '#888', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
            {t.label}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', color: '#666', fontSize: 13 }}>{userId} 님 <button onClick={onLogout} style={{ marginLeft: 8, background: 'none', border: 'none', color: '#e05252', cursor: 'pointer', fontSize: 12 }}>로그아웃</button></div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '1.5rem 1rem' }}>
        {activeTab === 'characters' && <Chr userCharacters={userCharacters} toggleOwned={toggleOwned} setSelectedCharId={setSelectedCharId} getDynamicPortrait={getDynamicPortrait} />}
        
        {activeTab === 'eolbae' && (
          <AB 
            userCharacters={userCharacters} 
            abxLayout={abxLayout} 
            setAbxLayout={setAbxLayout} 
            ablLayout={ablLayout} 
            setAblLayout={setAblLayout} 
            getDynamicPortrait={getDynamicPortrait} 
            saveToServer={(updatedAbx, updatedAbl) => saveAllToServer(userCharacters, tierList, slLayout, updatedAbx, updatedAbl)} 
          />
        )}
        
        {activeTab === 'shadowland' && <SL userCharacters={userCharacters} tierList={tierList} setTierList={setTierList} slLayout={slLayout} setSlLayout={setSlLayout} getDynamicPortrait={getDynamicPortrait} saveToServer={(updatedTier, updatedSl) => saveAllToServer(userCharacters, updatedTier, updatedSl, abxLayout, ablLayout)} />}
      </div>

      {selectedCharId && overlayCharacter && (
        <div onClick={() => setSelectedCharId(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#13131e', border: '1px solid #2a2a40', borderRadius: 16, maxWidth: 620, width: '100%', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, borderBottom: '1px solid #ffffff10', paddingBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#fff' }}><span style={{ color: '#5b8dee' }}>{overlayCharacter.name}</span> 유니폼 선택</h3>
              <button onClick={() => setSelectedCharId(null)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 18 }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxHeight: '440px', overflowY: 'auto' }}>
              {overlayCharacter.uniforms.map((uni, index) => {
                const charState = userCharacters[selectedCharId] || { activeUniform: '', ownedUniforms: {} };
                const isCurrent = charState.activeUniform === uni.name;
                const isUniOwned = charState.ownedUniforms?.[uni.name] ?? (index === 0);
                
                // 새로운 튜플 설계에 맞춰 인덱스로 속성을 직접 구조분해 할당 처리
                const [uniMainType, race, gender, faction, element] = uni.type;
                const safeCharId = overlayCharacter.id.toLowerCase().replace(/ /g, '');
                const uniPortrait = index === 0 ? overlayCharacter.portrait : `/images/${safeCharId}${index}.png`;

                return (
                  <div key={uni.name} onClick={() => { handleUniformChange(selectedCharId, uni.name); setSelectedCharId(null); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '14px 8px', borderRadius: 10, background: isCurrent ? `${TYPE_BG[uniMainType]}` : '#1e1e2e', border: `1px solid ${isCurrent ? TYPE_COLOR[uniMainType] : '#ffffff05'}`, cursor: 'pointer', position: 'relative', opacity: isUniOwned ? 1 : 0.45 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'absolute', top: '6px', padding: '0 8px', zIndex: 10 }}>
                      <button onClick={(e) => { e.stopPropagation(); toggleUniformOwned(selectedCharId, uni.name); }} style={{ background: isUniOwned ? '#2a2a40' : '#bd3a3a', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '9px', padding: '2px 5px', cursor: 'pointer', fontWeight: 700, transform: 'scale(0.9)', transformOrigin: 'left center' }}>{isUniOwned ? '보유중' : '미보유'}</button>
                      {isCurrent && <div style={{ fontSize: '9px', color: TYPE_COLOR[uniMainType], fontWeight: 800, background: '#0d0d14', padding: '2px 4px', borderRadius: '4px' }}>장착됨</div>}
                    </div>
                    <div style={{ position: 'relative', width: '56px', height: '56px', marginTop: '16px' }}>
                      <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${TYPE_COLOR[uniMainType]}bb`, background: '#0d0d14' }}>
                        <img src={uniPortrait} alt={uni.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '20px', height: '20px', borderRadius: '50%', background: '#0d0d14', border: `1px solid ${TYPE_COLOR[uniMainType]}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <img src={TYPE_ICON[uniMainType]} alt={uniMainType} style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
                      </div>
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#fff', textAlign: 'center', minHeight: '2.6em', display: 'flex', alignItems: 'center' }}>{uni.name}</div>
                      
                      {/* 메인 타입을 제외한 나머지 디테일 속성 태그들 가독성 있게 매핑 노출 */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                        {[race, gender, faction, element].map(t => (
                          <span key={t} style={{ background: '#13131e', color: '#888', fontSize: 9, padding: '1px 4px', borderRadius: 3 }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}