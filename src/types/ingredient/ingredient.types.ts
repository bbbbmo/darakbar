import z from "zod";

export const IngredientSchemes = z.object({
    id: z.number(),
    name: z.string(),
})

export type Ingredient = z.infer<typeof IngredientSchemes>;