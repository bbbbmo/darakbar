import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <>
      <div
        role="presentation"
        className="modal-overlay bg-opacity-50 fixed inset-0 z-20 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>
      <div className="modal-container x-full flex h-full items-center justify-center">
        <div className="modal z-30 flex flex-col">
          <div>
            <XMarkIcon
              className="close-btn mr-3 ml-auto size-7 fill-zinc-600"
              onClick={onClose}
            />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
