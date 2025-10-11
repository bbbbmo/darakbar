import z from "zod";
import { IngredientSchemes } from "../ingredient/ingredient.types";

export const SignatureMenuSchemes = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    image: z.string().nullable(),
    price: z.number(),
    abv: z.number(),
    ingredients: z.array(IngredientSchemes),
})

export type SignatureMenu = z.infer<typeof SignatureMenuSchemes>;