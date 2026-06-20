// 1. 각 배열 인덱스에 들어갈 허용 가능한 값들을 타입으로 정의 (오입력 방지)
export type MffClass = '컴뱃' | '블래스트' | '스피드' | '유니버셜';
export type MffRace = '인간' | '뮤턴트' | '인휴먼' | '외계인' | '창조물' | '불명';
export type MffGender = '남성' | '여성' | '성별 없음';
export type MffFaction = '영웅' | '슈퍼 빌런' | '중립';
export type MffElement = '파멸' | '냉혹' | '질서' | '정의';

// 2. 지정하신 [클래스, 종족, 성별, 진영, 천성] 순서를 엄격하게 강제하는 튜플(Tuple) 타입 정의
export type MffCharacterTypeTuple = [MffClass, MffRace, MffGender, MffFaction, MffElement];

export interface UniformInfo {
  name: string;
  type: MffCharacterTypeTuple; // 무조건 정의한 순서대로 5개의 값이 들어가야 함
  role: ('리더' | '딜러' | '서포터' | '')[];
  ability: string[];
}

export interface CharacterData {
  id: string;
  name: string;
  portrait: string;
  uniforms: UniformInfo[];
}

export const MFF_DATABASE_CHARACTERS: CharacterData[] = [
 {
  id: 'Abomination',
  name: '어보미네이션',
  portrait: '/images/abomination.png',
  uniforms: [
    { name: ' 모던', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러', '서포터'], ability: ['감마선', '내구력'] },
    { name: '감염된 생물병기', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러', '서포터'], ability: ['감마선', '내구력', '좀비'] }
  ]
},
{
  id: 'Absorbing Man',
  name: '앱소빙 맨',
  portrait: '/images/absorbingman.png',
  uniforms: [
    { name: '모던', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['괴력'] },
    { name: '피어 잇셀프', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['괴력'] }
  ]
},
{
  id: 'Adam Warlock',
  name: '아담 워록',
  portrait: '/images/adamwarlock.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '창조물', '남성', '영웅', '질서'], role: ['딜러'], ability: ['마법', '타임프리징 면역'] },
    { name: "인피니티 카운트다운", type: ['블래스트', '창조물', '남성', '영웅', '질서'], role: ['딜러'], ability: ['마법', '타임프리징 면역'] },
    { name: "가디언즈 오브 갤럭시: Volume 3", type: ['블래스트', '창조물', '남성', '영웅', '질서'], role: ['딜러'], ability: ['마법', '타임프리징 면역'] },
  ]
},
{
  id: 'aero',
  name: '에어로',
  portrait: '/images/aero.png',
  uniforms: [
    {name: "모던", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '고속 이동']},
    {name: "클래식", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '고속 이동']}
  ]
},
{
  id: 'Agent Venom',
  name: '에이전트 베놈',
  portrait: '/images/agentvenom.png',
  uniforms: [
    { name: '모던', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['심비오트', '영웅심', '요원'] },
    { name: '에이전트 안티 베놈', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['심비오트', '영웅심', '요원'] },
    { name: '클래식', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러', '서포터'], ability: ['심비오트', '영웅심', '요원'] },
    { name: '가디언즈 오브 갤럭시', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러', '서포터'], ability: ['심비오트', '영웅심', '요원'] }
  ]
},
{
  id: 'America Chavez',
  name: '아메리카 차베스',
  portrait: '/images/americachavez.png',
  uniforms: [
    { name: '얼티미츠', type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['괴력', '고속 이동'] },
    { name: '클래식', type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['괴력', '고속 이동'] },
    { name: '닥터 스트레인지: 대혼돈의 멀티버스', type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['괴력', '고속 이동'] },
    { name: '영 어벤져스', type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러', '서포터'], ability: ['괴력', '고속 이동', '영 어벤져스'] }
  ]
},
{
  id: 'Ancient one',
  name: '에인션트 원',
  portrait: '/images/ancientone.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['마법', '영웅심'] },
    { name: "무비: 닥터 스트레인지", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['마법', '영웅심'] },
    { name: "해방된 마법사", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['마법', '영웅심'] },
    { name: "카마르타지의 수도승", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['마법', '영웅심'] }
  ]
},
{
  id: 'Angel',
  name: '엔젤',
  portrait: '/images/angel.png',
  uniforms: [
    { name: "모던", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: [''], ability: ['고속 이동', '영웅심'] },
    { name: "엑스 포스", type: ['스피드', '뮤턴트', '남성', '슈퍼 빌런', '질서'], role: [''], ability: ['고속 이동', '영웅심'] },
    { name: "올-뉴 엑스맨", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: [''], ability: ['고속 이동', '영웅심'] },
    { name: "타락한 자", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: [''], ability: ['고속 이동', '영웅심'] }
  ]
},
{
  id: 'Angela',
  name: '안젤라',
  portrait: '/images/angela.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가']},
    { name: "시크릿 워즈: 1602 위치 헌터 안젤라", type: ['유니버셜', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가']},
    { name: "올-뉴, 올-디프런트", type: ['유니버셜', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '화염']},
    { name: "아스가르드의 암살자", type: ['유니버셜', '외계인', '여성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['무기 전문가']},
  ]
},
{
  id: 'AntMan',
  name: '앤트맨',
  portrait: '/images/antman.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] },
    { name: "무비: 앤트맨", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] },
    { name: "캡틴 아메리카: 시빌 워", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] },
    { name: "무비: 앤트맨과 와스프", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] },
    { name: "어벤져스: 엔드게임", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] },
    { name: "팀 슈트", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] },
    { name: "앤트맨과 와스프: 퀀텀매니아", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] }
  ]
},
{
  id: 'AntiMan',
  name: '안티맨',
  portrait: '/images/antiman.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['유니버셜', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러'], ability: ['고속 이동', '에너지 투사'] },
    { name: "얼티미츠", type: ['유니버셜', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러'], ability: ['고속 이동', '에너지 투사'] }
  ]
},
{
  id: 'Apocalypse',
  name: '아포칼립스',
  portrait: '/images/apocalypse.png',
  uniforms: [
    { name: '에이지 오브 아포칼립스', type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['리더'], ability: ['고속 이동', '사악', '내구력'] },
    { name: '메시아 콤플렉스', type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['고속 이동', '사악', '내구력'] },
    { name: '아포칼립스의 전령', type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['고속 이동', '사악', '내구력'] }
  ]
},
{
  id: 'Arachknight',
  name: '아라크나이트',
  portrait: '/images/arachknight.png',
  uniforms: [
    { name: "어벤져스: 인피니티 워프", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '인피니티 워프', '스파이더 센스'] },
    { name: "아라크나이트 2099", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['영웅심', '인피니티 워프', '스파이더 센스'] }
  ]
},
{
  id: 'Ares',
  name: '아레스',
  portrait: '/images/ares.png',
  uniforms: [
    { name: '모던', type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['다크 어벤져스', '무기 전문가', '괴력'] },
    { name: '퍼니셔', type: ['컴뱃', '외계인', '남성', '슈퍼 빌런', '질서'], role: ['딜러'], ability: ['무기 전문가', '괴력', '올림포스'] }
  ]
},
{
  id: 'Athena',
  name: '아테나',
  portrait: '/images/athena.png',
  uniforms: [
    { name: '인크레더블 헤라클레스', type: ['컴뱃', '외계인', '여성', '영웅', '질서'], role: ['서포터'], ability: ['민첩', '치유력', '올림포스'] }
  ]
},
{
  id: 'Baron Mordo',
  name: '모르도 남작',
  portrait: '/images/baronmordo.png',
  uniforms: [
    { name: "클래식", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['마법', '사악'] },
    { name: "무비: 닥터 스트레인지", type: ['스피드', '인간', '남성', '영웅', '냉혹'], role: ['딜러'], ability: ['민첩', '초감각', '마법'] },
    { name: "닥터 스트레인지: 대혼돈의 멀티버스", type: ['스피드', '인간', '남성', '영웅', '냉혹'], role: ['딜러'], ability: ['민첩', '초감각', '마법'] }
  ]
},
{
  id: 'Baron Zemo',
  name: '바론 제모',
  portrait: '/images/baronzemo.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러'], ability: ['민첩', '사악'] },
    { name: "팔콘과 윈터 솔져", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러'], ability: ['민첩', '사악'] }
  ]
},
{
  id: 'Beast',
  name: '비스트',
  portrait: '/images/beast.png',
  uniforms: [
    { name: '클래식', type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['리더'], ability: ['괴력', '민첩'] },
    { name: '에이지 오브 아포칼립스', type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '질서'], role: ['리더'], ability: ['괴력', '민첩'] },
    { name: '언캐니 엑스맨', type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['리더'], ability: ['괴력', '민첩'] },
    { name: '올-뉴 엑스맨', type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '서포터'], ability: ['괴력', '민첩'] },
    { name: "엑스맨 '97", type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '서포터'], ability: ['괴력', '민첩'] }
  ]
},
{
  id: 'Beta Ray Bill',
  name: '베타 레이 빌',
  portrait: '/images/betaraybill.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['전격', '영웅심', '어나이얼레이터'] },
    { name: "베타 레이 빌", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러', '서포터'], ability: ['화염', '영웅심', '어나이얼레이터'] }
  ]
},
{
  id: 'Bishop',
  name: '비숍',
  portrait: '/images/bishop.png',
  uniforms: [
    { name: "디스어셈블드", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['에너지 투사'] },
    { name: "엑스맨 '97", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['에너지 투사'] }
  ]
},
{
  id: 'Black Bolt',
  name: '블랙 볼트',
  portrait: '/images/blackbolt.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인휴먼', '남성', '영웅', '질서'], role: ['리더'], ability: ['고속 이동', '에너지 투사'] },
    { name: "올-뉴, 올-디프런트", type: ['유니버셜', '인휴먼', '남성', '영웅', '질서'], role: ['리더'], ability: ['고속 이동', '에너지 투사'] },
    { name: "인휴먼즈: 아틸란 라이징", type: ['유니버셜', '인휴먼', '남성', '영웅', '질서'], role: ['리더'], ability: ['고속 이동', '에너지 투사'] },
    { name: "마블 X", type: ['유니버셜', '인휴먼', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['고속 이동', '에너지 투사'] },
    { name: "타락한 영혼", type: ['유니버셜', '인휴먼', '남성', '슈퍼 빌런', '질서'], role: ['리더', '딜러'], ability: ['고속 이동', '에너지 투사'] }
  ]
},
{
  id: 'Black Cat',
  name: '블랙 캣',
  portrait: '/images/blackcat.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['민첩'] },
    { name: "클로우즈", type: ['스피드', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['민첩'] },
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['민첩'] },
    { name: "윈터 크리미널", type: ['스피드', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['리더', '서포터'], ability: ['민첩'] }
  ]
},
{
  id: 'Black Dwarf',
  name: '블랙 드워프',
  portrait: '/images/blackdwarf.png',
  uniforms: [
    { name: "인피니티", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: [''], ability: ['괴력', '내구력', '블랙 오더'] },
    { name: "어벤져스: 인피니티 워", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['괴력', '내구력', '블랙 오더'] },
    { name: "다크 옵시디언 아머", type: ['컴뱃', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['괴력', '내구력', '블랙 오더'] }
  ]
},
{
  id: 'Black Knight',
  name: '블랙 나이트',
  portrait: '/images/blackknight.png',
  uniforms: [
    { name: '새비지 어벤져스', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가'] }
  ]
},
{
  id: 'Black Panther',
  name: '블랙 팬서',
  portrait: '/images/blackpanther.png',
  uniforms: [
    { name: '모던', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '지휘'] },
    { name: '캡틴 아메리카: 시빌 워', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '지휘'] },
    { name: "무비: 블랙 팬서", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '지휘'] },
    { name: '3099', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '지휘'] },
    { name: '왕관 없는 왕', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '지휘'] }
  ]
},
{
  id: 'Black Swan',
  name: '블랙 스완',
  portrait: '/images/blackswan.png',
  uniforms: [
    { name: "블랙 오더", type: ['스피드', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['사악', '블랙 오더'] }
  ]
},
{
  id: 'Black Widow',
  name: '블랙 위도우',
  portrait: '/images/blackwidow.png',
  uniforms: [
    { name: "어벤져스", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "어벤져스: 에이지 오브 울트론", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "시크릿 워즈: 2099", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "캡틴 아메리카: 시빌 워", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "어벤져스: 인피니티 워", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "어벤져스: 엔드게임", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "팀 슈트", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "3099", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "무비: 블랙 위도우", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "무비: 블랙 위도우 (스노우 슈트)", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "골드 게이트 비질란테", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "베너머스", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원', '심비오트'] }
  ]
},
{
  id: 'Blade',
  name: '블레이드',
  portrait: '/images/blade.png',
  uniforms: [
    { name: '모던', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: [''], ability: ['치유력', '무기 전문가'] },
    { name: "70년대 클래식", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: [''], ability: ['치유력', '무기 전문가'] },
    { name: '어벤져스', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['치유력', '무기 전문가'] },
    { name: '뱀파이어 슬레이어', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['치유력', '무기 전문가'] }
  ]
},
{
  id: 'Blue Dragon',
  name: '블루 드래곤',
  portrait: '/images/bluedragon.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['워리어즈 오브 더 스카이', '영웅심', '전격'] },
    { name: "달의 신전의 수호자", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['워리어즈 오브 더 스카이', '영웅심', '전격'] }
  ]
},
{
  id: 'Blue Marvel',
  name: '블루 마블',
  portrait: '/images/bluemarvel.png',
  uniforms: [
    { name: "얼티미츠", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '에너지 투사'] },
    { name: "클래식", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '에너지 투사'] },
  ]
},
{
  id: 'Bullseye',
  name: '불스아이',
  portrait: '/images/bullseye.png',
  uniforms: [
    { name: '모던', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: [''], ability: ['무기 전문가', '사악'] },
    { name: '시크릿 워즈: 1872', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: [''], ability: ['무기 전문가', '사악'] },
    { name: '다크 어벤져스', type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['다크 어벤져스', '무기 전문가'] },
    { name: '웨이스트랜더스', type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['무기 전문가', '사악'] }
  ]
},
{
  id: 'Cable',
  name: '케이블',
  portrait: '/images/cable.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '영웅심', '기계'] },
    { name: "엑스 포스", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '영웅심', '기계'] },
    { name: "케이블 & 데드풀", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '영웅심', '기계'] },
    { name: "썸머 데이즈", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '영웅심', '기계'] },
    { name: "X 오브 소드", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['무기 전문가', '영웅심', '기계'] },
    { name: "하트 오브 다크니스", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['무기 전문가', '영웅심', '기계'] }
  ]
},
{
  id: 'Captain America',
  name: '캡틴 아메리카',
  portrait: '/images/captainamerica.png',
  uniforms: [
    { name: '어벤져스', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: [''], ability: ['영웅심', '지휘'] },
    { name: '어벤져스: 에이지 오브 울트론', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '지휘'] },
    { name: '시크릿 워즈: 2099', type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: [''], ability: ['영웅심', '지휘'] },
    { name: '캡틴 아메리카: 윈터 솔져', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '지휘'] },
    { name: '캡틴 아메리카: 시빌 워', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: [''], ability: ['영웅심', '지휘'] },
    { name: '마블 나우!', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '지휘'] },
    { name: '어벤져스: 인피니티 워', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '지휘'] },
    { name: '어벤져스: 엔드게임', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: [''], ability: ['영웅심', '지휘'] },
    { name: '팀 슈트', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '지휘'] },
    { name: '3099', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: [''], ability: ['영웅심', '지휘'] },
    { name: '하이드라 슈프림', type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['지휘', '코스믹 큐브'] },
    { name: '엔터 더 피닉스', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '지휘', '피닉스 포스'] },
    { name: '백 투 베이직', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '지휘'] },
    { name: '왓 이프... 좀비스?!', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '정의'], role: ['딜러'], ability: ['영웅심', '지휘', '좀비'] },
    { name: '용맹스러운 독수리', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '지휘'] }
  ]
},
{
  id: 'Captain Marvel',
  name: '캡틴 마블',
  portrait: '/images/captainmarvel.png',
  uniforms: [
    { name: '모던', type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['고속 이동', '영웅심', '에너지 투사'] },
    { name: '시크릿 워즈: 캡틴 마블 & 캐럴 코어', type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['고속 이동', '영웅심', '에너지 투사'] },
    { name: '미즈 마블', type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['고속 이동', '영웅심', '에너지 투사'] },
    { name: '무비: 캡틴 마블', type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['고속 이동', '영웅심', '에너지 투사'] },
    { name: '어벤져스: 엔드게임', type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['고속 이동', '영웅심', '에너지 투사'] },
    { name: '라스트 어벤져', type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['고속 이동', '영웅심', '에너지 투사'] },
    { name: '더 마블스', type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['고속 이동', '영웅심', '에너지 투사'] },
    { name: '마블 좀비스', type: ['유니버셜', '인간', '여성', '슈퍼 빌런', '정의'], role: ['리더', '딜러'], ability: ['좀비', '영웅심', '에너지 투사'] }
  ]
},
{
  id: 'sharonrogers',
  name: '캡틴 아메리카(샤론 로저스)',
  portrait: '/images/sharonrogers.png',
  uniforms: [
    { name: "캡틴 아메리카 75주년 기념", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '에너지 투사'] },
    { name: "스타 라이트 아머", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '에너지 투사'] },
    { name: "다크 스타 아머", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '에너지 투사'] },
    { name: "스타 나이트 아머", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '에너지 투사'] },
    { name: "빛의 시리우스 아머", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '에너지 투사'] },
    { name: "포세이돈 아머", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '에너지 투사'] },
    { name: "혹한의 전사", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '에너지 투사'] },
  ]
},
{
  id: 'Carnage',
  name: '카니지',
  portrait: '/images/carnage.png',
  uniforms: [
    { name: '올-뉴, 올-디프런트', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '치유력', '심비오트'] },
    { name: '앱솔루트 카니지', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '치유력', '심비오트'] },
    { name: '타락한 영혼', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '치유력', '심비오트'] },
    { name: '슈피리어 카니지', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '치유력', '심비오트'] }
  ]
},
{
  id: 'Cassandra Nova',
  name: '카산드라 노바',
  portrait: '/images/cassandranova.png',
  uniforms: [
    { name: "데드풀과 울버린", type: ['블래스트', '뮤턴트', '여성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['정신', '정신 저항', '사악'] }
  ]
},
{
  id: 'Cassie Lang',
  name: '캐시 랭',
  portrait: '/images/cassielang.png',
  uniforms: [
    { name: "앤트맨과 와스프: 퀀텀매니아", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['서포터'], ability: ['고속 이동', '민첩'] }
  ]
},
{
  id: 'Clea',
  name: '클레아',
  portrait: '/images/clea.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '여성', '영웅', '질서'], role: ['딜러'], ability: ['마법', '고속 이동'] }
  ]
},
{
  id: 'Colossus',
  name: '콜로서스',
  portrait: '/images/colossus.png',
  uniforms: [
    { name: '모던', type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: [''], ability: ['괴력', '영웅심'] },
    { name: '엑스 포스', type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: [''], ability: ['괴력', '영웅심'] },
    { name: '피닉스 파이브', type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '질서'], role: [''], ability: ['괴력', '영웅심', '피닉스 포스'] },
    { name: '헬파이어 갈라', type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: [''], ability: ['괴력', '영웅심'] }
  ]
},
{
  id: 'Corvus Glaive',
  name: '콜버스 그레이브',
  portrait: '/images/corvusglaive.png',
  uniforms: [
    { name: "인피니티", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['민첩', '고속 이동', '블랙 오더'] },
    { name: "어벤져스: 인피니티 워", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['민첩', '고속 이동', '블랙 오더'] },
    { name: "다크 옵시디언 아머", type: ['스피드', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['민첩', '고속 이동', '블랙 오더'] }
  ]
},
{
  id: 'Crescent',
  name: '크레센트',
  portrait: '/images/crescent.png',
  uniforms: [
    { name: '모던', type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['영웅심', '내구력', '괴력'] },
    { name: '라이프스타일 시리즈 1', type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['영웅심', '내구력', '괴력'] },
    { name: '빛의 시리우스 아머', type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['영웅심', '내구력', '괴력'] },
    { name: '비보잉 크루', type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['영웅심', '내구력', '괴력'] }
  ]
},
{
  id: 'Crossbones',
  name: '크로스본즈',
  portrait: '/images/crossbones.png',
  uniforms: [
    { name: '캡틴 아메리카: 시빌 워', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더'], ability: ['무기 전문가'] },
    { name: '모던', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더'], ability: ['무기 전문가'] },
    { name: '시크릿 엠파이어', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러'], ability: ['무기 전문가'] }
  ]
},
{
  id: 'Crystal',
  name: '크리스탈',
  portrait: '/images/crystal.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['블래스트', '인휴먼', '여성', '영웅', '질서'], role: ['리더'], ability: ['지휘', '에너지 투사'] },
    { name: "로열 슈트", type: ['블래스트', '인휴먼', '여성', '영웅', '질서'], role: ['리더'], ability: ['지휘', '에너지 투사'] },
    { name: "판타스틱 4", type: ['블래스트', '인휴먼', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['지휘', '에너지 투사', '판타스틱 4'] },
    { name: "봄의 여인", type: ['블래스트', '인휴먼', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['지휘', '에너지 투사'] },
  ]
},
{
  id: 'Cyclops',
  name: '사이클롭스',
  portrait: '/images/cyclops.png',
  uniforms: [
    { name: "클래식", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '서포터'], ability: ['에너지 투사', '지휘'] },
    { name: "에이지 오브 아포칼립스", type: ['블래스트', '뮤턴트', '남성', '슈퍼 빌런', '질서'], role: ['리더', '서포터'], ability: ['에너지 투사', '지휘'] },
    { name: "마블 나우!", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '서포터'], ability: ['에너지 투사', '지휘'] },
    { name: "피닉스 파이브", type: ['블래스트', '뮤턴트', '남성', '슈퍼 빌런', '질서'], role: ['리더', '딜러', '서포터'], ability: ['에너지 투사', '지휘', '피닉스 포스'] },
    { name: "모던", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '딜러', '서포터'], ability: ['에너지 투사', '지휘'] },
    { name: "엑스맨 '97", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '딜러', '서포터'], ability: ['에너지 투사', '지휘'] }
  ]
},
{
  id: 'Daisy Johnson',
  name: '데이지 존슨',
  portrait: '/images/daisyjohnson.png',
  uniforms: [
    { name: "에이전트 오브 쉴드", type: ['블래스트', '인휴먼', '여성', '영웅', '질서'], role: ['딜러'], ability: ['정신 저항', '요원'] },
    { name: "모던", type: ['블래스트', '인휴먼', '여성', '영웅', '질서'], role: ['딜러'], ability: ['지휘', '요원'] },
    { name: "에이전트 오브 쉴드 (퀘이크)", type: ['블래스트', '인휴먼', '여성', '영웅', '질서'], role: ['딜러'], ability: ['정신 저항', '요원'] }
  ]
},
{
  id: 'Daken',
  name: '다켄',
  portrait: '/images/daken.png',
  uniforms: [
    { name: '모던', type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['무기 전문가', '치유력'] },
    { name: '다크 울버린', type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['무기 전문가', '치유력'] },
  ]
},
{
  id: 'Daredevil',
  name: '데어데블',
  portrait: '/images/daredevil.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['초감각', '디펜더스', '영웅심'] },
    { name: "헬스 키친의 악마", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['초감각', '디펜더스', '영웅심'] },
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['초감각', '디펜더스', '영웅심'] },
    { name: "폴 프롬 그레이스", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['초감각', '디펜더스', '영웅심'] },
    { name: "데어데블: 본 어게인", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['초감각', '디펜더스', '영웅심'] },
  ]
},
{
  id: 'Darkhawk',
  name: '다크호크',
  portrait: '/images/darkhawk.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '고속 이동'] },
  ]
},
{
  id: 'Dazzler',
  name: '대즐러',
  portrait: '/images/dazzler.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['에너지 투사'] },
    { name: "X의 노래", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['에너지 투사'] },
  ]
},
{
  id: 'Deadpool',
  name: '데드풀',
  portrait: '/images/deadpool.png',
  uniforms: [
    { name: "모던", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['치유력', '무기 전문가'] },
    { name: "엑스 포스", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['치유력', '무기 전문가'] },
    { name: "레이디 데드풀", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['치유력', '무기 전문가'] },
    { name: "홀리데이 파티", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['치유력', '무기 전문가'] },
    { name: "30주년 기념 (블랙)", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['치유력', '무기 전문가'] },
    { name: "30주년 기념 (화이트)", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['치유력', '무기 전문가'] },
    { name: "에이프릴 풀", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['치유력', '무기 전문가'] },
    { name: "데드풀과 울버린 (나이스풀)", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['치유력', '무기 전문가'] },
    { name: "데드풀과 울버린 (데드풀)", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['치유력', '무기 전문가'] },
  ]
},
{
  id: 'Deathlok',
  name: '데쓰록',
  portrait: '/images/deathlok.png',
  uniforms: [
    { name: "에이전트 오브 쉴드", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['기계', '요원'] },
    { name: '모던', type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['기계', '요원'] }
  ]
},
{
  id: 'Destroyer',
  name: '디스트로이어',
  portrait: '/images/destroyer.png',
  uniforms: [
    { name: "클래식", type: ['유니버셜', '창조물', '성별 없음', '중립', '파멸'], role: ['딜러'], ability: ['화염', '기계'] },
    { name: "프로메테우스", type: ['유니버셜', '창조물', '성별 없음', '중립', '파멸'], role: ['딜러'], ability: ['에너지 투사', '기계'] },
    { name: "마이티 토르", type: ['유니버셜', '창조물', '성별 없음', '중립', '파멸'], role: ['딜러'], ability: ['에너지 투사', '기계'] }
  ]
},
{
  id: 'Doctor Doom',
  name: '닥터 둠',
  portrait: '/images/doctordoom.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '마법'] },
    { name: "3099", type: ['유니버셜', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '마법'] },
    { name: "갓 엠페러", type: ['유니버셜', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '마법'] }
  ]
},
{
  id: 'Doctor Octopus',
  name: '닥터 옥토퍼스',
  portrait: '/images/doctoroctopus.png',
  uniforms: [
    { name: '클래식', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['기계', '내구력', '시니스터 식스'] },
    { name: '슈피리어 스파이더맨', type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['기계', '스파이더 센스', '민첩'] },
    { name: '슈피리어 옥토퍼스', type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['기계', '민첩', '시니스터 식스'] },
    { name: '스파이더맨: 노 웨이 홈', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['기계', '내구력', '시니스터 식스'] },
    { name: '엔드 오브 디 어스', type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['기계', '내구력', '시니스터 식스'] }
  ]
},
{
  id: 'Doctor Strange',
  name: '닥터 스트레인지',
  portrait: '/images/doctorstrange.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['마법', '고속 이동'] },
    { name: "무비: 닥터 스트레인지", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['마법', '고속 이동'] },
    { name: "어벤져스: 인피니티 워", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['마법', '고속 이동'] },
    { name: "스페이스 슈트", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['마법', '고속 이동'] },
    { name: "닥터 스트레인지: 대혼돈의 멀티버스", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['마법', '고속 이동'] },
    { name: "데스 오브 닥터 스트레인지", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['마법', '고속 이동'] },
    { name: "왓 이프... 좀비스?!", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '정의'], role: ['리더', '딜러'], ability: ['마법', '고속 이동', '좀비'] }
  ]
},
{
  id: 'Doctor Voodoo',
  name: '닥터 부두',
  portrait: '/images/doctorvoodoo.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: [''], ability: ['마법', '지휘'] },
    { name: "스트레인지 아카데미", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['마법', '지휘'] },
    { name: "새비지 어벤져스", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['마법', '지휘'] }
  ]
},
{
  id: 'Domino',
  name: '도미노',
  portrait: '/images/domino.png',
  uniforms: [
    { name: "엑스 포스", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: [''], ability: ['민첩', '무기 전문가'] },
    { name: "마블 나우!", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: [''], ability: ['민첩', '무기 전문가'] },
    { name: "크라코아 엑스 포스", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: [''], ability: ['민첩', '무기 전문가'] }
  ]
},
{
  id: 'Dormammu',
  name: '도르마무',
  portrait: '/images/dormammu.png',
  uniforms: [
    { name: "클래식", type: ['유니버셜', '불명', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['마법', '사악'] },
    { name: "댐네이션", type: ['유니버셜', '불명', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['마법', '사악'] }
  ]
},
{
  id: 'Drax',
  name: '드랙스',
  portrait: '/images/drax.png',
  uniforms: [
    { name: "가디언즈 오브 갤럭시", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: [''], ability: ['치유력'] },
    { name: "올-뉴, 올-디프런트", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: [''], ability: ['치유력'] },
    { name: "클래식", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: [''], ability: ['치유력'] }
  ]
},
{
  id: 'Ebony Maw',
  name: '에보니 모',
  portrait: '/images/ebonymaw.png',
  uniforms: [
    { name: "인피니티", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더'], ability: ['사악', '정신 저항', '블랙 오더'] },
    { name: "어벤져스: 인피니티 워", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러', '서포터'], ability: ['사악', '정신 저항', '블랙 오더'] },
    { name: "다크 옵시디언 아머", type: ['블래스트', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러', '서포터'], ability: ['사악', '정신 저항', '블랙 오더'] },
    { name: "장군의 오른팔", type: ['블래스트', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러', '서포터'], ability: ['사악', '정신 저항', '블랙 오더'] }
  ]
},
{
  id: 'Echo',
  name: '에코',
  portrait: '/images/echo.png',
  uniforms: [
    { name: "엔터 더 피닉스", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['피닉스 포스', '민첩'] },
    { name: "호크아이", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러', '서포터'], ability: ['민첩'] },
    { name: "에코", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러', '서포터'], ability: ['민첩'] }
  ]
},
{
  id: 'Electro',
  name: '일렉트로',
  portrait: '/images/electro.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러'], ability: ['사악', '전격', '시니스터 식스'] },
    { name: "스파이더맨: 노 웨이 홈", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러'], ability: ['사악', '전격', '시니스터 식스'] }
  ]
},
{
  id: 'Elektra',
  name: '엘렉트라',
  portrait: '/images/elektra.png',
  uniforms: [
    { name: "클래식", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가'] },
    { name: "마블 데어데블", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가'] },
    { name: "두려움이 없는 여자", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가'] },
    { name: "엘렉트라", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가'] }
  ]
},
{
  id: 'Elsa Bloodstone',
  name: '엘사 블러드스톤',
  portrait: '/images/elsabloodstone.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['무기 전문가'] },
    { name: "시크릿 워즈: 마블 좀비스", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['무기 전문가'] },
    { name: "몬스터즈 언리쉬드! (MFF 배리언트)", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['무기 전문가'] }
  ]
},
{
  id: 'Emma Frost',
  name: '엠마 프로스트',
  portrait: '/images/emmafrost.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['정신 저항', '내구력'] },
    { name: "마블 나우!", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['정신 저항', '내구력'] },
    { name: "피닉스 파이브", type: ['블래스트', '뮤턴트', '여성', '슈퍼 빌런', '질서'], role: ['딜러'], ability: ['정신 저항', '내구력', '피닉스 포스'] },
    { name: "헬파이어 갈라", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['정신 저항', '내구력'] },
    { name: "썸머 퀸", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['정신 저항', '내구력'] }
  ]
},
{
  id: 'Enchantress',
  name: '인챈트리스',
  portrait: '/images/enchantress.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '외계인', '여성', '슈퍼 빌런', '파멸'], role: [''], ability: ['마법', '정신'] },
    { name: "썸머 데이즈", type: ['블래스트', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['딜러', '서포터'], ability: ['마법', '정신'] },
    { name: "워 오브 렐름", type: ['블래스트', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['딜러', '서포터'], ability: ['마법', '정신'] }
  ]
},
{
  id: 'Exodus',
  name: '엑소더스',
  portrait: '/images/exodus.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '서포터'], ability: ['에너지 투사', '지휘'] }
  ]
},
{
  id: 'Falcon',
  name: '팔콘',
  portrait: '/images/falcon.png',
  uniforms: [
    { name: "캡틴 아메리카: 윈터 솔져", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['고속 이동', '영웅심'] },
    { name: "올-뉴 캡틴 아메리카", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['고속 이동', '영웅심'] },
    { name: "캡틴 아메리카: 시빌 워", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['고속 이동', '영웅심'] },
    { name: "마블 레거시", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['고속 이동', '영웅심'] },
    { name: "팔콘과 윈터 솔져", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['고속 이동', '영웅심', '지휘'] },
    { name: "왓 이프... 좀비스?!", type: ['스피드', '인간', '남성', '슈퍼 빌런', '정의'], role: ['딜러', '서포터'], ability: ['고속 이동', '영웅심', '좀비'] },
    { name: "캡틴 아메리카: 브레이브 뉴 월드", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['고속 이동', '영웅심', '지휘'] }
  ]
},
{
  id: 'Joaquin Torres',
  name: '팔콘 (호아킨 토레스)',
  portrait: '/images/joaquintorres.png',
  uniforms: [
    { name: "캡틴 아메리카: 브레이브 뉴 월드", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['서포터'], ability: ['고속 이동', '영웅심'] }
  ]
},
{
  id: 'Fandral',
  name: '팬드럴',
  portrait: '/images/fandral.png',
  uniforms: [
    { name: "모던", type: ['스피드', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['민첩'] }
  ]
},
{
  id: 'Fantomex',
  name: '판토멕스',
  portrait: '/images/fantomex.png',
  uniforms: [
    { name: "엑스 포스", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '무기 전문가'] }
  ]
},
{
  id: 'Franklin Richards',
  name: '프랭클린 리처즈',
  portrait: '/images/franklinrichards.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['에너지 투사', '정신', '판타스틱 4'] }
  ]
},
{
  id: 'Gambit',
  name: '갬빗',
  portrait: '/images/gambit.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '정신'] },
    { name: "엑스칼리버", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '정신'] },
    { name: "엑스맨 송년기념회", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '정신'] }
  ]
},
{
  id: 'Gamora',
  name: '가모라',
  portrait: '/images/gamora.png',
  uniforms: [
    { name: "가디언즈 오브 갤럭시", type: ['스피드', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '무기 전문가'] },
    { name: "올-뉴, 올-디프런트", type: ['스피드', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '무기 전문가'] },
    { name: "가디언즈 오브 갤럭시 2", type: ['스피드', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '무기 전문가'] },
    { name: "레퀴엠", type: ['스피드', '외계인', '여성', '슈퍼 빌런', '질서'], role: ['리더', '딜러'], ability: ['민첩', '무기 전문가'] },
    { name: "가디언즈 오브 갤럭시: Volume 3", type: ['스피드', '외계인', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['민첩', '무기 전문가', '가디언즈 오브 갤럭시'] },
    { name: "웨이스트랜더스", type: ['스피드', '외계인', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['민첩', '무기 전문가', '가디언즈 오브 갤럭시'] },
  ]
},
{
  id: 'Ghost',
  name: '고스트',
  portrait: '/images/ghost.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '서포터'], ability: ['무기 전문가', '기계'] },
    { name: "무비: 앤트맨과 와스프", type: ['스피드', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['리더', '서포터'], ability: ['무기 전문가', '기계'] },
    { name: "썬더볼츠*", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '서포터'], ability: ['무기 전문가', '기계', '썬더볼츠'] }
  ]
},
{
  id: 'Ghost Panther',
  name: '고스트 팬서',
  portrait: '/images/ghostpanther.png',
  uniforms: [
    { name: "인피니티 워프", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['민첩', '화염', '인피니티 워프'] }
  ]
},
{
  id: 'Ghost Rider',
  name: '고스트 라이더',
  portrait: '/images/ghostrider.png',
  uniforms: [
    { name: "클래식", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '화염'] },
    { name: "70년대 클래식", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '화염'] },
    { name: "인휴먼즈: 아틸란 라이징", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '화염'] },
    { name: "킹 오브 헬", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '화염'] },
    { name: "레이지 리턴드", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '화염'] },
    { name: "새비지 어벤져스", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '화염'] }
  ]
},
{
  id: 'Robbie Reyes',
  name: '고스트 라이더 (로비 레예스)',
  portrait: '/images/robbiereyes.png',
  uniforms: [
    { name: "마블 나우!", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['고속 이동', '화염'] },
    { name: "복수의 군주", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러', '서포터'], ability: ['고속 이동', '화염'] }
  ]
},
{
  id: 'GiantMan',
  name: '자이언트맨',
  portrait: '/images/giantman.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: [''], ability: ['괴력'] },
    { name: "모던 (골리앗)", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: [''], ability: ['괴력'] },
    { name: "울트론 핌", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '정의'], role: ['딜러'], ability: ['괴력'] }
  ]
},
{
  id: 'Gilgamesh',
  name: '길가메시',
  portrait: '/images/gilgamesh.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['괴력', '이터널스'] },
    { name: "이터널스", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['괴력', '이터널스'] }
  ]
},
{
  id: 'Gladiator',
  name: '글래디에이터',
  portrait: '/images/gladiator.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['어나이얼레이터', '괴력', '영웅심'] },
    { name: "타노스: 인피니티 레벨레이션", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['어나이얼레이터', '괴력', '영웅심'] }
  ]
},
{
  id: 'Goliath',
  name: '골리앗',
  portrait: '/images/goliath.png',
  uniforms: [
    { name: "클래식", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['괴력', '내구력'] }
  ]
},
{
  id: 'Gorgon',
  name: '고르곤',
  portrait: '/images/gorgon.png',
  uniforms: [
    { name: "워 오브 킹즈", type: ['컴뱃', '인휴먼', '남성', '영웅', '질서'], role: ['리더'], ability: ['괴력'] }
  ]
},
{
  id: 'GorillaMan',
  name: '고릴라맨',
  portrait: '/images/gorillaman.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['괴력', '민첩', '무기 전문가'] }
  ]
},
{
  id: 'Gorr',
  name: '고르',
  portrait: '/images/gorr.png',
  uniforms: [
    { name: "토르: 러브 앤 썬더", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'],  role: ['딜러'], ability: ['치유력', '사악', '고속 이동'] },
    { name: "신 도살자", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['치유력', '사악', '심비오트'] }
  ]
},
{
  id: 'Green Goblin',
  name: '그린 고블린',
  portrait: '/images/greengoblin.png',
  uniforms: [
    { name: "클래식", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['독', '고속 이동', '시니스터 식스'] },
    { name: "얼티밋", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['화염', '고속 이동', '시니스터 식스'] },
    { name: "다크 어벤져스", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러', '서포터'], ability: ['다크 어벤져스', '기계', '에너지 투사'] },
    { name: "스파이더맨: 노 웨이 홈", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러', '서포터'], ability: ['독', '고속 이동', '시니스터 식스'] },
    { name: "레드 고블린", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러', '서포터'], ability: ['화염', '고속 이동', '시니스터 식스'] }
  ]
},
{
  id: 'Groot',
  name: '그루트',
  portrait: '/images/groot.png',
  uniforms: [
    { name: "가디언즈 오브 갤럭시", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: [''], ability: ['치유력'] },
    { name: "시크릿 워즈: 토르즈", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: [''], ability: ['치유력'] },
    { name: "가디언즈 오브 갤럭시 2", type: ['스피드', '외계인', '남성', '영웅', '질서'], role: [''], ability: ['치유력'] },
    { name: "어벤져스: 인피니티 워", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['치유력'] },
    { name: "눈꽃 축제", type: ['스피드', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['치유력'] },
    { name: "가디언즈 오브 갤럭시: Volume 3", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['치유력', '가디언즈 오브 갤럭시'] },
    { name: "플래닛 X의 야자수", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['치유력', '가디언즈 오브 갤럭시'] }
  ]
},
{
  id: 'Gwenpool',
  name: '그웬풀',
  portrait: '/images/gwenpool.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] },
    { name: "그웬 풀", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] },
    { name: "홀리데이 파티", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] },
    { name: "에이프릴 풀", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] },
    { name: "다크 그웬풀", type: ['스피드', '인간', '여성', '슈퍼 빌런', '정의'], role: ['딜러'], ability: ['민첩'] },
  ]
},
{
  id: 'Hades',
  name: '하데스 (플루토)',
  portrait: '/images/hades.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['화염', '사악', '올림포스'] }
  ]
},
{
  id: 'Havok',
  name: '하복',
  portrait: '/images/havok.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['에너지 투사'] }
  ]
},
{
  id: 'Hawkeye',
  name: '호크아이',
  portrait: '/images/hawkeye.png',
  uniforms: [
    { name: "어벤져스", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가', '요원'] },
    { name: "어벤져스: 에이지 오브 울트론", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가', '요원'] },
    { name: "캡틴 아메리카: 시빌 워", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가', '요원'] },
    { name: "클래식", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가', '요원'] },
    { name: "어벤져스: 엔드게임", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가', '요원'] },
    { name: "호크아이 (영웅 슈트)", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가', '요원'] },
    { name: "웨이스트랜더스", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가', '요원'] },
  ]
},
{
  id: 'Kate Bishop',
  name: '호크아이 (케이트 비숍)',
  portrait: '/images/katebishop.png',
  uniforms: [
    { name: "마블 나우!", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "호크아이", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "영 어벤져스", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원', '영 어벤져스'] }
  ]
},
{
  id: 'Heimdall',
  name: '헤임달',
  portrait: '/images/heimdall.png',
  uniforms: [
    { name: "토르: 라그나로크", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['괴력'] },
    { name: "아스가르드 침공", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['괴력', '영웅심'] }
  ]
},
{
  id: 'Hela',
  name: '헬라',
  portrait: '/images/hela.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['리더'], ability: ['지휘', '사악'] },
    { name: "토르: 라그나로크", type: ['유니버셜', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['리더', '서포터'], ability: ['지휘', '사악'] },
    { name: "아스가르드 침공", type: ['유니버셜', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러', '서포터'], ability: ['지휘', '사악'] },
    { name: "왓 이프...?", type: ['유니버셜', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러', '서포터'], ability: ['지휘', '사악'] }
  ]
},
{
  id: 'Hellcat',
  name: '헬캣',
  portrait: '/images/hellcat.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] }
  ]
},
{
  id: 'Hellstorm',
  name: '헬스톰',
  portrait: '/images/hellstorm.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['마법', '화염'] },
    { name: "TVA", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['마법', '화염'] }
  ]
},
{
  id: 'Hercules',
  name: '헤라클레스',
  portrait: '/images/hercules.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['괴력', '영웅심', '올림포스'] }
  ]
},
{
  id: 'Hogun',
  name: '호건',
  portrait: '/images/hogun.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: ['리더'], ability: ['괴력'] }
  ]
},
{
  id: 'Hope Summers',
  name: '호프 서머스',
  portrait: '/images/hopesummers.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '뮤턴트', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['피닉스 포스', '괴력'] }
  ]
},
{
  id: 'Human Torch',
  name: '휴먼 토치',
  portrait: '/images/humantorch.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['화염', '고속 이동', '판타스틱 4'] },
    { name: "퓨처 파운데이션", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['화염', '고속 이동', '판타스틱 4'] },
    { name: "클래식", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['화염', '고속 이동', '판타스틱 4'] },
    { name: "판타스틱 4의 몰락", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['화염', '고속 이동', '판타스틱 4'] },
    { name: "판타스틱 4: 새로운 출발", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['화염', '고속 이동', '판타스틱 4'] }
  ]
},
{
  id: 'Hulk',
  name: '헐크',
  portrait: '/images/hulk.png',
  uniforms: [
    { name: "어벤져스", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['감마선', '내구력'] },
    { name: "시크릿 워즈: 퓨처 임퍼펙트", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '정의'], role: ['리더'], ability: ['감마선', '내구력'] },
    { name: "월드 워 헐크", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '정의'], role: ['리더'], ability: ['감마선', '내구력'] },
    { name: "토르: 라그나로크", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['감마선', '내구력'] },
    { name: "어벤져스: 엔드게임", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['감마선', '내구력'] },
    { name: "팀 슈트", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['감마선', '내구력'] },
    { name: "이모탈 헐크", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '정의'], role: ['딜러'], ability: ['감마선', '내구력'] },
    { name: "피어 잇셀프", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '정의'], role: ['딜러'], ability: ['감마선', '내구력'] },
    { name: "타이탄", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '정의'], role: ['딜러'], ability: ['감마선', '내구력'] }
  ]
},
{
  id: 'Amadeus Cho',
  name: '헐크 (아마데우스 조)',
  portrait: '/images/amadeuscho.png',
  uniforms: [
    { name: "토탈리 어썸 헐크", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['감마선', '내구력'] },
    { name: "몬스터즈 언리쉬드! (MFF 배리언트)", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['감마선', '내구력'] },
    { name: "브론", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['감마선', '내구력'] },
    { name: "히로익 에이지", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['서포터'], ability: ['감마선', '내구력'] }
  ]
},
{
  id: 'Hulkbuster',
  name: '헐크버스터(아이언맨 마크 44)',
  portrait: '/images/hulkbuster.png',
  uniforms: [
    { name: "어벤져스: 에이지 오브 울트론", type: ['컴뱃', '창조물', '남성', '영웅', '질서'], role: ['리더'], ability: ['괴력', '기계'] },
    { name: "헤비 듀티 아머", type: ['컴뱃', '창조물', '남성', '영웅', '질서'], role: ['리더'], ability: ['괴력', '기계'] },
    { name: "어벤져스: 인피니티 워", type: ['컴뱃', '창조물', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['괴력', '기계'] },
    { name: "3099", type: ['컴뱃', '창조물', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['괴력', '기계'] },
    { name: "셀레스티얼 헐크버스터", type: ['컴뱃', '창조물', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['괴력', '기계'] }
  ]
},
{
  id: 'Hulkling',
  name: '헐클링',
  portrait: '/images/hulkling.png',
  uniforms: [
    { name: "뉴 어벤져스", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['괴력', '내구력'] }
  ]
},
{
  id: 'HydroMan',
  name: '하이드로맨',
  portrait: '/images/hydroman.png',
  uniforms: [
    { name: "스파이더맨: 파 프롬 홈", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악'] }
  ]
},
{
  id: 'Hyperion',
  name: '하이페리온',
  portrait: '/images/hyperion.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['영웅심', '에너지 투사', '이터널스'] },
    { name: "클래식", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['영웅심', '에너지 투사', '이터널스'] },
    { name: "엔터 더 피닉스", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['영웅심', '이터널스', '피닉스 포스'] }
  ]
},
{
  id: 'Iceman',
  name: '아이스맨',
  portrait: '/images/iceman.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['냉기', '냉혈'] },
    { name: "엑스맨 블루", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['냉기', '냉혈'] },
    { name: "크리코아의 여름", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['냉기', '냉혈'] }
  ]
},
{
  id: 'Ikaris',
  name: '이카리스',
  portrait: '/images/ikaris.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['에너지 투사', '영웅심', '이터널스'] },
    { name: "이터널스", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['에너지 투사', '영웅심', '이터널스'] }
  ]
},
{
  id: 'Ikon',
  name: '아이콘',
  portrait: '/images/ikon.png',
  uniforms: [
    { name: "모던", type: ['스피드', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '에너지 투사', '어나이얼레이터'] }
  ]
},
{
  id: 'Inferno',
  name: '인페르노',
  portrait: '/images/inferno.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['블래스트', '인휴먼', '남성', '영웅', '질서'], role: ['딜러'], ability: ['화염'] },
    { name: "모던", type: ['블래스트', '인휴먼', '남성', '영웅', '질서'], role: ['딜러'], ability: ['화염'] }
  ]
},
{
  id: 'Invisible Woman',
  name: '인비저블 우먼',
  portrait: '/images/invisiblewoman.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['에너지 투사', '판타스틱 4'] },
    { name: "퓨처 파운데이션", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['에너지 투사', '판타스틱 4'] },
    { name: "클래식", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['에너지 투사', '판타스틱 4'] },
    { name: "판타스틱 4의 몰락", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['에너지 투사', '판타스틱 4'] },
    { name: "판타스틱 4: 새로운 출발", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['에너지 투사', '판타스틱 4'] }
  ]
  },
{
  id: 'Iron Fist',
  name: '아이언 피스트',
  portrait: '/images/ironfist.png',
  uniforms: [
    { name: "클래식", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '치유력', '디펜더스'] },
    { name: "뉴 어벤져스", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '치유력', '디펜더스'] },
    { name: "올-뉴, 올-디프런트", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '치유력', '디펜더스'] },
    { name: "마블 아이언 피스트", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '치유력', '디펜더스'] },
    { name: "살아있는 무기", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['민첩', '치유력', '디펜더스'] }
  ]
},
{
  id: 'Iron Hammer',
  name: '아이언 해머',
  portrait: '/images/ironhammer.png',
  uniforms: [
    { name: "인피니티 워프", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['리더'], ability: ['기계', '전격', '인피니티 워프'] }
  ]
},
{
  id: 'Iron Man',
  name: '아이언맨',
  portrait: '/images/ironman.png',
  uniforms: [
    { name: "클래식", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['기계', '에너지 투사'] },
    { name: "어벤져스: 에이지 오브 울트론", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['기계', '에너지 투사'] },
    { name: "시크릿 워즈: 2099", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['기계', '에너지 투사'] },
    { name: "캡틴 아메리카: 시빌 워", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['기계', '에너지 투사'] },
    { name: "어벤져스: 인피니티 워", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['기계', '에너지 투사'] },
    { name: "어벤져스: 엔드게임", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['기계', '에너지 투사'] },
    { name: "팀 슈트", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['기계', '에너지 투사'] },
    { name: "3099", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['기계', '에너지 투사'] },
    { name: "슈퍼리어 아이언맨", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '정의'], role: ['딜러'], ability: ['기계', '에너지 투사'] },
    { name: "백 투 베이직", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['기계', '에너지 투사'] },
    { name: "모델 닐", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['기계', '에너지 투사'] }
  ]
},
{
  id: 'Ironheart',
  name: '아이언하트',
  portrait: '/images/ironheart.png',
  uniforms: [
    { name: "마블 나우!", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['기계', '에너지 투사'] },
    { name: "블랙 팬서: 와칸다 포에버", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['기계', '에너지 투사'] },
    { name: "아이언하트", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['기계', '에너지 투사'] }
  ]
},
{
  id: 'Jean Grey',
  name: '진 그레이',
  portrait: '/images/jeangrey.png',
  uniforms: [
    { name: "피닉스", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['정신', '정신 저항', '피닉스 포스'] },
    { name: "엑스맨 레드", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['정신', '정신 저항', '피닉스 포스'] },
    { name: "마블 걸", type: ['유니버셜', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['정신', '정신 저항', '피닉스 포스'] },
    { name: "다크 피닉스", type: ['유니버셜', '뮤턴트', '여성', '슈퍼 빌런', '질서'], role: ['딜러'], ability: ['정신', '정신 저항', '피닉스 포스'] }
  ]
},
{
  id: 'Jeff the Land Shark',
  name: '땅상어 제프',
  portrait: '/images/jeffthelandshark.png',
  uniforms: [
    { name: "마블 라이벌즈", type: ['블래스트', '창조물', '남성', '영웅', '질서'], role: ['서포터'], ability: ['민첩', '치유력'] }
  ]
},
{
  id: 'Jessica Jones',
  name: '제시카 존스',
  portrait: '/images/jessicajones.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: [''], ability: ['괴력', '내구력', '디펜더스'] },
    { name: "쥬얼", type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['괴력', '내구력', '디펜더스'] }
  ]
},
{
  id: 'Jubilee',
  name: '주빌리',
  portrait: '/images/jubilee.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['에너지 투사'] }
  ]
},
{
  id: 'Juggernaut',
  name: '저거너트',
  portrait: '/images/juggernaut.png',
  uniforms: [
    { name: "브라더후드 오브 뮤턴츠", type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['괴력', '내구력', '사악'] },
    { name: "피어 잇셀프", type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['괴력', '내구력', '사악'] },
    { name: "새비지 어벤져스", type: ['컴뱃', '뮤턴트', '남성', '영웅', '파멸'], role: ['딜러'], ability: ['괴력', '내구력', '사악'] }
  ]
},
{
  id: 'Kaecilius',
  name: '케실리우스',
  portrait: '/images/kaecilius.png',
  uniforms: [
    { name: "무비: 닥터 스트레인지", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['마법', '민첩'] }
  ]
},
{
  id: 'Kahhori',
  name: '카호리',
  portrait: '/images/kahhori.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['에너지 투사', '고속 이동', '코스믹 큐브'] }
  ]
},
{
  id: 'Kang',
  name: '정복자 캉',
  portrait: '/images/kang.png',
  uniforms: [
    { name: "엔트맨과 와스프: 퀀텀매니아", type: ['유니버셜', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '고속 이동'] },
    { name: "라마투트", type: ['유니버셜', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '고속 이동'] }
  ]
},
{
  id: 'Karnak',
  name: '카르낙',
  portrait: '/images/karnak.png',
  uniforms: [
    { name: "워 오브 킹즈", type: ['스피드', '인휴먼', '남성', '영웅', '질서'], role: ['딜러'], ability: ['초감각'] },
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '남성', '영웅', '질서'], role: ['딜러'], ability: ['초감각'] }
  ]
},
{
  id: 'Katy',
  name: '케이티',
  portrait: '/images/katy.png',
  uniforms: [
    { name: "샹치와 텐 링즈의 전설", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러', '서포터'], ability: ['무기 전문가', '민첩'] }
  ]
},
{
  id: 'Kid Kaiju',
  name: '키드 카이쥬',
  portrait: '/images/kidkaiju.png',
  uniforms: [
    { name: "몬스터즈 언리쉬드! (MFF 배리언트)", type: ['스피드', '인휴먼', '남성', '영웅', '질서'], role: ['리더'], ability: ['지휘'] },
    { name: "몬스터즈 언리쉬드! (MFF 배리언트)", type: ['스피드', '인휴먼', '남성', '영웅', '질서'], role: ['리더'], ability: ['지휘'] }
  ]
},
{
  id: 'Kid Omega',
  name: '키드 오메가',
  portrait: '/images/kidomega.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['리더'], ability: ['피닉스 포스', '에너지 투사'] },
    { name: "언캐니 엑스맨", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['피닉스 포스', '에너지 투사'] }
  ]
},
{
  id: 'Killmonger',
  name: '킬몽거',
  portrait: '/images/killmonger.png',
  uniforms: [
    { name: "클래식", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['괴력', '지휘'] },
    { name: "무비: 블랙 팬서", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['괴력', '지휘'] }
  ]
},
{
  id: 'Kingo',
  name: '킨고',
  portrait: '/images/kingo.png',
  uniforms: [
    { name: "모던", type: ['스피드', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['이터널스', '영웅심', '에너지 투사'] },
    { name: "이터널스", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['이터널스', '영웅심', '에너지 투사'] }
  ]
},
{
  id: 'Kingpin',
  name: '킹핀',
  portrait: '/images/kingpin.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: [''], ability: ['괴력', '지휘'] },
    { name: "시크릿 워즈: 아머 워즈", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: [''], ability: ['괴력', '지휘', '기계'] },
    { name: "윈터 크리미널", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러'], ability: ['괴력', '지휘'] },
    { name: "데어데블: 본 어게인", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러'], ability: ['괴력', '지휘'] }
  ]
},
{
  id: 'Kitty Pryde',
  name: '키티 프라이드',
  portrait: '/images/kittypryde.png',
  uniforms: [
    { name: "모던", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: ['리더'], ability: ['지휘', '무기 전문가'] },
    { name: "레드 퀸", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: ['리더'], ability: ['지휘', '무기 전문가'] }
  ]
},
{
  id: 'Knull',
  name: '널',
  portrait: '/images/knull.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['심비오트', '괴력', '사악'] },
    { name: "에인션트 히스토리", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['심비오트', '괴력', '사악'] }
  ]
},
{
  id: 'korath',
  name: '코라스',
  portrait: '/images/korath.png',
  uniforms: [
    {name: "무비: 캡틴 마블", type: ['스피드', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['무기 전문가', '사악']}
  ]
},
{
  id: 'Kraven the Hunter',
  name: '크레이븐',
  portrait: '/images/kraventhehunter.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['무기 전문가', '민첩', '시니스터 식스'] },
    { name: "이차원의 사냥꾼", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['서포터'], ability: ['무기 전문가', '민첩', '시니스터 식스'] }
  ]
},
{
  id: 'Lash',
  name: '래쉬',
  portrait: '/images/lash.png',
  uniforms: [
    { name: "에이전트 오브 쉴드", type: ['블래스트', '인휴먼', '남성', '슈퍼 빌런', '파멸'], role: ['리더'], ability: ['에너지 투사'] },
    { name: "모던", type: ['블래스트', '인휴먼', '남성', '슈퍼 빌런', '파멸'], role: ['리더'], ability: ['에너지 투사'] }
  ]
},
{
  id: 'Leader',
  name: '리더',
  portrait: '/images/leader.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '서포터'], ability: ['정신 저항', '사악'] }
  ]
},
{
  id: 'Lincoln Campbell',
  name: '링컨 캠벨',
  portrait: '/images/lincolncampbell.png',
  uniforms: [
    { name: "에이전트 오브 쉴드", type: ['블래스트', '인휴먼', '남성', '영웅', '질서'], role: ['리더'], ability: ['전격'] }
  ]
},
{
  id: 'Lizard',
  name: '리자드',
  portrait: '/images/lizard.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더'], ability: ['치유력', '시니스터 식스'] }
  ]
},
{
  id: 'Loki',
  name: '로키',
  portrait: '/images/loki.png',
  uniforms: [
    { name: "어벤져스", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['정신', '냉기'] },
    { name: "레이디 로키", type: ['유니버셜', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['정신', '냉기'] },
    { name: "토르: 라그나로크", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['정신', '냉기'] },
    { name: "클래식", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['정신', '냉기'] },
    { name: "아스가르드의 요원", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['정신', '냉기'] },
    { name: "로키 (TVA 슈트)", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['정신', '냉기'] },
    { name: "로키 (대통령 로키)", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['정신', '냉기'] },
    { name: "로키", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['정신', '냉기'] },
    { name: "영 어벤져스", type: ['유니버셜', '외계인', '남성', '영웅', '파멸'], role: ['딜러', '서포터'], ability: ['정신', '냉기', '영 어벤져스'] }
  ]
},
{
  id: 'Luke Cage',
  name: '루크 케이지',
  portrait: '/images/lukecage.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: [''], ability: ['괴력', '내구력', '디펜더스'] },
    { name: "올-뉴, 올-디프런트", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: [''], ability: ['괴력', '내구력', '디펜더스'] },
    { name: "마블 루크 케이지", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['괴력', '내구력', '디펜더스'] },
    { name: "업타운 슈트", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러', '서포터'], ability: ['괴력', '내구력', '디펜더스'] }
  ]
},
{
  id: 'Luna Snow',
  name: '루나 스노우',
  portrait: '/images/lunasnow.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '냉혈'] },
    { name: "안드로메다 수트", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '냉혈'] },
    { name: "라이프스타일 시리즈 1", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '냉혈'] },
    { name: "빛의 시리우스 아머", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '냉혈'] },
    { name: "썸머 라일락", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '냉혈'] },
    { name: "미래 2099", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '냉혈'] }
  ]
},
{
  id: "MBaku",
  name: "음바쿠",
  portrait: "/images/mbaku.png",
  uniforms: [
    { name: "블랙 팬서: 와칸다 포에버", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['영웅심', '괴력'] }
  ]
},
{
  id: 'modok',
  name: 'M.O.D.O.K.',
  portrait: '/images/modok.png',
  uniforms: [
    { name: "클래식", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더'], ability: ['정신', '기계', '사악'] },
    { name: "스파이독", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더'], ability: ['정신', '기계', '사악'] },
    { name: "캡독", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더'], ability: ['정신', '기계', '사악'] },
    { name: "앤트맨과 와스프: 퀀텀매니아", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더'], ability: ['정신', '기계', '사악'] }
  ]
},
{
  id: 'Madelyne Pryor',
  name: '매들린 프라이어',
  portrait: '/images/madelynepryor.png',
  uniforms: [
    { name: "고블린 퀸", type: ['블래스트', '뮤턴트', '여성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['정신', '정신 저항'] },
    { name: "겨울 여왕", type: ['블래스트', '뮤턴트', '여성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['냉기', '정신 저항'] }
  ]
},
{
  id: 'Magik',
  name: '매직',
  portrait: '/images/magik.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['마법', '정신 저항'] },
    { name: "피닉스 파이브", type: ['블래스트', '뮤턴트', '여성', '슈퍼 빌런', '질서'], role: ['딜러'], ability: ['마법', '정신 저항', '피닉스 포스'] },
    { name: "크라코아의 겨울", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['마법', '정신 저항'] },
    { name: "마블 라이벌즈", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['마법', '정신 저항'] }
  ]
},
{
  id: 'Magneto',
  name: '매그니토',
  portrait: '/images/magneto.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['리더'], ability: ['에너지 투사', '정신 저항'] },
    { name: "마블 나우!", type: ['블래스트', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['리더'], ability: ['에너지 투사', '정신 저항'] },
    { name: "하우스 오브 X", type: ['블래스트', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['에너지 투사', '정신 저항'] },
    { name: "크라코아의 겨울", type: ['블래스트', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['에너지 투사', '정신 저항'] }
  ]
},
{
  id: 'Makkari',
  name: '마카리',
  portrait: '/images/makkari.png',
  uniforms: [
    { name: "모던", type: ['스피드', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['이터널스', '영웅심', '고속 이동'] },
    { name: "이터널스", type: ['스피드', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['이터널스', '영웅심', '고속 이동'] }
  ]
},
{
  id: 'Malekith',
  name: '말레키스',
  portrait: '/images/malekith.png',
  uniforms: [
    { name: "토르: 더 다크 월드", type: ['블래스트', '외계인', '남성', '슈퍼 빌런', '파멸'], role: [''], ability: ['사악'] },
    { name: "올-뉴, 올-디프런트", type: ['블래스트', '외계인', '남성', '슈퍼 빌런', '파멸'], role: [''], ability: ['사악'] },
    { name: "워 오브 렐름", type: ['블래스트', '외계인', '남성', '슈퍼 빌런', '파멸'], role: [''], ability: ['사악', '심비오트'] }
  ]
},
{
  id: 'ManThing',
  name: '맨-씽',
  portrait: '/images/manthing.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['괴력', '치유력', '마법'] }
  ]
},
{
  id: 'Mantis',
  name: '맨티스',
  portrait: '/images/mantis.png',
  uniforms: [
    { name: "가디언즈 오브 갤럭시 2", type: ['블래스트', '외계인', '여성', '영웅', '질서'], role: [''], ability: ['정신', '치유력'] },
    { name: "가디언즈 오브 갤럭시: Volume 3", type: ['블래스트', '외계인', '여성', '영웅', '질서'], role: [''], ability: ['정신', '치유력', '가디언즈 오브 갤럭시'] }
  ]
},
{
  id: 'Marvel Boy',
  name: '마블 보이',
  portrait: '/images/marvelboy.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['고속 이동', '영 어벤져스'] }
  ]
},
{
  id: 'Maximus',
  name: '막시무스',
  portrait: '/images/maximus.png',
  uniforms: [
    { name: "워 오브 킹즈", type: ['블래스트', '인휴먼', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['정신 저항', '사악'] }
  ]
},
{
  id: 'Medusa',
  name: '메두사',
  portrait: '/images/medusa.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['유니버셜', '인휴먼', '여성', '영웅', '질서'], role: ['리더'], ability: ['지휘'] },
    { name: "몬스터즈 언리쉬드! (MFF 배리언트)", type: ['유니버셜', '인휴먼', '여성', '영웅', '질서'], role: ['리더'], ability: ['지휘'] },
    { name: "인휴먼즈 vs 엑스맨", type: ['유니버셜', '인휴먼', '여성', '영웅', '질서'], role: ['리더', '딜러', '서포터'], ability: ['지휘'] },
    { name: "고대의 저주", type: ['유니버셜', '인휴먼', '여성', '영웅', '질서'], role: ['리더', '서포터'], ability: ['지휘'] }
  ]
},
{
  id: 'Mephisto',
  name: '메피스토',
  portrait: '/images/mephisto.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '불명', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['화염', '마법', '사악'] },
    { name: "마스터 오브 헬", type: ['유니버셜', '불명', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['화염', '마법', '사악'] }
  ]
},
{
  id: 'Minn-Erva',
  name: '미네-르바',
  portrait: '/images/minn-erva.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['괴력', '민첩', '사악'] },
    { name: "무비: 캡틴 마블", type: ['컴뱃', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['괴력', '민첩', '사악'] }
  ]
},
{
  id: 'Mister Fantastic',
  name: '미스터 판타스틱',
  portrait: '/images/misterfantastic.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['내구력', '영웅심', '판타스틱 4'] },
    { name: "퓨처 파운데이션", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['내구력', '영웅심', '판타스틱 4'] },
    { name: "메이커", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '정의'], role: ['리더', '딜러'], ability: ['내구력', '사악', '판타스틱 4'] },
    { name: "판타스틱 4의 몰락", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['내구력', '영웅심', '판타스틱 4'] },
    { name: "판타스틱 4: 새로운 출발", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['내구력', '영웅심', '판타스틱 4'] }
  ]
},
{
  id: 'Mister Sinister',
  name: '미스터 시니스터',
  portrait: '/images/mistersinister.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['사악', '에너지 투사', '치유력'] },
    { name: "헬파이어 갈라", type: ['블래스트', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['사악', '에너지 투사', '치유력'] }
  ]
},
{
  id: 'Misty Knight',
  name: '미스티 나이트',
  portrait: '/images/mistyknight.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['요원', '무기 전문가'] }
  ]
},
{
  id: 'Mockingbird',
  name: '모킹버드',
  portrait: '/images/mockingbird.png',
  uniforms: [
    { name: "히로익 에이지", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "에이전트 오브 쉴드", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '요원'] }
  ]
},
{
  id: 'Molecule Man',
  name: '몰큘맨',
  portrait: '/images/moleculeman.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['고속 이동', '에너지 투사'] }
  ]
},
{
  id: 'Molten Man',
  name: '몰튼맨',
  portrait: '/images/moltenman.png',
  uniforms: [
    { name: "스파이더맨: 파 프롬 홈", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '내구력', '화염'] }
  ]
},
{
  id: 'Moon Girl',
  name: '문 걸',
  portrait: '/images/moongirl.png',
  uniforms: [
    { name: "마블 나우!", type: ['블래스트', '인휴먼', '여성', '영웅', '질서'], role: ['리더'], ability: ['무기 전문가', '영웅심'] },
    { name: "몬스터즈 언리쉬드! (MFF 배리언트)", type: ['블래스트', '인휴먼', '여성', '영웅', '질서'], role: ['리더'], ability: ['무기 전문가', '영웅심'] }
  ]
},
{
  id: 'Moon Knight',
  name: '문 나이트',
  portrait: '/images/moonknight.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role:['딜러'], ability: ['무기 전문가', '영웅심'] },
    { name: "아머드", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role:['딜러'], ability: ['무기 전문가', '영웅심'] },
    { name: "미스터 나이트", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role:['딜러'], ability: ['무기 전문가', '영웅심'] },
    { name: "문나이트", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role:['딜러'], ability: ['무기 전문가', '영웅심'] },
    { name: "블러드 문 나이트", type: ['스피드', '인간', '남성', '영웅', '정의'], role:['딜러'], ability: ['무기 전문가', '영웅심'] }
  ]
},
{
  id: 'Moonstone',
  name: '문스톤',
  portrait: '/images/moonstone.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['다크 어벤져스', '에너지 투사'] }
  ]
},
{
  id: 'Morbius',
  name: '모비어스',
  portrait: '/images/morbius.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['괴력', '민첩'] }
  ]
},
{
  id: 'Morgan Le Fay',
  name: '모건 르 페이',
  portrait: '/images/morganlefay.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['마법', '사악'] },
    { name: "타락한 영혼", type: ['유니버셜', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['딜러', '서포터'], ability: ['마법', '사악'] }
  ]
},
{
  id: 'Kamala Khan',
  name: '미즈 마블(카말라 칸)',
  portrait: '/images/kamalakhan.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['컴뱃', '인휴먼', '여성', '영웅', '질서'], role: ['딜러'], ability: ['괴력', '치유력'] },
    { name: "카라치 코스튬", type: ['스피드', '인휴먼', '여성', '영웅', '질서'], role: ['딜러'], ability: ['괴력', '치유력'] },
    { name: "인휴먼즈: 아틸란 라이징", type: ['컴뱃', '인휴먼', '여성', '영웅', '질서'], role: ['딜러'], ability: ['괴력', '치유력'] },
    { name: "미즈 마블", type: ['스피드', '인간', '여성', '영웅', '질서'], role: ['딜러'], ability: ['괴력', '영웅심'] },
    { name: "더 마블스", type: ['스피드', '인간', '여성', '영웅', '질서'], role: ['딜러'], ability: ['괴력', '영웅심'] },
    { name: "마블 좀비스", type: ['스피드', '인휴먼', '여성', '영웅', '질서'], role: ['딜러'], ability: ['괴력', '영웅심'] }
  ]
},
{
  id: 'mysterio',
  name: '미스테리오',
  portrait: '/images/mysterio.png',
  uniforms: [
    { name: "클래식", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['정신', '시니스터 식스']},
    { name: "스파이더맨: 파 프롬 홈", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['정신', '시니스터 식스']},
    { name: "썸머 미스터리", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러', '서포터'], ability: ['정신', '시니스터 식스']}
  ]
},
{
  id: 'Mystique',
  name: '미스틱',
  portrait: '/images/mystique.png',
  uniforms: [
    { name: "모던", type: ['스피드', '뮤턴트', '여성', '슈퍼 빌런', '파멸'], role: ['딜러', '서포터'], ability: ['민첩', '무기 전문가'] },
    { name: "헬파이어 갈라", type: ['스피드', '뮤턴트', '여성', '슈퍼 빌런', '파멸'], role: ['딜러', '서포터'], ability: ['민첩', '무기 전문가'] }
  ]
},
{
  id: 'Namor',
  name: '네이머',
  portrait: '/images/namor.png',
  uniforms: [
    { name: "클래식", type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['괴력', '내구력'] },
    { name: "피닉스 파이브", type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '질서'], role: ['딜러'], ability: ['괴력', '내구력', '피닉스 포스'] },
    { name: "블랙 팬서: 와칸다 포에버", type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '질서'], role: ['딜러'], ability: ['괴력', '내구력'] }
  ]
},
{
  id: 'Nebula',
  name: '네뷸라',
  portrait: '/images/nebula.png',
  uniforms: [
    { name: "가디언즈 오브 갤럭시", type: ['컴뱃', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['전격', '무기 전문가', '기계'] },
    { name: "클래식", type: ['컴뱃', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['전격', '무기 전문가', '기계'] },
    { name: "어벤져스: 엔드게임", type: ['컴뱃', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '무기 전문가', '기계'] },
    { name: "팀 슈트", type: ['컴뱃', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '무기 전문가', '기계'] },
    { name: "왓 이프...?", type: ['컴뱃', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '기계'] }
  ]
},
{
  id: 'Negasonic Teenage Warhead',
  name: '네가소닉 틴에이지 워헤드',
  portrait: '/images/negasonicteenagewarhead.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '고속 이동', '에너지 투사'] }
  ]
},
{
  id: 'Nick Fury',
  name: '닉 퓨리',
  portrait: '/images/nickfury.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['요원', '영웅심', '무기 전문가'] },
    { name: "무비: 캡틴 마블", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['요원', '영웅심', '무기 전문가'] },
    { name: "더 마블스", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['요원', '영웅심', '무기 전문가'] },
    { name: "시크릿 어벤져스", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['요원', '영웅심', '무기 전문가'] }
  ]
},
{
  id: 'Nightcrawler',
  name: '나이트크롤러',
  portrait: '/images/nightcrawler.png',
  uniforms: [
    { name: "모던", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '영웅심'] },
    { name: "엑스 포스", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '영웅심'] },
    { name: "클래식", type: ['스피드', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '영웅심'] }
  ]
},
{
  id: 'nova',
  name: '노바 (리처드 라이더)',
  portrait: '/images/nova.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러', '서포터'], ability: ['에너지 투사', '영웅심'] },
    { name: "마블 코스믹 인베이전", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['에너지 투사', '영웅심'] }
  ]
},
{
  id: 'Sam Alexander',
  name: '노바 (샘 알렉산더)',
  portrait: '/images/samalexander.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['고속 이동', '에너지 투사'] },
  ]
},
{
  id: 'Odin',
  name: '오딘',
  portrait: '/images/odin.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['지휘', '에너지 투사'] },
    { name: "올-파더", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['지휘', '에너지 투사'] },
    { name: "100만 년 전 어벤져스", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['지휘', '에너지 투사'] },
    { name: "아스가르드의 군주", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['지휘', '에너지 투사'] },
  ]
},
{
  id: 'Okoye',
  name: '오코예',
  portrait: '/images/okoye.png',
  uniforms: [
    { name: "왓 이프... 좀비스?!", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '무기 전문가'] }
  ]
},
{
  id: 'Omega Red',
  name: '오메가 레드',
  portrait: '/images/omegared.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['치유력', '사악', '괴력'] }
  ]
},
{
  id: 'Phil Coulson',
  name: '필 콜슨',
  portrait: '/images/philcoulson.png',
  uniforms: [
    { name: "에이전트 오브 쉴드", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['서포터'], ability: ['지휘', '요원'] },
    { name: "A.O.S. 시즌 3", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['서포터'], ability: ['지휘', '요원'] },
    { name: "겨울 비밀작전", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['서포터'], ability: ['지휘', '요원'] }
  ]
},
{
  id: 'PhylaVell',
  name: '파일라-벨',
  portrait: '/images/phylavell.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '외계인', '여성', '영웅', '질서'], role: ['서포터'], ability: ['에너지 투사', '영웅심'] },
    { name: "마블 코스믹 인베이전", type: ['유니버셜', '외계인', '여성', '영웅', '질서'], role: ['서포터'], ability: ['에너지 투사', '영웅심'] }
  ]
},
{
  id: 'Polaris',
  name: '폴라리스',
  portrait: '/images/polaris.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['리더', '서포터'], ability: ['에너지 투사', '고속 이동'] },
    { name: "언캐니 엑스맨", type: ['블래스트', '뮤턴트', '여성', '슈퍼 빌런', '질서'], role: ['리더', '서포터'], ability: ['에너지 투사', '고속 이동'] }
  ]
},
{
  id: 'Professor X',
  name: '프로페서 X',
  portrait: '/images/professorx.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['영웅심', '정신', '정신 저항'] },
    { name: "클래식", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['영웅심', '정신', '정신 저항'] },
    { name: "침묵의 의회", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['영웅심', '정신', '정신 저항'] }
  ]
},
{
  id: 'Proxima Midnight',
  name: '프록시마 미드나이트',
  portrait: '/images/proximamidnight.png',
  uniforms: [
    { name: "인피니티", type: ['유니버셜', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['리더'], ability: ['민첩', '고속 이동', '블랙 오더'] },
    { name: "어벤져스: 인피니티 워", type: ['유니버셜', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['민첩', '고속 이동', '블랙 오더'] },
    { name: "다크 옵시디언 아머", type: ['유니버셜', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러', '서포터'], ability: ['민첩', '고속 이동', '블랙 오더'] }
  ]
},
{
  id: 'Psylocke',
  name: '사일록',
  portrait: '/images/psylocke.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '정신'] },
    { name: "디스어셈블드", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '정신'] },
    { name: "헬파이어 갈라", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '정신'] },
    { name: "썸머 바캉스", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '정신'] },
  ]
},
{
  id: 'Punisher',
  name: '퍼니셔',
  portrait: '/images/punisher.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['영웅심', '무기 전문가'] },
    { name: "누아르", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['영웅심', '무기 전문가'] },
    { name: "워 저널", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['영웅심', '무기 전문가'] },
    { name: "마블 데어데블", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['영웅심', '무기 전문가'] },
    { name: "마블 레거시", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['영웅심', '무기 전문가', '기계'] },
    { name: "코스믹 고스트 라이더", type: ['유니버셜', '인간', '남성', '슈퍼 빌런', '정의'], role: ['리더', '딜러'], ability: ['파워 코스믹', '화염'] },
    { name: "비스트의 주먹", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['영웅심', '무기 전문가'] },
    { name: "데어데블: 본 어게인", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['영웅심', '무기 전문가'] }
  ]
},
{
  id: 'Quasar',
  name: '퀘이사 (에이브릴 킨케이드)',
  portrait: '/images/quasar.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['초감각', '에너지 투사'] },
    { name: "클래식", type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['초감각', '에너지 투사'] }
  ]
},
{
  id: 'Wendell Vaughn',
  name: '퀘이사 (웬델 본)',
  portrait: '/images/wendellvaughn.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['에너지 투사', '고속 이동', '어나이얼레이터'] }
  ]
},
{
  id: 'Quicksilver',
  name: '퀵실버',
  portrait: '/images/quicksilver.png',
  uniforms: [
    { name: "클래식", type: ['스피드', '인간', '남성', '영웅', '질서'], role: ['딜러'], ability: ['고속 이동', '민첩'] },
    { name: "마블 레거시", type: ['스피드', '인간', '남성', '영웅', '질서'], role: ['딜러'], ability: ['고속 이동', '민첩'] },
    { name: "언캐니 어벤져스", type: ['스피드', '인간', '남성', '영웅', '질서'], role: ['딜러'], ability: ['고속 이동', '민첩'] },
    { name: "썸머 데이즈", type: ['스피드', '인간', '남성', '영웅', '질서'], role: ['딜러'], ability: ['고속 이동', '민첩'] },
    { name: "마이티 어벤져스", type: ['스피드', '인간', '남성', '영웅', '질서'], role: ['딜러'], ability: ['고속 이동', '민첩'] }
  ]
},
{
  id: 'Rachel Summers',
  name: '레이첼 서머스',
  portrait: '/images/rachelsummers.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['피닉스 포스', '고속 이동'] },
    { name: "엑스맨: 데이즈 오브 퓨처 패스트", type: ['유니버셜', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['피닉스 포스', '고속 이동'] }
  ]
},
{
  id: 'Red Guardian',
  name: '레드 가디언',
  portrait: '/images/redguardian.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['괴력', '민첩'] },
    { name: "무비: 블랙 위도우", type: ['컴뱃', '인간', '남성', '영웅', '냉혹'], role: ['딜러'], ability: ['괴력', '민첩'] },
    { name: "썬더볼츠*", type: ['컴뱃', '인간', '남성', '영웅', '냉혹'], role: ['딜러'], ability: ['괴력', '민첩', '썬더볼츠'] }
  ]
},
{
  id: 'Red Hulk',
  name: '레드 헐크',
  portrait: '/images/redhulk.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더'], ability: ['화염', '감마선'] },
    { name: "마블 나우!", type: ['컴뱃', '인간', '남성', '영웅', '냉혹'], role: ['리더'], ability: ['화염', '감마선'] },
    { name: "복수의 심비오트", type: ['컴뱃', '인간', '남성', '영웅', '냉혹'], role: ['리더', '딜러'], ability: ['화염', '감마선', '심비오트'] },
    { name: "캡틴 아메리카: 브레이브 뉴 월드", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러', '서포터'], ability: ['화염', '감마선', '내구력'] }
  ]
},
{
  id: 'Red SheHulk',
  name: '레드 쉬헐크',
  portrait: '/images/redshehulk.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['감마선', '내구력', '화염'] }
  ]
},
{
  id: 'Red Skull',
  name: '레드 스컬',
  portrait: '/images/redskull.png',
  uniforms: [
    { name: "캡틴 아메리카: 퍼스트 어벤져", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '지휘'] },
    { name: "시크릿 워즈: 레드 스컬", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '지휘'] },
    { name: "하이드라 아머", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '지휘', '코스믹 큐브'] }
  ]
},
{
  id: 'Rescue',
  name: '레스큐',
  portrait: '/images/rescue.png',
  uniforms: [
    { name: "어벤져스: 엔드게임", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['기계', '영웅심'] },
    { name: "3099", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: [''], ability: ['기계', '영웅심'] },
    { name: "인빈시블 아이언맨", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: [''], ability: ['기계', '영웅심'] }
  ]
},
{
  id: 'Rhino',
  name: '라이노',
  portrait: '/images/rhino.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['괴력', '내구력', '시니스터 식스'] }
  ]
},
{
  id: 'Rocket Raccoon',
  name: '로켓 라쿤',
  portrait: '/images/rocketraccoon.png',
  uniforms: [
    { name: "가디언즈 오브 갤럭시", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가'] },
    { name: "올-뉴, 올-디프런트", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가'] },
    { name: "가디언즈 오브 갤럭시 2", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가'] },
    { name: "어벤져스: 인피니티 워", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가'] },
    { name: "어벤져스: 엔드게임", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가'] },
    { name: "팀 슈트", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가'] },
    { name: "가디언즈 오브 갤럭시: Volume 3", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['무기 전문가', '가디언즈 오브 갤럭시'] }
  ]
},
{
  id: 'Rogue',
  name: '로그',
  portrait: '/images/rogue.png',
  uniforms: [
    { name: "클래식", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['치유력', '고속 이동'] },
    { name: "에이지 오브 아포칼립스", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['치유력', '고속 이동'] },
    { name: "언캐니 어벤져스", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['치유력', '고속 이동'] },
    { name: "엑스칼리버", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['치유력', '고속 이동'] },
    { name: "겨울 비밀작전", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['치유력', '고속 이동'] }
  ]
},
{
  id: 'Ronan',
  name: '로난',
  portrait: '/images/ronan.png',
  uniforms: [
    { name: "가디언즈 오브 갤럭시", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '서포터'], ability: ['정신 저항', '지휘', '어나이얼레이터'] },
    { name: "어나이얼레이션", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '서포터'], ability: ['정신 저항', '지휘', '어나이얼레이터'] },
    { name: "무비: 캡틴 마블", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러', '서포터'], ability: ['정신 저항', '지휘', '어나이얼레이터'] },
    { name: "어나이얼레이터", type: ['유니버셜', '외계인', '남성', '영웅', '파멸'], role: ['리더', '서포터'], ability: ['정신 저항', '지휘', '어나이얼레이터'] }
  ]
},
{
  id: 'Sabretooth',
  name: '세이버투스',
  portrait: '/images/sabretooth.png',
  uniforms: [
    { name: "브라더후드 오브 뮤턴츠", type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['사악', '민첩'] },
    { name: "언캐니 어벤져스", type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['사악', '민첩'] },
    { name: "얼티메이트", type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['사악', '민첩'] }
  ]
},
{
  id: 'Sandman',
  name: '샌드맨',
  portrait: '/images/sandman.png',
  uniforms: [
    { name: "클래식", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['내구력', '시니스터 식스'] }
  ]
},
{
  id: 'Satana',
  name: '사타나',
  portrait: '/images/satana.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['마법', '화염'] },
    { name: "마블 레거시", type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['마법', '화염'] },
    { name: "Ascended One", type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['마법', '화염'] }
  ]
},
{
  id: 'Scarlet Spider',
  name: '스칼렛 스파이더',
  portrait: '/images/scarletspider.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['서포터'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "다크 웹", type: ['스피드', '인간', '남성', '슈퍼 빌런', '정의'], role: ['서포터'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "선물 배달꾼", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['서포터'], ability: ['스파이더 센스', '영웅심', '민첩'] }
  ]
},
{
  id: 'Scarlet Witch',
  name: '스칼렛 위치',
  portrait: '/images/scarletwitch.png',
  uniforms: [
    { name: "클래식", type: ['블래스트', '인간', '여성', '영웅', '질서'], role: ['리더'], ability: ['파워 코스믹', '고속 이동'] },
    { name: "어벤져스: 인피니티 워", type: ['블래스트', '인간', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['파워 코스믹', '고속 이동'] },
    { name: "언캐니 어벤져스", type: ['블래스트', '인간', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['파워 코스믹', '고속 이동'] },
    { name: "올-뉴, 올-디프런트", type: ['블래스트', '인간', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['파워 코스믹', '고속 이동'] },
    { name: "완다비전", type: ['유니버셜', '인간', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['파워 코스믹', '고속 이동'] },
    { name: "닥터 스트레인지: 대혼돈의 멀티버스", type: ['유니버셜', '인간', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['파워 코스믹', '고속 이동'] },
    { name: "스칼렛 위치", type: ['유니버셜', '인간', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['파워 코스믹', '고속 이동'] },
    { name: "마블 좀비스", type: ['유니버셜', '인간', '여성', '슈퍼 빌런', '질서'], role: ['리더', '딜러'], ability: ['파워 코스믹', '고속 이동', '좀비'] }
  ]
},
{
  id: 'Scorpion',
  name: '스콜피온',
  portrait: '/images/scorpion.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '내구력', '독'] }
  ]
},
{
  id: 'Scream',
  name: '스크림',
  portrait: '/images/scream.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['괴력', '사악', '심비오트'] },
    { name: "사일런스", type: ['컴뱃', '인간', '여성', '영웅', '냉혹'], role: ['딜러'], ability: ['괴력', '영웅심', '심비오트'] }
  ]
},
{
  id: 'Sentinel',
  name: '센티넬',
  portrait: '/images/sentinel.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '불명', '성별 없음', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['기계', '사악'] },
    { name: "님로드 더 레서", type: ['유니버셜', '불명', '성별 없음', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['기계', '사악'] },
    { name: "스타크 센티넬 마크 II", type: ['유니버셜', '불명', '성별 없음', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['기계', '사악'] }
  ]
},
{
  id: 'Sentry',
  name: '센트리',
  portrait: '/images/sentry.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['다크 어벤져스', '영웅심', '에너지 투사'] },
    { name: "어둠의 결합", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['다크 어벤져스', '영웅심', '에너지 투사'] },
    { name: "썬더볼츠*", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['영웅심', '에너지 투사'] }
  ]
},
{
  id: 'Sersi',
  name: '세르시',
  portrait: '/images/sersi.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '외계인', '여성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['이터널스', '영웅심', '마법'] },
    { name: "이터널스", type: ['블래스트', '외계인', '여성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['이터널스', '영웅심', '마법'] }
  ]
},
{
  id: 'Shadow Shell',
  name: '섀도우 셸',
  portrait: '/images/shadowshell.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['워리어즈 오브 더 스카이', '민첩', '독'] },
    { name: "달의 신전의 수호자", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['워리어즈 오브 더 스카이', '민첩', '독'] }
  ]
},
{
  id: 'shangchi',
  name: '샹치',
  portrait: '/images/shangchi.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['민첩', '영웅심'] },
    { name: "샹치와 텐 링즈의 전설", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['민첩', '영웅심'] },
    { name: "마블 좀비스", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '영웅심'] }
  ]
},
{
  id: 'Sharoncarter',
  name: '에이전트 13',
  portrait: '/images/sharoncarter.png',
  uniforms: [
    { name: '모던', type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['요원'] },
    { name: '캡틴 아메리카: 시빌 워', type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['요원'] }
  ]
},
{
  id: 'SheHulk',
  name: '쉬헐크',
  portrait: '/images/shehulk.png',
  uniforms: [
    { name: "시크릿 워즈: 에이포스", type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['감마선', '내구력'] },
    { name: "올-뉴", type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['감마선', '내구력'] },
    { name: "판타스틱 4", type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['감마선', '내구력', '판타스틱 4'] },
    { name: "어벤져스", type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['감마선', '내구력'] },
    { name: "변호사 쉬헐크", type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['감마선', '내구력'] }
  ]
},
{
  id: 'Shuri',
  name: '슈리',
  portrait: '/images/shuri.png',
  uniforms: [
    { name: "마블 레거시", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['서포터'], ability: ['초감각', '영웅심'] },
    { name: "무비: 블랙 팬서", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['서포터'], ability: ['초감각', '영웅심'] },
    { name: "블랙 팬서: 와칸다 포에버", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['서포터'], ability: ['초감각', '영웅심'] },
    { name: "블랙 팬서: 와칸다 포에버 (블랙 팬서)", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['초감각', '영웅심'] }
  ]
},
{
  id: 'Sif',
  name: '시프',
  portrait: '/images/sif.png',
  uniforms: [
    { name: "에이전트 오브 쉴드", type: ['컴뱃', '외계인', '여성', '영웅', '질서'], role: ['리더'], ability: ['민첩'] },
    { name: "모던", type: ['컴뱃', '외계인', '여성', '영웅', '질서'], role: ['리더'], ability: ['민첩'] },
    { name: "아스가르드 침공", type: ['컴뱃', '외계인', '여성', '영웅', '질서'], role: ['리더', '서포터'], ability: ['민첩'] }
  ]
},
{
  id: 'Silk',
  name: '실크',
  portrait: '/images/silk.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '민첩'] },
    { name: "웹 슈트", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '민첩'] },
    { name: "썸머 데이즈", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '민첩'] }
  ]
},
{
  id: 'Silver Samurai',
  name: '실버 사무라이',
  portrait: '/images/silversamurai.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러', '서포터'], ability: ['무기 전문가', '사악'] }
  ]
},
{
  id: 'Silver Surfer',
  name: '실버 서퍼',
  portrait: '/images/silversurfer.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['파워 코스믹', '어나이얼레이터'] },
    { name: "블랙", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['파워 코스믹', '어나이얼레이터'] },
    { name: "보이드 나이트", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '질서'], role: ['리더', '딜러'], ability: ['파워 코스믹', '심비오트', '어나이얼레이터'] }
  ]
},
{
  id: 'ShallaBal',
  name: '실버 서퍼(샬라-발)',
  portrait: '/images/shallabal.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['파워 코스믹'] }
  ]
},
{
  id: 'Sin',
  name: '신',
  portrait: '/images/sin.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['리더'], ability: ['무기 전문가', '사악'] },
    { name: "레이지 리턴드", type: ['스피드', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['리더', '서포터'], ability: ['무기 전문가', '사악'] }
  ]
},
{
  id: 'Singularity',
  name: '싱귤래리티',
  portrait: '/images/singularity.png',
  uniforms: [
    { name: "시크릿 워즈: 에이포스", type: ['유니버셜', '외계인', '여성', '영웅', '질서'], role: ['리더'], ability: ['고속 이동', '에너지 투사'] },
  ]
},
{
  id: 'Sister Grimm',
  name: '시스터 그림',
  portrait: '/images/sistergrimm.png',
  uniforms: [
    { name: "시크릿 워즈: 에이포스", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['마법'] },
    { name: "올-뉴, 올-디프런트", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['마법'] },
    { name: "런어웨이즈", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['마법'] }
  ]
},
{
  id: 'Skurge',
  name: '스커지',
  portrait: '/images/skurge.png',
  uniforms: [
    { name: "토르: 라그나로크", type: ['컴뱃', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['괴력', '내구력'] }
  ]
},
{
  id: 'Slapstick',
  name: '슬랩스틱',
  portrait: '/images/slapstick.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] }
  ]
},
{
  id: 'Sleeper',
  name: '슬리퍼',
  portrait: '/images/sleeper.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '외계인', '성별 없음', '영웅', '질서'], role: ['리더', '서포터'], ability: ['심비오트', '치유력', '영웅심'] }
  ]
},
{
  id: 'Songbird',
  name: '송버드',
  portrait: '/images/songbird.png',
  uniforms: [
    { name: "뉴 어벤져스", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['고속 이동', '요원'] }
  ]
},
{
  id: 'Spectrum',
  name: '스펙트럼',
  portrait: '/images/spectrum.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['영웅심', '에너지 투사'] },
    { name: "더 마블스", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['영웅심', '에너지 투사'] }
  ]
},
{
  id: 'Spider Gwen',
  name: '스파이더 그웬',
  portrait: '/images/spidergwen.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '민첩', '영웅심'] },
    { name: "그웬돌린 스테이시", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '민첩', '영웅심'] },
    { name: "그웬놈", type: ['스피드', '인간', '여성', '슈퍼 빌런', '정의'], role: ['딜러'], ability: ['스파이더 센스', '민첩', '심비오트'] },
    { name: "스파이더맨: 어크로스 더 유니버스", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '민첩', '영웅심'] }
  ]
},
{
  id: 'SpiderMan',
  name: '스파이더맨',
  portrait: '/images/spiderman.png',
  uniforms: [
    { name: "클래식", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "시크릿 워즈: 리뉴 유어 바우", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "캡틴 아메리카: 시빌 워", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "스파이더맨: 홈커밍 홈메이드 슈트", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "어벤져스: 인피니티 워", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "스파이더맨: 파 프롬 홈", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "스파이더맨: 파 프롬 홈 (스텔스 슈트)", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "스파이더맨: 노 웨이 홈 (통합 슈트)", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "스파이더맨: 노 웨이 홈 (블랙 & 골드 슈트)", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "백 투 베이직", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "심비오트 슈트", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '심비오트'] }
  ]
},
{
  id: 'Miles Morales',
  name: '스파이더맨(마일즈 모랄레스)',
  portrait: '/images/milesmorales.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '민첩', '영웅심'] },
    { name: "뉴 유니버스", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '민첩', '영웅심'] },
    { name: "앱솔루트 카니지", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '정의'], role: ['리더', '딜러'], ability: ['스파이더 센스', '심비오트', '사악'] },
    { name: "애니버서리 스페셜", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['스파이더 센스', '민첩', '영웅심'] },
    { name: "스파이더맨: 어크로스 더 유니버스", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '민첩', '영웅심'] },
    { name: "고대의 저주", type: ['스피드', '인간', '남성', '슈퍼 빌런', '정의'], role: ['딜러'], ability: ['스파이더 센스', '민첩', '영웅심'] }
  ]
},
{
  id: 'SpiderMan 2099',
  name: '스파이더맨 2099',
  portrait: '/images/spiderman2099.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "스파이더맨: 어크로스 더 유니버스", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] }
  ]
},
{
  id: 'SpiderWoman',
  name: '스파이더 우먼',
  portrait: '/images/spiderwoman.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['스파이더 센스', '영웅심', '민첩'] },
    { name: "스파이더맨: 어크로스 더 유니버스", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러', '서포터'], ability: ['스파이더 센스', '영웅심', '민첩'] }
  ]
},
{
  id: 'Spot',
  name: '스팟',
  portrait: '/images/spot.png',
  uniforms: [
    { name: "스파이더맨: 어크로스 더 유니버스", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['고속 이동', '사악'] }
  ]
},
{
  id: 'Squirrel Girl',
  name: '스쿼럴 걸',
  portrait: '/images/squirrelgirl.png',
  uniforms: [
    { name: "뉴 어벤져스", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] },
    { name: "마블 나우!", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] },
    { name: "너티 타이탄", type: ['스피드', '인간', '여성', '슈퍼 빌런', '정의'], role: ['딜러'], ability: ['민첩', '사악', '파워 코스믹'] }
  ]
},
{
  id: 'StarLord',
  name: '스타 로드',
  portrait: '/images/starlord.png',
  uniforms: [
    { name: "가디언즈 오브 갤럭시", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['리더'], ability: ['무기 전문가', '지휘'] },
    { name: "스페이스 아머", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['리더'], ability: ['무기 전문가', '지휘'] },
    { name: "가디언즈 오브 갤럭시 2", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['리더'], ability: ['무기 전문가', '지휘'] },
    { name: "어벤져스: 인피니티 워", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['무기 전문가', '지휘'] },
    { name: "그라운디드", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['리더'], ability: ['무기 전문가', '지휘'] },
    { name: "가디언즈 오브 갤럭시: Volume 3", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['무기 전문가', '지휘', '가디언즈 오브 갤럭시'] },
    { name: "웨이스트랜더스", type: ['블래스트', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['무기 전문가', '지휘', '가디언즈 오브 갤럭시'] }
  ]
},
{
  id: 'Storm',
  name: '스톰',
  portrait: '/images/storm.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '지휘'] },
    { name: "엑스맨 레드", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '지휘'] },
    { name: "인휴먼즈 vs 엑스맨", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '지휘'] },
    { name: "크라코아의 여름", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['전격', '지휘'] },
    { name: "엑스맨 '97", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['전격', '지휘'] }    
  ]
},
{
  id: "Stryfe",
  name: "스트라이프",
  portrait: '/images/stryfe.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['사악', '에너지 투사'] },
    { name: "클래식", type: ['블래스트', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['사악', '에너지 투사'] }, 
    { name: "봄의 폭군", type: ['블래스트', '뮤턴트', '남성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['사악', '에너지 투사'] }
  ]
},
{
  id: 'Sun Bird',
  name: '썬 버드',
  portrait: '/images/sunbird.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러', '서포터'], ability: ['워리어즈 오브 더 스카이', '민첩', '화염'] },
    { name: "달의 신전의 수호자", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러', '서포터'], ability: ['워리어즈 오브 더 스카이', '민첩', '화염'] }
  ]
},
{
  id: 'Sunspot',
  name: '선스팟',
  portrait: '/images/sunspot.png',
  uniforms: [
    { name: "엑스맨 '97", type: ['블래스트', '뮤턴트', '남성', '영웅', '질서' ], role: ['딜러', '서포터'], ability: ['화염', '고속 이동'] }
  ]
},
{
  id: 'Supergiant',
  name: '슈퍼자이언트',
  portrait:'/images/supergiant.png',
  uniforms: [
    { name: "인피니티", type: ['유니버셜', '외계인', '여성', '슈퍼 빌런', '파멸'], role: [''], ability: ['정신', '정신 저항', '블랙 오더'] },
    { name: "다크 옵시디언 아머", type: ['유니버셜', '외계인', '여성', '슈퍼 빌런', '파멸'], role: ['딜러'], ability: ['정신', '정신 저항', '블랙 오더'] }
  ]
},
{
  id: 'Sword Master',
  name: '소드 마스터',
  portrait: '/images/swordmaster.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '무기 전문가'] },
    { name: "클래식", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['영웅심', '무기 전문가'] }
  ]
},
{
  id: 'Sylvie',
  name: '실비',
  portrait: '/images/sylvie.png',
  uniforms: [
    { name: "로키", type: ['유니버셜', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['정신', '냉기'] }
  ]
},
{
  id: 'Taskmaster',
  name: '태스크마스터',
  portrait: '/images/taskmaster.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['서포터'], ability: ['무기 전문가', '사악'] },
    { name: "무비: 블랙 위도우", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['서포터'], ability: ['무기 전문가', '사악'] },
    { name: "썬더볼츠*", type: ['컴뱃', '인간', '여성', '영웅', '냉혹'], role: ['딜러','서포터'], ability: ['무기 전문가', '사악', '썬더볼츠'] }
  ]
},
{
  id: 'Thane',
  name: '테인',
  portrait: '/images/thane.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인휴먼', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['괴력', '내구력', '사악'] },
    { name: "피닉스 포스", type: ['유니버셜', '인휴먼', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['피닉스 포스', '내구력', '사악'] }
  ]
},
{
  id: 'Thanos',
  name: '타노스',
  portrait: '/images/thanos.png',
  uniforms: [
    { name: "인피니티", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['파워 코스믹', '내구력', '사악'] },
    { name: "시크릿 워즈: 인피니티", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['파워 코스믹', '내구력', '사악'] },
    { name: "어벤져스: 인피니티 워", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['파워 코스믹', '내구력', '사악'] },
    { name: "어벤져스: 엔드게임", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['파워 코스믹', '내구력', '사악'] },
    { name: "옵시디언 킹", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['파워 코스믹', '내구력', '사악'] },
    { name: "지혜로운 수확가", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['파워 코스믹', '내구력', '사악'] },
    { name: "타노스의 승리", type: ['유니버셜', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['파워 코스믹', '내구력', '사악'] }
  ]
},
{
  id: 'The Hood',
  name: '더 후드',
  portrait: '/images/thehood.png',
  uniforms: [
    { name: "아이언하트", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['리더', '딜러'], ability: ['사악', '고속 이동'] }
  ]
},
{
  id: 'Thing',
  name: '씽',
  portrait: '/images/thing.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['서포터'], ability: ['괴력', '내구력', '판타스틱 4'] },
    { name: "퓨처 파운데이션", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['서포터'], ability: ['괴력', '내구력', '판타스틱 4'] },
    { name: "클래식", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['서포터'], ability: ['괴력', '내구력', '판타스틱 4'] },
    { name: "판타스틱 4의 몰락", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['서포터'], ability: ['괴력', '내구력', '판타스틱 4'] },
    { name: "판타스틱 4: 새로운 출발", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['서포터'], ability: ['괴력', '내구력', '판타스틱 4'] }
  ]
},
{
  id: 'Thena',
  name: '테나',
  portrait: '/images/thena.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['영웅심', '이터널스'] },
    { name: "이터널스", type: ['유니버셜', '외계인', '여성', '영웅', '질서'], role: ['딜러'], ability: ['영웅심', '이터널스'] }
  ]
},
{
  id: 'Thor',
  name: '토르',
  portrait: '/images/thor.png',
  uniforms: [
    { name: "어벤져스", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '영웅심'] },
    { name: "어벤져스: 에이지 오브 울트론", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '영웅심'] },
    { name: "언워디", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '영웅심'] },
    { name: "토르: 라그나로크", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '영웅심'] },
    { name: "어벤져스: 인피니티 워", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '영웅심'] },
    { name: "팀 슈트", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '영웅심'] },
    { name: "어벤져스: 엔드게임", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '영웅심'] },
    { name: "천둥의 전령", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '영웅심', '파워 코스믹'] },
    { name: "토르: 러브 앤 썬더", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '영웅심'] },
    { name: "올-파더 리본", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['전격', '영웅심'] }
  ]
},
{
  id: 'Jane Foster',
  name: '토르 (제인 포스터)',
  portrait: '/images/janefoster.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['전격', '고속 이동'] },
    { name: "토르: 러브 앤 썬더", type: ['유니버셜', '인간', '여성', '영웅', '정의'], role: ['딜러', '서포터'], ability: ['전격', '고속 이동'] }
  ]
},
{
  id: 'Titania',
  name: '타이타니아',
  portrait: '/images/titania.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['리더'], ability: ['괴력'] },
    { name: "피어 잇셀프", type: ['컴뱃', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['리더', '서포터'], ability: ['괴력'] }
  ]
},
{
  id: 'Toxin',
  name: '톡신',
  portrait: '/images/toxin.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩', '심비오트', '괴력'] }
  ]
},
{
  id: 'USAgent',
  name: 'U.S.에이전트',
  portrait: '/images/usagent.png',
  uniforms: [
    { name: "썬더볼츠*", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['영웅심', '지휘', '썬더볼츠'] }
  ]
},
{
  id: 'Ulik',
  name: '율리크',
  portrait: '/images/ulik.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '외계인', '남성', '슈퍼 빌런', '파멸'], role: ['리더'], ability: ['괴력', '내구력'] }
  ]
},
{
  id: 'Ultron',
  name: '울트론',
  portrait: '/images/ultron.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '불명', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['기계', '사악'] },
    { name: "어벤져스: 에이지 오브 울트론 (울트론 프라임)", type: ['유니버셜', '불명', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['기계', '사악'] },
    { name: "어벤져스: 에이지 오브 울트론 (울트론 마크1)", type: ['유니버셜', '불명', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['기계', '사악'] },
    { name: "어벤져스: 에이지 오브 울트론 (울트론 마크3)", type: ['유니버셜', '불명', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['기계', '사악'] },
    { name: "왓 이프...?", type: ['유니버셜', '불명', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['기계', '사악'] },
    { name: "올-파더 울트론", type: ['유니버셜', '불명', '남성', '슈퍼 빌런', '파멸'], role: ['리더', '딜러'], ability: ['기계', '사악'] }
  ]
},
{
  id: 'Ulysses Klaue',
  name: '율리시스 클로',
  portrait: '/images/ulyssesklaue.png',
  uniforms: [
    { name: "무비: 블랙 팬서", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: [''], ability: ['무기 전문가'] }
  ]
},
{
  id: 'Valeria Richards',
  name: '발레리아 리처즈',
  portrait: '/images/valeriarichards.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['영웅심', '판타스틱 4'] }
  ]
},
{
  id: 'Valkyrie',
  name: '발키리',
  portrait: '/images/valkyrie.png',
  uniforms: [
    { name: "토르: 라그나로크", type: ['컴뱃', '외계인', '여성', '영웅', '질서'], role: ['서포터'], ability: ['괴력'] },
    { name: "피어리스 디펜더스", type: ['컴뱃', '외계인', '여성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['괴력'] },
    { name: "토르: 러브 앤 썬더", type: ['컴뱃', '외계인', '여성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['괴력'] },
    { name: "아스가르디언즈 오브 갤럭시", type: ['컴뱃', '외계인', '여성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['괴력'] }
  ]
},
{
  id: 'Venom',
  name: '베놈',
  portrait: '/images/venom.png',
  uniforms: [
    { name: "클래식", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: [''], ability: ['치유력', '심비오트'] },
    { name: "시크릿 워즈: 마블 좀비스", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '냉혹'], role: [''], ability: ['치유력', '심비오트'] },
    { name: "안티 베놈", type: ['컴뱃', '인간', '남성', '영웅', '냉혹'], role: [''], ability: ['치유력', '심비오트'] },
    { name: "워 오브 렐름", type: ['컴뱃', '인간', '남성', '영웅', '냉혹'], role: ['딜러'], ability: ['치유력', '심비오트'] },
    { name: "킹 인 블랙", type: ['컴뱃', '인간', '남성', '영웅', '냉혹'], role: ['딜러', '서포터'], ability: ['치유력', '심비오트'] },
    { name: "워스타", type: ['컴뱃', '인간', '남성', '영웅', '냉혹'], role: ['딜러'], ability: ['치유력', '심비오트', '무기 전문가'] },
    { name: "얼어붙은 액체", type: ['컴뱃', '인간', '남성', '영웅', '냉혹'], role: ['딜러'], ability: ['치유력', '심비오트'] },
  ]
},
{
  id: 'Venus',
  name: '비너스 (아프로디테)',
  portrait: '/images/venus.png',
  uniforms: [
    { name: "인크레더블 헤라클레스", type: ['유니버셜', '외계인', '여성', '영웅', '질서'], role: ['서포터'], ability: ['정신', '정신 저항', '올림포스'] }
  ]
},
{
  id: 'Victorious',
  name: '빅토리어스',
  portrait: '/images/victorious.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['리더'], ability: ['고속 이동', '에너지 투사'] },
    { name: "엠페러 가더", type: ['유니버셜', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['리더'], ability: ['고속 이동', '에너지 투사'] },
  ]
},
{
  id: 'Viper',
  name: '바이퍼',
  portrait: '/images/viper.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['리더'], ability: ['독', '사악'] }
  ]
},
{
  id: 'Vision',
  name: '비전',
  portrait: '/images/vision.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '창조물', '남성', '영웅', '질서'], role: ['딜러'], ability: ['고속 이동', '기계', '내구력'] },
    { name: "어벤져스: 인피니티 워", type: ['유니버셜', '창조물', '남성', '영웅', '질서'], role: ['딜러'], ability: ['고속 이동', '기계', '내구력'] },
    { name: "언캐니 어벤져스", type: ['블래스트', '창조물', '남성', '영웅', '질서'], role: ['딜러'], ability: ['고속 이동', '기계', '내구력'] },
    { name: "완다비전", type: ['유니버셜', '창조물', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['고속 이동', '기계', '내구력'] },
    { name: "얼티밋 비전", type: ['유니버셜', '창조물', '여성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['고속 이동', '기계', '내구력'] },
  ]
},
{
  id: 'Volstagg',
  name: '볼스탁',
  portrait: '/images/volstagg.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['내구력'] }
  ]
},
{
  id: 'Vulture',
  name: '벌쳐',
  portrait: '/images/vulture.png',
  uniforms: [
    {name: "클래식", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['고속 이동', '민첩', '시니스터 식스']},
    {name: "스파이더맨: 홈커밍", type: ['스피드', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['고속 이동', '민첩', '시니스터 식스']}
  ]
},
{
  id: 'War Machine',
  name: '워머신',
  portrait: '/images/warmachine.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['기계', '영웅심'] },
    { name: "아이언 패트리어트", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['기계', '영웅심'] },
    { name: "어벤져스: 이니셔티브", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['기계', '영웅심'] },
    { name: "캡틴 아메리카: 시빌 워", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['기계', '영웅심'] },
    { name: "어벤져스: 인피니티 워", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['기계', '영웅심'] },
    { name: "어벤져스: 엔드게임", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['기계', '영웅심'] },
    { name: "팀 슈트", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['기계', '영웅심'] },
    { name: "3099", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러', '서포터'], ability: ['기계', '영웅심'] },
    { name: "인빈시블 아이언맨", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러', '서포터'], ability: ['기계', '영웅심'] }
  ]
},
{
  id: 'War Tiger',
  name: '워 타이거',
  portrait: '/images/wartiger.png',
  uniforms: [
    { name: "모던", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['워리어즈 오브 더 스카이', '괴력', '내구력'] },
    { name: "달의 신전의 수호자", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['워리어즈 오브 더 스카이', '괴력', '내구력'] }
  ]
},
{
  id: 'Warpath',
  name: '워패스',
  portrait: '/images/warpath.png',
  uniforms: [
    { name: "엑스 포스", type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['괴력', '영웅심'] }
  ]
},
{
  id: 'Warwolf',
  name: '워울프',
  portrait: '/images/warwolf.png',
  uniforms: [
    { name: "하울링 코만도스 오브 쉴드", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['서포터'], ability: ['치유력', '요원'] }
  ]
},
{
  id: 'Wasp',
  name: '와스프',
  portrait: '/images/wasp.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['고속 이동'] },
    { name: "올-뉴, 올-디프런트", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['고속 이동'] },
    { name: "무비: 앤트맨과 와스프", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['고속 이동'] },
    { name: "앤트맨과 와스프: 퀀텀매니아", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['리더'], ability: ['고속 이동'] }
  ]
},
{
  id: 'Nadia Van Dyne',
  name: '와스프 (나디아 반 다인)',
  portrait: '/images/nadiavandyne.png',
  uniforms: [
    { name: "모던", type: ['블래스트', '인간', '여성', '영웅', '정의'], role: ['서포터'], ability: ['요원', '고속 이동'] }
  ]
},
{
  id: 'Wave',
  name: '웨이브',
  portrait: '/images/wave.png',
  uniforms: [
    {name: "모던", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['초감각', '민첩']},
    {name: "클래식", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['초감각', '민첩']}
  ]
},
{
  id: 'Weapon Hex',
  name: '웨폰 헥스',
  portrait: '/images/weaponhex.png',
  uniforms: [
    { name: "인피니티 워프", type: ['블래스트', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러', '서포터'], ability: ['인피니티 워프', '치유력', '혼돈 마법'] },
    { name: "감염된 생물병기", type: ['블래스트', '뮤턴트', '여성', '슈퍼 빌런', '질서'], role: ['딜러', '서포터'], ability: ['좀비', '치유력', '혼돈 마법'] }
  ]
},
{
  id: 'Wenwu',
  name: '웬우',
  portrait: '/images/wenwu.png',
  uniforms: [
    { name: "샹치와 텐 링즈의 전설", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['민첩', '사악'] },
    { name: "왓 이프...?", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['민첩', '사악'] }
  ]
},
{
  id: 'Whiplash',
  name: '위플래쉬',
  portrait: '/images/whiplash.png',
  uniforms: [
    { name: "무비: 아이언맨 2", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['전격', '기계'] }
  ]
},
{
  id: 'White Fox',
  name: '화이트 폭스',
  portrait: '/images/whitefox.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['민첩', '요원','영웅심'] },
    { name: "라이프스타일 시리즈 1", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['리더', '서포터'], ability: ['민첩', '요원','영웅심'] },
    { name: "라이프스타일 시리즈 2", type: ['스피드', '인간', '여성', '영웅', '정의'], role: ['리더', '딜러', '서포터'], ability: ['민첩', '요원','영웅심'] }
  ]
},
{
  id: 'White Tiger',
  name: '화이트 타이거',
  portrait: '/images/whitetiger.png',
  uniforms: [
    { name: "뉴 어벤져스", type: ['컴뱃', '인간', '여성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] },
    { name: "데어데블: 본 어게인", type: ['컴뱃', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['민첩'] }
  ]
},
{
  id: 'Wiccan',
  name: '위칸',
  portrait: '/images/wiccan.png',
  uniforms: [
    { name: "뉴 어벤져스", type: ['블래스트', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['고속 이동', '에너지 투사'] }
  ]
},
{
  id: 'Winter Soldier',
  name: '윈터 솔져',
  portrait: '/images/wintersoldier.png',
  uniforms: [
    { name: "캡틴 아메리카: 윈터 솔져", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['무기 전문가'] },
    { name: "캡틴 아메리카: 시빌 워", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['무기 전문가'] },
    { name: "캡틴 아메리카", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['리더'], ability: ['무기 전문가'] },
    { name: "어벤져스: 인피니티 워", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['무기 전문가'] },
    { name: "팔콘과 윈터 솔져", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['무기 전문가', '영웅심'] },
    { name: "레볼루션", type: ['컴뱃', '인간', '남성', '슈퍼 빌런', '정의'], role: ['리더', '딜러'], ability: ['무기 전문가', '영웅심'] },
    { name: "썬더볼츠*", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['리더', '딜러'], ability: ['무기 전문가', '영웅심', '썬더볼츠'] }
  ]
},
{
  id: 'Wolverine',
  name: '울버린',
  portrait: '/images/wolverine.png',
  uniforms: [
    { name: "클래식", type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '치유력'] },
    { name: "에이지 오브 아포칼립스", type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '치유력'] },
    { name: "올-뉴 마블 나우!", type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '치유력'] },
    { name: "엑스 포스", type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '치유력'] },
    { name: "하우스 오브 X", type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '치유력'] },
    { name: "엔터 더 피닉스", type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '치유력', '피닉스 포스'] },
    { name: "X 데스 오브 울버린", type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '치유력'] },
    { name: "데드풀과 울버린", type: ['컴뱃', '뮤턴트', '남성', '영웅', '질서'], role: ['딜러'], ability: ['무기 전문가', '치유력'] },
  ]
},
{
  id: 'Wong',
  name: '웡',
  portrait: '/images/wong.png',
  uniforms: [
    { name: "올-뉴, 올-디프런트", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가'] },
    { name: "무비: 닥터 스트레인지", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러'], ability: ['무기 전문가'] },
    { name: "닥터 스트레인지: 대혼돈의 멀티버스", type: ['스피드', '인간', '남성', '영웅', '정의'], role: ['딜러', '서포터'], ability: ['무기 전문가', '마법', '민첩'] },
    { name: "왓 이프... 좀비스?!", type: ['스피드', '인간', '남성', '슈퍼 빌런', '정의'], role: ['딜러', '서포터'], ability: ['무기 전문가', '마법', '좀비'] }
  ]
},
{
  id: 'X-23',
  name: 'X-23',
  portrait: '/images/x-23.png',
  uniforms: [
    { name: "클래식", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '치유력'] },
    { name: "엑스 포스", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '치유력'] },
    { name: "올 뉴 울버린", type: ['컴뱃', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '치유력'] },
    { name: "타겟 X", type: ['스피드', '뮤턴트', '여성', '영웅', '질서'], role: ['딜러'], ability: ['민첩', '치유력'] }
  ]
},
{
  id: 'Yelena Belova',
  name: '옐레나 벨로바',
  portrait: '/images/yelenabelova.png',
  uniforms: [
    { name: "모던", type: ['스피드', '인간', '여성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "무비: 블랙 위도우", type: ['스피드', '인간', '여성', '영웅', '냉혹'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "무비: 블랙 위도우 (스노우 슈트)", type: ['스피드', '인간', '여성', '영웅', '냉혹'], role: ['딜러'], ability: ['민첩', '요원'] },
    { name: "썬더볼츠*", type: ['스피드', '인간', '여성', '영웅', '냉혹'], role: ['딜러'], ability: ['민첩', '요원', '썬더볼츠'] }
  ]
},
{
  id: 'Yellowjacket',
  name: '옐로우자켓',
  portrait: '/images/yellowjacket.png',
  uniforms: [
    { name: "무비: 앤트맨", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '기계'] },
    { name: "마블 나우!", type: ['블래스트', '인간', '남성', '슈퍼 빌런', '냉혹'], role: ['딜러'], ability: ['사악', '기계'] }
  ]
},
{
  id: 'Yondu',
  name: '욘두',
  portrait: '/images/yondu.png',
  uniforms: [
    { name: "가디언즈 오브 갤럭시", type: ['스피드', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['지휘', '무기 전문가'] },
    { name: "올-뉴, 올-디프런트", type: ['스피드', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['지휘', '무기 전문가'] },
    { name: "가디언즈 오브 갤럭시 2", type: ['스피드', '외계인', '남성', '영웅', '질서'], role: ['딜러'], ability: ['지휘', '무기 전문가'] },
    { name: "썸머 바캉스", type: ['스피드', '외계인', '남성', '영웅', '질서'], role: ['서포터'], ability: ['지휘', '무기 전문가'] },
  ]
},
{
  id: 'Zeus',
  name: '제우스',
  portrait: '/images/zeus.png',
  uniforms: [
    { name: "모던", type: ['유니버셜', '외계인', '남성', '영웅', '질서'], role: ['리더', '딜러'], ability: ['전격', '에너지 투사', '올림포스'] },
  ]
}
];