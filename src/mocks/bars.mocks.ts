export type BarInfo = {
    id: number;
    name: string;
    rating: number;
    address: string;
    website_url: string | null;
    instagram_url: string | null;
    description: string;
    tags: string[];
    business_hours: string;
    phone_number: string;
    signature_menus: SignatureMenu[];
    image_urls?: string[] | null;
    business_hours_detail: BusinessHourDetailInfo | null;
  };

export type SignatureMenu = {
    id: number;
    name: string;
    description: string;
    image_url: string;
    price: number;
    abv: number;
    ingredients: string[];
};


export type BusinessHourInfo = {
    openTime: string;
    closeTime: string;
    isClosed: boolean;
};

  export type BusinessHourDetailInfo = {
    mon: BusinessHourInfo;  
    tue: BusinessHourInfo;
    wed: BusinessHourInfo;
    thu: BusinessHourInfo;
    fri: BusinessHourInfo;
    sat: BusinessHourInfo;
    sun: BusinessHourInfo;
    significant: string;
  }
  
  export const mockBars: BarInfo[] = [
    {
      id: 1,
      name: "루프탑 하이볼",
      rating: 4.5,
      address: "서울특별시 강남구 테헤란로 123",
      website_url: "https://www.google.com",
      instagram_url: "https://www.instagram.com",
      description: "시그니처 하이볼과 도심 야경이 유명한 루프탑 바",
      tags: ["하이볼", "루프탑", "야경", "데이트"],
      business_hours: "월-일 18:00 - 02:00",
      phone_number: "02-1234-5678",
      signature_menus: [
        {
          id: 1,
          name: "유자 하이볼",
          description: "유자의 상큼함과 위스키의 조화가 돋보이는 하이볼",
          image_url: "https://images.unsplash.com/photo-1604908554027-86b0d3b0b3f8?q=80&w=1600",
          price: 14000,
          abv: 10,
          ingredients: ["위스키", "유자청", "탄산수", "라임"]
        },
        {
          id: 2,
          name: "스모키 네그로니",
          description: "스모크향을 입힌 진-베르무트-캄파리의 클래식 믹스",
          image_url: "https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1600",
          price: 16000,
          abv: 24,
          ingredients: ["스모키 진", "스위트 베르무트", "캄파리", "오렌지 필"]
        },
        {
          id: 3,
          name: "바질 진토닉",
          description: "바질의 허브 향이 은은한 상큼한 진 토닉",
          image_url: "https://images.unsplash.com/photo-1551024709-8f23befc6cf7?q=80&w=1600",
          price: 15000,
          abv: 12,
          ingredients: ["진", "토닉워터", "바질", "라임"]
        }
      ],
      image_urls: ["https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=1600"],
      business_hours_detail: {
        mon: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        tue: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        wed: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        thu: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        fri: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        sat: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        sun: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        significant: "월-일 18:00 - 02:00"
      }
    },
    {
      id: 2,
      name: "바 틴더",
      rating: 4.5,
      address: "서울특별시 마포구 와우산로 45",
      website_url: "https://www.google.com",
      instagram_url: "https://www.instagram.com",
      description: "클래식 칵테일과 재즈 음악이 흐르는 아지트",
      tags: ["클래식", "재즈", "라운지"],
      business_hours: "화-일 19:00 - 01:00 (월 휴무)",
      phone_number: "010-2222-3333",
      signature_menus: [
        {
          id: 1,
          name: "올드 패션드",
          description: "클래식한 버번 베이스의 스터드 칵테일",
          image_url: "https://images.unsplash.com/photo-1582455700998-40afc0d41e21?q=80&w=1600",
          price: 17000,
          abv: 28,
          ingredients: ["버번 위스키", "앙고스투라 비터", "설탕", "오렌지 필"]
        },
        {
          id: 2,
          name: "마티니",
          description: "드라이하고 깔끔한 진 마티니",
          image_url: "https://images.unsplash.com/photo-1604908553611-89f0b0fbb5e1?q=80&w=1600",
          price: 18000,
          abv: 30,
          ingredients: ["진", "드라이 베르무트", "올리브"]
        },
        {
          id: 3,
          name: "맨해튼",
          description: "라이라이 위스키와 베르무트의 밸런스",
          image_url: "https://images.unsplash.com/photo-1582455701267-48a2d5a1f6ef?q=80&w=1600",
          price: 18000,
          abv: 26,
          ingredients: ["라이 위스키", "스위트 베르무트", "비터"]
        }
      ],
      image_urls: ["https://images.unsplash.com/photo-1542471130-5ebec0d4f0d6?q=80&w=1600"],
      business_hours_detail: {
        mon: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        tue: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        wed: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        thu: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        fri: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        sat: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        sun: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        significant: "월-일 18:00 - 02:00"
      }
    },
    {
      id: 3,
      name: "코지 스피키지",
      rating: 4.5,
      address: "서울특별시 용산구 이태원로 211 B1",
      website_url: "https://www.google.com",
      instagram_url: "https://www.instagram.com",
      description: "숨은 문 뒤 작은 스피키지, 바텐더 추천이 일품",
      tags: ["스피키지", "바텐더초이스", "분위기"],
      business_hours: "수-일 20:00 - 02:00 (월/화 휴무)",
      phone_number: "070-7777-8888",
      signature_menus: [
        {
          id: 1,
          name: "바텐더 초이스",
          description: "오늘의 재료로 구성하는 테일러드 칵테일",
          image_url: "https://images.unsplash.com/photo-1582106245670-5a6a9c4c2c36?q=80&w=1600",
          price: 19000,
          abv: 18,
          ingredients: ["시즌 재료", "베이스 스피릿", "시럽", "비터"]
        },
        {
          id: 2,
          name: "사워 계열",
          description: "상큼한 산미와 부드러운 거품의 조화",
          image_url: "https://images.unsplash.com/photo-1566443280613-2b5d6f90e1b8?q=80&w=1600",
          price: 16000,
          abv: 14,
          ingredients: ["베이스 스피릿", "레몬주스", "설탕", "에그화이트"]
        },
        {
          id: 3,
          name: "하우스 인퓨전",
          description: "하우스 메이드 인퓨전 리큐르를 사용한 시그니처",
          image_url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1600",
          price: 20000,
          abv: 20,
          ingredients: ["인퓨전 리큐르", "시트러스", "허브"]
        }
      ],
      image_urls: ["https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1600"],
      business_hours_detail: {
        mon: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        tue: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        wed: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        thu: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        fri: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        sat: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        sun: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        significant: "월-일 18:00 - 02:00"
      }
    },
    {
      id: 4,
      name: "썬셋 칵테일 클럽",
      rating: 4.5,
      address: "부산광역시 해운대구 해운대해변로 270",
      website_url: "https://www.google.com",
      instagram_url: "https://www.instagram.com",
      description: "노을 보며 즐기는 과일 베이스 칵테일",
      tags: ["과일칵테일", "오션뷰", "노을"],
      business_hours: "월-일 17:00 - 01:00",
      phone_number: "051-555-9999",
      signature_menus: [
        {
          id: 1,
          name: "패션후르츠 모히또",
          description: "트로피컬한 패션후르츠가 들어간 모히또",
          image_url: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef0?q=80&w=1600",
          price: 15000,
          abv: 8,
          ingredients: ["럼", "패션후르츠", "민트", "라임", "탄산수"]
        },
        {
          id: 2,
          name: "피치 크러쉬",
          description: "복숭아의 달콤함과 상큼함을 살린 크러쉬",
          image_url: "https://images.unsplash.com/photo-1592910151018-c6b6aa4d2d80?q=80&w=1600",
          price: 14000,
          abv: 7,
          ingredients: ["보드카", "피치", "레몬", "설탕"]
        },
        {
          id: 3,
          name: "코코넛 다이키리",
          description: "코코넛의 크리미함이 매력적인 다이키리",
          image_url: "https://images.unsplash.com/photo-1602276507500-1a9b7358123f?q=80&w=1600",
          price: 16000,
          abv: 12,
          ingredients: ["럼", "코코넛", "라임", "설탕"]
        }
      ],
      image_urls: ["https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1600"],
      business_hours_detail: {
        mon: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        tue: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        wed: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        thu: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        fri: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        sat: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        sun: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        significant: "월-일 18:00 - 02:00"
      }
    },
    {
      id: 5,
      name: "더 몰트 하우스",
      rating: 4.5,
      address: "대구광역시 중구 동성로 12",
      website_url: "https://www.google.com",
      instagram_url: "https://www.instagram.com",
      description: "몰트 위스키 셀렉션과 싱글오리진 아이스",
      tags: ["위스키", "싱글몰트", "하이앤드"],
      business_hours: "목-일 19:00 - 02:00 (월-수 예약제)",
      phone_number: "053-444-1212",
      signature_menus: [
        {
          id: 1,
          name: "시그니처 하이볼",
          description: "싱글몰트의 캐릭터를 살린 프리미엄 하이볼",
          image_url: "https://images.unsplash.com/photo-1514361892635-6b07e31e75df?q=80&w=1600",
          price: 18000,
          abv: 12,
          ingredients: ["싱글몰트 위스키", "탄산수", "레몬 필"]
        },
        {
          id: 2,
          name: "블라인드 테이스팅 플라이트",
          description: "싱글몰트 3종 블라인드 테이스팅 세트",
          image_url: "https://images.unsplash.com/photo-1514361892635-6b07e31e75df?q=80&w=1600",
          price: 39000,
          abv: 40,
          ingredients: ["싱글몰트 A", "싱글몰트 B", "싱글몰트 C"]
        }
      ],
      image_urls: ["https://images.unsplash.com/photo-1514361892635-6b07e31e75df?q=80&w=1600"],
      business_hours_detail: {
        mon: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        tue: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        wed: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        thu: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        fri: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        sat: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        sun: {
          openTime: "18:00",
          closeTime: "02:00",
          isClosed: false
        },
        significant: "월-일 18:00 - 02:00"
      }
    }
  ];
  