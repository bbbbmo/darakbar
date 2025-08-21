import { useState } from "react";

export const useModal = () => {
  const [modal, setModal] = useState<boolean>(false);

  const openModal = (): void => {
    setModal(true);
  };

  const closeModal = (): void => {
    setModal(false);
  };

  return {
    modal,
    setModal,
    openModal,
    closeModal,
  };
};
