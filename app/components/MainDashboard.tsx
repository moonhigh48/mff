'use client';

import { useState, useEffect } from 'react';
import { MFF_DATABASE_CHARACTERS } from '../data/Characters';
import Chr from './Chr';
import AB from './AB';
import SL from './SL';

import { db } from '../../lib/firebase'; 
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface UserCharacterState { 
  owned: boolean; 
  activeUniform: string; 
  ownedUniforms?: Record<string, boolean>; 
}
type UserCharactersData = Record<string, UserCharacterState>;
type TierListData = Record<string, string[]>;
type ShadowlandLayoutData = Record<number, string[]>;
type EolbaeLayoutData = Record<string, string[]>;

interface MainDashboardProps { 
  userId: string; 
}

export default function MainDashboard({ userId }: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState<'chr' | 'ab' | 'sl'>('chr');
  const [loading, setLoading] = useState<boolean>(true);

  // [상태 관리 정의]
  const [userCharacters, setUserCharacters] = useState<UserCharactersData>({});
  const [tierList, setTierList] = useState<TierListData>({ S: [], A: [], B: [], C: [], D: [], E: [], F: [] });
  const [slLayout, setSlLayout] = useState<ShadowlandLayoutData>({});
  const [abxLayout, setAbxLayout] = useState<EolbaeLayoutData>({});
  const [ablLayout, setAblLayout] = useState<EolbaeLayoutData>({});
  
  // Chr 컴포넌트 내부에서 호출하는 선택된 캐릭터 고유 ID 관리 상태
  const [selectedCharId, setSelectedCharId] = useState<string | null>(null);

  // [불러오기] 마운트 시 Firebase 원격 데이터 수신 파이프라인
  useEffect(() => {
    async function loadUserData() {
      if (!userId) return;
      try {
        const userDocRef = doc(db, "mff_user_data", userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.characters) setUserCharacters(data.characters as UserCharactersData);
          if (data.tierList) setTierList(data.tierList as TierListData);
          if (data.slLayout) {
            const parsedSl: ShadowlandLayoutData = {};
            Object.entries(data.slLayout).forEach(([k, v]) => {
              parsedSl[Number(k)] = v as string[];
            });
            setSlLayout(parsedSl);
          }
          if (data.abxLayout) setAbxLayout(data.abxLayout as EolbaeLayoutData);
          if (data.ablLayout) setAblLayout(data.ablLayout as EolbaeLayoutData);
        } else {
          const initialChr: UserCharactersData = {};
          MFF_DATABASE_CHARACTERS.forEach(c => {
            initialChr[c.id] = { owned: false, activeUniform: c.uniforms[c.uniforms.length - 1]?.name || '' };
          });
          setUserCharacters(initialChr);
        }
      } catch (err) {
        console.error("Firebase 로드 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUserData();
  }, [userId]);

  // [통합 저장] 데이터 파이프라인 싱크
  const saveToFirebase = async (
    nextChr: UserCharactersData,
    nextTier: TierListData,
    nextSl: ShadowlandLayoutData,
    nextAbx: EolbaeLayoutData,
    nextAbl: EolbaeLayoutData
  ) => {
    if (!userId) return;
    try {
      const userDocRef = doc(db, "mff_user_data", userId);
      const slLayoutCleaned: Record<string, string[]> = {};
      Object.entries(nextSl).forEach(([k, v]) => {
        slLayoutCleaned[k] = v;
      });

      await setDoc(userDocRef, {
        userId,
        characters: nextChr,
        tierList: nextTier,
        slLayout: slLayoutCleaned,
        abxLayout: nextAbx,
        ablLayout: nextAbl,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      console.error("Firebase 동기화 실패:", err);
    }
  };

  // 도감 보유 토글 핸들러
  const toggleOwned = (charId: string) => {
    const nextChr = {
      ...userCharacters,
      [charId]: { ...userCharacters[charId], owned: !userCharacters[charId]?.owned }
    };
    setUserCharacters(nextChr);
    saveToFirebase(nextChr, tierList, slLayout, abxLayout, ablLayout);
  };

  // 섀도우랜드 핸들러
  const handleSlSave = (updatedTier: TierListData, updatedSl: ShadowlandLayoutData) => {
    setTierList(updatedTier);
    setSlLayout(updatedSl);
    saveToFirebase(userCharacters, updatedTier, updatedSl, abxLayout, ablLayout);
  };

  // 연합 배틀 핸들러
  const handleAbSaveToServer = (updatedAbx: EolbaeLayoutData, updatedAbl: EolbaeLayoutData) => {
    setAbxLayout(updatedAbx);
    setAblLayout(updatedAbl);
    saveToFirebase(userCharacters, tierList, slLayout, updatedAbx, updatedAbl);
  };

  // 초상화 로직 헬퍼
  const getDynamicPortrait = (char: any): string => {
    const userState = userCharacters[char.id];
    const activeName = userState?.activeUniform || char.uniforms[char.uniforms.length - 1]?.name;
    const targetUni = char.uniforms.find((u: any) => u.name === activeName) || char.uniforms[char.uniforms.length - 1];
    return targetUni ? `/images/${targetUni.portrait}` : `/images/${char.portrait}`;
  };

  if (loading) {
    return <div style={{ color: '#fff', padding: 40, textAlign: 'center', fontSize: 13, fontWeight: 600 }}>동기화 모듈 활성화 중...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#09090e', color: '#fff', fontFamily: 'sans-serif', padding: '20px' }}>
      <header style={{ borderBottom: '1px solid #1f1f2e', paddingBottom: '14px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#f3f4f6' }}>MFF 컴패니언 매니저</h1>
        <nav style={{ display: 'flex', gap: '8px', background: '#13131e', padding: '4px', borderRadius: '8px', border: '1px solid #2a2a40' }}>
          <button onClick={() => setActiveTab('chr')} style={{ background: activeTab === 'chr' ? '#2a2a40' : 'transparent', color: activeTab === 'chr' ? '#fff' : '#888', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>캐릭터 도감 관리</button>
          <button onClick={() => setActiveTab('ab')} style={{ background: activeTab === 'ab' ? '#2a2a40' : 'transparent', color: activeTab === 'ab' ? '#fff' : '#888', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>연합 배틀 조합</button>
          <button onClick={() => setActiveTab('sl')} style={{ background: activeTab === 'sl' ? '#2a2a40' : 'transparent', color: activeTab === 'sl' ? '#fff' : '#888', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>섀도우랜드 공략</button>
        </nav>
      </header>

      {/* 💡 Chr 컴포넌트의 실제 프롭스(Props) 명세와 완벽 연동 완료 */}
      <main>
        {activeTab === 'chr' && (
          <Chr 
            userCharacters={userCharacters} 
            toggleOwned={toggleOwned} 
            setSelectedCharId={setSelectedCharId} 
            getDynamicPortrait={getDynamicPortrait} 
          />
        )}
        {activeTab === 'ab' && (
          <AB 
            userCharacters={userCharacters} 
            abxLayout={abxLayout}
            setAbxLayout={setAbxLayout} 
            ablLayout={ablLayout}
            setAblLayout={setAblLayout} 
            getDynamicPortrait={getDynamicPortrait} 
            saveToServer={handleAbSaveToServer} 
          />
        )}
        {activeTab === 'sl' && (
          <SL userCharacters={userCharacters} tierList={tierList} setTierList={(t) => handleSlSave(t, slLayout)} slLayout={slLayout} setSlLayout={(sl) => handleSlSave(tierList, sl)} getDynamicPortrait={getDynamicPortrait} saveToServer={handleSlSave} />
        )}
      </main>
    </div>
  );
}