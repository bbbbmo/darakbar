import { BarCategorySchemes } from "@/types/bar/bar.types";
import { AtmosphereTagSchemes } from "@/types/tag/tag.types";

export const regionOptions: string[]  = [
    "모든 지역",
    "서울",
    "경기",
    "인천",
    "강원",
    "충청",
    "전라",
    "경상",
    "제주",
] as const;

export const priceRangeOptions: string[]  = [
    "모든 가격",
    "10000원 이하",
    "20000원 이하",
    "30000원 이하",
] as const;

export const sortOptions: string[]  = [
   "모든 정렬",
   "이름 순",
   "거리 순",
   "평점 높은 순",
   "가격 낮은 순",
   "가격 높은 순"
] as const;

export const barFilterSelect: {key: string, options: string[]}[] = [
    {key: "region", options: regionOptions},
    {key: "priceRange", options: priceRangeOptions},
    {key: "barCategory", options: BarCategorySchemes.options},
    {key: "atmosphere", options: AtmosphereTagSchemes.options},
    {key: "sort", options: sortOptions},
]
