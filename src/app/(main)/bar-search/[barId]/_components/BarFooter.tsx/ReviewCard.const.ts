import { Review } from "./ReviewCard";

export const mockReviews: Review[] = [
    {
      id: 1,
      userName: "김바텐",
      profileImageUrl: "https://example.com/avatars/kim.png",
      visitDate: "2025-08-15",
      rating: 5,
      comment: "칵테일 맛도 훌륭하고 바텐더가 정말 친절했어요!",
      createdAt: "2025-09-20T12:34:56Z",
      likeCount: 18,
      imageUrl: "https://example.com/photos/review-1.jpg",
      tags: ["친절해요", "분위기좋아요", "재방문의사있음"]
    },
    {
      id: 2,
      userName: "이밤",
      profileImageUrl: null,
      visitDate: "2025-09-01",
      rating: 4,
      comment: "조용하고 좋았는데 좌석이 약간 불편했어요.",
      createdAt: "2025-09-22T09:11:03Z",
      likeCount: 7,
      imageUrl: null,
      tags: ["조용한분위기", "가성비굿"]
    },
    {
      id: 3,
      userName: "Park",
      profileImageUrl: "https://example.com/avatars/park.jpg",
      visitDate: "2025-09-10",
      rating: 3,
      comment: "전반적으로 무난. 하이볼은 괜찮았어요.",
      createdAt: "2025-09-23T19:45:12Z",
      likeCount: 3,
      imageUrl: "https://example.com/photos/review-3.png",
      tags: ["무난해요"]
    },
    {
      id: 4,
      userName: "Jin",
      profileImageUrl: "https://example.com/avatars/jin.webp",
      visitDate: "2025-09-18",
      rating: 5,
      comment: "생일 이벤트로 갔는데 음악과 조명이 최고!",
      createdAt: "2025-09-24T21:02:40Z",
      likeCount: 25,
      imageUrl: null,
      tags: ["생일추천", "라이브좋아요", "인테리어예쁨"]
    },
    {
      id: 5,
      userName: "Sora",
      profileImageUrl: null,
      visitDate: "2025-09-20",
      rating: 2,
      comment: "기대보다 시끄러웠고 예약 확인이 늦었어요.",
      createdAt: "2025-09-25T08:27:19Z",
      likeCount: 1,
      imageUrl: "https://example.com/photos/review-5.jpg",
      tags: ["시끄러움", "대기있음"]
    }
  ];