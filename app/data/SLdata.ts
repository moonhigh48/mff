import { MFF_DATABASE_CHARACTERS } from './Characters';

// 💡 & {} 를 추가하여 IDE가 자동완성 드롭다운을 강제로 표시하도록 만듭니다.
type CharacterIdType = (typeof MFF_DATABASE_CHARACTERS[number]['id']) | (string & {});

// 💡 허용할 조건 유형들을 리터럴 유니온 타입으로 정의합니다.
export type MatchConditionType = '컴뱃' | '블래스트' | '스피드' | '유니버셜' | '남성' | '여성' | '영웅' | '슈퍼 빌런' | '화염' | '스파이더 센스' | '피닉스 포스';

export interface StageOption {
  id: string;
  // 💡 기존 단일 matchType 문자열을 복수 선택이 가능한 MatchConditionType[] 배열로 변경합니다.
  matchTypes: MatchConditionType[];
  description: string;
  bossPreviews: CharacterIdType[]; 
}

export interface FixedFloorData {
  floor: number;
  mode: '릴레이 모드' | '난투 모드' | '웨이브 모드' | '보스 모드' | '엔트리 모드' | '극한 모드';
  options: StageOption[];
}

// 층수만 넣으면 모드를 알아서 반환해주는 내부 헬퍼 함수
const getAutoMode = (floorNum: number): FixedFloorData['mode'] => {
  const relayFloors = [1, 3, 6, 8, 11, 13, 16, 21, 34];
  const rumbleFloors = [2, 5, 7, 10, 14, 18, 23, 28, 31];
  const waveFloors = [4, 9, 19, 29, 32];
  const bossFloors = [12, 17, 22, 24, 26, 33, 35];
  const entryFloors = [15, 20, 25, 27, 30];

  if (relayFloors.includes(floorNum)) return '릴레이 모드';
  if (rumbleFloors.includes(floorNum)) return '난투 모드';
  if (waveFloors.includes(floorNum)) return '웨이브 모드';
  if (bossFloors.includes(floorNum)) return '보스 모드';
  if (entryFloors.includes(floorNum)) return '엔트리 모드';
  return '극한 모드';
};

// 헬퍼 함수를 거쳐 데이터를 안전하게 내보내는 정제용 배열
const RAW_DATABASE: Omit<FixedFloorData, 'mode'>[] = [
  {
    floor: 1, 
    options: [
      { id: 'blast1', matchTypes: ['블래스트'], description: '블래스트 타입 유리', bossPreviews: ['captainamerica', 'punisher', 'blade', 'hulkbuster'] },
      { id: 'speed1', matchTypes: ['스피드'], description: '스피드 타입 유리', bossPreviews: ['ironman', 'starlord', 'rocketraccoon', 'vision'] },
      { id: 'combat1', matchTypes: ['컴뱃'], description: '컴뱃 타입 유리', bossPreviews: ['spiderman', 'wintersoldier', 'hawkeye', 'antman'] }
    ]
  },
  {
    floor: 2,
    options: [
      { id: 'speed2', matchTypes: ['스피드'], description: '스피드 타입 유리\n에너지 피해 반사', bossPreviews: ['wasp', 'songbird', 'daisyjohnson', 'sistergrimm'] },
      { id: 'combat2', matchTypes: ['컴뱃'], description: '컴뱃 타입 유리\n에너지, 물리 피해 반사', bossPreviews: ['blackwidow', 'gamora', 'sharoncarter', 'elsabloodstone'] },
      { id: 'blast2', matchTypes: ['블래스트'], description: '블래스트 타입 유리\n물리 피해 반사', bossPreviews: ['punisher', 'lukecage', 'jessicajones', 'ironfist'] }
    ]
  },
  {
    floor: 3,
    options: [
      // 💡 다음과 같이 단일 혹은 복수 조건을 배열 안에 문자열 형태로 자유롭게 정의할 수 있습니다.
      { id: 'universal1', matchTypes: ['유니버셜'], description: '유니버셜 타입 유리', bossPreviews: ['ronan', 'ghostrider', 'thor'] },
      { id: 'woman1', matchTypes: ['여성'], description: '여성 캐릭터 유리', bossPreviews: ['sif', 'elektra', 'whitetiger', 'angela'] },
      { id: 'heromale1', matchTypes: ['영웅', '남성'], description: '영웅 남성 캐릭터 유리', bossPreviews: ['wintersoldier', 'warmachine', 'falcon'] }
    ]
  },
  {
    floor: 4,
    options: [
      // 💡 다음과 같이 단일 혹은 복수 조건을 배열 안에 문자열 형태로 자유롭게 정의할 수 있습니다.
      { id: 'supervillain1', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리', bossPreviews: ['maximus', 'kaecilius', 'hela'] },
      { id: 'free1', matchTypes: [], description: '강력한 팀으로 도전하세요.', bossPreviews: ['vision', 'hulkbuster', 'ultron'] },
      { id: 'hero1', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['starlord', 'groot', 'rocketraccoon', 'drax', 'gamora1'] }
    ]
  },
  {
    floor: 5,
    options: [
      // 💡 다음과 같이 단일 혹은 복수 조건을 배열 안에 문자열 형태로 자유롭게 정의할 수 있습니다.
      { id: 'hero2', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['wiccan', 'whitetiger', 'hulkling', 'songbird', 'squirrelgirl'] },
      { id: 'supervillain2', matchTypes: ['슈퍼 빌런', '유니버셜'], description: '슈퍼 빌런 진영, 유니버셜 타입.', bossPreviews: ['ultron3', 'ultron', 'ultron1'] },
      { id: 'blast3', matchTypes: ['블래스트'], description: '블래스트 타입 유리\n물리 피해 반사', bossPreviews: ['hulk', 'hulkling', 'amadeuscho', 'shehulk'] }
    ]
  },
  {
    floor: 6,
    options: [
      { id: 'blast1', matchTypes: ['블래스트'], description: '블래스트 타입 유리', bossPreviews: ['captainamerica', 'punisher', 'blade', 'hulkbuster'] },
      { id: 'speed1', matchTypes: ['스피드'], description: '스피드 타입 유리', bossPreviews: ['ironman', 'starlord', 'rocketraccoon', 'vision'] },
      { id: 'combat1', matchTypes: ['컴뱃'], description: '컴뱃 타입 유리', bossPreviews: ['spiderman', 'wintersoldier', 'hawkeye', 'antman'] }
    ]
  },
  {
    floor: 7,
    options: [
      { id: 'blast4', matchTypes: ['블래스트'], description: '블래스트 타입 유리', bossPreviews: ['redhulk', 'docteroctapus', 'venom', 'crossbones'] },
      { id: 'hero2', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['wiccan', 'whitetiger', 'hulkling', 'songbird', 'squirrelgirl'] },
      { id: 'supervillain3', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리', bossPreviews: ['lash', 'docteroctapus', 'venom', 'carnige', 'crossbones'] }
    ]
  },
  {
    floor: 8,
    options: [
      { id: 'universal1', matchTypes: ['유니버셜'], description: '유니버셜 타입 유리', bossPreviews: ['ronan', 'ghostrider', 'thor'] },
      { id: 'woman1', matchTypes: ['여성'], description: '여성 캐릭터 유리', bossPreviews: ['sif', 'elektra', 'whitetiger', 'angela'] },
      { id: 'heromale1', matchTypes: ['영웅', '남성'], description: '영웅 남성 캐릭터 유리', bossPreviews: ['wintersoldier', 'warmachine', 'falcon'] }
    ]
  },
  {
    floor: 9,
    options: [
      { id: 'supervillain4', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리\n물리 피해 반사', bossPreviews: ['redskull', 'kingpin', 'ronan'] },
      { id: 'supervillain5', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리', bossPreviews: ['yondu', 'nebula', 'ronan'] },
      { id: 'supervillain6', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리', bossPreviews: ['captainamerica', 'redskull', 'sin', 'crossbones'] }
    ]
  },
  {
    floor: 10,
    options: [
      { id: 'speed3', matchTypes: ['스피드'], description: '스피드 타입 유리\n에너지 피해 반사', bossPreviews: ['nadiavandain', 'rescue', 'ironheart', 'wasp'] },
      { id: 'blast3', matchTypes: ['블래스트'], description: '블래스트 타입 유리\n물리 피해 반사', bossPreviews: ['hulk', 'hulkling', 'amadeuscho', 'shehulk'] },
      { id: 'combat3', matchTypes: ['컴뱃'], description: '컴뱃 타입 유리\n회피율이 높은 적', bossPreviews: ['milesmorales', 'silk', 'spidergwen', 'spiderman', 'spiderman1'] }
    ]
  },
  {
    floor: 11,
    options: [
      { id: 'electron1', matchTypes: [], description: '전기 속성 면역', bossPreviews: ['thor', 'groot', 'janeposter'] },
      { id: 'fire1', matchTypes: [], description: '화염 속성 면역', bossPreviews: ['ghostrider', 'angela', 'greengoblin', 'redhulk'] },
      { id: 'poison1', matchTypes: [], description: '독 속성 면역', bossPreviews: ['greengoblin', 'lizard', 'scolpion', 'viper'] }
    ]
  },
  {
    floor: 12,
    options: [
      { id: 'ice1', matchTypes: [], description: '얼음 속성 면역', bossPreviews: ['loki'] },
      { id: 'supervillain7', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리', bossPreviews: ['malekith'] },
      { id: 'hero3', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['sif'] }
    ]
  },
  {
    floor: 13,
    options: [
      { id: 'speed4', matchTypes: ['스피드'], description: '스피드 타입 유리\n에너지 피해 반사', bossPreviews: ['sistergrimm', 'lash', 'wiccan'] },
      { id: 'supervillain8', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리\n물리 피해 반사', bossPreviews: ['hulk', 'kingpin', 'hulk1'] },
      { id: 'free2', matchTypes: [], description: '물리 피해 반사', bossPreviews: ['shehulk', 'jessicajones'] }
    ]
  },
  {
    floor: 14,
    options: [
      { id: 'blast4', matchTypes: ['블래스트'], description: '블래스트 타입 유리', bossPreviews: ['redhulk', 'docteroctapus', 'venom', 'crossbones'] },
      { id: 'combat2', matchTypes: ['컴뱃'], description: '컴뱃 타입 유리\n에너지, 물리 피해 반사', bossPreviews: ['blackwidow', 'gamora', 'sharoncarter', 'elsabloodstone'] },
      { id: 'hero2', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['wiccan', 'whitetiger', 'hulkling', 'songbird', 'squirrelgirl'] }
    ]
  },
  {
    floor: 15,
    options: [
        { id: 'entry1', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['hawkeye', 'captainamerica', 'ironman', 'katebishop', 'sharonrogers', 'ironheart'] }
    ]
  },
  {
    floor: 16,
    options: [
      { id: 'electron1', matchTypes: [], description: '전기 속성 면역', bossPreviews: ['thor', 'groot', 'janeposter'] },
      { id: 'supervillain9', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리', bossPreviews: ['modok', 'sin', 'malekith'] },
      { id: 'supervillain8', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리\n물리 피해 반사', bossPreviews: ['hulk', 'kingpin', 'hulk1'] }
    ]
  },
  {
    floor: 17,
    options: [
      { id: 'free3', matchTypes: [], description: '적이 회피하면 회피 면역 발동', bossPreviews: ['rocketraccoon'] },
      { id: 'supervillain10', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리', bossPreviews: ['destroyer1', 'destroyer'] },
      { id: 'fire2', matchTypes: ['화염'], description: '화염 속성 유리', bossPreviews: ['agentvenom', 'carnige'] }
    ]
  },
  {
    floor: 18,
    options: [
      { id: 'hero2', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['wiccan', 'whitetiger', 'hulkling', 'songbird', 'squirrelgirl'] },
      { id: 'supervillain3', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리', bossPreviews: ['lash', 'docteroctapus', 'venom', 'carnige', 'crossbones'] },
      { id: 'supervillain2', matchTypes: ['슈퍼 빌런', '유니버셜'], description: '슈퍼 빌런 진영, 유니버셜 타입.', bossPreviews: ['ultron3', 'ultron', 'ultron1'] }
    ]
  },
  {
    floor: 19,
    options: [
      { id: 'free1', matchTypes: [], description: '강력한 팀으로 도전하세요.', bossPreviews: ['vision', 'hulkbuster', 'ultron'] },
      { id: 'hero1', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['starlord', 'groot', 'rocketraccoon', 'drax', 'gamora1'] },
      { id: 'supervillain6', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리', bossPreviews: ['captainamerica', 'redskull', 'sin', 'crossbones'] }

    ]
  },
  {
    floor: 20,
    options: [
      { id: 'entry1', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['hawkeye', 'captainamerica', 'ironman', 'katebishop', 'sharonrogers', 'ironheart'] },
      { id: 'entry2', matchTypes: [], description: '상태 이상 해제하는 적', bossPreviews: ['bolstak', 'fanderl', 'hogarn', 'odin', 'thor', 'loki'] },
      { id: 'entry3', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['cyclops', 'rogan', 'beast', 'wolverin', 'magnito', 'storm'] }
    ]
  },
  {
    floor: 21,
    options: [
      { id: 'fire1', matchTypes: [], description: '화염 속성 면역', bossPreviews: ['ghostrider', 'angela', 'greengoblin', 'redhulk'] },
      { id: 'speed4', matchTypes: ['스피드'], description: '스피드 타입 유리\n에너지 피해 반사', bossPreviews: ['sistergrimm', 'lash', 'wiccan'] },
      { id: 'free2', matchTypes: [], description: '물리 피해 반사', bossPreviews: ['shehulk', 'jessicajones'] }
    ]
  },
  {
    floor: 22,
    options: [
      { id: 'free4', matchTypes: [], description: '분신 처치', bossPreviews: ['ironfist'] },
      { id: 'combat4', matchTypes: ['컴뱃'], description: '컴뱃 타입 유리', bossPreviews: ['hawkeye'] },
      { id: 'free5', matchTypes: [], description: '물리 피해 반사', bossPreviews: ['kingpin'] }
    ]
  },
  {
    floor: 23,
    options: [
      { id: 'blast2', matchTypes: ['블래스트'], description: '블래스트 타입 유리\n물리 피해 반사', bossPreviews: ['punisher', 'lukecage', 'jessicajones', 'ironfist'] },
      { id: 'hero2', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['wiccan', 'whitetiger', 'hulkling', 'songbird', 'squirrelgirl'] },
      { id: 'combat3', matchTypes: ['컴뱃'], description: '컴뱃 타입 유리\n회피율이 높은 적', bossPreviews: ['milesmorales', 'silk', 'spidergwen', 'spiderman', 'spiderman1'] }
    ]
  },
  {
    floor: 24,
    options: [
      { id: 'free3', matchTypes: [], description: '적이 회피하면 회피 면역 발동', bossPreviews: ['rocketraccoon'] },
      { id: 'supervillain10', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리', bossPreviews: ['destroyer1', 'destroyer'] },
      { id: 'fire2', matchTypes: ['화염'], description: '화염 속성 유리', bossPreviews: ['agentvenom', 'carnige'] }
    ]
  },
  {
    floor: 25,
    options: [
      { id: 'entry3', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['cyclops', 'rogan', 'beast', 'wolverin', 'magnito', 'storm'] }
    ]
  },
  {
    floor: 26,
    options: [
      { id: 'free3', matchTypes: [], description: '적이 회피하면 회피 면역 발동', bossPreviews: ['rocketraccoon'] },
      { id: 'combat4', matchTypes: ['컴뱃'], description: '컴뱃 타입 유리', bossPreviews: ['hawkeye'] },
      { id: 'free5', matchTypes: [], description: '물리 피해 반사', bossPreviews: ['kingpin'] }
    ]
  },
  {
    floor: 27,
    options: [
      { id: 'entry4', matchTypes: [], description: '일정 확률로 에너지 피해 면역', bossPreviews: ['dormamu', 'satana', 'hellstone', 'docterstrange', 'clea', 'ancientone'] }
    ]
  },
  {
    floor: 28,
    options: [
      { id: 'hero2', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['wiccan', 'whitetiger', 'hulkling', 'songbird', 'squirrelgirl'] },
      { id: 'supervillain2', matchTypes: ['슈퍼 빌런', '유니버셜'], description: '슈퍼 빌런 진영, 유니버셜 타입.', bossPreviews: ['ultron3', 'ultron', 'ultron1'] },
      { id: 'blast3', matchTypes: ['블래스트'], description: '블래스트 타입 유리\n물리 피해 반사', bossPreviews: ['hulk', 'hulkling', 'amadeuscho', 'shehulk'] }
    ]
  },
  {
    floor: 29,
    options: [
      { id: 'entry5', matchTypes: [], description: '강력한 팀으로 도전하세요', bossPreviews: ['blackdwarf', 'proximamidnight', 'colebusgrave', 'thanos', 'supergiant', 'ebonimo'] }
    ]
  },
  {
    floor: 30,
    options: [
      { id: 'entry6', matchTypes: ['슈퍼 빌런'], description: '슈퍼 빌런 진영 유리', bossPreviews: ['crossbones', 'captainamerica', 'viper', 'baronzemo', 'redskull', 'sin'] },
      { id: 'entry7', matchTypes: ['영웅'], description: '영웅 진영 유리', bossPreviews: ['wave', 'airo', 'swordmaster', 'lunasnow', 'crescent', 'whitefox'] },
      { id: 'entry8', matchTypes: ['유니버셜'], description: '유니버셜 타입 유리\n화염 속성 면역\n전기 속성 면역', bossPreviews: ['thor', 'loki', 'angela', 'haimdal', 'hela', 'odin'] }
    ]
  },
  {
    floor: 31,
    options: [
      { id: 'blast5', matchTypes: ['블래스트', '슈퍼 빌런'], description: '블래스트 타입, 슈퍼 빌런 진영 유리\n물리 피해 반사', bossPreviews: ['beast', 'zuggernut', 'killmonger', 'savertooth'] },
      { id: 'speed5', matchTypes: ['스피드', '슈퍼 빌런'], description: '스피드 타입, 슈퍼 빌런 진영 유리\n에너지 피해 반사', bossPreviews: ['magneto', 'mistersinster', 'stripe', 'cyclops'] },
      { id: 'combat5', matchTypes: ['컴뱃', '영웅'], description: '컴뱃 타입, 영웅 진영 유리\n에너지 피해 반사', bossPreviews: ['모르도', 'lunasnow', 'wave', 'airo'] }
    ]
  },
  {
    floor: 32,
    options: [
      { id: 'entry9', matchTypes: ['스파이더 센스'], description: '스파이더 센스 고유 능력 유리', bossPreviews: ['doctoroctopus', 'sandman', 'lizard', 'mysterio', 'vulture', 'electro'] }
    ]
  },
  {
    floor: 33,
    options: [
      { id: 'fire3', matchTypes: ['화염'], description: '화염 속성 유리', bossPreviews: ['iceman'] },
      { id: 'free6', matchTypes: [], description: '뮤턴트 종족이 아닌 캐릭터 유리', bossPreviews: ['scarletwitch'] },
      { id: 'free7', matchTypes: ['슈퍼 빌런'], description: '기계 또는 정신 저항 고유 능력을 가진 슈퍼 빌런 진영', bossPreviews: ['인챈트리스'] }
    ]
  },
  {
    floor: 34,
    options: [
      { id: 'pheonixforce1', matchTypes: ['피닉스 포스'], description: '피닉스 포스 고유 능력 보유', bossPreviews: ['thanos', 'ghostrider', 'silversulfur'] }
    ]
  },
  {
    floor: 35,
    options: [
      { id: 'free8', matchTypes: [], description: '강력한 팀으로 도전하세요.', bossPreviews: ['daredevil'] }
    ]
  }

  // 4층부터 35층까지 mode 없이 floor와 options만 쭉 적으시면 됩니다!
];

// 외부 컴포넌트(SL.tsx)가 사용할 최종 데이터베이스 (자동 매핑 완성본)
export const MFF_SHADOWLAND_DATABASE: FixedFloorData[] = RAW_DATABASE.map(item => ({
  ...item,
  mode: getAutoMode(item.floor) 
}));

// 35층 초과 확장층 자동 방어막 템플릿에도 변경된 사양 적용
export const getExtraFloorTemplate = (floorNum: number): FixedFloorData => ({
  floor: floorNum,
  mode: getAutoMode(floorNum),
  options: [
    { id: `extra_blast_${floorNum}`, matchTypes: ['블래스트'], description: '가변 확장층 스테이지입니다.', bossPreviews: [] },
    { id: `extra_speed_${floorNum}`, matchTypes: ['스피드'], description: '가변 확장층 스테이지입니다.', bossPreviews: [] },
    { id: `extra_combat_${floorNum}`, matchTypes: ['컴뱃'], description: '가변 확장층 스테이지입니다.', bossPreviews: [] }
  ]
});