import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// 모달 컴포넌트
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <>
      <div
        role="presentation"
        className="modal-overlay bg-opacity-50 fixed inset-0 z-20 backdrop-blur-[2px]"
        onClick={onClose}
      ></div>
      <div className="modal-container fixed inset-0 z-30 flex items-center justify-center">
        <section className="modal bg-opacity-70 z-40 flex h-[80%] flex-col rounded-3xl bg-stone-700 p-5">
          <div>
            <XMarkIcon
              className="close-btn ml-auto size-7 cursor-pointer fill-zinc-600"
              onClick={onClose}
            />
          </div>
          {/* 모달 내용 */}
          {children}
        </section>
      </div>
    </>
  );
}
