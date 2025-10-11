import z from "zod";
import { SignatureMenuSchemes } from "./signiture-menu.types";
import {  TagSchemes } from "../tag/tag.types";

export const BarCategorySchemes = z.enum([
    "모든 유형",
    "클래식 바",
    "위스키 바/몰트 바",
    "스피크이지/시크릿 바",
    "모던 바",
    "라운지 바",
    "플레어 바",
    "웨스턴 바",
    "카페",
])

export type BarCategory = z.infer<typeof BarCategorySchemes>;

export const BarSchemes = z.object({
    id: z.number(), // 바 id
    name: z.string(), // 바 이름
    rating: z.number(), // 바 평점
    address: z.string(), // 바 주소
    website_url: z.string().nullable(), // 바 웹사이트 url
    instagram_url: z.string().nullable(), // 바 인스타그램 url
    description: z.string(), // 바 설명
    category: z.array(BarCategorySchemes), // 바 카테고리
    phone_number: z.string(), // 바 전화번호
    bar_images: z.array(z.string()).nullable(), // 바 이미지 url
    bar_tags: z.array(TagSchemes.omit({ category: true })), // 바 분위기
    signature_menus: z.array(SignatureMenuSchemes.omit({description: true, image: true, abv: true, ingredients: true })), // 바 시그니처 메뉴
})

export type Bar = z.infer<typeof BarSchemes>;