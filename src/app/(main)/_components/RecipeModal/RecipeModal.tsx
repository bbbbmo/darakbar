"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ThemeProvider,
} from "flowbite-react";
import useModalStore from "../../../../components/Modals/modalStore";
import Preview from "./_components/Preview";
import Detail from "./_components/Detail";
import { useEffect, useState } from "react";
import { buttonTheme } from "@lib/flowbite/themes/button.theme";
import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "@/lib/supabase/api/recipe";

type Content = "preview" | "detail";

type RecipeModalProps = {
  id: number;
};

export default function RecipeModal({ id }: RecipeModalProps) {
  const [content, setContent] = useState<Content>("preview");
  const { modals, close } = useModalStore();

  const { data, isLoading } = useQuery({
    queryKey: ["get-recipe-by-id", id],
    queryFn: () => getRecipeById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (!id) return;
  }, [id]);
  return (
    <ThemeProvider theme={buttonTheme}>
      <Modal show={modals.recipe} onClose={() => close("recipe")} size="2xl">
        <ModalHeader className="bg-primary">칵테일 레시피</ModalHeader>
        <ModalBody className="bg-primary">
          <div className="flex h-[60vh] max-h-140">
            {content === "preview" ? (
              <Preview recipe={data?.data ?? null} />
            ) : (
              <Detail recipe={data?.data ?? null} />
            )}
          </div>
        </ModalBody>
        <ModalFooter className="bg-primary">
          {content === "preview" ? (
            <Button color="primary" onClick={() => setContent("detail")}>
              레시피 자세히보기
            </Button>
          ) : (
            <Button color="primary" onClick={() => setContent("preview")}>
              기본 정보로 돌아가기
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </ThemeProvider>
  );
}
