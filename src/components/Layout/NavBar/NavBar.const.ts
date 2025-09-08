type NavMenu = {
  text: string;
  url: string;
};

export const navMenuList: NavMenu[] = [
  {
    text: "Home",
    url: "/home",
  },
  {
    text: "다락바 탐방",
    url: "/bar-search",
  },
  {
    text: "나만의 레시피",
    url: "/personal-recipe",
  },
  {
    text: "레시피 탐색",
    url: "/basic-recipe",
  },
];
