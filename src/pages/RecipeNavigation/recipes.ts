import { Recipe_T } from "./recipes-type";

const recipes: Recipe_T[] = [
  {
    name: "Margarita",
    ingredients: [
      "2 oz Tequila",
      "1 oz Lime juice",
      "1 oz Triple sec",
      "Salt (for rim)",
    ],
    description:
      "A classic cocktail known for its zesty, refreshing taste, the Margarita is a perfect blend of tequila, lime, and orange liqueur.",
    instructions:
      "1. Rub the rim of the glass with a lime wedge and dip it into salt. 2. In a shaker, combine tequila, lime juice, and triple sec with ice. 3. Shake well and strain into the prepared glass.",
  },
  {
    name: "Mojito",
    ingredients: [
      "2 oz White rum",
      "1 oz Lime juice",
      "2 tsp Sugar",
      "6-8 Mint leaves",
      "Club soda",
    ],
    description:
      "A cool, minty cocktail, the Mojito is a refreshing drink for summer, balancing sweet, sour, and herbal notes.",
    instructions:
      "1. Muddle mint leaves and sugar in a glass. 2. Add lime juice and rum, and fill the glass with ice. 3. Top with club soda and stir gently.",
  },
  {
    name: "Old Fashioned",
    ingredients: [
      "2 oz Bourbon or Rye whiskey",
      "1 Sugar cube",
      "2 dashes Angostura bitters",
      "Orange peel",
    ],
    description:
      "A timeless cocktail, the Old Fashioned is known for its simplicity and strong flavor, perfect for whiskey lovers.",
    instructions:
      "1. Muddle the sugar cube with bitters in a glass. 2. Add whiskey and ice, then stir. 3. Garnish with a twist of orange peel.",
  },
  {
    name: "Pina Colada",
    ingredients: [
      "2 oz White rum",
      "1 oz Coconut cream",
      "3 oz Pineapple juice",
      "Pineapple slice (for garnish)",
    ],
    description:
      "A tropical favorite, the Piña Colada combines rum, coconut, and pineapple for a creamy and fruity experience.",
    instructions:
      "1. Blend rum, coconut cream, pineapple juice, and ice until smooth. 2. Pour into a chilled glass and garnish with a slice of pineapple.",
  },
  {
    name: "Cosmopolitan",
    ingredients: [
      "1.5 oz Vodka",
      "0.5 oz Triple sec",
      "0.25 oz Lime juice",
      "0.25 oz Cranberry juice",
    ],
    description:
      "The Cosmopolitan is a stylish and tart cocktail, famous for its bold flavors and elegant presentation.",
    instructions:
      "1. In a shaker, combine vodka, triple sec, lime juice, and cranberry juice with ice. 2. Shake well and strain into a martini glass.",
  },
];

export default recipes;
