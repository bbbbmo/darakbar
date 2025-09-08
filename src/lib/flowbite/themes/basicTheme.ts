import { createTheme } from "flowbite-react";

export const basicTheme = createTheme({
    card: {
      root: {
        base: "bg-primary shadow-2xl ",
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
        base: "bg-secondary !shadow-2xl transition delay-150 duration-400 ease-in-out hover:-translate-y-1 hover:scale-103 max-h-130 text-gray-300",
      },
      img: {
        base: "max-h-80",
      },
    },

    button: {
      color: {
        default:
          "bg-zinc-600 text-white hover:bg-zinc-700 focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800",
        primary:
          "bg-amber-400 text-neutral-900 hover:bg-amber-600 focus:ring-amber-300 dark:bg-amber-400 dark:hover:bg-amber-600 dark:focus:ring-amber-300",
      },
    },

    modal: {
      root: {
        base: "bg-primary text-gray-300",
          show: {
            on: "flex bg-zinc-900/70", // 오버레이 색상/투명도
            off: "hidden",
          },
      },
      header: {
        title: "text-gray-300",
      }
    },
  });