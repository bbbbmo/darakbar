interface NavMenu {
  text: string;
  url: string;
}

export const navMenuList: NavMenu[] = [
  {
    text: "Home",
    url: "/",
  },
  {
    text: "나만의 레시피",
    url: "/recipe-register",
  },
  {
    text: "레시피 탐색",
    url: "/recipe-navigation",
  },
  {
    text: "다락바 탐방",
    url: "/bar-search",
  },
];
