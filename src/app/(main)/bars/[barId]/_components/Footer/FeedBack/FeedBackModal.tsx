import { Modal, ModalHeader } from 'flowbite-react'

export type FeedBackModalProps = {
  onClose: () => void
}

export default function FeedBackModal({ onClose }: FeedBackModalProps) {
  return (
    <Modal show={true} onClose={onClose} size="2xl">
      <ModalHeader className="bg-primary">
        <span className="text-2xl font-bold">피드백</span>
      </ModalHeader>
    </Modal>
  )
}
