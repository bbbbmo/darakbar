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
        base: "bg-secondary !shadow-2xl transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-103 max-h-130 ",
      },
      img: {
        base: "max-h-80",
      },
    },

    bar: {
      root: {
        base: "group bg-secondary !shadow-2xl transition delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-103 ",
      },
      img: {
        base: "h-80",
      },
    },

    button: {
      color: {
        default:
          "bg-zinc-600 text-white hover:bg-zinc-700 focus:ring-zinc-500 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800",
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

    textInput: {
      field: {
        input: {
          colors: {
            primary: "border-gray-800 bg-gray-700 text-gray-50 placeholder-gray-300 focus:border-gray-900 focus:ring-gray-800" ,
          },
        },
      },
    },

    textarea: {
      colors: {
        primary: "border-gray-800 bg-gray-700 text-gray-50 placeholder-gray-300 focus:border-gray-900 focus:ring-gray-800",
      },
    },


    select: {
      field: {
        select: {
          colors: {
            primary: "border-gray-800 bg-gray-700 text-gray-50 focus:border-gray-900 focus:ring-gray-800",
          },
        },
      },
    },

    tabs: {
      base: "flex flex-col gap-2",
      tablist: {
        base: "flex text-center",
        variant: {
          default: "flex-wrap border-b border-gray-200 dark:border-gray-700 ",
          underline: "-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700 bg-neutral-600",
          pills: "flex-wrap space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-neutral-600",
          fullWidth: "grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400 bg-neutral-600"
        },
        tabitem: {
          base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
          variant: {
            default: {
              base: "rounded-t-lg",
              active: {
                on: "bg-neutral-700 border-neutral-600 text-amber-400 dark:bg-gray-800 dark:text-amber-400",
                off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              }
            },
            underline: {
              base: "rounded-t-lg",
              active: {
                on: "rounded-t-lg border-b-2 border-amber-400 text-amber-400 dark:border-amber-400 dark:text-amber-400",
                off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              }
            },
            pills: {
              base: "",
              active: {
                on: "rounded-lg bg-amber-400 text-white",
                off: "rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
              }
            },
            fullWidth: {
              base: "ml-0 flex w-full rounded-none first:ml-0",
              active: {
                on: "rounded-none bg-neutral-700 border-neutral-600 p-4 text-amber-400 dark:bg-gray-700 dark:text-amber-400",
                off: "rounded-none bg-neutral-700 border-neutral-600 hover:bg-neutral-600 hover:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
              }
            }
          },
          icon: "mr-2 h-5 w-5"
        }
      },
      tabitemcontainer: {
        base: "",
        variant: {
          default: "",
          underline: "",
          pills: "",
          fullWidth: ""
        }
      },
      tabpanel: "py-3"
    },
  });