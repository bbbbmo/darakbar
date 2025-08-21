import useModalStore from "@/app/components/Modals/modalStore";
import { Button, Card, ThemeProvider } from "flowbite-react";
import RecipeCreateModal from "./RecipeCreateModal/RecipeCreateModal";
import { buttonTheme } from "@/app/flowbite/themes/button.theme";

import { cardTheme } from "@/app/flowbite/themes/card.theme";
import BlurText from "@/app/reactbits/BlurText";

export default function PersonalRecipeHeader() {
  const { open } = useModalStore();
  return (
    <>
      <ThemeProvider theme={cardTheme}>
        <Card theme={cardTheme.card} className="mt-10">
          <BlurText
            text={"나만의 레시피"}
            delay={150}
            animateBy="words"
            direction="top"
            className="mb-8 text-4xl font-bold tracking-tight text-gray-900 dark:text-white"
          />
          <p className="text-primary">
            <span>나만의 칵테일을 만들어 다락바에 보관해 보세요!</span>
            <ThemeProvider theme={buttonTheme}>
              <Button
                className="mt-10 ml-auto font-bold"
                theme={buttonTheme.button}
                color="primary"
                onClick={() => open("create")}
              >
                레시피 등록하기
              </Button>
            </ThemeProvider>
          </p>
        </Card>
      </ThemeProvider>

      <RecipeCreateModal />
    </>
  );
}
