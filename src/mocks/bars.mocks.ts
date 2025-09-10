export type BarInfo = {
    id: string;
    name: string;
    address: string;
    description: string;
    tags: string[];
    business_hours: string;
    phone_number: string;
    signature_menus: string[];
    image_url?: string | null;
  };
  
  export const mockBars: BarInfo[] = [
    {
      id: "bar-001",
      name: "루프탑 하이볼",
      address: "서울특별시 강남구 테헤란로 123",
      description: "시그니처 하이볼과 도심 야경이 유명한 루프탑 바",
      tags: ["하이볼", "루프탑", "야경", "데이트"],
      business_hours: "월-일 18:00 - 02:00",
      phone_number: "02-1234-5678",
      signature_menus: ["유자 하이볼", "스모키 네그로니", "바질 진토닉"],
      image_url: "https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1600"
    },
    {
      id: "bar-002",
      name: "바 틴더",
      address: "서울특별시 마포구 와우산로 45",
      description: "클래식 칵테일과 재즈 음악이 흐르는 아지트",
      tags: ["클래식", "재즈", "라운지"],
      business_hours: "화-일 19:00 - 01:00 (월 휴무)",
      phone_number: "010-2222-3333",
      signature_menus: ["올드 패션드", "마티니", "맨해튼"],
      image_url: "https://images.unsplash.com/photo-1542471130-5ebec0d4f0d6?q=80&w=1600"
    },
    {
      id: "bar-003",
      name: "코지 스피키지",
      address: "서울특별시 용산구 이태원로 211 B1",
      description: "숨은 문 뒤 작은 스피키지, 바텐더 추천이 일품",
      tags: ["스피키지", "바텐더초이스", "분위기"],
      business_hours: "수-일 20:00 - 02:00 (월/화 휴무)",
      phone_number: "070-7777-8888",
      signature_menus: ["바텐더 초이스", "사워 계열", "하우스 인퓨전"],
      image_url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1600"
    },
    {
      id: "bar-004",
      name: "썬셋 칵테일 클럽",
      address: "부산광역시 해운대구 해운대해변로 270",
      description: "노을 보며 즐기는 과일 베이스 칵테일",
      tags: ["과일칵테일", "오션뷰", "노을"],
      business_hours: "월-일 17:00 - 01:00",
      phone_number: "051-555-9999",
      signature_menus: ["패션후르츠 모히또", "피치 크러쉬", "코코넛 다이키리"],
      image_url: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1600"
    },
    {
      id: "bar-005",
      name: "더 몰트 하우스",
      address: "대구광역시 중구 동성로 12",
      description: "몰트 위스키 셀렉션과 싱글오리진 아이스",
      tags: ["위스키", "싱글몰트", "하이앤드"],
      business_hours: "목-일 19:00 - 02:00 (월-수 예약제)",
      phone_number: "053-444-1212",
      signature_menus: ["시그니처 하이볼", "블라인드 테이스팅 플라이트"],
      image_url: "https://images.unsplash.com/photo-1514361892635-6b07e31e75df?q=80&w=1600"
    }
  ];
  