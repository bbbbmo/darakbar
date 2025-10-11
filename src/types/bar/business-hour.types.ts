import z from "zod";

export const dayOfWeekSchemes = z.enum([
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun",
])

export const BusinessHourDetailSchemes = z.object({
    id: z.number(),
    barId: z.number(),
    dayOfWeek: dayOfWeekSchemes,
    openTime: z.string(),
    closeTime: z.string(),
    isClosed: z.boolean(),
    significant: z.string(),
})

export type BusinessHourDetail = z.infer<typeof BusinessHourDetailSchemes>;