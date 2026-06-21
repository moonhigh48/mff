'use client';

import { useState, useMemo, useEffect } from 'react';
import { MFF_DATABASE_CHARACTERS } from '../data/Characters';
import { MFF_SHADOWLAND_DATABASE, getExtraFloorTemplate, StageOption } from '../data/SLdata';

const TYPE_COLOR: Record<string, string> = { 
  '컴뱃': '#e53e3e', '블래스트': '#319795', '스피드': '#38a169', '유니버셜': '#805ad5',
  '남성': '#2b6cb0', '여성': '#b83280', '영웅': '#dd6b20', '슈퍼 빌런': '#718096'
};
const TIERS = ['S', 'A', 'B', 'C', 'D', 'E', 'F'];
const TIER_COLORS: Record<string, string> = { S: '#ff4a4a', A: '#ff9100', B: '#ffea00', C: '#00e676', D: '#2979ff', E: '#aa00ff', F: '#718096' };

interface UserCharacterState { owned: boolean; activeUniform: string; }
type UserCharactersData = Record<string, UserCharacterState>;
type TierListData = Record<string, string[]>;
type ShadowlandLayoutData = Record<number, string[]>;
type StageConditionData = Record<number, { id: string; matchTypes: string[]; }>;

interface SavedVersion {
  id: string;
  versionName: string;
  savedAt: string;
  layout: ShadowlandLayoutData;
  conditions: StageConditionData;
  maxFloor: number;
  memos: Record<number, string>; 
}

interface SLProps {
  userCharacters: UserCharactersData;
  tierList: TierListData;
  setTierList: (tierList: TierListData) => void;
  slLayout: ShadowlandLayoutData;
  setSlLayout: (layout: ShadowlandLayoutData) => void;
  getDynamicPortrait: (char: any, uniformName?: string) => string;
  saveToServer: (updatedTier: TierListData, updatedSl: ShadowlandLayoutData) => void;
  stageConditions?: StageConditionData;
  placementMode: 'drag' | 'click';
}

export default function SL({ 
  userCharacters, 
  tierList, 
  setTierList, 
  slLayout, 
  setSlLayout, 
  getDynamicPortrait, 
  saveToServer,
  stageConditions: initialConditions,
  placementMode
}: SLProps) {
  const [shadowlandMode, setShadowlandMode] = useState<'layout' | 'tier'>('layout');
  const assignedTierCharIds = Object.values(tierList).flat();
  const [activeFloor, setActiveFloor] = useState<number | null>(null);
  const [activeTier, setActiveTier] = useState<string | null>(null);
  const [maxFloor, setMaxFloor] = useState<number>(() => {
    const savedKeys = Object.keys(slLayout).map(Number);
    const highest = savedKeys.length > 0 ? Math.max(...savedKeys) : 35;
    return highest < 35 ? 35 : highest;
  });

  // 새로고침 시에도 스테이지 선택 정보가 유지되도록 초기 설정
  const [stageConditions, setStageConditions] = useState<StageConditionData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mff_sl_stage_conditions');
      if (saved) return JSON.parse(saved);
    }
    return initialConditions || {};
  });

  const [activeModalFloor, setActiveModalFloor] = useState<number | null>(null);

  const [currentMemos, setCurrentMemos] = useState<Record<number, string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mff_sl_current_memos');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const [versions, setVersions] = useState<SavedVersion[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mff_sl_versions');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [selectedVersionId, setSelectedVersionId] = useState<string>('current'); 
  const [newVersionName, setNewVersionName] = useState<string>('');

  const [filterType, setFilterType] = useState<string>('전체');
  const [filterRace, setFilterRace] = useState<string>('전체');
  const [filterGender, setFilterGender] = useState<string>('전체');
  const [filterFaction, setFilterFaction] = useState<string>('전체');
  const [filterRole, setFilterRole] = useState<string>('전체'); 
  const [filterAbility, setFilterAbility] = useState<string>('전체');

  const currentVersionData = useMemo(() => {
    if (selectedVersionId === 'current') {
      return { layout: slLayout, conditions: stageConditions, maxFloor: maxFloor, isReadOnly: false };
    }
    const target = versions.find(v => v.id === selectedVersionId);
    if (target) {
      return { layout: target.layout, conditions: target.conditions, maxFloor: target.maxFloor, isReadOnly: true };
    }
    return { layout: slLayout, conditions: stageConditions, maxFloor: maxFloor, isReadOnly: false };
  }, [selectedVersionId, versions, slLayout, stageConditions, maxFloor]);

  const floorsArray = useMemo(() => Array.from({ length: currentVersionData.maxFloor }, (_, i) => i + 1), [currentVersionData.maxFloor]);

  const handleSaveVersion = () => {
    if (!newVersionName.trim()) {
      alert('버전 이름을 입력해주세요.');
      return;
    }
    const newVer: SavedVersion = {
      id: crypto.randomUUID(),
      versionName: newVersionName.trim(),
      savedAt: new Date().toLocaleString('ko-KR'),
      layout: { ...slLayout },
      conditions: { ...stageConditions },
      maxFloor,
      memos: { ...currentMemos } 
    };
    const updated = [newVer, ...versions];
    setVersions(updated);
    localStorage.setItem('mff_sl_versions', JSON.stringify(updated));
    setNewVersionName('');
    setSelectedVersionId(newVer.id); 
    alert('현재 배치와 메모, 스테이지 선택 기록이 저장되었습니다.');
  };

  const handleDeleteVersion = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('해당 버전 기록을 삭제하시겠습니까?')) {
      const updated = versions.filter(v => v.id !== id);
      setVersions(updated);
      localStorage.setItem('mff_sl_versions', JSON.stringify(updated));
      if (selectedVersionId === id) {
        setSelectedVersionId('current');
      }
    }
  };

  const handleUpdateMemo = (floorNum: number, text: string) => {
    if (selectedVersionId === 'current') {
      const updated = { ...currentMemos, [floorNum]: text };
      setCurrentMemos(updated);
      localStorage.setItem('mff_sl_current_memos', JSON.stringify(updated));
    } else {
      const updatedVersions = versions.map(v => {
        if (v.id === selectedVersionId) {
          return { ...v, memos: { ...v.memos, [floorNum]: text } };
        }
        return v;
      });
      setVersions(updatedVersions);
      localStorage.setItem('mff_sl_versions', JSON.stringify(updatedVersions));
    }
  };

  const getCharacterTierTag = (charId: string): string => {
    for (const tier of TIERS) {
      if (tierList[tier]?.includes(charId)) return tier;
    }
    return '미배정';
  };

  const handleAddFloor = () => setMaxFloor(prev => prev + 1);

  const handleResetExtraFloors = () => {
    if (window.confirm('35층을 초과하는 모든 확장층 배치 데이터와 세팅이 삭제됩니다.')) {
      const nextSlLayout = { ...slLayout };
      const nextConditions = { ...stageConditions };
      Object.keys(slLayout).map(Number).forEach(f => { if (f > 35) delete nextSlLayout[f]; });
      Object.keys(stageConditions).map(Number).forEach(f => { if (f > 35) delete nextConditions[f]; });
      setSlLayout(nextSlLayout);
      setStageConditions(nextConditions);
      localStorage.setItem('mff_sl_stage_conditions', JSON.stringify(nextConditions));
      setMaxFloor(35);
      saveToServer(tierList, nextSlLayout);
    }
  };

  // 공통 대기열 우측 필터 주입 로직
  const applyMatchFilters = (matchTypesArray: string[]) => {
    setFilterType('전체');
    setFilterGender('전체');
    setFilterFaction('전체');
    setFilterRace('전체');

    matchTypesArray.forEach(condition => {
      if (['컴뱃', '블래스트', '스피드', '유니버셜'].includes(condition)) setFilterType(condition);
      else if (['남성', '여성'].includes(condition)) setFilterGender(condition);
      else if (['영웅', '슈퍼 빌런', '중립'].includes(condition)) setFilterFaction(condition);
      else if (['인간', '뮤턴트', '인휴먼', '외계인', '창조물', '불명'].includes(condition)) setFilterRace(condition);
    });
  };

  // 👍 [수정] 층수 칸({floor}층 버튼) 누르면 언제나 모달 오픈 + 자동 필터 연동
  const handleFloorButtonClick = (floorNum: number) => {
    if (currentVersionData.isReadOnly) return;
    
    // 모달을 열어 수정할 수 있게 함
    setActiveModalFloor(floorNum);

    // 이미 조건 정보가 있었다면 필터링도 즉시 동기화 처리
    const condition = stageConditions[floorNum];
    if (condition && condition.matchTypes) {
      applyMatchFilters(condition.matchTypes);
    }
  };

  // 👍 [수정] 카드 배경(캐릭터 배치 영역 빈 공간) 클릭 시 모달 없이 자동으로 우측 대기열 필터링
  const handleFloorBackgroundClick = (floorNum: number, e: React.MouseEvent) => {
    // 캐릭터 클릭이나 📍 텍스트 클릭 시 부모 클릭 이벤트가 터지지 않도록 방어 조치
    if (e.target !== e.currentTarget) return; 
    
    const condition = stageConditions[floorNum];
    if (condition && condition.matchTypes && condition.matchTypes.length > 0) {
      applyMatchFilters(condition.matchTypes);
    }
  };

  const handleSelectStageOption = (floorNum: number, option: any) => {
    if (currentVersionData.isReadOnly) return;
    
    const matchTypesArray = Array.isArray(option.matchTypes) 
      ? option.matchTypes 
      : (option.matchType ? [option.matchType] : []);

    const nextConditions = { 
      ...stageConditions, 
      [floorNum]: { id: option.id, matchTypes: matchTypesArray } 
    };
    
    setStageConditions(nextConditions);
    localStorage.setItem('mff_sl_stage_conditions', JSON.stringify(nextConditions));
    setActiveModalFloor(null);
    
    // 모달에서 스테이지 입장 완료 시 대기열 자동 필터 연동
    applyMatchFilters(matchTypesArray);
    saveToServer(tierList, slLayout);
  };

  const handleDragStart = (e: React.DragEvent, charId: string) => { 
    e.dataTransfer.setData('text/plain', charId); 
  };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); };

  const handleDropToTier = (e: React.DragEvent, targetTier: string) => {
    e.preventDefault();
    const charId = e.dataTransfer.getData('text/plain');
    if (!charId) return;
    const cleanedTierList = { ...tierList };
    TIERS.forEach(t => { cleanedTierList[t] = (cleanedTierList[t] || []).filter(id => id !== charId); });
    cleanedTierList[targetTier] = [...(cleanedTierList[targetTier] || []), charId];
    setTierList(cleanedTierList);
    saveToServer(cleanedTierList, slLayout);
  };

  const handleDropToTierPool = (e: React.DragEvent) => {
    e.preventDefault();
    const charId = e.dataTransfer.getData('text/plain');
    if (!charId) return;
    const cleanedTierList = { ...tierList };
    TIERS.forEach(t => { cleanedTierList[t] = (cleanedTierList[t] || []).filter(id => id !== charId); });
    setTierList(cleanedTierList);
    saveToServer(cleanedTierList, slLayout);
  };

  const handleDropToFloor = (e: React.DragEvent, floorNum: number) => {
    e.preventDefault();
    if (currentVersionData.isReadOnly) return;
    const charId = e.dataTransfer.getData('text/plain');
    if (!charId) return;
    const currentFloorLayout = slLayout[floorNum] || [];
    if (currentFloorLayout.includes(charId)) return;
    const nextSlLayout = { ...slLayout, [floorNum]: [...currentFloorLayout, charId] };
    setSlLayout(nextSlLayout);
    saveToServer(tierList, nextSlLayout);
  };

  const removeCharFromFloor = (floorNum: number, charId: string) => {
    if (currentVersionData.isReadOnly) return;
    const nextSlLayout = { ...slLayout, [floorNum]: (slLayout[floorNum] || []).filter(id => id !== charId) };
    setSlLayout(nextSlLayout);
    saveToServer(tierList, nextSlLayout);
  };

  const allAbilities = useMemo(() => {
    const set = new Set<string>();
    MFF_DATABASE_CHARACTERS.forEach(c => c.uniforms.forEach(u => u.ability.forEach(a => set.add(a))));
    return Array.from(set).sort();
  }, []);

  const checkFilterMatch = (char: any) => {
    if (!userCharacters[char.id]?.owned) return null;
    const userState = userCharacters[char.id];
    
    const activeUni = char.uniforms.find((u: any) => u.name === userState.activeUniform) || char.uniforms[char.uniforms.length - 1];
    const [baseType, race, gender, faction] = activeUni.type;

    if (filterType !== '전체' && baseType !== filterType) return null;
    if (filterRace !== '전체' && race !== filterRace) return null;
    if (filterGender !== '전체' && gender !== filterGender) return null;
    if (filterFaction !== '전체' && faction !== filterFaction) return null;
    
    if (filterRole !== '전체') {
      if (!activeUni.role || !Array.isArray(activeUni.role) || !activeUni.role.includes(filterRole)) {
        return null;
      }
    }
    
    let matchedUniformName = activeUni.name;
    if (filterAbility !== '전체') {
      if (activeUni.ability && activeUni.ability.includes(filterAbility)) {
        matchedUniformName = activeUni.name;
      } else {
        const foundUni = char.uniforms.find((u: any) => u.ability && u.ability.includes(filterAbility));
        if (foundUni) {
          matchedUniformName = foundUni.name;
        } else {
          return null;
        }
      }
    }
    
    return { matchedUniformName };
  };

  const sortedLayoutCharacters = useMemo(() => {
    const deployedCharIds = Object.values(currentVersionData.layout).flat();
    const pool: any[] = [];

    TIERS.forEach(tier => {
      const tierCharIds = tierList[tier] || [];
      tierCharIds.forEach(id => {
        if (deployedCharIds.includes(id)) return;
        const char = MFF_DATABASE_CHARACTERS.find(c => c.id === id);
        if (char) {
          const matchResult = checkFilterMatch(char);
          if (matchResult) {
            pool.push({ ...char, customTierTag: tier, matchedUniformName: matchResult.matchedUniformName });
          }
        }
      });
    });

    MFF_DATABASE_CHARACTERS.forEach(char => {
      if (!assignedTierCharIds.includes(char.id) && !deployedCharIds.includes(char.id)) {
        const matchResult = checkFilterMatch(char);
        if (matchResult) {
          pool.push({ ...char, customTierTag: '미배정', matchedUniformName: matchResult.matchedUniformName });
        }
      }
    });

    return pool;
  }, [userCharacters, tierList, currentVersionData.layout, filterType, filterRace, filterGender, filterFaction, filterRole, filterAbility]);

  const FilterDropdownPanel = () => (
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
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)} style={{ width: '100%', background: '#1e1e2e', border: '1px solid #2a2a40', color: '#fff', fontSize: 11, padding: '4px', borderRadius: 4, outline: 'none' }}>
          {['전체', '리더', '딜러', '서포터'].map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>
      <div>
        <label style={{ fontSize: 10, color: '#666', display: 'block', marginBottom: 3 }}>능력</label>
        <select value={filterAbility} onChange={e => setFilterAbility(e.target.value)} style={{ width: '100%', background: '#1e1e2e', border: '1px solid #2a2a40', color: '#fff', fontSize: 11, padding: '4px', borderRadius: 4, outline: 'none' }}>
          <option value="전체">전체</option>
          {allAbilities.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', background: '#13131e', padding: '4px', borderRadius: 8, marginBottom: 20, width: 'fit-content', border: '1px solid #2a2a40' }}>
        <button onClick={() => setShadowlandMode('layout')} style={{ padding: '6px 16px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: shadowlandMode === 'layout' ? '#2a2a40' : 'transparent', color: shadowlandMode === 'layout' ? '#fff' : '#888' }}>섀도우랜드 배치</button>
        <button onClick={() => setShadowlandMode('tier')} style={{ padding: '6px 16px', borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: shadowlandMode === 'tier' ? '#2a2a40' : 'transparent', color: shadowlandMode === 'tier' ? '#fff' : '#888' }}>캐릭터 티어표</button>
      </div>

      {shadowlandMode === 'layout' && (
        <div style={{ background: '#161622', border: '1px solid #2d2d44', borderRadius: 10, padding: '14px', marginBottom: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#88aaff' }}>기록 버전 조회:</span>
            <select 
              value={selectedVersionId} 
              onChange={e => setSelectedVersionId(e.target.value)}
              style={{ background: '#0d0d14', color: '#fff', border: '1px solid #3a3a55', padding: '6px 12px', borderRadius: 6, fontSize: 12, outline: 'none' }}
            >
              <option value="current">현재 편집 중인 배치</option>
              {versions.map(v => (
                <option key={v.id} value={v.id}>{v.versionName}</option>
              ))}
            </select>
          </div>

          {selectedVersionId !== 'current' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, color: '#ffb74d', fontWeight: 600 }}>⚠️ 과거 기록 읽기 전용 모드 (메모 수정 가능)</span>
              <button 
                onClick={(e) => handleDeleteVersion(selectedVersionId, e)}
                style={{ background: '#e53e3e30', border: '1px solid #e53e3e80', color: '#fc8181', fontSize: 11, padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}
              >
                이 버전 기록 삭제
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
              <input 
                type="text" 
                placeholder="저장할 버전 이름 (예: 5월 1주차)" 
                value={newVersionName}
                onChange={e => setNewVersionName(e.target.value)}
                style={{ background: '#0d0d14', border: '1px solid #2a2a40', color: '#fff', fontSize: 12, padding: '6px 10px', borderRadius: 6, width: 220 }}
              />
              <button 
                onClick={handleSaveVersion}
                style={{ background: '#3b82f6', color: '#fff', border: 'none', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 6, cursor: 'pointer' }}
              >
                현재 배치 저장
              </button>
            </div>
          )}
        </div>
      )}

      {shadowlandMode === 'layout' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'flex-start' }}>
            
            <div style={{ maxHeight: '740px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, paddingRight: 6 }}>
              {floorsArray.map(floor => {
                const currentCondition = currentVersionData.conditions[floor];
                const primaryType = currentCondition?.matchTypes?.[0] || '';
                const activeColor = TYPE_COLOR[primaryType] || '#2a2a40';

                const fullFloorData = floor <= 35 
                  ? MFF_SHADOWLAND_DATABASE.find(d => d.floor === floor) 
                  : getExtraFloorTemplate(floor);
                const matchedOption = fullFloorData?.options.find(o => o.id === currentCondition?.id);

                const targetMemoText = selectedVersionId === 'current' 
                  ? (currentMemos[floor] || '') 
                  : (versions.find(v => v.id === selectedVersionId)?.memos?.[floor] || '');

                return (
                  <div 
                    key={floor}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDropToFloor(e, floor)}
                    // 👍 카드 배경(빈 영역) 클릭 시 기존 필터 기능과 함께 '클릭 모드용 층 선택(activeFloor)' 기능을 동시에 수행합니다.
                    onClick={(e) => {handleFloorBackgroundClick(floor, e);
                      const condition = stageConditions[floor];
                      if (condition && condition.matchTypes && condition.matchTypes.length > 0) {
                        applyMatchFilters(condition.matchTypes);
                      } else {
                        applyMatchFilters([]);
                      }

                      if (placementMode === 'click') {
                        setActiveFloor(floor);
                      }
                    }}
                    style={{ 
                        background: '#13131e', 
                      // 💡 [수정] 클릭 배치 모드이면서 현재 이 층이 activeFloor로 선택되었다면 주황색 테두리(#ff9100) 하이라이트를 적용합니다.
                        border: placementMode === 'click' && activeFloor === floor 
                        ? '2px solid #ff9100' 
                        : '1px solid #2a2a40', 
                        borderRadius: 10, 
                        padding: '12px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 10, 
                        position: 'relative', 
                        opacity: currentVersionData.isReadOnly ? 0.9 : 1, 
                        cursor: currentVersionData.isReadOnly ? 'default' : 'pointer',
                        transition: 'border 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, pointerEvents: 'auto' }}>
                      <div 
                          onClick={(e) => {
                          e.stopPropagation(); // 💡 중요: 버튼을 눌렀을 때는 배경의 onClick이 중복 발동하지 않도록 차단합니다.
                          handleFloorButtonClick(floor);
                        }}
                        style={{ fontSize: 12, fontWeight: 800, color: '#fff', background: activeColor, minWidth: '58px', padding: '6px 2px', borderRadius: 6, textAlign: 'center', cursor: currentVersionData.isReadOnly ? 'default' : 'pointer', border: '1px solid #ffffff15', lineHeight: 1.2 }}
                        title={currentVersionData.isReadOnly ? "" : "클릭: 스테이지 조건 선택 및 수정"}
                      >
                        {floor}층
                      </div>

                      {/* 캐릭터 카드 배치 배경 영역 */}
                      <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 10, minHeight: '60px', alignItems: 'center', background: '#0d0d1440', borderRadius: 6, padding: '8px 12px' }}>
                        {currentCondition?.matchTypes && currentCondition.matchTypes.length > 0 && (
                          <div style={{ width: '100%', marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 4, pointerEvents: 'none' }}>
                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                              {currentCondition.matchTypes.map(t => (
                                <span key={t} style={{ fontSize: 9, background: TYPE_COLOR[t] || '#3a3a50', color: '#fff', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                                  {t}
                                </span>
                              ))}
                            </div>
                            {matchedOption && (
                              <span style={{ color: '#888', fontWeight: 500, fontSize: 10 }}>
                                📍 {matchedOption.description.split(' 추천')[0]}
                              </span>
                            )}
                          </div>
                        )}

                        {(currentVersionData.layout[floor] || []).map(id => {
                          const char = MFF_DATABASE_CHARACTERS.find(c => c.id === id);
                          if (!char) return null;
                          const userState = userCharacters[char.id] || { activeUniform: '' };
                          const currentUni = char.uniforms.find(u => u.name === userState.activeUniform) || char.uniforms[char.uniforms.length - 1];
                          const charTier = getCharacterTierTag(id);
                          const tagColor = TIER_COLORS[charTier] || '#666';

                          return (
                            <div 
                              key={id} 
                              onClick={(e) => {
                                e.stopPropagation(); // 배경 클릭 필터 이벤트로 번지는 것 차단
                                removeCharFromFloor(floor, id);
                              }}
                              style={{ position: 'relative', width: '54px', height: '54px', borderRadius: '50%', border: `2px solid ${TYPE_COLOR[currentUni.type[0]] || '#444'}aa`, cursor: currentVersionData.isReadOnly ? 'default' : 'pointer' }}
                              title={currentVersionData.isReadOnly ? char.name : `${char.name} [클릭 시 제거]`}
                            >
                              <img src={getDynamicPortrait(char, userState.activeUniform)} alt={char.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                              <span style={{ position: 'absolute', bottom: -2, right: -2, background: '#0d0d14', border: `1px solid ${tagColor}`, color: tagColor, fontSize: 8, fontWeight: 900, padding: '1px 3px', borderRadius: 4, lineHeight: 1 }}>
                                {charTier}
                              </span>
                            </div>
                          );
                        })}
                        {(currentVersionData.layout[floor] || []).length === 0 && !currentCondition && (
                          <span style={{ color: '#444', fontSize: 11, width: '100%', pointerEvents: 'none' }}>
                            {currentVersionData.isReadOnly ? '배치 기록 없음' : '왼쪽 층수 버튼을 눌러 스테이지 조건을 선택하세요.'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 공략 메모 영역 */}
                    <div onClick={e => e.stopPropagation()} style={{ borderTop: '1px solid #1e1e2f', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 10, color: '#64748b', fontWeight: 600 }}>층별 공략 및 배치 메모</span>
                        {selectedVersionId !== 'current' && <span style={{ fontSize: 9, color: '#475569' }}>*과거 기록 수동 갱신됨</span>}
                      </div>
                      <textarea 
                        rows={2}
                        placeholder=""
                        value={targetMemoText}
                        onChange={e => handleUpdateMemo(floor, e.target.value)}
                        style={{ width: '100%', background: '#0f0f16', border: '1px solid #222235', borderRadius: 6, color: '#ddd', fontSize: 11, padding: '6px 10px', resize: 'vertical', outline: 'none', lineHeight: 1.4 }}
                      />
                    </div>
                  </div>
                );
              })}

              {!currentVersionData.isReadOnly && (
                <button onClick={handleAddFloor} style={{ width: '100%', background: '#1e1e2e', border: '1px dashed #3a3a50', color: '#5b8dee', borderRadius: 10, padding: '12px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                  + 다음 층수 추가하기
                </button>
              )}
            </div>

            <div style={{ background: '#13131e', border: '1px solid #2a2a40', borderRadius: 12, padding: '1rem', position: 'sticky', top: 70, opacity: currentVersionData.isReadOnly ? 0.5 : 1, pointerEvents: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#aaa' }}>배치 대기 캐릭터 목록 {currentVersionData.isReadOnly && '(읽기 전용)'}</div>
                <button 
                  onClick={() => { setFilterType('전체'); setFilterGender('전체'); setFilterFaction('전체'); setFilterRace('전체'); setFilterRole('전체'); setFilterAbility('전체'); }}
                  style={{ background: '#2a2a40', border: 'none', color: '#ccc', fontSize: 10, padding: '2px 6px', borderRadius: 4, cursor: 'pointer' }}
                >
                  필터 초기화
                </button>
              </div>
              <FilterDropdownPanel />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, maxHeight: '340px', overflowY: 'auto' }}>
                {sortedLayoutCharacters.map(char => {
                  const userState = userCharacters[char.id] || { activeUniform: '' };
                  const currentUni = char.uniforms.find((u: any) => u.name === userState.activeUniform) || char.uniforms[char.uniforms.length - 1];
                  const tTag = char.customTierTag;
                  const tagColor = TIER_COLORS[tTag] || '#666';

                  return (
                    <div 
                      key={char.id} 
                      // ⭕ 드래그 모드일 때만 활성화
                      draggable={placementMode === 'drag'} 
                      onDragStart={(e) => {
                        if (placementMode !== 'drag') {
                          e.preventDefault();
                          return;
                        }
                        handleDragStart(e, char.id);
                      }}
                      {...{ onSelectStart: (e: any) => e.preventDefault() }}
                      // ⭕ 클릭 배치 로직 연동
                      onClick={() => {
                        if (placementMode === 'click') {
                          const targetFloor = activeModalFloor !== null ? activeModalFloor : activeFloor;
                          if (targetFloor !== null) {
                            const mockEvent = {
                              dataTransfer: { getData: () => char.id },
                              preventDefault: () => {}
                            } as any;
                            handleDropToFloor(mockEvent, targetFloor); 
                          } else {
                            alert("캐릭터를 배치할 층을 먼저 선택하거나 스테이지 조건 설정창을 열어주세요.");
                          }
                        }
                      }}
                      style={{ 
                        position: 'relative', 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '50%', 
                        border: `2px solid ${TYPE_COLOR[currentUni.type[0]] || '#444'}88`, 
                        cursor: placementMode === 'click' ? 'pointer' : 'grab',
                        transition: 'transform 0.1s ease',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        KhtmlUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none',
                      }}
                    >
                      <img 
                        src={getDynamicPortrait(char, char.matchedUniformName)} 
                        alt={char.name} 
                        // 💡 [추가] 클릭 모드에서 마우스로 캐릭터를 비벼도 이미지 유령 잔상이 생성되지 않도록 절대 차단
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          borderRadius: '50%', 
                          pointerEvents: 'none'
                        }} 
                      />
                      <span style={{ position: 'absolute', bottom: -2, right: -2, background: '#0d0d14', border: `1px solid ${tagColor}`, color: tagColor, fontSize: 8, fontWeight: 900, padding: '1px 3px', borderRadius: 4, lineHeight: 1, userSelect: 'none' }}>{tTag}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {shadowlandMode === 'tier' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ border: '1px solid #2a2a40', borderRadius: 12, overflow: 'hidden', background: '#13131e' }}>
            {TIERS.map((tier, index) => (
              <div 
                key={tier} 
                onDragOver={handleDragOver} 
                onDrop={(e) => handleDropToTier(e, tier)} 
                // 👇 [추가] 클릭 모드일 때 해당 등급 칸(S~F)을 선택된 상태로 저장
                onClick={() => {
                  if (placementMode === 'click') {
                    setActiveTier(tier);
                  }
                }}
                style={{ 
                  display: 'flex', 
                  borderBottom: index === TIERS.length - 1 ? 'none' : '1px solid #2a2a40', 
                  minHeight: '80px', 
                  alignItems: 'stretch',
                  // 👇 [추가] 클릭 배치 모드이면서 현재 이 등급이 선택되었다면 주황색(#ff9100) 테두리 효과를 적용
                  border: placementMode === 'click' && activeTier === tier ? '2px solid #ff9100' : 'none',
                  cursor: placementMode === 'click' ? 'pointer' : 'default'
                }}
              >
                <div style={{ width: '70px', background: `${TIER_COLORS[tier]}15`, borderRight: '1px solid #2a2a40', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: TIER_COLORS[tier] }}>{tier}</div>
                <div style={{ flex: 1, padding: '10px', display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', background: '#0d0d1410' }}>
                  {(tierList[tier] || []).map(id => {
                    const char = MFF_DATABASE_CHARACTERS.find(c => c.id === id);
                    if (!char) return null;
                    const userState = userCharacters[char.id] || { activeUniform: '' };
                    const currentUni = char.uniforms.find(u => u.name === userState.activeUniform) || char.uniforms[char.uniforms.length - 1];

                    return (
                      <div key={char.id} draggable={true} onDragStart={(e) => handleDragStart(e, char.id)} style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${TYPE_COLOR[currentUni.type[0]] || '#444'}aa`, cursor: 'grab' }}>
                        <img src={getDynamicPortrait(char, userState.activeUniform)} alt={char.name} style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10, color: '#aaa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>티어 미배치 캐릭터 목록</span>
              {maxFloor > 35 && <button onClick={handleResetExtraFloors} style={{ background: '#bd3a3a', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>⚠️ 35층 초과 확장층 일괄 삭제</button>}
            </div>
            <div onDragOver={handleDragOver} onDrop={handleDropToTierPool} style={{ background: '#13131e', border: '1px dashed #2a2a40', borderRadius: 14, padding: '1.2rem', display: 'flex', flexWrap: 'wrap', gap: 12, minHeight: '140px' }}>
              {MFF_DATABASE_CHARACTERS.filter(char => userCharacters[char.id]?.owned && !assignedTierCharIds.includes(char.id)).map(char => {
                const userState = userCharacters[char.id] || { activeUniform: '' };
                const currentUni = char.uniforms.find(u => u.name === userState.activeUniform) || char.uniforms[char.uniforms.length - 1];

                return (
                  <div 
                    key={char.id} 
                    // ⭕ 드래그 모드일 때만 활성화
                    draggable={placementMode === 'drag'} 
                    onDragStart={(e) => handleDragStart(e, char.id)} 
                    // ⭕ 클릭 배치 로직 연동
                    onClick={() => {
                      if (placementMode === 'click') {
                        // 만약 MainDashboard나 컴포넌트 내부에 선택된 티어 상태(예: activeTier)가 있다면 연동
                        // 여기서는 예시로 activeTier 변수를 매핑합니다.
                        if (typeof activeTier !== 'undefined' && activeTier) {
                          const mockEvent = {
                            dataTransfer: { getData: () => char.id },
                            preventDefault: () => {}
                          } as any;
                          
                          // 🔍 실제 확인된 티어 드롭 함수 호출
                          handleDropToTier(mockEvent, activeTier);
                        } else {
                          alert("배치할 티어 등급(S~F) 좌측 버튼을 먼저 선택해주세요.");
                        }
                      }
                    }}
                    style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      gap: 4, 
                      cursor: placementMode === 'click' ? 'pointer' : 'grab', 
                      width: '64px' 
                    }}
                  >
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${TYPE_COLOR[currentUni.type[0]] || '#444'}88`, background: '#0d0d14' }}>
                      <img src={getDynamicPortrait(char, userState.activeUniform)} alt={char.name} style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                    </div>
                    <div style={{ fontSize: 10, color: '#aaa', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', textAlign: 'center' }}>{char.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeModalFloor !== null && (() => {
        const floorData = activeModalFloor <= 35 
          ? MFF_SHADOWLAND_DATABASE.find(d => d.floor === activeModalFloor) 
          : getExtraFloorTemplate(activeModalFloor);

        const SLmode = floorData ? floorData.mode : '릴레이 모드';
        const options = floorData ? floorData.options : [];
        const currentSelectedId = stageConditions[activeModalFloor]?.id;

        return (
          <div onClick={() => setActiveModalFloor(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110 }}>
            <div onClick={e => e.stopPropagation()} style={{ background: '#0a0a10', border: '2px solid #2a2a40', borderRadius: 12, maxWidth: 960, width: '95%', padding: '24px', color: '#fff' }}>
              <div style={{ fontSize: 18, fontWeight: 700, textAlign: 'center', marginBottom: 24, color: '#fff' }}>
                섀도우랜드 {activeModalFloor}층 <span style={{ color: '#a3e635' }}>{SLmode}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                {options.map(option => {
                  const isCurrentlySelected = currentSelectedId === option.id;
                  const currentOptionTypes: string[] = Array.isArray(option.matchTypes)
                    ? option.matchTypes
                    : (option.matchTypes ? [option.matchTypes] : []);

                  return (
                    <div 
                      key={option.id} 
                      style={{ 
                        background: '#11111b', 
                        border: isCurrentlySelected ? '2px solid #38bdf8' : '1px solid #222235', 
                        borderRadius: 6, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'between', 
                        overflow: 'hidden',
                        boxShadow: isCurrentlySelected ? '0 0 12px #38bdf830' : 'none'
                      }}
                    >
                      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: isCurrentlySelected ? '#38bdf8' : '#888', marginBottom: 12, fontWeight: 600 }}>
                          {isCurrentlySelected ? '● 현재 선택됨' : '등장 보스'}
                        </div>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 14, minHeight: '40px', alignItems: 'center' }}>
                          {option.bossPreviews && option.bossPreviews.length > 0 ? (
                            option.bossPreviews.map(bossId => (
                              <div key={bossId} style={{ width: 42, height: 42, borderRadius: 4, overflow: 'hidden', border: '1px solid #333', background: '#050508' }}>
                                <img 
                                  src={`/images/${bossId.toLowerCase()}.png`} 
                                  alt={bossId} 
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42"><rect width="42" height="42" fill="%23222"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="9">ERR</text></svg>';
                                  }}
                                />
                              </div>
                            ))
                          ) : (
                            <div style={{ fontSize: 11, color: '#444' }}>보스 정보 없음</div>
                          )}
                        </div>
                        
                        <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
                          {currentOptionTypes.map(t => (
                            <span key={t} style={{ fontSize: 9, background: (TYPE_COLOR[t] || '#222235') + '40', color: TYPE_COLOR[t] || '#aaa', border: `1px solid ${TYPE_COLOR[t] || '#333'}80`, padding: '1px 5px', borderRadius: 4, fontWeight: 700 }}>
                              {t}
                            </span>
                          ))}
                        </div>

                        <p style={{ fontSize: 11, color: '#aaa', margin: 0, lineHeight: 1.5 }}>{option.description}</p>
                      </div>
                      <button 
                        onClick={() => handleSelectStageOption(activeModalFloor, option)} 
                        style={{ 
                          width: '100%', 
                          background: isCurrentlySelected ? '#0ea5e9' : '#38bdf8', 
                          border: 'none', 
                          color: '#000', 
                          padding: '12px 0', 
                          fontSize: 14, 
                          fontWeight: 700, 
                          cursor: 'pointer' 
                        }}
                      >
                        {isCurrentlySelected ? '다시 입장' : '입장'}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => setActiveModalFloor(null)} style={{ background: 'transparent', border: '1px solid #333', color: '#888', padding: '8px 32px', borderRadius: 4, fontSize: 13, cursor: 'pointer' }}>취소</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}