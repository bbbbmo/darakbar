import { createTheme } from "flowbite-react";

export const cardTheme = createTheme({
  card: {
    root: {
      base: "bg-primary shadow-2xl",
    },
  },

  nested: {
    root: {
      base: "bg-secondary",
    },
  },

  editProfile: {
    root: {
      base: "bg-secondary",
      children: "flex flex-row justify-between gap-4",
    },
  },

  cocktail: {
    root: {
      base: "bg-secondary !shadow-2xl transition delay-150 duration-400 ease-in-out hover:-translate-y-1 hover:scale-103 max-h-130",
    },
    img: {
      base: "max-h-80",
    },
  },
});
