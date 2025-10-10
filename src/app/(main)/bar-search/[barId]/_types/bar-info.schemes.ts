import z from "zod";

export const SignatureMenuSchemes = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    imageUrl: z.string().nullable(),
    price: z.number(),
    abv: z.number(),
    ingredients: z.array(z.string()),
})

export type SignatureMenu = z.infer<typeof SignatureMenuSchemes>;

export const BusinessHourSchemes = z.object({
    openTime: z.string(),
    closeTime: z.string(),
    isClosed: z.boolean(),
})

export type BusinessHour = z.infer<typeof BusinessHourSchemes>;

export const BusinessHourDetailSchemes = z.object({
    mon: BusinessHourSchemes,
    tue: BusinessHourSchemes,
    wed: BusinessHourSchemes,
    thu: BusinessHourSchemes,
    fri: BusinessHourSchemes,
    sat: BusinessHourSchemes,
    sun: BusinessHourSchemes,
    significant: z.string(),
})

export type BusinessHourDetail = z.infer<typeof BusinessHourDetailSchemes>;

export const BarInfoSchemes = z.object({
    id: z.number(),
    name: z.string(),
    rating: z.number(),
    address: z.string(),
    websiteUrl: z.string().nullable(),
    instagramUrl: z.string().nullable(),
    description: z.string(),
    tags: z.array(z.string()),
    businessHours: z.string(),
    phoneNumber: z.string(),
    signatureMenus: z.array(SignatureMenuSchemes),
    imageUrls: z.array(z.string()).nullable(),
    businessHoursDetail: BusinessHourDetailSchemes.nullable(),
})

export type BarInfo = z.infer<typeof BarInfoSchemes>;