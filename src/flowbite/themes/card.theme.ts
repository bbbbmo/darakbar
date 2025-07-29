import { createTheme } from "flowbite-react";

export const cardTheme = createTheme({
  card: {
    root: {
      base: "bg-primary",
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
      children: "flex flex-row gap-4",
    },
  },
});
