import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import useModalStore from "../../../stores/modalStore";
import Preview from "./_components/Preview";
import Detail from "./_components/Detail";
import { useState } from "react";

type Content = "preview" | "detail";

export function RecipeModal() {
  const [content, setContent] = useState<Content>("preview");
  const { modals, close } = useModalStore();
  return (
    <>
      <Modal show={modals.recipe} onClose={() => close("recipe")} size="2xl">
        <ModalHeader>칵테일 레시피</ModalHeader>
        <ModalBody>
          <div className="flex h-[60vh] max-h-140">
            {content === "preview" ? <Preview /> : <Detail />}
          </div>
        </ModalBody>
        <ModalFooter>
          {content === "preview" ? (
            <Button onClick={() => setContent("detail")}>
              레시피 자세히보기
            </Button>
          ) : (
            <Button onClick={() => setContent("preview")}>
              기본 정보로 돌아가기
            </Button>
          )}
          <Button color="gray" onClick={() => close("recipe")}>
            Decline
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
