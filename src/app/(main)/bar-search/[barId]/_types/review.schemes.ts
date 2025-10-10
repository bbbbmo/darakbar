import z from "zod";

export const ReviewTagSchemes = z.enum([
    "친절해요",
    "분위기좋아요",
    "재방문의사있음",
    "조용한분위기",
    "가성비굿",
    "대기있음",
    "무난해요",
    "생일추천",
    "라이브좋아요",
    "인테리어예쁨",
    "시끄러움",
])

export type ReviewTag = z.infer<typeof ReviewTagSchemes>;

export const ReviewSchemes = z.object({
    id: z.number(),
    barId: z.number(),
    userName: z.string(),
    profileImageUrl: z.string().nullable(),
    visitDate: z.string(),
    rating: z.number(),
    comment: z.string(),
    createdAt: z.string(),
    likeCount: z.number(),
    imageUrl: z.string().nullable(),
    tags: z.array(ReviewTagSchemes),
})

export type Review = z.infer<typeof ReviewSchemes>;