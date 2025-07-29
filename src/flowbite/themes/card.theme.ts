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
});
