import z from "zod";
import { ReviewTagSchemes } from "../tag/tag.types";

export const ReviewSchemes = z.object({
    id: z.number(),
    bar_id: z.number(),
    user_name: z.string(),
    profile_image: z.string().nullable(),
    visit_date: z.string(),
    rating: z.number(),
    comment: z.string(),
    created_at: z.string(),
    like_count: z.number(),
    images: z.array(z.string()).nullable(),
    tags: z.array(ReviewTagSchemes),
})

export type Review = z.infer<typeof ReviewSchemes>;