import { createTheme } from "flowbite-react";

export const buttonTheme = createTheme({
  button: {
    color: {
      default:
        "bg-zinc-600 text-white hover:bg-zinc-800 focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800",
      primary:
        "bg-amber-400 text-neutral-900 hover:bg-amber-600 focus:ring-amber-300 dark:bg-amber-400 dark:hover:bg-amber-600 dark:focus:ring-amber-300",
    },
  },
});
