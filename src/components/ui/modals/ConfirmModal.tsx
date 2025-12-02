// src/components/Modals/ConfirmModal.tsx
'use client'

import { Button, Modal, ModalBody } from 'flowbite-react'

export type ConfirmModalProps = {
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  onClose: () => void
}

export default function ConfirmModal({
  title = '확인',
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  onClose,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const handleCancel = () => {
    onCancel()
    onClose()
  }

  return (
    <Modal show={true} size="md" onClose={onClose} popup>
      <ModalBody className="p-8">
        <h3 className="mb-5 text-xl font-bold text-zinc-600">{title}</h3>
        <p className="text-md mb-5 text-zinc-500">{message}</p>
        <div className="flex justify-center gap-4">
          <Button color="primary" onClick={handleConfirm}>
            {confirmText}
          </Button>
          <Button onClick={handleCancel}>{cancelText}</Button>
        </div>
      </ModalBody>
    </Modal>
  )
}
